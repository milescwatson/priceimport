export function GET() {
    return new Response(JSON.stringify({status: "healthy"}), {
        'Content-Type': 'application/json'
    });
}