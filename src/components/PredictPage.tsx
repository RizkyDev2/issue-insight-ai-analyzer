
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CheckCircle, Layers, AlertCircle, Github, Bot, Upload, Download, History } from 'lucide-react';

export const PredictPage: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [customModel, setCustomModel] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClassification = async () => {
    setIsProcessing(true);
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      console.log('Classification completed');
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Klasifikasi Feedback</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Ekstrak dan klasifikasi feedback dari GitHub Issues menggunakan AI
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <History className="w-4 h-4 mr-2" />
            Riwayat
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="system" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800">
          <TabsTrigger value="system" className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>Model Sistem</span>
          </TabsTrigger>
          <TabsTrigger value="custom" className="flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Model Kustom</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="system" className="space-y-6 mt-6">
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Bot className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Gunakan Model Sistem
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Model yang telah dilatih dan dioptimalkan untuk klasifikasi feedback
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Pilih Model AI
                    </label>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Pilih model untuk klasifikasi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="distilbert-base">
                          <div className="flex flex-col">
                            <span className="font-medium">DistilBERT Base</span>
                            <span className="text-xs text-gray-500">mrizkywidodo/distilbert-base-uncased-rizkywidodo</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="bert-base">
                          <div className="flex flex-col">
                            <span className="font-medium">BERT Base</span>
                            <span className="text-xs text-gray-500">google/bert-base-uncased</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="roberta-base">
                          <div className="flex flex-col">
                            <span className="font-medium">RoBERTa Base</span>
                            <span className="text-xs text-gray-500">roberta-base</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      URL GitHub Issue
                    </label>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="url"
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        placeholder="https://github.com/owner/repo/issues/123"
                        className="h-12 pl-11"
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Masukkan URL lengkap dari GitHub Issue yang ingin dianalisis
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Kategori Klasifikasi
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <span className="font-medium text-sm text-gray-900 dark:text-gray-100">NFR</span>
                        <p className="text-xs text-gray-600 dark:text-gray-400">New Feature Request</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div>
                        <span className="font-medium text-sm text-gray-900 dark:text-gray-100">FIR</span>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Feature Improvement Request</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                      <div>
                        <span className="font-medium text-sm text-gray-900 dark:text-gray-100">Komen</span>
                        <p className="text-xs text-gray-600 dark:text-gray-400">General Comment</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleClassification}
                disabled={!selectedModel || !githubUrl || isProcessing}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium"
              >
                {isProcessing ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Memproses Klasifikasi...</span>
                  </div>
                ) : (
                  <>
                    <Layers className="w-5 h-5 mr-2" />
                    Mulai Klasifikasi
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6 mt-6">
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Upload className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Gunakan Model Kustom
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Gunakan model dari Hugging Face Hub
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Hugging Face Model ID
                </label>
                <Input
                  type="text"
                  value={customModel}
                  onChange={(e) => setCustomModel(e.target.value)}
                  placeholder="username/model-name"
                  className="h-12"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Contoh: bert-base-uncased, username/my-fine-tuned-model
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  URL GitHub Issue
                </label>
                <div className="relative">
                  <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/owner/repo/issues/123"
                    className="h-12 pl-11"
                  />
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-800 dark:text-amber-200">
                      Fitur Dalam Pengembangan
                    </h4>
                    <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                      Feature untuk menggunakan model kustom dari Hugging Face akan segera tersedia. 
                      Saat ini, silakan gunakan model sistem yang telah disediakan.
                    </p>
                  </div>
                </div>
              </div>

              <Button 
                disabled
                className="w-full h-12 bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              >
                <Upload className="w-5 h-5 mr-2" />
                Segera Hadir
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {isProcessing && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <div>
                <span className="text-blue-800 dark:text-blue-200 font-medium text-lg">
                  Mengekstrak dan mengklasifikasi feedback...
                </span>
                <p className="text-blue-600 dark:text-blue-300 text-sm mt-1">
                  Proses ini mungkin membutuhkan beberapa menit tergantung jumlah komentar
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
