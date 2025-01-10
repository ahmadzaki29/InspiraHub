'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { useAuthContext } from "@/context/AuthContext";
import { getUserProfile, updateProfileField, type UserProfile } from '@/firebase/profile';

export default function SettingsPage() {
  const router = useRouter();
  const { user } = useAuthContext() as { user: any };
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }

    async function loadProfile() {
      const { data, error } = await getUserProfile(user.uid);
      if (error) {
        console.error('Error loading profile:', error);
        return;
      }
      setProfile(data);
      setLoading(false);
    }

    loadProfile();
  }, [user, router]);

  const handleToggle = async (field: keyof UserProfile, value: boolean) => {
    if (!user || !profile) return;

    try {
      await updateProfileField(user.uid, field, value);
      setProfile(prev => prev ? { ...prev, [field]: value } : null);
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
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
          <h1 className="text-2xl font-semibold">Settings</h1>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">?</button>
      </div>

      {/* Profile Section */}
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Image
            src={profile.profileImage || "/profile/default-avatar.jpg"}
            alt="Profile"
            width={80}
            height={80}
            className="rounded-full"
          />
          <div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Online</span>
            </div>
          </div>
        </div>

        {/* About Me Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">About Me</h3>
          <div className="space-y-4">
            <Link 
              href="/settings/edit?field=username" 
              className="bg-white p-4 rounded-lg flex items-center justify-between"
            >
              <div>
                <div className="text-lg">{profile.username || "@username"}</div>
                <div className="text-gray-500">Username</div>
              </div>
              <ChevronRightIcon className="w-6 h-6 text-gray-400" />
            </Link>

            <Link 
              href="/settings/edit?field=email" 
              className="bg-white p-4 rounded-lg flex items-center justify-between"
            >
              <div>
                <div className="text-lg">{profile.email || "Add email"}</div>
                <div className="text-gray-500">E-mail Address</div>
              </div>
              <ChevronRightIcon className="w-6 h-6 text-gray-400" />
            </Link>

            <Link 
              href="/settings/edit?field=phoneNumber" 
              className="bg-white p-4 rounded-lg flex items-center justify-between"
            >
              <div>
                <div className="text-lg">{profile.phoneNumber || "Add phone number"}</div>
                <div className="text-gray-500">Phone Number</div>
              </div>
              <ChevronRightIcon className="w-6 h-6 text-gray-400" />
            </Link>

            <Link 
              href="/settings/edit?field=address" 
              className="bg-white p-4 rounded-lg flex items-center justify-between"
            >
              <div>
                <div className="text-lg">{profile.address || "Add address"}</div>
                <div className="text-gray-500">Address</div>
              </div>
              <ChevronRightIcon className="w-6 h-6 text-gray-400" />
            </Link>
          </div>
        </div>

        {/* General Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">General</h3>
          <div className="space-y-4">
            <Link 
              href="/settings/edit?field=language" 
              className="bg-white p-4 rounded-lg flex items-center justify-between"
            >
              <div>
                <div className="text-lg">{profile.language}</div>
                <div className="text-gray-500">Language</div>
              </div>
              <ChevronRightIcon className="w-6 h-6 text-gray-400" />
            </Link>

            <div className="bg-white p-4 rounded-lg flex items-center justify-between">
              <div>
                <div className="text-lg">Silent Mode</div>
                <div className="text-gray-500">Notifications & Message</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={profile.silentMode}
                  onChange={(e) => handleToggle('silentMode', e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
              </label>
            </div>

            <div className="bg-white p-4 rounded-lg flex items-center justify-between">
              <div>
                <div className="text-lg">Dark Mode</div>
                <div className="text-gray-500">Theme</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={profile.darkMode}
                  onChange={(e) => handleToggle('darkMode', e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>

            <Link 
              href="/settings/edit?field=devicePermissions" 
              className="bg-white p-4 rounded-lg flex items-center justify-between"
            >
              <div>
                <div className="text-lg">Camera, Location, & Microphone</div>
                <div className="text-gray-500">Device Permissions</div>
              </div>
              <ChevronRightIcon className="w-6 h-6 text-gray-400" />
            </Link>

            <Link 
              href="/settings/edit?field=dataQuality" 
              className="bg-white p-4 rounded-lg flex items-center justify-between"
            >
              <div>
                <div className="text-lg">{profile.dataQuality}</div>
                <div className="text-gray-500">Mobile Data Settings</div>
              </div>
              <ChevronRightIcon className="w-6 h-6 text-gray-400" />
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-between">
          <button 
            onClick={() => router.push('/')} 
            className="flex items-center gap-2 text-gray-600"
          >
            <span>←</span>
            <span>Sign Out</span>
          </button>
          <Link href="/privacy-policy" className="text-gray-600">
            Privacy & Policy
          </Link>
        </div>
      </div>
    </div>
  );
} 