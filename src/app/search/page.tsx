'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const filters = [
  { id: 'all', label: 'All time' },
  { id: 'today', label: 'Today' },
  { id: 'week', label: 'This week' },
  { id: 'popular', label: 'Popular' },
  { id: 'newest', label: 'Newest' },
  { id: 'inspirational', label: 'Inspirational' },
  { id: 'trending', label: 'Trending' },
];

const categories = [
  { id: 'ui-design', label: 'UI Design' },
  { id: 'logo-design', label: 'Logo Design' },
  { id: 'illustration', label: 'Illustration' },
  { id: 'typography', label: 'Typography' },
  { id: 'photography', label: 'Photography' },
  { id: 'web-design', label: 'Web Design' },
  { id: 'packaging-design', label: 'Packaging Design' },
  { id: 'branding', label: 'Branding' },
];

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['all']);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementasi logika pencarian
    console.log('Searching for:', searchQuery);
  };

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => {
      if (filterId === 'all') {
        return ['all'];
      }
      const newFilters = prev.filter(f => f !== 'all');
      if (prev.includes(filterId)) {
        return newFilters.filter(f => f !== filterId);
      }
      return [...newFilters, filterId];
    });
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(c => c !== categoryId);
      }
      return [...prev, categoryId];
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Image
                src="/Untitled-1.png"
                alt="InspiraHub"
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
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSearch} className="relative mb-8">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for anything"
            className="w-full pl-12 pr-4 py-3 rounded-lg bg-white border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>

        {/* Filters */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <div className="flex flex-wrap gap-2">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => toggleFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedFilters.includes(filter.id)
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedCategories.includes(category.id)
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 