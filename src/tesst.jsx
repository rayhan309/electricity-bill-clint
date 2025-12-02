import { useState, useEffect, useRef } from "react";

// ImageCarousel.jsx
// Single-file React component (TailwindCSS classes) that implements
// a simple, accessible image slider/carousel with autoplay, manual
// controls, indicators, keyboard navigation and swipe support.

// Usage: import ImageCarousel from './ImageCarousel.jsx' and put <ImageCarousel />

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1400&q=80",
    title: "Power Outage Notice",
    message:
      "Scheduled maintenance tonight 11:00 PM - 1:00 AM. Please unplug sensitive devices.",
    date: "2025-11-30",
    location: "Dhaka, Bangladesh",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=80",
    title: "Meter Reading Reminder",
    message:
      "Please submit your meter reading before 5th December to avoid estimated bills.",
    date: "2025-12-01",
    location: "Chittagong, Bangladesh",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1518552789287-0e9c1f1f4a09?auto=format&fit=crop&w=1400&q=80",
    title: "New Prepaid Plan",
    message:
      "Try our new prepaid plan: 150 kWh for only 850 BDT — valid for 30 days.",
    date: "2025-12-02",
    location: "Sylhet, Bangladesh",
  },
];

export default function Banner({ autoplay = true, interval = 5000 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goTo = (i) => {
    setIndex((i + slides.length) % slides.length);
  };
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  useEffect(() => {
    // autoplay
    if (!autoplay || paused) return undefined;
    timeoutRef.current = setTimeout(() => {
      next();
    }, interval);
    return () => clearTimeout(timeoutRef.current);
  }, [index, autoplay, paused, interval, next]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, next, prev]);

  // Simple swipe handlers for mobile
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) > 50) {
      if (delta > 0) next();
      else prev();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <div
      className="mt-24 w-11/12 mx-auto relative select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
    >
      {/* Slides container */}
      <div className="overflow-hidden rounded-2xl shadow-lg">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s) => (
            <figure
              key={s.id}
              className="min-w-full relative h-64 sm:h-[400px] md:h-[500px] lg:h-[600px] bg-gray-100"
            >
              <img
                src={s.image}
                alt={`${s.title} — ${s.message}`}
                className="object-cover w-full h-full"
                draggable={false}
              />

              {/* Overlay */}
              <figcaption className="absolute left-4 bottom-4 right-4 bg-gradient-to-t from-black/60 via-black/30 to-transparent rounded-md p-4 text-white">
                <h3 className="text-lg sm:text-2xl font-semibold">{s.title}</h3>
                <p className="text-sm sm:text-base mt-1">{s.message}</p>
                <div className="mt-2 text-xs opacity-80 flex gap-3">
                  <span>{s.date}</span>
                  <span>•</span>
                  <span>{s.location}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Left / Right Controls */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white px-2 py-1 rounded-md shadow-md focus:outline-none"
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white px-2 py-1 rounded-md shadow-md focus:outline-none"
      >
        ›
      </button>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-3">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-10 h-2 rounded-full transition-all duration-300 focus:outline-none ${
              i === index ? "bg-blue-600 w-12" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Optional captions list for screen readers */}
      <div className="sr-only" aria-live="polite">
        {`Slide ${index + 1} of ${slides.length}: ${slides[index].title} — ${
          slides[index].message
        }`}
      </div>
    </div>
  );
}


        //  <button
        //     onClick={() => window.print()}
        //     className="px-6 py-2 rounded-full bg-gradient-to-r
        //     from-fuchsia-500 to-pink-600 text-white shadow-lg hover:scale-105 transition-all"
        //   >
        //     Print
        //   </button>

        //   <button
        //     onClick={handleDownloadPDF}
        //     className="px-6 py-2 rounded-full bg-gradient-to-r
        //     from-emerald-500 to-teal-500 text-white shadow-lg hover:scale-105 transition-all"
        //   >
        //     Download PDF
        //   </button>