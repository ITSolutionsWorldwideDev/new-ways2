// /app/contact/page.tsx
"use client";
import ShopBanner from "@/components/shop/ShopBanner";
import { commonData } from "@/lib/commonData";

export default function ContactPage() {
  return (
    <>
      <ShopBanner {...commonData.contactbanner} />
      <div className="container mx-auto py-12 flex flex-col items-center">
        <div className="w-full flex flex-col md:flex-row gap-12">
          <div className="flex-1 bg-background rounded-lg p-8 border border-border text-foreground">
            <h2 className="text-2xl font-bold mb-6">Contact information</h2>
            <div className="space-y-3 text-lg">
              <div>
                Trade name:{" "}
                <span className="font-semibold">The New Ways BV</span>
              </div>
              <div>
                Phone number:{" "}
                <a href="tel:+31204161841" className="underline">
                  +31 20 4161841
                </a>
              </div>
              <div>
                Email:{" "}
                <a href="mailto:shop@grollz.com" className="underline">
                  shop@grollz.com
                </a>
              </div>
              <div>
                Physical address: The New Ways BV, Gyroscoopweg 2N, 1042 AB
                Amsterdam, Netherlands
              </div>
              <div>VAT number: NL815985963B01</div>
              <div>Trade number: 34234644</div>
            </div>
          </div>
          <div className="flex-1 bg-background rounded-lg p-8 border border-border text-foreground">
            <h2 className="text-xl font-bold mb-6">
              Questions or comments? Get in touch and we'll be happy to help.
            </h2>
            <form className="space-y-4">
              <div className="flex gap-4">
                <input
                  placeholder="Name"
                  className="border border-border rounded px-4 py-2 w-1/2 bg-background text-foreground"
                  type="text"
                />
                <input
                  placeholder="Email *"
                  className="border border-border rounded px-4 py-2 w-1/2 bg-background text-foreground"
                  type="email"
                />
              </div>
              <input
                placeholder="Phone Number"
                className="border border-border rounded px-4 py-2 w-full bg-background text-foreground"
                type="text"
              />
              <textarea
                placeholder="Comment"
                className="border border-border rounded px-4 py-2 w-full bg-background text-foreground"
              ></textarea>
              <button
                type="submit"
                className="bg-foreground text-background px-6 py-2 rounded-full font-semibold w-full md:w-auto"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
