import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  console.log("query", query);
  const res = await fetch(
    `https://openapi.naver.com/v1/search/book.json?query=${query}`,
    {
      headers: {
        "X-Naver-Client-Id": "CRqZbwBNo6Jyt3toXhsH",
        "X-Naver-Client-Secret": "CrO68oh3Tv",
      },
    }
  );
  return NextResponse.json(await res.json());
}

