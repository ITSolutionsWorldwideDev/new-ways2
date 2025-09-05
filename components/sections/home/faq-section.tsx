import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQSection = () => {
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
    <section className="py-16 bg-black ">
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-12">
        {/* FAQ Accordion */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-8">FAQ</h2>
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
                  <AccordionContent className="text-gray-300 px-0 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        {/* Contact Form */}
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-4 ">
            Questions or comments? Get in touch and we'll be happy to help.
          </h3>
          <form className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Name"
                className="flex-1 rounded-md bg-black border border-white/20 px-4 py-2 text-white placeholder-gray-400 focus:outline-none"
                required
              />
              <input
                type="email"
                placeholder="Email *"
                className="flex-1 rounded-md bg-black border border-white/20 px-4 py-2 text-white placeholder-gray-400 focus:outline-none"
                required
              />
            </div>
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full rounded-md bg-black border border-white/20 px-4 py-2 text-white placeholder-gray-400 focus:outline-none"
            />
            <textarea
              placeholder="Comment"
              className="w-full rounded-md bg-black border border-white/20 px-4 py-2 text-white placeholder-gray-400 focus:outline-none min-h-[100px]"
              required
            />
            <button
              type="submit"
              className="w-full md:w-40 bg-[#F3E850] text-black font-semibold rounded-full py-2 mt-2 hover:bg-[#e8fc56] transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
