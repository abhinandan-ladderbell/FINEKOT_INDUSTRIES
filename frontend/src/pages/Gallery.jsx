// import { gallery } from "../data/content";
import SectionHeading from "../components/SectionHeading";
import Img from "../components/Img";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Camera,
  ArrowRight,
  X,
  ZoomIn,
} from "lucide-react";

export default function Gallery() {


  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    fetch("/backend/api/gallery.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setGallery(data.gallery);
        }
      })
      .catch((err) => {
        console.error("Gallery load failed:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const SkeletonCard = () => (
    <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
      <div className="h-80 animate-pulse bg-slate-200"></div>

      <div className="space-y-3 p-6">
        <div className="h-6 w-2/3 rounded bg-slate-200 animate-pulse"></div>
        <div className="h-4 w-1/3 rounded bg-slate-200 animate-pulse"></div>
      </div>
    </div>
  );
  return (
    <>
      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1800&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative mx-auto max-w-7xl px-6 py-28">
          <span className="inline-flex items-center gap-2 rounded-full bg-yellow-500/15 border border-yellow-500/30 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-400">
            <Camera size={14} />
            Gallery
          </span>

          <h1 className="mt-6 text-5xl md:text-7xl font-bold text-white leading-tight">
            Inside
            <span className="text-yellow-400"> Finekot</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            Explore our manufacturing facility, production process,
            infrastructure, machinery and completed projects that reflect our
            commitment to quality engineering.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 space-y-20">
          {gallery.map((group) => (
            <div key={group.group}>
              <SectionHeading
                eyebrow="Portfolio"
                title={group.group}
              />

              <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {loading
                  ? Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))
                  : group.items.map((item) => (
                    <div
                      key={item.caption}
                      className="group cursor-pointer overflow-hidden rounded-3xl bg-white shadow-lg transition duration-500 hover:-translate-y-2 hover:shadow-2xl"
                    >
                      <div className="relative overflow-hidden">
                        <Img
                          src={item.image}
                          alt={item.caption}
                          className="h-80 w-full object-cover transition duration-700 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80"></div>

                        <div className="absolute top-5 left-5 rounded-full bg-yellow-500 px-4 py-1 text-xs font-bold uppercase tracking-widest text-black">
                          Finekot
                        </div>

                        <div className="absolute bottom-6 left-6 right-6">
                          <h3 className="text-2xl font-bold text-white">
                            {item.caption}
                          </h3>
                          <div className="mt-3">
                            <button
                              onClick={() => setSelectedImage(item)}
                              className="group/view flex items-center gap-2 text-yellow-400 font-semibold transition-all duration-300 hover:text-yellow-300"
                            >
                              View Image
                              <ArrowRight
                                size={18}
                                className="transition-transform duration-300 group-hover/view:translate-x-2"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-md p-6 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-5 top-5 z-20 rounded-full bg-black/70 p-3 text-white transition hover:bg-red-600"
            >
              <X size={24} />
            </button>

            <div className="grid lg:grid-cols-[70%_30%]">
              <div className="bg-black">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.caption}
                  className="max-h-[85vh] w-full object-contain"
                />
              </div>

              <div className="flex flex-col justify-center p-10">
                <span className="mb-3 inline-flex w-fit rounded-full bg-yellow-500 px-4 py-1 text-xs font-bold uppercase text-black">
                  Finekot
                </span>

                <h2 className="text-4xl font-bold text-slate-900">
                  {selectedImage.caption}
                </h2>

                <p className="mt-5 leading-8 text-slate-600">
                  Explore our manufacturing excellence through this project image.
                  Every photograph showcases our commitment to precision,
                  craftsmanship and quality engineering.
                </p>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}