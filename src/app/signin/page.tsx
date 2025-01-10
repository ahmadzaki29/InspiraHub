'use client'
import React from 'react';
import signIn from "@/firebase/auth/signIn";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';

function Page(): React.ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { result, error } = await signIn(email, password);

      if (error) {
        console.error('Error saat login:', error);
        setError('Login gagal. Silakan periksa email dan password Anda.');
        return;
      }

      console.log('Login berhasil:', result);

      try {
        await router.push('/admin');
      } catch (routerError) {
        console.error('Error saat redirect:', routerError);
        setError('Gagal mengalihkan ke halaman admin.');
      }
    } catch (e) {
      console.error('Error tidak terduga:', e);
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  }

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
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            Sign In
          </h1>

          <form onSubmit={handleForm} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                name="email"
                id="email"
                placeholder="example@mail.com"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#4338CA] text-white font-semibold py-3 px-6 rounded-lg text-lg hover:bg-[#3730A3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Sedang Masuk...' : 'Sign In'}
            </button>

            <div className="text-center mt-4">
              <Link
                href="/signup"
                className="text-[#4338CA] hover:text-[#3730A3] font-medium"
              >
                Belum punya akun? Daftar di sini
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
