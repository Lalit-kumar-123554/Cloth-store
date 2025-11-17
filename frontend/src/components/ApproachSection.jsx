import React from "react";

export default function ApproachSection() {
  const images = [
    "/products/10.webp",
    "/products/11.webp",
    "/products/12.webp",
    "/products/14.webp",
  ];

  return (
    <section className="bg-gray-50 px-6 md:px-12 py-16">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide mb-4">
          Our Approach to Fashion Design
        </h2>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          At Elegant Vogue, we blend creativity with craftsmanship to create
          fashion that transcends trends and stands the test of time.
        </p>
      </div>

      {/* Images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {images.map((src, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
          >
            <img
              src={src}
              alt={`fashion ${index + 1}`}
              className="w-[220px] sm:w-[250px] md:w-[280px] h-[320px] object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
