'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Data konten favorit
const favoriteContent = [
  {
    id: 1,
    title: 'Mountain Adventure',
    author: 'John Doe',
    likes: '2.5K',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 2,
    title: 'Urban Photography',
    author: 'Jane Smith',
    likes: '1.8K',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 3,
    title: 'Abstract Art',
    author: 'Mike Johnson',
    likes: '3.2K',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 4,
    title: 'Nature Close-ups',
    author: 'Sarah Wilson',
    likes: '4.1K',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
  }
];

export default function FavoritesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/Untitled-1.png"
              alt="Logo"
              width={120}
              height={120}
              className="object-contain"
            />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/discover" className="text-gray-600 hover:text-gray-900">Discover</Link>
            <Link href="/create" className="text-gray-600 hover:text-gray-900">Create</Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Favorites</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoriteContent.map((item) => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-square">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{item.author}</span>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    {item.likes}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 