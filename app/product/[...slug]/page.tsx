// app/product/[...slug]/page.tsx
import BreadcrumbProduct from "@/components/product/BreadcrumbProduct";
import ProductDetail from "@/components/product/ProductDetail";
import Loading from "@/components/ui/Loading";

async function getProduct(itemid: string) {
  try {
    const res = await fetch(
      `${process.env.DOMAIN_URL}/api/items?id=${itemid}`,
      {
        cache: "no-cache", // or "force-cache" or ISR config
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  // params: { slug: string[] };
  params: { slug: string[] }
}) {
  const [itemid] = params.slug;

  console.log("params is Promise:", typeof (params as any).then === "function");

  const product = await getProduct(itemid);

  // console.log("product :", product);

  if (!product) return <Loading />;

  return (
    <div>
      <main className="min-h-screen">
        <div className="container mx-auto flex flex-col gap-6">
          <div className="flex items-center">
            <div className="w-full mx-auto px-4 xl:px-0">
              <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
              <BreadcrumbProduct title={product?.displayname ?? "product"} />
              <section className="mb-11">
                <ProductDetail data={product} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* 
  import { notFound } from "next/navigation";
  if (!product) return notFound();
  */