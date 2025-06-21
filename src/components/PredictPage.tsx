
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CheckCircle, Layers, AlertCircle } from 'lucide-react';

export const PredictPage: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
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
          <h1 className="text-2xl font-bold text-gray-900">Klasifikasi Feedback</h1>
          <p className="text-gray-600 mt-1">Pilih model dari daftar model yang telah disediakan sistem.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Gunakan Model Sistem</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Model AI
              </label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger>
                  <SelectValue placeholder="mrizkywidodo/distilbert-base-uncased-rizkywidodo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distilbert-base">mrizkywidodo/distilbert-base-uncased-rizkywidodo</SelectItem>
                  <SelectItem value="bert-base">google/bert-base-uncased</SelectItem>
                  <SelectItem value="roberta-base">roberta-base</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Isu GitHub
              </label>
              <Input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/owner/repo/issues/123"
                className="w-full"
              />
            </div>

            <Button 
              onClick={handleClassification}
              disabled={!selectedModel || !githubUrl || isProcessing}
              className="w-full bg-gray-800 hover:bg-gray-900"
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <>
                  <Layers className="w-4 h-4 mr-2" />
                  Klasifikasi
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-50 border-0">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <span>Gunakan Model Kustom</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                Feature untuk menggunakan model kustom dari Hugging Face akan segera tersedia.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {isProcessing && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span className="text-blue-800 font-medium">
                Mengekstrak dan mengklasifikasi feedback dari GitHub...
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
