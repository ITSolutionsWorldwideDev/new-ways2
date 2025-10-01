import React, { use, useState, useEffect } from "react";
import { shopData } from "@/lib/shopData";
import ShopBanner from "@/components/shop/ShopBanner";
import InteractiveProductList from "@/components/shop/InteractiveProductList";

const PRODUCTS_PER_PAGE = 24;

async function getData(
  slug: string[] = [],
  searchParams: { [key: string]: string | string[] | undefined } = {}
) {
  const params = new URLSearchParams();

  const getValue = (key: string): string | undefined => {
    const value = searchParams[key];
    if (Array.isArray(value)) return value[0];
    return value;
  };

  const page = getValue("page") || "1";
  params.set("page", page);
  params.set("limit", "24");

  const availability = getValue("availability");
  if (availability === "In Stock") {
    params.set("instock", "true");
  } else if (availability === "Out of Stock") {
    params.set("instock", "false");
  }

  const filters = [
    "color",
    "size",
    "brand",
    "search",
    "priceMin",
    "priceMax",
    "sort",
  ];
  filters.forEach((filter) => {
    const value = getValue(filter);
    if (value) params.set(filter, value);
  });

  if (slug.length > 0) {
    params.set("category", slug.join("/"));
  }

  const res = await fetch(
    `${process.env.DOMAIN_URL}/api/items?${params.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

// export default async function ShopPage({
//   searchParams,
//   params,
// }: {
//   searchParams?: { [key: string]: string | string[] | undefined };
//   params: { slug?: string[] };
// }) {

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: { slug?: string[] };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const slug = params.slug ?? [];
  const awaitedSearchParams = await searchParams;

  const data = await getData(slug, awaitedSearchParams);

  return (
    <div>
      <ShopBanner {...shopData.banner} />

      <InteractiveProductList
        items={data.items}
        totalResults={data.totalResults}
        productsPerPage={PRODUCTS_PER_PAGE}
      />
    </div>
  );
}
