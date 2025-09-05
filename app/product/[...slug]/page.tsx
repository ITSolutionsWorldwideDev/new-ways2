"use client";

import { useCartStore } from "@/store/useCartStore";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import BreadcrumbProduct from "@/components/product/BreadcrumbProduct";
import ProductDetail from "@/components/product/ProductDetail";
import { Product } from "@/types/product.types";
import Loading from "@/components/ui/Loading";

interface ProductCardProps {
  id: string;
  itemid: string;
  title: string;
  image?: string;
  priceRange?: [number, number];
  variants?: { label: string; value: string }[];
  inStock?: boolean;
}

const ProductPage = ({ params }: { params: Promise<{ slug: string[] }> }) => {
  const { slug } = use(params); // unwrap params
  const [itemid] = slug;
  const [product, setProduct] = useState<any>(null);
  // const addItem = useCartStore((state) => state.addItem);
  const [loading, setLoading] = useState(false);

  const [quantity, setQuantity] = useState<number>(1);
    const [addedToCart, setAddedToCart] = useState<boolean>(false);
  
    const addToCart = useCartStore((state) => state.addToCart);
  
    const increaseQty = () => {
      setQuantity((prev) => prev + 1);
    };
  
    const decreaseQty = () => {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    };
  
    /* const handleAddToCart = () => {
      addToCart({
        id,
        itemid,
        title,
        image,
        priceRange,
        quantity,
      });
      setAddedToCart(true);
    }; */

  const fetchItems = async (id: any) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/items?id=${itemid}`);
      const data = await res.json();

      setProduct(data);
    } catch (err) {
      console.error("Failed to fetch items:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(itemid);
  }, [itemid]);

  if (!product)
    return (
      <Loading />
    );

  return (
    <div>
      <main className="min-h-screen">
        {/* <div className="container mx-auto flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <img
              src={product.image}
              alt={product.displayname}
              className="rounded-xl max-h-[400px] object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold">{product.displayname}</h1>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <p className="text-xl mt-4 font-semibold">${product.stockunit}</p>
              <button
                onClick={() =>
                  addItem({
                    id: String(product.id),
                    name: product.displayname,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                  })
                }
                className="bg-green-600 text-white px-4 py-2 rounded mt-6"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div> */}

        <div className="container mx-auto flex flex-col gap-6">
          <div className="flex items-center">
            <div className="max-w-frame mx-auto px-4 xl:px-0">
              <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
              <BreadcrumbProduct title={product?.displayname ?? "product"} />
              <section className="mb-11">
                <ProductDetail data={product} />
              </section>
              {/* <Tabs /> */}
            </div>
            {/* <div className="mb-[50px] sm:mb-20">
          <ProductListSec
            title="You might also like"
            data={relatedProductData}
          />
        </div> */}
          </div>
        </div>
      </main>
    </div>
  );

  //   return <div>Product ID: {id}</div>;
};

export default ProductPage;
