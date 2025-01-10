'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

const features = [
  { name: 'Tanya Jawab dengan Tim (Zoom/GMeet)', free: true, silver: true, gold: false },
  { name: 'Arahan dan Saran Skenario', free: true, silver: true, gold: true },
  { name: 'Pembuatan Skenario oleh Tim', free: true, silver: true, gold: true },
  { name: 'Pengiriman Template Video', free: false, silver: true, gold: false },
  { name: 'Pengiriman Rekaman Awal oleh Konsumen', free: false, silver: true, gold: false },
  { name: 'Editing Video Oleh Tim', free: false, silver: true, gold: true },
  { name: 'Penggunaan Alat Syuting', free: false, silver: false, gold: true },
  { name: 'Menggunakan Aktor Tambahan', free: false, silver: false, gold: true, note: '(Opsional)' },
  { name: 'Dilakukan secara Online', free: true, silver: true, gold: false },
  { name: 'Dilakukan secara Offline', free: false, silver: false, gold: true },
];

export default function AdminPage() {
  const { user } = useAuthContext() as { user: any };
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    if (user == null) {
      router.push("/");
    }
  }, [user, router]);

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
    if (plan === 'free') {
      router.push('/dashboard');
    }
  };

  if (user == null) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8">
          <Image
            src="/Untitled-1.png"
            alt="Logo"
            width={120}
            height={120}
            className="object-contain"
          />
        </div>

        {/* Pricing Table */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="p-4 text-left w-1/4"></th>
                <th className="p-4 text-center">
                  <div className="text-3xl font-bold">$0</div>
                  <div className="text-gray-500">/Month</div>
                  <div className="bg-[#1E293B] text-white py-2 px-4 mt-2 rounded-lg">Free</div>
                  <button
                    onClick={() => handlePlanSelect('free')}
                    className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Pilih Paket
                  </button>
                </th>
                <th className="p-4 text-center">
                  <div className="text-3xl font-bold">$25</div>
                  <div className="text-gray-500">/Month</div>
                  <div className="bg-[#1E293B] text-white py-2 px-4 mt-2 rounded-lg">Silver</div>
                  <button
                    onClick={() => handlePlanSelect('silver')}
                    className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Pilih Paket
                  </button>
                </th>
                <th className="p-4 text-center">
                  <div className="text-3xl font-bold">$40</div>
                  <div className="text-gray-500">/Month</div>
                  <div className="bg-[#1E293B] text-white py-2 px-4 mt-2 rounded-lg">Gold</div>
                  <button
                    onClick={() => handlePlanSelect('gold')}
                    className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Pilih Paket
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={feature.name} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="p-4 border-t">{feature.name}</td>
                  <td className="p-4 text-center border-t">
                    {feature.free ? (
                      <CheckIcon className="w-6 h-6 text-green-500 mx-auto" />
                    ) : (
                      <XMarkIcon className="w-6 h-6 text-red-500 mx-auto" />
                    )}
                  </td>
                  <td className="p-4 text-center border-t">
                    {feature.silver ? (
                      <CheckIcon className="w-6 h-6 text-green-500 mx-auto" />
                    ) : (
                      <XMarkIcon className="w-6 h-6 text-red-500 mx-auto" />
                    )}
                  </td>
                  <td className="p-4 text-center border-t">
                    {feature.gold ? (
                      <div className="flex items-center justify-center">
                        <CheckIcon className="w-6 h-6 text-green-500" />
                        {feature.note && <span className="ml-1 text-sm text-gray-500">{feature.note}</span>}
                      </div>
                    ) : (
                      <XMarkIcon className="w-6 h-6 text-red-500 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
