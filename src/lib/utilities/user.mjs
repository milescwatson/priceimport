import crypto from 'crypto';

import { execute } from '$lib/utilities/databaseExecutor.mjs';

const user = {
    sessionExpiresInSeconds: 60 * 60 * 24 * 60,
    generateSecureRandomString: () => {
        // Human readable alphabet (a-z, 0-9 without l, o, 0, 1 to avoid confusion)
        const alphabet = "abcdefghijkmnpqrstuvwxyz23456789";

        // Generate 24 bytes = 192 bitsopy.
        // We're only going to use 5 bits per byte so the total entropy will be 192 * 5 / 8 = 120 bits
        const bytes = new Uint8Array(24);
        crypto.getRandomValues(bytes);

        let id = "";
        for (let i = 0; i < bytes.length; i++) {
            // >> 3 "removes" the right-most 3 bits of the byte
            id += alphabet[bytes[i] >> 3];
        }
        return id;
    },
    hashSecret: async (secret) => {
        const secretBytes = new TextEncoder().encode(secret);

        const secretHashBuffer = await crypto.subtle.digest("SHA-256", secretBytes);
        return new Uint8Array(secretHashBuffer);
    },
    createSession: async ({ intuitSubId, userEmail }) => {
        const id = user.generateSecureRandomString();
        const secret = user.generateSecureRandomString();
        const secretHash = await user.hashSecret(secret);

        const token = id + "." + secret;

        await execute({
            sql: "INSERT INTO Session (id, secretHash, intuitSubId, userEmail) VALUES (?, ?, ?, ?)",
            values: [id, secretHash, intuitSubId, userEmail]
        });

        return token;
    },
    validateSessionToken: async (token) => {
        const tokenParts = token.split(".");
        if (tokenParts.length !== 2) {
            return null;
        }
        const sessionId = tokenParts[0];
        const sessionSecret = tokenParts[1];

        const session = await user.getSession(sessionId);
        if (!session) {
            return null;
        }

        const tokenSecretHash = await user.hashSecret(sessionSecret);
        const validSecret = user.constantTimeEqual(tokenSecretHash, session.secretHash);
        if (!validSecret) {
            return null;
        }

        return session;
    },
    getSession: async (sessionId) => {
        const now = new Date();

        const result = await execute({
            sql: "SELECT id, secretHash, createdDateTime, userEmail FROM Session WHERE id = ?",
            values: [sessionId]
        });

        if (result.length !== 1) {
            return null;
        }
        const session = {
            id: result[0].id,
            secretHash: result[0].secretHash,
            createdDateTime: result[0].createdDateTime,
            userEmail: result[0].userEmail
        };

        // Check expiration
        if (now.getTime() - session.createdDateTime.getTime() >= user.sessionExpiresInSeconds * 1000) {
            await user.deleteSession(sessionId);
            return null;
        }

        return session;
    },
    deleteSession: async (sessionId) => {
        await execute({
            sql: "DELETE FROM Session WHERE id = ?",
            values: [sessionId]
        });
    },
    constantTimeEqual: (params) => {
        if (a.byteLength !== b.byteLength) {
            return false;
        }
        let c = 0;
        for (let i = 0; i < a.byteLength; i++) {
            c |= a[i] ^ b[i];
        }
        return c === 0;       
    }
}

export { user }