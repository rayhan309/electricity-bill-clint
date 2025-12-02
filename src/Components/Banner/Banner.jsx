import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Banner() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    axios("http://localhost:3000/slides").then((data) => {
      setSlides(data.data);
    });
  }, []);

  return (
    <div className="pt-24 w-11/12 mx-auto">
      {slides.length > 0 && (
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          autoplay={{ delay: 5000 }}
          loop={slides.length > 1} // loop only if more than 1 slide
          effect="fade"
          navigation
          pagination={{ clickable: true }}
          className="rounded-2xl shadow-lg overflow-hidden"
        >
          {slides.map((s) => (
            <SwiperSlide key={s._id}>
              <div className="relative h-64 sm:h-[400px] md:h-[500px] lg:h-[600px]">
                <img
                  src={s.image}
                  alt={s.title || "Slide image"}
                  className="w-full h-full object-cover"
                />

                {/* Content overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-lg sm:text-2xl font-bold">{s.title}</h3>
                    <p className="text-sm sm:text-base mt-1">{s.message}</p>

                    <div className="mt-3 text-xs opacity-90 flex gap-3">
                      <span>{s.date}</span>
                      <span>•</span>
                      <span>{s.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
