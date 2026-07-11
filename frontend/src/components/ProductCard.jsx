import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Img from "./Img";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group relative block overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-3 hover:border-amber-500 hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)]"
    >
      {/* Premium Top Accent */}
      <div className="absolute left-0 top-0 z-20 h-1 w-0 bg-amber-500 transition-all duration-500 group-hover:w-full" />

      {/* Image */}
      <div className="relative overflow-hidden">
        <Img
          src={product.image}
          alt={product.name}
          className="h-64 lg:h-[230px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Product Code */}
        <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 backdrop-blur">
          <span className="font-mono text-xs font-semibold tracking-[0.25em] text-slate-700">
            {product.code}
          </span>
        </div>

        {/* Product Name */}
        <div className="absolute bottom-5 left-6 right-6">
          <h3 className="text-2xl lg:text-[22px] font-bold text-white">
            {product.name}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">

        <p className="leading-7 text-slate-600 line-clamp-3 lg:text-[16px]">
          {product.short}
        </p>

        {/* Divider */}
        <div className="my-6 h-px bg-slate-200" />

        {/* Footer */}
        <div className="flex items-center justify-between">

          <span className="font-semibold lg:text-[15px] text-amber-600 transition-colors group-hover:text-amber-700">
            View Details
          </span>

          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 transition-all duration-300 group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:text-white">
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </div>

        </div>

      </div>

      {/* Corner Decoration */}
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-amber-500/10 blur-3xl transition-all duration-500 group-hover:scale-150" />
    </Link>
  );
}