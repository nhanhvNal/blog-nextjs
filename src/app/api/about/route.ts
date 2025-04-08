import { aboutService } from "@/services/api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await aboutService.index({
      cache: "no-store",
      next: { revalidate: 10 },
    });

    const data = res.data;
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Error not defined" },
      { status: 500 }
    );
  }
}
