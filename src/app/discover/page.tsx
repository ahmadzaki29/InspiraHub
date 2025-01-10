'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Data konten populer
const popularContent = [
  {
    id: 1,
    title: 'Futuristic Cityscapes',
    views: '5M',
    timeAgo: '1 day ago',
    image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 2,
    title: 'DIY Boho Home Decor',
    views: '3.4M',
    timeAgo: '2 days ago',
    image: 'https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 3,
    title: 'Retro Fashion Lookbook',
    views: '7.2M',
    timeAgo: '3 days ago',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 4,
    title: 'Healthy Meal Prep Guide',
    views: '4.5M',
    timeAgo: '4 days ago',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 5,
    title: 'Surreal Digital Art Showcase',
    views: '6.8M',
    timeAgo: '5 days ago',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
  }
];

export default function DiscoverPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('popular');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r min-h-screen p-4">
        <div className="space-y-4">
          <Link href="/dashboard" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Home</span>
          </Link>
          <Link href="/trending" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span>Trending</span>
          </Link>
          <Link href="/new" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>New</span>
          </Link>
          <Link href="/following" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Following</span>
          </Link>
          <Link href="/favorites" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>My Favorites</span>
          </Link>
          <Link href="/help" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 w-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Pusat Bantuan</span>
          </Link>
        </div>
        <div className="mt-8">
          <button className="w-full bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600">
            Create
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Tabs */}
        <div className="border-b mb-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('popular')}
              className={`pb-4 ${activeTab === 'popular' ? 'border-b-2 border-black font-semibold' : 'text-gray-500'}`}
            >
              Popular
            </button>
            <button
              onClick={() => setActiveTab('recent')}
              className={`pb-4 ${activeTab === 'recent' ? 'border-b-2 border-black font-semibold' : 'text-gray-500'}`}
            >
              Recent
            </button>
            <button
              onClick={() => setActiveTab('recommended')}
              className={`pb-4 ${activeTab === 'recommended' ? 'border-b-2 border-black font-semibold' : 'text-gray-500'}`}
            >
              Recommended
            </button>
          </div>
        </div>

        {/* Popular Content */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Popular Content Ideas</h2>
          <div className="space-y-6">
            {popularContent.map((content) => (
              <div key={content.id} className="flex items-center justify-between bg-white p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-16 relative rounded-lg overflow-hidden">
                    <Image
                      src={content.image}
                      alt={content.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{content.title}</h3>
                    <div className="text-sm text-gray-500">
                      {content.views} views · {content.timeAgo}
                    </div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 