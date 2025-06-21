
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Users, Layers, AlertCircle } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('Server error: 422');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Panel Admin</h1>
        <p className="text-gray-600 mt-1">Welcome back, Administrator (ADMIN)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span>Manajemen User</span>
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="bg-gray-50 border-0">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <Layers className="w-5 h-5 text-green-600" />
              <span>Manajemen Model</span>
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card className="bg-white border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle>Daftar Pengguna</CardTitle>
          <p className="text-sm text-gray-600">
            Kelola semua akun peneliti dan admin yang terdaftar di sistem.
          </p>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span className="text-red-800 text-sm">{error}</span>
              </div>
            </div>
          )}
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Nama</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-500">
                    Tidak ada data user ditemukan
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
