"use client";

import { PhotosWithTotalResults } from "pexels";

export const getFirstImage = async (prompt: string) => {
  const url = new URL("https://api.pexels.com/v1/search");
  url.searchParams.set("query", prompt);
  url.searchParams.set("per_page", "1");

  const response = await fetch(url, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC__PEXEL_API_KEY!,
    },
  }).then((res) => res.json() as Promise<PhotosWithTotalResults>);

  return response.photos[0];
};
