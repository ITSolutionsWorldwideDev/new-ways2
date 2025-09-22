// app/shop/page.tsx
import { type Metadata } from "next";
import ShopBanner from "@/components/shop/ShopBanner";
// import ProductCard from "@/components/shop/ProductCard";
import Pagination from "@/components/shop/Pagination";
import InteractiveProductList from "@/components/shop/InteractiveProductList";
import { shopData } from "@/lib/shopData";
import { type ResolvingMetadata } from "next";
// import { type SearchParams } from "next/navigation";

// interface Props {
//   searchParams: Record<string, string | string[] | undefined>;
// }

const PRODUCTS_PER_PAGE = 24;

async function getData(searchParams: { [key: string]: string | string[] | undefined }) {
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

  const filters = ["color", "size", "brand", "search", "priceMin", "priceMax", "sortBy"];
  filters.forEach((filter) => {
    const value = getValue(filter);
    if (value) params.set(filter, value);
  });

  const res = await fetch(`${process.env.DOMAIN_URL}/api/items?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}


/* async function getData(searchParams: any) {
  const params = new URLSearchParams();

  console.log('searchParams ==== ',searchParams);

  if (searchParams.page) {
    params.set("page", searchParams.page);
  } else {
    params.set("page", "1");
  }

  params.set("limit", PRODUCTS_PER_PAGE.toString());

  if (searchParams.availability === "In Stock") {
    params.set("instock", "true");
  } else if (searchParams.availability === "Out of Stock") {
    params.set("instock", "false");
  }

  if (searchParams.color) params.set("color", searchParams.color);
  if (searchParams.size) params.set("size", searchParams.size);
  if (searchParams.brand) params.set("brand", searchParams.brand);
  if (searchParams.search) params.set("search", searchParams.search);
  if (searchParams.priceMin) params.set("priceMin", searchParams.priceMin);
  if (searchParams.priceMax) params.set("priceMax", searchParams.priceMax);
  if (searchParams.sortBy) params.set("sort", searchParams.sortBy);

  const res = await fetch(`${process.env.DOMAIN_URL}/api/items?${params.toString()}`, {
    cache: 'no-store', // ensure SSR
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
} */

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = await getData(searchParams);

  // console.log('data === ',data);

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

/* export default async function ShopPage({ searchParams }: { searchParams: any }) {
  const data = await getData(searchParams);

  return (
    <div>
      <ShopBanner {...shopData.banner} />
      
      <InteractiveProductList items={data.items} />
      <Pagination totalPages={data.totalResults} currentPage={Number(searchParams.page || 1)} />
    </div>
  );
} */

/* "use client";
import React, { useState, useEffect } from "react";
import { shopData } from "@/lib/shopData";
import ShopBanner from "@/components/shop/ShopBanner";
import ShopFilters from "@/components/shop/ShopFilters";
import ShopSort from "@/components/shop/ShopSort";
import ProductCard from "@/components/shop/ProductCard";
import Pagination from "@/components/shop/Pagination";
import { useCartStore } from "@/store/useCartStore";

import Loading from "@/components/ui/Loading";

const PRODUCTS_PER_PAGE = 24;
interface Filters {
  availability?: string;
  color?: string;
  size?: string;
  brand?: string;
  priceMin?: number | string;
  priceMax?: number | string;
  search?: string;
}

interface Sorting {
  sortBy?: string;
}

interface Product {
  title: string;
  inStock: boolean;
  selCheckbox: boolean;
  priceRange: number;
  price?: number;
  color?: string;
  size?: string;
  brand?: string;
}

const ShopPage = () => {
  const [filters, setFilters] = useState<Filters>({});
  const [sorting, setSorting] = useState<Sorting>({});
  const [currentPage, setCurrentPage] = useState(1);

  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [bulkQuantity, setBulkQuantity] = useState(1);

  // Increment quantity for all selected
  const handleIncrement = () => {
    setBulkQuantity((prev) => prev + 1);
  };

  // Decrement quantity (min 1)
  const handleDecrement = () => {
    setBulkQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
    {}
  );

  const handleItemSelect = (itemId: string, isChecked: boolean) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: isChecked,
    }));
  };

  const handleSelectAll = (isChecked: boolean) => {
    const updatedSelections: Record<string, boolean> = {};
    items.forEach((item) => {
      updatedSelections[item.itemid] = isChecked;
    });
    setSelectedItems(updatedSelections);
  };

  const addToCart = useCartStore((state) => state.addToCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const handleBulkAddToCart = () => {
    const selected = items.filter((item) => selectedItems[item.itemid]);

    selected.forEach((item) => {
      const existing = useCartStore
        .getState()
        .cart.find((c) => c.itemid === item.itemid);
      if (existing) {
        updateQuantity(item.itemid, bulkQuantity);
      } else {
        addToCart({
          id: item.id,
          itemid: item.itemid,
          title: item.displayname ?? item.itemid ?? "No Title",
          image: item?.image ?? "/dummy/img-product.png",
          priceRange: item?.priceRange,
          price: item?.price,
          quantity: bulkQuantity,
        });
      }
    });
  };

  const fetchItems = async (
    currentPage: number,
    filters: Filters,
    sortBy: Sorting
  ) => {
    setLoading(true);

    const params = new URLSearchParams({
      page: String(currentPage),
      limit: String(PRODUCTS_PER_PAGE),
    });

    if (filters.availability === "In Stock") {
      params.append("instock", "true");
    } else if (filters.availability === "Out of Stock") {
      params.append("instock", "false");
    }

    if (filters.color) params.append("color", filters.color);
    if (filters.size) params.append("size", filters.size);
    if (filters.brand) params.append("brand", filters.brand); // Optional, if backend supports
    if (filters.search) params.append("search", filters.search);
    if (filters.priceMin) params.append("priceMin", String(filters.priceMin));
    if (filters.priceMax) params.append("priceMax", String(filters.priceMax));

    if (sorting.sortBy) {
      params.append("sort", sorting.sortBy);
    }

    try {
      const res = await fetch(`/api/items?${params.toString()}`);
      const data = await res.json();
      setItems(data.items);
      setTotalPages(data.totalResults);
    } catch (err) {
      console.error("Failed to fetch items:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(page, filters, sorting);
  }, [page, filters, sorting]);

  return (
    <div>
      <ShopBanner {...shopData.banner} />
      <div className="container mx-auto flex flex-col items-center gap-6 py-8">
        <div className="w-full max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="text-sm text-muted-foreground">
              {PRODUCTS_PER_PAGE} items out of {totalPages}
            </div>
            <div className="flex flex-row items-center gap-2">
              <button
                onClick={handleBulkAddToCart}
                className="rounded-full px-4 py-2 font-semibold bg-black text-white dark:bg-white dark:text-black border border-transparent shadow-sm transition-colors"
              >
                Add To Cart
              </button>
              <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2 py-1 dark:bg-background dark:border-border dark:text-white">
                <button
                  onClick={handleDecrement}
                  className="rounded-full px-2 py-1 font-semibold border border-gray-200 bg-white text-gray-900 dark:bg-background dark:border-border dark:text-white"
                >
                  -
                </button>
                // <span className="mx-2">01</span>
                <span className="mx-2">
                  {bulkQuantity?.toString().padStart(2, "0")}
                </span>
                <button
                  onClick={handleIncrement}
                  className="rounded-full px-2 py-1 font-semibold border border-gray-200 bg-white text-gray-900 dark:bg-background dark:border-border dark:text-white"
                >
                  +
                </button>
              </div>
              <label className="flex items-center ml-4 rounded-full border border-gray-200 bg-white px-3 py-1 font-medium shadow-sm dark:bg-background dark:border-border dark:text-white">
                <input
                  type="checkbox"
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  checked={
                    items.length > 0 &&
                    items.every((item) => selectedItems[item.itemid])
                  }
                />
                &nbsp;&nbsp;Select All
              </label>
            </div>
            <ShopSort
              options={[
                "Matchcode",
                "BestSelling",
                "priceAsc",
                "priceDesc",
                "nameAsc",
                "nameDesc",
                "dateAsc",
                "dateDesc",
              ]}
              onSortChange={(value) => setSorting({ sortBy: value })}
            />
          </div>
          <div className="flex flex-row flex-wrap gap-4 items-center  justify-between mb-6  w-full">
            <ShopFilters
              filters={shopData.filters}
              onFilterChange={setFilters}
            />
          </div>

          {loading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.isArray(items) &&
                items.map((product: any) => (
                  <ProductCard
                    key={product.id || product.itemid}
                    id={product.id}
                    itemid={product.itemid}
                    title={product.displayname ?? product.itemid ?? "No Name"}
                    image={product?.image ?? "/dummy/img-product.png"}
                    // priceRange={
                    //   Array.isArray(product?.priceRange)
                    //     ? [
                    //         product.priceRange[0] ?? 0,
                    //         product.priceRange[1] ?? 0,
                    //       ]
                    //     : [8, 120]
                    // }
                    priceRange={product?.priceRange}
                    price={product?.price}
                    variants={
                      product?.variants ?? [
                        { label: "8.00 $ | 1 pcs", value: "1" },
                        { label: "120.00 $ | 10 pcs", value: "10" },
                      ]
                    }
                    inStock={(product?.stockunit ?? 0) > 0}
                    selCheckbox={true}
                    isSelected={!!selectedItems[product.itemid]}
                    onSelectChange={(checked) =>
                      handleItemSelect(product.itemid, checked)
                    }
                  />
                ))}
            </div>
          )}

          <div className="mt-20 mb-20">
            <Pagination
              currentPage={page}
              totalPages={
                totalPages ? Math.ceil(totalPages / PRODUCTS_PER_PAGE) : 1
              }
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage; */
