
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  History, 
  Download, 
  Eye, 
  Calendar,
  Github,
  Brain,
  Search,
  Filter,
  Star,
  Clock,
  ExternalLink
} from 'lucide-react';

interface HistoryItem {
  id: string;
  title: string;
  issueNumber: string;
  githubUrl: string;
  date: string;
  time: string;
  model: string;
  classifications: {
    category: string;
    confidence: number;
    color: string;
  }[];
  totalComments: number;
  savedAt: string;
  isFavorite?: boolean;
}

export const HistoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterModel, setFilterModel] = useState('all');
  
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: '1',
      title: 'React Navigation Issue - Navigation Stack Error',
      issueNumber: '123',
      githubUrl: 'https://github.com/react-navigation/react-navigation/issues/123',
      date: '2024-01-15',
      time: '14:30',
      model: 'distilbert-base-uncased',
      classifications: [
        { category: 'Bug Report', confidence: 87, color: 'bg-red-500' },
        { category: 'Navigation', confidence: 76, color: 'bg-blue-500' },
        { category: 'High Priority', confidence: 65, color: 'bg-orange-500' }
      ],
      totalComments: 15,
      savedAt: '2024-01-15T14:30:00Z',
      isFavorite: true
    },
    {
      id: '2',
      title: 'Vue.js Feature Request - Component Composition API Enhancement',
      issueNumber: '456',
      githubUrl: 'https://github.com/vuejs/vue/issues/456',
      date: '2024-01-10',
      time: '09:15',
      model: 'bert-base-uncased',
      classifications: [
        { category: 'Feature Request', confidence: 92, color: 'bg-green-500' },
        { category: 'API Enhancement', confidence: 84, color: 'bg-purple-500' },
        { category: 'Documentation', confidence: 41, color: 'bg-yellow-500' }
      ],
      totalComments: 8,
      savedAt: '2024-01-10T09:15:00Z'
    },
    {
      id: '3',
      title: 'Next.js Performance Issue - Slow SSR Rendering',
      issueNumber: '789',
      githubUrl: 'https://github.com/vercel/next.js/issues/789',
      date: '2024-01-08',
      time: '16:45',
      model: 'roberta-base',
      classifications: [
        { category: 'Performance', confidence: 89, color: 'bg-indigo-500' },
        { category: 'SSR Issue', confidence: 78, color: 'bg-pink-500' },
        { category: 'Critical', confidence: 71, color: 'bg-red-600' }
      ],
      totalComments: 23,
      savedAt: '2024-01-08T16:45:00Z',
      isFavorite: true
    }
  ]);

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.issueNumber.includes(searchTerm);
    const matchesFilter = filterModel === 'all' || item.model === filterModel;
    return matchesSearch && matchesFilter;
  });

  const uniqueModels = [...new Set(history.map(item => item.model))];

  const toggleFavorite = (id: string) => {
    setHistory(prev => prev.map(item => 
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    ));
  };

  const formatDate = (dateStr: string, timeStr: string) => {
    return new Date(`${dateStr}T${timeStr}`).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-3">
          <History className="w-8 h-8" />
          <div>
            <h1 className="text-3xl font-bold">Riwayat Klasifikasi</h1>
            <p className="text-blue-100 mt-1">
              Lihat dan kelola semua analisis klasifikasi yang pernah Anda simpan
            </p>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5" />
              <span className="text-sm font-medium">Total Analisis</span>
            </div>
            <p className="text-2xl font-bold mt-1">{history.length}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5" />
              <span className="text-sm font-medium">Favorit</span>
            </div>
            <p className="text-2xl font-bold mt-1">{history.filter(h => h.isFavorite).length}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">Terakhir Disimpan</span>
            </div>
            <p className="text-sm font-medium mt-1">
              {history.length > 0 ? formatDate(history[0].date, history[0].time) : 'Tidak ada'}
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari berdasarkan judul atau nomor issue..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterModel}
                onChange={(e) => setFilterModel(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm"
              >
                <option value="all">Semua Model</option>
                {uniqueModels.map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History Items */}
      <div className="space-y-4">
        {filteredHistory.map((item) => (
          <Card key={item.id} className="bg-white dark:bg-gray-800 border-0 shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Github className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Issue #{item.issueNumber}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {item.model}
                        </Badge>
                        {item.isFavorite && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        {item.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(item.date, item.time)}</span>
                        </div>
                        <span>•</span>
                        <span>{item.totalComments} komentar</span>
                      </div>
                    </div>
                  </div>

                  {/* Classifications */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Hasil Klasifikasi:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {item.classifications.map((classification, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${classification.color}`}></div>
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {classification.category}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {classification.confidence}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Lihat Detail
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Export
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(item.githubUrl, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        GitHub
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(item.id)}
                      className={item.isFavorite ? 'text-yellow-500' : 'text-gray-400'}
                    >
                      <Star className={`w-4 h-4 ${item.isFavorite ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHistory.length === 0 && (
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm">
          <CardContent className="p-12 text-center">
            <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              {searchTerm || filterModel !== 'all' ? 'Tidak ada hasil' : 'Belum ada riwayat'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm || filterModel !== 'all' 
                ? 'Coba ubah filter atau kata kunci pencarian'
                : 'Mulai analisis klasifikasi pertama Anda untuk melihat riwayat di sini'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
