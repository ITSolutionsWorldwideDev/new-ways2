// /app/faq/page.tsx
"use client";
import ShopBanner from "@/components/shop/ShopBanner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { commonData } from "@/lib/commonData";
import Link from "next/link";

export default function ContactPage() {
  const faqs = [
    {
      question: "What is G-Rollz?",
      answer:
        "G-Rollz is a premium brand offering high-quality rolling papers, cones, and accessories.",
    },
    {
      question: "How can I purchase G-ROLLZ products?",
      answer:
        "You can purchase G-ROLLZ products directly from our website or from authorized retailers.",
    },
    {
      question: "What is the shipping policy?",
      answer:
        "At G-ROLLZ, we offer free shipping to the USA for all orders above $150. Your order will typically arrive within 3-5 business days, depending on your location. Once shipped, a tracking number will be sent to your email so you can monitor your delivery.",
    },
    {
      question: "Who can I contact for further questions?",
      answer:
        "For any further questions, please contact our support team via the contact form or email.",
    },
  ];

  return (
    <>
      <ShopBanner {...commonData.faqbanner} />
      <div className="container mx-auto py-12 flex flex-col items-center">
        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-12">
          <div className="flex-1 flex items-start justify-center">
            <div className="rounded-lg p-8 w-full bg-gradient-to-br from-white to-[#FFF700] dark:from-black dark:to-[#FFF700]">
              <h3 className="text-xl font-bold mb-4 dark:text-white">
                Contact Us
              </h3>
              <p className="mb-6 text-base dark:text-white">
                If you have an issue or question that requires immediate
                assistance, you can click the button below to chat with a
                Customer Service representative.
                <br />
                <br />A refund will be issued to your original payment method
                within 10 business days.
              </p>
              <Link href={`/contact`}>
              <button className="w-full bg-black text-white py-2 rounded-full font-semibold mb-2">
                Contact us
              </button>
              </Link>
              <button className="w-full bg-white text-black py-2 rounded-full font-semibold border border-black dark:bg-black dark:text-white dark:border-white">
                Chat with us
              </button>
            </div>
          </div>
          <div className="flex-1">
            <div className="w-full">
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-white/20"
                >
                  <AccordionTrigger className=" font-medium px-0 py-4 hover:bg-white/5 focus:bg-white/10 rounded-none">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-500 px-0 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
            {/* <div className="border-b border-border">
              <button
                className="w-full text-left py-4 font-semibold text-lg flex justify-between items-center"
                aria-expanded="false"
              >
                What is G-Rollz?<span className="ml-2">+</span>
              </button>
            </div>
            <div className="border-b border-border">
              <button
                className="w-full text-left py-4 font-semibold text-lg flex justify-between items-center"
                aria-expanded="false"
              >
                How can I purchase G-ROLLZ products?
                <span className="ml-2">+</span>
              </button>
            </div>
            <div className="border-b border-border">
              <button
                className="w-full text-left py-4 font-semibold text-lg flex justify-between items-center"
                aria-expanded="false"
              >
                What is the shipping policy?<span className="ml-2">+</span>
              </button>
            </div>
            <div className="border-b border-border">
              <button
                className="w-full text-left py-4 font-semibold text-lg flex justify-between items-center"
                aria-expanded="false"
              >
                Who can I contact for further questions?
                <span className="ml-2">+</span>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
