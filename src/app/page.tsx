'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden">
      {/* Background curve */}
      <div className="absolute bottom-0 w-full">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-[320px]"
          preserveAspectRatio="none"
        >
          <path
            fill="#94A3B8"
            fillOpacity="1"
            d="M0,96L1440,192L1440,320L0,320Z"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 pt-8 relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <Image
            src="/Untitled-1.png"
            alt="InspiraHub Logo"
            width={180}
            height={180}
            className="object-contain"
            priority
          />
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-16">
            Selamat Datang di Website InspiraHub
          </h1>

          <div className="space-y-4">
            {/* Login Button */}
            <Link 
              href="/signin"
              className="block w-full bg-[#EEF2FF] text-gray-800 font-semibold py-4 px-6 rounded-lg text-xl hover:bg-[#E0E7FF] transition-colors"
            >
              Login
            </Link>

            {/* Sign Up Button */}
            <Link
              href="/signup"
              className="block w-full bg-white border-2 border-gray-200 text-gray-800 font-semibold py-4 px-6 rounded-lg text-xl hover:bg-gray-50 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
