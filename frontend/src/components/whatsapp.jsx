import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const phone = "+919673380640"; 

  const message = encodeURIComponent(`Hello Finekot Industries India Pvt. Ltd.,

I visited your website and I'm interested in your products.

Could you please provide more information regarding:
• Product Catalog
• Pricing
• Availability
• Delivery Timeline

Looking forward to your response.

Thank you.`);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <div className="hidden md:block rounded-xl border border-gray-200 bg-white px-4 py-2 shadow-xl animate-bounce">
        <p className="text-sm font-semibold text-gray-800">
          Need Help?
        </p>
        <p className="text-xs text-gray-500">
          Chat with us on WhatsApp
        </p>
      </div>

      <a
        href={`https://wa.me/${phone}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative"
      >
        <span className="absolute -top-2 -right-2 flex min-h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-red-600 px-1 text-[10px] font-bold leading-none text-white">
          10
        </span>

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] shadow-[0_0_30px_rgba(37,211,102,0.5)] transition hover:scale-90">
          <FaWhatsapp className="text-4xl text-white" />
        </div>
      </a>
    </div>
  );
}