
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { History, Download, Eye } from 'lucide-react';

interface HistoryItem {
  id: string;
  title: string;
  date: string;
  model: string;
  url: string;
  totalComments: number;
}

export const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: '1',
      title: 'React Navigation Issue #123',
      date: '2024-01-15',
      model: 'distilbert-base-uncased',
      url: 'https://github.com/react-navigation/react-navigation/issues/123',
      totalComments: 15
    },
    {
      id: '2',
      title: 'Vue.js Feature Request #456',
      date: '2024-01-10',
      model: 'bert-base-uncased',
      url: 'https://github.com/vuejs/vue/issues/456',
      totalComments: 8
    }
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Riwayat Klasifikasi</h1>
        <p className="text-gray-600 mt-1">Lihat semua analisis klasifikasi yang pernah Anda lakukan.</p>
      </div>

      <Card className="bg-white border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2">
            <History className="w-5 h-5 text-blue-600" />
            <span>Riwayat Analisis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {history.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <div className="mt-1 space-y-1">
                      <p className="text-sm text-gray-600">Model: {item.model}</p>
                      <p className="text-sm text-gray-600">Tanggal: {item.date}</p>
                      <p className="text-sm text-gray-600">Total Komentar: {item.totalComments}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      Lihat
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
