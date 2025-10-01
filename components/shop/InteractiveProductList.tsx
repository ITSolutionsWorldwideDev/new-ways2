// components/shop/InteractiveProductList.tsx
"use client";

import React, { useState } from "react";
import ProductCard from "./ProductCard";
import Loading from "../ui/Loading";
import { useCartStore } from "@/store/useCartStore";

import { useRouter, useSearchParams } from "next/navigation";
import ShopFilters from "./ShopFilters";
import ShopSort from "@/components/shop/ShopSort";
import { shopData } from "@/lib/shopData";
import Pagination from "@/components/shop/Pagination";

interface Product {
  id: string;
  title: string;
  displayname?: string;
  image?: string;
  itemid: string;
  inStock: boolean;
  selCheckbox: boolean;
  priceRange: number;
  price?: number;
  color?: string;
  size?: string;
  brand?: string;
  stockunit?: number;
  variants?: { label: string; value: string }[];
}

interface Props {
  items: Product[];
  totalResults: number;
  productsPerPage: number;
}

const InteractiveProductList: React.FC<Props> = ({
  items,
  totalResults,
  productsPerPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
    {}
  );

  const page = Number(searchParams.get("page") ?? "1");
  const [bulkQuantity, setBulkQuantity] = useState(1);


  const handleIncrement = () => {
    setBulkQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setBulkQuantity((prev) => (prev > 1 ? prev - 1 : 1));
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

  function updateQuery(params: Record<string, string | number | undefined>) {
    const currentParams = new URLSearchParams(window.location.search);  

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === "") {
        currentParams.delete(key);
      } else {
        currentParams.set(key, String(value));
      }
    });

    router.push(`?${currentParams.toString()}`);
  }

  const handleSortChange = (value: string) => {
    updateQuery({ sort: value, page: 1 });
  };

  const handlePageChange = (newPage: number) => {
    updateQuery({ page: newPage });
  };

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

  /* if (!items || items.length === 0) {
    return <p>No products found.</p>;
  } */

  return (
    <>

      <div className="container mx-auto flex flex-col items-center gap-6 py-8">
        <div className="w-full max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="text-sm text-muted-foreground">
              {productsPerPage} items out of {totalResults}
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
              onSortChange={(e) => handleSortChange(e)}
            />
          </div>

          <div className="flex flex-row flex-wrap gap-4 items-center  justify-between mb-6  w-full">
            <ShopFilters
              filters={shopData.filters}
              onFilterChange={(newFilters) => {
                // Convert to URL params
                const urlFilters: Record<string, string | number | undefined> =
                  {};

                for (const [key, value] of Object.entries(newFilters)) {
                  if (value !== "" && value !== undefined && value !== null) {
                    urlFilters[key] = value;
                  } else {
                    urlFilters[key] = undefined;
                  }
                }

                urlFilters.page = 1;
                updateQuery(urlFilters);
              }}
            />
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((product) => (
              <ProductCard
                key={product.id || product.itemid}
                id={product.id}
                itemid={product.itemid}
                title={product.displayname ?? product.itemid ?? "No Name"}
                image={product?.image ?? "/dummy/img-product.png"}
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

          <div className="mt-20 mb-20">
            <Pagination
              currentPage={page}
              totalPages={
                totalResults ? Math.ceil(totalResults / productsPerPage) : 1
              }
              onPageChange={(selpage)=>{handlePageChange(selpage)}}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InteractiveProductList;
