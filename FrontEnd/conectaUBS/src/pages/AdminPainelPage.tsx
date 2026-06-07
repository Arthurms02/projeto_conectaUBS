import { useState } from 'react';
import { useAuth } from '../lib/context/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import {
  LogOut,
  Users,
  MapPin,
  AlertTriangle,
  Activity,
  Search,
  FileText,
  BarChart3,
  Settings
} from 'lucide-react';

// Mock data
const mockReports = [
  { id: 1, type: 'Dengue', location: 'Monte Castelo', date: '2026-03-28', status: 'Pendente' },
  { id: 2, type: 'Zika', location: 'Patos', date: '2026-03-27', status: 'Em análise' },
  { id: 3, type: 'Chikungunya', location: 'Monte Castelo', date: '2026-03-26', status: 'Resolvido' },
  { id: 4, type: 'Dengue', location: 'Centro', date: '2026-03-25', status: 'Pendente' },
];

const mockUnits = [
  { id: 1, name: 'UBS Monte Castelo', address: 'Rua Principal, 123', status: 'Ativo', team: 12 },
  { id: 2, name: 'UBS Patos', address: 'Av. Central, 456', status: 'Ativo', team: 8 },
  { id: 3, name: 'UBS Centro', address: 'Praça da Saúde, 789', status: 'Manutenção', team: 10 },
];

const mockStats = [
  { label: 'Denúncias Totais', value: '147', icon: AlertTriangle, color: 'text-orange-600' },
  { label: 'Unidades Ativas', value: '12', icon: MapPin, color: 'text-blue-600' },
  { label: 'Profissionais', value: '89', icon: Users, color: 'text-green-600' },
  { label: 'Taxa de Resolução', value: '92%', icon: Activity, color: 'text-purple-600' },
];

export default function AdminPage() {
  const { logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    logout();
  };

  const mockUser = { name: 'Administrador', email: 'admin@email.com' };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pendente': return 'bg-yellow-100 text-yellow-800';
      case 'Em análise': return 'bg-blue-100 text-blue-800';
      case 'Resolvido': return 'bg-green-100 text-green-800';
      case 'Ativo': return 'bg-green-100 text-green-800';
      case 'Manutenção': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-white/60 shadow-sm sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">ConectaUBS Admin</h1>
                <p className="text-sm text-gray-500">Painel de Administração</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{mockUser.name}</p>
                <p className="text-xs text-gray-500">{mockUser.email}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {mockStats.map((stat) => (
            <Card key={stat.label} className="bg-white/70 backdrop-blur-xl border-white/40 hover:bg-white/90 hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="reports" className="space-y-4">
          <TabsList>
            <TabsTrigger value="reports">
              <FileText className="w-4 h-4 mr-2" />
              Denúncias
            </TabsTrigger>
            <TabsTrigger value="units">
              <MapPin className="w-4 h-4 mr-2" />
              Unidades
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="w-4 h-4 mr-2" />
              Análises
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Configurações
            </TabsTrigger>
          </TabsList>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-4">
            <Card className="bg-white/70 backdrop-blur-md border-white/40">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Denúncias de Endemias</CardTitle>
                    <CardDescription>Gerencie as denúncias recebidas pela comunidade</CardDescription>
                  </div>
                  <div className="w-full max-w-sm">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Buscar denúncias..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Localização</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell>#{report.id}</TableCell>
                          <TableCell className="font-medium">{report.type}</TableCell>
                          <TableCell>{report.location}</TableCell>
                          <TableCell>{new Date(report.date).toLocaleDateString('pt-BR')}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(report.status)}>
                              {report.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              Ver detalhes
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Units Tab */}
          <TabsContent value="units" className="space-y-4">
            <Card className="bg-white/70 backdrop-blur-md border-white/40">
              <CardHeader>
                <CardTitle>Unidades Básicas de Saúde</CardTitle>
                <CardDescription>Gerencie as UBS e suas equipes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nome da Unidade</TableHead>
                        <TableHead>Endereço</TableHead>
                        <TableHead>Equipe</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockUnits.map((unit) => (
                        <TableRow key={unit.id}>
                          <TableCell>#{unit.id}</TableCell>
                          <TableCell className="font-medium">{unit.name}</TableCell>
                          <TableCell>{unit.address}</TableCell>
                          <TableCell>{unit.team} profissionais</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(unit.status)}>
                              {unit.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              Editar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="bg-white/70 backdrop-blur-md border-white/40">
                <CardHeader>
                  <CardTitle>Relatório de Endemias</CardTitle>
                  <CardDescription>Casos reportados nos últimos 30 dias</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Dengue</span>
                      <span className="font-semibold">67 casos</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{width: '67%'}}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Zika</span>
                      <span className="font-semibold">34 casos</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{width: '34%'}}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Chikungunya</span>
                      <span className="font-semibold">46 casos</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{width: '46%'}}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-md border-white/40">
                <CardHeader>
                  <CardTitle>Status das Denúncias</CardTitle>
                  <CardDescription>Distribuição por status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pendentes</span>
                      <span className="font-semibold">45</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{width: '30%'}}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Em análise</span>
                      <span className="font-semibold">67</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '45%'}}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Resolvidas</span>
                      <span className="font-semibold">135</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '90%'}}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card className="bg-white/70 backdrop-blur-md border-white/40">
              <CardHeader>
                <CardTitle>Configurações do Sistema</CardTitle>
                <CardDescription>Gerencie as configurações gerais da plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/40 backdrop-blur-sm border border-white/30 rounded-lg hover:bg-white/60 transition-all">
                    <div>
                      <p className="font-medium">Notificações por Email</p>
                      <p className="text-sm text-gray-500">Receba alertas de novas denúncias</p>
                    </div>
                    <Button variant="outline" size="sm">Configurar</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/40 backdrop-blur-sm border border-white/30 rounded-lg hover:bg-white/60 transition-all">
                    <div>
                      <p className="font-medium">Gerenciar Usuários</p>
                      <p className="text-sm text-gray-500">Adicione ou remova administradores</p>
                    </div>
                    <Button variant="outline" size="sm">Gerenciar</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/40 backdrop-blur-sm border border-white/30 rounded-lg hover:bg-white/60 transition-all">
                    <div>
                      <p className="font-medium">Backup de Dados</p>
                      <p className="text-sm text-gray-500">Faça backup dos dados do sistema</p>
                    </div>
                    <Button variant="outline" size="sm">Exportar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
