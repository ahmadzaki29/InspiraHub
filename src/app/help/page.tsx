'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface AccordionItemProps {
  title: string;
  subtitle?: string;
  isOpen: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  subtitle,
  isOpen,
  onToggle,
  children
}) => {
  return (
    <div className="bg-gray-200 rounded-lg mb-4">
      <button
        className="w-full text-left p-4 flex items-center justify-between"
        onClick={onToggle}
      >
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
        <ChevronDownIcon 
          className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="p-4 pt-0">
          {children}
        </div>
      )}
    </div>
  );
};

export default function HelpPage() {
  const router = useRouter();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

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
              className="w-30 h-30 object-contain"
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
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-2">Pusat Bantuan</h1>
        <p className="text-gray-600 mb-8">Bagaimana kami dapat membantu Anda hari ini?</p>

        {/* Accordion Menu */}
        <div className="space-y-4">
          <AccordionItem
            title="Pusat Bantuan"
            subtitle="Bagaimana kami dapat membantu Anda hari ini?"
            isOpen={openSection === 'bantuan'}
            onToggle={() => toggleSection('bantuan')}
          >
            <div className="space-y-4">
              <p>Kami siap membantu Anda dengan berbagai pertanyaan dan masalah yang mungkin Anda hadapi.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Panduan penggunaan platform</li>
                <li>Masalah teknis</li>
                <li>Pertanyaan umum</li>
                <li>Saran dan masukan</li>
              </ul>
            </div>
          </AccordionItem>

          <AccordionItem
            title="Pengaduan"
            subtitle="Pelaporan terkait masalah tenaga kerja"
            isOpen={openSection === 'pengaduan'}
            onToggle={() => toggleSection('pengaduan')}
          >
            <div className="space-y-4">
              <p>Jika Anda mengalami masalah terkait tenaga kerja, silakan laporkan melalui form pengaduan kami.</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Buat Pengaduan
              </button>
            </div>
          </AccordionItem>

          <AccordionItem
            title="FAQ"
            subtitle="Pelajari lebih lanjut tentang website ini"
            isOpen={openSection === 'faq'}
            onToggle={() => toggleSection('faq')}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Bagaimana cara membuat akun?</h4>
                <p>Klik tombol &quot;Daftar&quot; di halaman utama dan ikuti langkah-langkah yang tersedia.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Bagaimana cara mengunggah video?</h4>
                <p>Masuk ke akun Anda, klik tombol &quot;+&quot; dan pilih video yang ingin diunggah.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Apa saja fitur premium?</h4>
                <p>Fitur premium mencakup akses tak terbatas ke semua konten, tools khusus, dan dukungan prioritas.</p>
              </div>
            </div>
          </AccordionItem>

          <AccordionItem
            title="Kontak"
            subtitle="Hubungi kami untuk bantuan lebih lanjut"
            isOpen={openSection === 'kontak'}
            onToggle={() => toggleSection('kontak')}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>support@inspirahub.com</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+62 123 4567 890</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Jl. Inspirasi No. 123, Jakarta</span>
              </div>
            </div>
          </AccordionItem>
        </div>
      </div>
    </div>
  );
} 