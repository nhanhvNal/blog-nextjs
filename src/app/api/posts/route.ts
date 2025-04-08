import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.toString();

    const url = query ? `${API_BASE}/posts?${query}` : `${API_BASE}/posts`;
    const res = await fetch(url, {
      cache: "no-store",
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
      { error: (error as Error).message || "Unexpected error" },
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
