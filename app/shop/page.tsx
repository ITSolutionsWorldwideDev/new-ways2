"use client";
import React, { useState, useEffect } from "react";
import { shopData } from "@/lib/shopData";
import ShopBanner from "@/components/shop/ShopBanner";
import ShopFilters from "@/components/shop/ShopFilters";
import ShopSort from "@/components/shop/ShopSort";
import ProductCard from "@/components/shop/ProductCard";
import Pagination from "@/components/shop/Pagination";

import Loading from "@/components/ui/Loading";

const PRODUCTS_PER_PAGE = 8;

import type { shopData as shopDataType } from "@/lib/shopData";
// import { colorsData } from "@/lib/filterData";
/* type Product = (typeof shopData.products)[number];
type Filters = {
  availability?: string;
  priceMin?: string;
  priceMax?: string;
  color?: string;
  size?: string;
  brand?: string;
  search?: string;
  selectAll?: boolean;
}; */

interface Filters {
  availability?: string;
  color?: string;
  size?: string;
  brand?: string;
  priceMin?: number | string;
  priceMax?: number | string;
  search?: string;
}

interface Product {
  title: string;
  inStock: boolean;
  priceRange: [number, number]; // Or just a `price` number
  color?: string;
  size?: string;
  brand?: string;
}

const filterProducts = (products: Product[], filters: Filters) => {
  let filtered = [...products];
  if (filters.availability) {
    filtered = filtered.filter((p) =>
      filters.availability === "In Stock" ? p.inStock : !p.inStock
    );
  }
  if (filters.priceMin) {
    filtered = filtered.filter(
      (p) => p.priceRange[0] >= Number(filters.priceMin)
    );
  }
  if (filters.priceMax) {
    filtered = filtered.filter(
      (p) => p.priceRange[1] <= Number(filters.priceMax)
    );
  }
  if (filters.color) {
    // Color filter logic (if color is in product data)
  }
  if (filters.size) {
    // Size filter logic (if size is in product data)
  }
  if (filters.brand) {
    // Brand filter logic (if brand is in product data)
  }
  if (filters.search) {
    filtered = filtered.filter(
      (p) =>
        filters.search &&
        p.title.toLowerCase().includes(filters.search.toLowerCase())
    );
  }
  return filtered;
};

const sortProducts = (products: Product[], sortBy: string) => {
  if (sortBy === "Price: Low to High") {
    return [...products].sort((a, b) => a.priceRange[0] - b.priceRange[0]);
  }
  if (sortBy === "Price: High to Low") {
    return [...products].sort((a, b) => b.priceRange[1] - a.priceRange[1]);
  }
  return products;
};

const ShopPage = () => {
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState(shopData.sortOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);

  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // const pageSize = 20;

  /* const fetchItems = async (currentPage: number) => {
    setLoading(true);
    try {
        // /api/items?color=blue&size=M&instock=true&page=1&limit=20
        // /api/items?page=2&limit=20&instock=true&color=Blue&size=M
      const res = await fetch(
        `/api/items?page=${currentPage}&limit=${PRODUCTS_PER_PAGE}`
      );
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
    fetchItems(page);
  }, [page]); */

  const fetchItems = async (currentPage: number, filters: Filters) => {
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

    try {
      const res = await fetch(`/api/items?${params.toString()}`);
      const data = await res.json();
      setItems(data.items);
      setTotalPages(data.totalResults); // or however you're calculating pages
    } catch (err) {
      console.error("Failed to fetch items:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(page, filters);
  }, [page, filters]);

  /* const filtered = filterProducts(shopData.products, filters);
  const sorted = sortProducts(filtered, sortBy);
  const paginated = sorted.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  ); */

  return (
    <div>
      <ShopBanner {...shopData.banner} />
      <div className="container mx-auto flex flex-col items-center gap-6 py-8">
        <div className="w-full max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="text-sm text-muted-foreground">
              {PRODUCTS_PER_PAGE} items out of {totalPages * PRODUCTS_PER_PAGE}
            </div>
            <div className="flex flex-row items-center gap-2">
              <button className="rounded-full px-4 py-2 font-semibold bg-black text-white dark:bg-white dark:text-black border border-transparent shadow-sm transition-colors">
                Add To Cart
              </button>
              <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2 py-1 dark:bg-background dark:border-border dark:text-white">
                <button className="rounded-full px-2 py-1 font-semibold border border-gray-200 bg-white text-gray-900 dark:bg-background dark:border-border dark:text-white">
                  -
                </button>
                <span className="mx-2">01</span>
                <button className="rounded-full px-2 py-1 font-semibold border border-gray-200 bg-white text-gray-900 dark:bg-background dark:border-border dark:text-white">
                  +
                </button>
              </div>
            </div>
            <ShopSort options={shopData.sortOptions} onSortChange={setSortBy} />
          </div>
          <div className="flex flex-row flex-wrap gap-4 items-center  justify-between mb-6  w-full">
            <ShopFilters
              filters={shopData.filters}
              // filters={[colorsData.map((color) => color.name)]}
              onFilterChange={setFilters}
            />
          </div>

          {/* <div className="flex justify-between items-center mb-4">
            <ShopSort options={shopData.sortOptions} onSortChange={setSortBy} />
          </div> */}

          {/* 
        
          <div className="flex justify-center items-center p-4">
            <img src="/loader.gif" alt="Loading..." className="w-12 h-12" />
          </div>
        */}

          {loading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.isArray(items) &&
                items.map((product: any) => (
                  <ProductCard
                    key={product.id || product.itemid} // Preferably a unique, stable ID
                    id={product.id}
                    itemid={product.itemid}
                    title={product.displayname ?? product.itemid ?? "No Name"}
                    image={product?.image ?? "/dummy/deal-1.png"}
                    priceRange={
                      Array.isArray(product?.priceRange)
                        ? [
                            product.priceRange[0] ?? 0,
                            product.priceRange[1] ?? 0,
                          ]
                        : [8, 120]
                    }
                    variants={
                      product?.variants ?? [
                        { label: "8.00 € | 1 pcs", value: "1" },
                        { label: "120.00 € | 10 pcs", value: "10" },
                      ]
                    }
                    inStock={(product?.stockunit ?? 0) > 0}
                  />
                ))}
            </div>
          )}

          <div className="mt-20 mb-20">
            <Pagination
              currentPage={page}
              totalPages={
                totalPages ? Math.ceil(totalPages / PRODUCTS_PER_PAGE) : 1 // fallback to at least one page
              }
              // totalPages={Math.ceil(totalPages / PRODUCTS_PER_PAGE)}
              onPageChange={setPage}
            />
          </div>
        </div>

        {/* <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(sorted.length / PRODUCTS_PER_PAGE)}
          onPageChange={setCurrentPage}
        /> */}
      </div>
    </div>
  );
};

export default ShopPage;
