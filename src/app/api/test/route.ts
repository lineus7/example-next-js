export async function GET() {
  return Response.json(
    { status: 200, message: "Hello World" },
    { status: 200 }
  );
}
