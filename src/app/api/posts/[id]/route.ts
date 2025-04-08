import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const res = await fetch(`${API_BASE}/posts/${(await params).id}`);

  if (!res.ok) {
    return NextResponse.json(
      { message: "Can't get blog detail" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await req.json();

  const res = await fetch(`${API_BASE}/posts/${(await params).id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const res = await fetch(`${API_BASE}/posts/${(await params).id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
