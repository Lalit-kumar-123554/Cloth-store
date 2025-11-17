import React from "react";

export default function FooterSection() {
  return (
    <footer className="bg-gray-50 text-gray-800 py-16 px-6 md:px-12 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12 md:gap-0 max-w-6xl mx-auto">
        {/* Left Side */}
        <div className="flex flex-col md:flex-row gap-16 text-sm text-gray-500">
          <div>
            <h4 className="text-gray-400 uppercase text-xs mb-3 tracking-wide">
              Info
            </h4>
            <ul className="space-y-1">
              <li className="hover:text-black cursor-pointer">Pricing</li>
              <li className="hover:text-black cursor-pointer">About</li>
              <li className="hover:text-black cursor-pointer">Contacts</li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-400 uppercase text-xs mb-3 tracking-wide">
              Languages
            </h4>
            <ul className="space-y-1">
              <li className="hover:text-black cursor-pointer">ENG</li>
              <li className="hover:text-black cursor-pointer">ESP</li>
              <li className="hover:text-black cursor-pointer">SVE</li>
            </ul>
          </div>
        </div>

        {/* Center Section */}
        <div className="text-center md:text-left flex flex-col items-center md:items-start">
          <h4 className="text-gray-400 uppercase text-xs mb-2 tracking-wide">
            Technologies
          </h4>
          <h2 className="text-6xl md:text-7xl font-extrabold leading-tight text-black">
            XIV <br /> QR
          </h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Near-field communication
          </p>
        </div>

        {/* Empty Right Side for balance */}
        <div className="hidden md:block w-[150px]" />
      </div>

      {/* Bottom Bar */}
      <div className="flex justify-between items-center text-xs text-gray-400 mt-16 border-t border-gray-200 pt-4">
        <p>© 2024 — copyright</p>
        <p className="hover:text-black cursor-pointer">privacy</p>
      </div>
    </footer>
  );
}
