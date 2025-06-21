
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Users, Layers, AlertCircle, Trash2, Edit, Plus, Upload } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'Peneliti';
}

interface AIModel {
  id: string;
  name: string;
  huggingfaceUrl: string;
  uploadedBy: string;
  uploadedAt: string;
}

export const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Administrator', email: 'admin@example.com', role: 'ADMIN' },
    { id: '2', name: 'John Doe', email: 'john@example.com', role: 'Peneliti' },
    { id: '3', name: 'Jane Smith', email: 'jane@example.com', role: 'Peneliti' },
  ]);

  const [models, setModels] = useState<AIModel[]>([
    { id: '1', name: 'DistilBERT Base Uncased', huggingfaceUrl: 'mrizkywidodo/distilbert-base-uncased-rizkywidodo', uploadedBy: 'Administrator', uploadedAt: '2024-01-15' },
    { id: '2', name: 'BERT Base', huggingfaceUrl: 'mrizkywidodo/bert-base-rizkywidodo', uploadedBy: 'Administrator', uploadedAt: '2024-01-10' },
    { id: '3', name: 'RoBERTa Base', huggingfaceUrl: 'mrizkywidodo/roberta-base-rizkywidodo', uploadedBy: 'Administrator', uploadedAt: '2024-01-05' },
  ]);

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newModelUrl, setNewModelUrl] = useState('');
  const [isAddingModel, setIsAddingModel] = useState(false);

  const handleEditUser = (user: User) => {
    setEditingUser({ ...user });
  };

  const handleSaveUser = () => {
    if (editingUser) {
      setUsers(users.map(user => user.id === editingUser.id ? editingUser : user));
      setEditingUser(null);
    }
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleAddModel = () => {
    if (newModelUrl.trim()) {
      const modelName = newModelUrl.split('/').pop() || 'Custom Model';
      const newModel: AIModel = {
        id: Date.now().toString(),
        name: modelName,
        huggingfaceUrl: newModelUrl,
        uploadedBy: 'Administrator',
        uploadedAt: new Date().toISOString().split('T')[0]
      };
      setModels([...models, newModel]);
      setNewModelUrl('');
      setIsAddingModel(false);
    }
  };

  const handleDeleteModel = (modelId: string) => {
    setModels(models.filter(model => model.id !== modelId));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Panel Admin</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back, Administrator (ADMIN)</p>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="users" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Manajemen User</span>
          </TabsTrigger>
          <TabsTrigger value="models" className="flex items-center space-x-2">
            <Layers className="w-4 h-4" />
            <span>Manajemen Model</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle>Daftar Pengguna</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Kelola semua akun peneliti dan admin yang terdaftar di sistem.
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.role === 'ADMIN' 
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          }`}>
                            {user.role}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditUser(user)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Pengguna</DialogTitle>
                                </DialogHeader>
                                {editingUser && (
                                  <div className="space-y-4">
                                    <div>
                                      <Label htmlFor="name">Nama</Label>
                                      <Input
                                        id="name"
                                        value={editingUser.name}
                                        onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="email">Email</Label>
                                      <Input
                                        id="email"
                                        value={editingUser.email}
                                        disabled
                                        className="bg-gray-100 dark:bg-gray-700"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="role">Role</Label>
                                      <Select 
                                        value={editingUser.role} 
                                        onValueChange={(value: 'ADMIN' | 'Peneliti') => 
                                          setEditingUser({...editingUser, role: value})
                                        }
                                      >
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="ADMIN">ADMIN</SelectItem>
                                          <SelectItem value="Peneliti">Peneliti</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <Button onClick={handleSaveUser} className="w-full">
                                      Simpan Perubahan
                                    </Button>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle>Manajemen Model AI</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Upload atau hapus model yang akan digunakan untuk klasifikasi.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Upload Model Baru</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="model-url">Link Hugging Face Model</Label>
                      <Input
                        id="model-url"
                        placeholder="contoh: username/model-name"
                        value={newModelUrl}
                        onChange={(e) => setNewModelUrl(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleAddModel} className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Model
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Model Tersedia</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {models.map((model) => (
                      <div key={model.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <Layers className="w-4 h-4 text-green-600" />
                            <span className="font-medium text-sm">{model.huggingfaceUrl}</span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Uploaded by {model.uploadedBy} on {model.uploadedAt}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteModel(model.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
