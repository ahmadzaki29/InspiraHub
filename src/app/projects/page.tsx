'use client'
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthContext } from "@/context/AuthContext";

// Data proyek
const projects = [
  {
    id: 1,
    title: 'Modern Photography',
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Photography',
    status: 'In Progress'
  },
  {
    id: 2,
    title: 'Digital Art Collection',
    image: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Digital Art',
    status: 'Completed'
  },
  {
    id: 3,
    title: 'Creative Design',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    category: 'Design',
    status: 'Planning'
  }
];

export default function ProjectsPage() {
  const router = useRouter();
  const { user } = useAuthContext() as { user: any };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-2xl font-bold">My Projects</h1>
              <p className="text-gray-600">Manage and track your creative projects</p>
            </div>
            <div className="ml-auto">
              <Image
                src=""
                alt="Profile"
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Premium Banner */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-gray-800 rounded-xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16">
              <Image
                src="https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=64&h=64&q=80"
                alt="Premium"
                width={64}
                height={64}
              />
            </div>
            <div className="text-white">
              <h3 className="text-xl font-semibold mb-1">Upgrade to Premium</h3>
              <p className="text-gray-300">Become a VIP Member to get more Features & Unlimited Inspiration!</p>
            </div>
          </div>
          <button className="bg-white text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100">
            Upgrade Now
          </button>
        </div>
      </div>

      {/* Projects Section */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recent Projects</h2>
          <button 
            onClick={() => router.push('/projects/new')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            New Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{project.category}</span>
                  <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded">
                    {project.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 