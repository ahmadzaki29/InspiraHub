'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Definisi kategori dengan gambar yang sesuai
const categories = [
  { id: 'art', name: 'Art', image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80', width: 300, height: 200 },
  { id: 'design', name: 'Design', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80', width: 300, height: 200 },
  { id: 'music', name: 'Music', image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80', width: 300, height: 200 },
  { id: 'photography', name: 'Photography', image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80', width: 300, height: 200 },
  { id: 'fashion', name: 'Fashion', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80', width: 300, height: 200 },
  { id: 'food-drink', name: 'Food & Drink', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80', width: 300, height: 200 },
  { id: 'travel', name: 'Travel', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80', width: 300, height: 200 },
  { id: 'diy-crafts', name: 'DIY & Crafts', image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80', width: 300, height: 200 },
  { id: 'beauty', name: 'Beauty', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80', width: 300, height: 200 },
  { id: 'fitness', name: 'Fitness', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80', width: 300, height: 200 },
  { id: 'home-decor', name: 'Home Decor', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80', width: 300, height: 200 },
  { id: 'illustration', name: 'Illustration', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80', width: 300, height: 200 }
];

// Konten terbaru dengan gambar yang sesuai
const latestContent = [
  { id: 1, image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80', title: 'Speed and Motion', width: 300, height: 200 },
  { id: 2, image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80', title: 'Modern Interior', width: 300, height: 200 },
  { id: 3, image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80', title: 'Concert Crowd', width: 300, height: 200 },
  { id: 4, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80', title: 'Healthy Food', width: 300, height: 200 },
  { id: 5, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80', title: 'Minimalist Design', width: 300, height: 200 },
  { id: 6, image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80', title: 'Pottery Art', width: 300, height: 200 },
  { id: 7, image: 'https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80', title: 'Beauty Portrait', width: 300, height: 200 }
];

export default function DashboardPage() {
  const { user } = useAuthContext() as { user: any };
  const router = useRouter();

  useEffect(() => {
    if (user == null) {
      router.push("/");
    }
  }, [user, router]);

  const handleProfileClick = () => {
    router.push('/settings');
  };

  if (user == null) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/Untitled-1.png"
              alt="Logo"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => router.push('/search')}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2">🔔</button>
            <button className="p-2">📱</button>
            <button 
              onClick={() => router.push('/projects')}
              className="p-2"
            >
              ➕
            </button>
            <button
              onClick={handleProfileClick}
              className="w-8 h-8 rounded-full bg-gray-300 hover:ring-2 hover:ring-blue-500 transition-all cursor-pointer"
            >
              <Image
                src="/profile-image.jpg"
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-[400px] bg-blue-100 mb-12">
        <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
          <h1 className="text-5xl font-bold mb-4">Let's get inspired.</h1>
          <p className="text-xl text-gray-700 max-w-2xl">
            Join the hub and find inspiration for your next creation. Explore new ideas, trends, and discover the best in design, music, art and more.
          </p>
        </div>
        <Image
          src="/hero/inspiration.jpg"
          alt="Hero Image"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-2xl font-bold mb-8">Explore by category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link 
              href={`/category/${category.id}`} 
              key={category.id}
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <Image
                src={category.image}
                alt={category.name}
                width={category.width}
                height={category.height}
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute bottom-2 left-2">
                <span className="text-white font-medium">{category.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Latest Content Section */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-2xl font-bold mb-8">Latest from the hub</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {latestContent.map((item) => (
            <Link 
              href={`/content/${item.id}`} 
              key={item.id}
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={item.width}
                height={item.height}
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-2 left-2">
                <span className="text-white font-medium">{item.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 