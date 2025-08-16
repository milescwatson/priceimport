DROP TABLE IF EXISTS priceimport.`User`;
CREATE TABLE priceimport.`User` (
    -- OpenID Connect Info:
    `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
    `givenName` VARCHAR(64) NOT NULL,
    `familyName` VARCHAR(64) NOT NULL,
    `emailVerified` BOOLEAN,
    `email` VARCHAR(128),
    `intuitSub` VARCHAR(128),
    -- OpenAuth2 Info:
    `refreshToken` VARCHAR(256) NOT NULL,
    `accessToken` VARCHAR(256) NOT NULL,
    -- API Data
    `intuitUserData` JSON,
    -- Subscription Data
    `stripeSubscriptionId` INTEGER,
    `subscriptionStartDate` TIMESTAMP,
    `subscriptionRenewDate` TIMESTAMP,
    `isRenewDisabled` BOOLEAN DEFAULT FALSE,
    -- Timestamp
    `createdWhen` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `modifiedWhen` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_firstName` (givenName),
    INDEX `idx_familyName` (familyName)
);

DROP TABLE IF EXISTS priceimport.`Import`;
CREATE TABLE priceimport.`Import` (
    -- OpenID Connect Info:
    `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
    `fileName` VARCHAR(256),
    `s3Key` VARCHAR(128),
    `importStageId` INTEGER NOT NULL DEFAULT 1,
    `documentLLMStructuredOutput` JSON,
    `userId` INTEGER,
    `createdWhen` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `modifiedWhen` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_firstName` (givenName),
    INDEX `idx_familyName` (familyName),
    CONSTRAINT fk_userId FOREIGN KEY (userId) REFERENCES priceimport.User(id),
    CONSTRAINT fk_importStageId FOREIGN KEY (importStageId) REFERENCES priceimport.ImportStages(id)
);

DROP TABLE IF EXISTS priceimport.`ImportStages`;
CREATE TABLE priceimport.`ImportStages` (
    `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(64),
    `displayOrder` INTEGER
);

INSERT INTO priceimport.`ImportStages`(`id`, `name`, `displayOrder`)
VALUES
    (1, "Upload", 100),
    (2, "Preview", 200)
    (3, "Preview Data", 200)
