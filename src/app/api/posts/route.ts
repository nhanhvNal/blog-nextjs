import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      cache: "no-store",
      next: { revalidate: 10 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Unable to load data from API" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Error not defined" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Unable to create post" },
        { status: res.status }
      );
    }

    const newPost = await res.json();
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Error not defined" },
      { status: 500 }
    );
  }
}
