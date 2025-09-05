// /app/product/[id]/page.tsx
import { useCartStore } from "@/store/useCartStore";

// components/ProductDetail.tsx (or page.tsx)
type ProductPageProps = {
  params: {
    id: string; // or number, but Next.js always gives strings
  };
};
const ProductPage = async ({ params }: ProductPageProps) => {
  const product = await fetch(
    `https://fakestoreapi.com/products/${params.id}`
  ).then((res) => res.json());
  // const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="grid grid-cols-2 gap-8 p-8">
      <img src={product.image} alt={product.title} className="rounded-xl" />
      <div>
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-xl mt-4">${product.price}</p>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded mt-4 "
          
        >{/* onClick={() => addItem({ ...product, quantity: 1 })} */}
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
