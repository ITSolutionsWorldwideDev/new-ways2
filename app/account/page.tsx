import Tabs from "@/components/accounts/tabs";
import ShopBanner from "@/components/shop/ShopBanner";
import { commonData } from "@/lib/commonData";

export default function AccountPage() {
  return (
    <>
      <ShopBanner {...commonData.accountbanner} />
      <div className="container mx-auto py-8 flex gap-8 justify-center items-start">
        <div className="w-full flex flex-col md:flex-row gap-12">
          <div className="flex-1 bg-background rounded-lg p-8 text-foreground">
            <Tabs></Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
