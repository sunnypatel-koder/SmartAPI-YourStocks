// src/app/api/hello/route.js

export async function GET() {
  console.log("GET request to /api/hello received");

  return new Response(JSON.stringify({ message: "Hello from the API!" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
