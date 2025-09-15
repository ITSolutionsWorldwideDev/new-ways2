export type Discount = {
  amount: number;
  percentage: number;
};

/* export type Product = {
  id: number;
  itemid: string;
  displayname: string;
  purchasedescription: string;  
  srcUrl: string;
  gallery?: string[];
  price: number;
  discount: Discount;
  rating: number;
}; */

export type Product = {
  id: number;
  itemid: string;
  displayname: string;
  description: string;
  purchasedescription: string;
  srcUrl: string;
  gallery?: string[];
  price: number;
  discount: {
    type: "percentage" | "fixed";
    value: number;
  };
  rating: number;
};
