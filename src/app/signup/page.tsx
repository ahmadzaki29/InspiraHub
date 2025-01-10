'use client'
import signUp from "@/firebase/auth/signup";
import { useRouter } from 'next/navigation';
import { useState } from "react";

function Page(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Handle form submission
  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Attempt to sign up with provided email and password
      const { result, error } = await signUp(email, password);

      if (error) {
        setError(typeof error === 'object' && error !== null ? (error as Error).message : 'Terjadi kesalahan saat mendaftar');
        return;
      }

      // Sign up successful
      console.log(result);
      
      // Tampilkan alert sukses
      alert("Pendaftaran berhasil! Silakan login dengan akun Anda.");
      
      // Redirect ke halaman login
      router.push("/signin");
    } catch (err) {
      setError("Terjadi kesalahan saat mendaftar. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Daftar Akun Baru</h1>
          <p className="text-center text-gray-600">Silakan isi form di bawah ini untuk mendaftar</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleForm} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="contoh@email.com"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="Minimal 6 karakter"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Mendaftar...' : 'Daftar'}
          </button>
        </form>

        <div className="text-sm text-center">
          <p className="text-gray-600">
            Sudah punya akun?{' '}
            <button
              onClick={() => router.push('/signin')}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Login di sini
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
