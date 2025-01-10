'use client'
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthContext } from "@/context/AuthContext";
import { getUserProfile, updateProfileField, type UserProfile } from '@/firebase/profile';

type FieldConfig = {
  label: string;
  type: string;
  placeholder: string;
  validation?: (value: string) => string | null;
};

const fieldConfigs: Record<string, FieldConfig> = {
  username: {
    label: 'Username',
    type: 'text',
    placeholder: '@username',
    validation: (value) => {
      if (value.length < 3) return 'Username minimal 3 karakter';
      if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username hanya boleh mengandung huruf, angka, dan underscore';
      return null;
    }
  },
  email: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'email@example.com',
    validation: (value) => {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email tidak valid';
      return null;
    }
  },
  phoneNumber: {
    label: 'Phone Number',
    type: 'tel',
    placeholder: '08xxxxxxxxxx',
    validation: (value) => {
      if (!/^[0-9]{10,13}$/.test(value)) return 'Nomor telepon tidak valid (10-13 digit)';
      return null;
    }
  },
  address: {
    label: 'Address',
    type: 'text',
    placeholder: 'Masukkan alamat lengkap'
  },
  language: {
    label: 'Language',
    type: 'select',
    placeholder: 'Select language'
  }
};

export default function EditProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuthContext() as { user: any };
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState('');
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const field = searchParams.get('field') as keyof UserProfile;
  const config = fieldConfigs[field];

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }

    if (!field || !config) {
      router.push('/settings');
      return;
    }

    async function loadProfile() {
      const { data, error } = await getUserProfile(user.uid);
      if (error) {
        setError('Error loading profile');
        return;
      }
      setProfile(data);
      const fieldValue = data?.[field];
      setValue(typeof fieldValue === 'string' ? fieldValue : '');
      setLoading(false);
    }

    loadProfile();
  }, [user, router, field, config]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !field) return;

    // Validasi input
    if (config.validation) {
      const validationError = config.validation(value);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    setSaving(true);
    setError(null);

    try {
      await updateProfileField(user.uid, field, value);
      router.push('/settings');
    } catch (err) {
      setError('Gagal menyimpan perubahan');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-500">Invalid field</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            ←
          </button>
          <h1 className="text-2xl font-semibold">Edit {config.label}</h1>
        </div>
        <button 
          onClick={handleSubmit}
          disabled={saving}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>

      {/* Form */}
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {config.label}
            </label>
            {config.type === 'select' ? (
              <select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="English">English</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Spanish">Spanish</option>
              </select>
            ) : (
              <input
                type={config.type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={config.placeholder}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          </div>

          {field === 'phoneNumber' && (
            <div className="text-sm text-gray-500">
              • Gunakan format: 08xxxxxxxxxx<br />
              • Hanya masukkan angka (10-13 digit)<br />
              • Contoh: 081234567890
            </div>
          )}

          {field === 'username' && (
            <div className="text-sm text-gray-500">
              • Minimal 3 karakter<br />
              • Hanya boleh menggunakan huruf, angka, dan underscore (_)<br />
              • Contoh: john_doe123
            </div>
          )}
        </form>
      </div>
    </div>
  );
} 