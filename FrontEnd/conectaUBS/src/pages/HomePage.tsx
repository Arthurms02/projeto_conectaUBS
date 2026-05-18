import { useState } from 'react';
import { Link } from 'react-router';
import {
  MapPin, Phone, Mail, Heart, Shield, Search, User,
  Star, Clock, ChevronRight, Loader2, AlertCircle,
  Activity, Building2, Users, Stethoscope, X,
  Baby, Smile, GraduationCap, Megaphone, Pill
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import type { UBS } from '../lib/types/types';
// import { api } from '../services/api';

const STATS = [
  { icon: Building2, value: '340+', label: 'UBS cadastradas' },
  { icon: Users, value: '1,2M', label: 'Pacientes atendidos' },
  { icon: Stethoscope, value: '18', label: 'Especialidades' },
  { icon: Activity, value: '24h', label: 'Informações atualizadas' },
];


const CATEGORY_ICONS: Record<string, React.ElementType> = {
  alerta: Megaphone,
  saude: Stethoscope,
  educacao: GraduationCap,
  vacinacao: Pill,
};

const CATEGORY_COLORS: Record<string, string> = {
  alerta: 'bg-amber-100 text-amber-700',
  saude: 'bg-blue-100 text-blue-700',
  educacao: 'bg-green-100 text-green-700',
  vacinacao: 'bg-purple-100 text-purple-700',
};

function StatusBadge({ status }: { status: UBS['status'] }) {
  const map = {
    aberto: 'bg-emerald-100 text-emerald-700',
    fechado: 'bg-red-100 text-red-700',
    parcial: 'bg-amber-100 text-amber-700',
  };
  const labels = { aberto: 'Aberto', fechado: 'Fechado', parcial: 'Parcial' };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${map[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'aberto' ? 'bg-emerald-500' : status === 'fechado' ? 'bg-red-500' : 'bg-amber-500'}`} />
      {labels[status]}
    </span>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
      <span className="text-xs font-medium text-gray-700">{rating.toFixed(1)}</span>
    </div>
  );
}

function UBSCardSkeleton() {
  return (
    <div className="animate-pulse bg-white/40 backdrop-blur-sm border border-white/30 rounded-xl p-4">
      <div className="flex gap-3 items-start">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3.5 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          <div className="flex gap-2 mt-2">
            <div className="h-5 bg-gray-200 rounded-full w-14" />
            <div className="h-5 bg-gray-200 rounded-full w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}

// function ServiceCardSkeleton() {
//   return (
//     <div className="animate-pulse bg-white/60 backdrop-blur-md rounded-xl overflow-hidden border border-white/30">
//       <div className="h-44 bg-gray-200" />
//       <div className="p-4 space-y-2">
//         <div className="h-4 bg-gray-200 rounded w-3/4" />
//         <div className="h-3 bg-gray-200 rounded w-full" />
//         <div className="h-3 bg-gray-200 rounded w-5/6" />
//         <div className="h-8 bg-gray-200 rounded-lg mt-3" />
//       </div>
//     </div>
//   );
// }

export function HomePage() {

  const [inputValue, setInputValue] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);


  function handleInputChange(value: string) {
    setInputValue(value);
  }

  function handleClearSearch() {
    console.log('Clearing search');
  }

  const mockUBS: UBS[] = [
    {
      id: 1,
      name: 'UBS Centro',
      address: 'Rua Principal, 123',
      neighborhood: 'Centro',
      city: 'João Pessoa',
      phone: '(83) 3210-1234',
      status: 'aberto',
      openHours: '6h - 18h',
      specialties: ['Pediatria', 'Vacinação'],
      rating: 4.5,
      totalRatings: 120,
      distance: '500m',
    },
    {
      id: 2,
      name: 'UBS Bairro Novo',
      address: 'Av. Secundária, 456',
      neighborhood: 'Bairro Novo',
      city: 'João Pessoa',
      phone: '(83) 3220-5678',
      status: 'parcial',
      openHours: '7h - 17h',
      specialties: ['Clínica Geral', 'Odontologia'],
      rating: 4.0,
      totalRatings: 80,
      distance: '1.2km',
    },
  ];

  const displayedUBS = isSearchMode ? mockUBS.filter(ubs =>
    ubs.name.toLowerCase().includes(inputValue.toLowerCase()) ||
    ubs.address.toLowerCase().includes(inputValue.toLowerCase()) ||
    ubs.neighborhood.toLowerCase().includes(inputValue.toLowerCase())
  ) : mockUBS;
  const isLoading = isSearchMode && displayedUBS.length === 0; // Simula loading apenas para busca sem resultados
  const loadingSearch = isSearchMode && displayedUBS.length === 0; // Simula loading apenas para busca sem resultados
  const totalResults = displayedUBS.length;

  // useEffect(() => {
  //   if (isSearchMode) {
  //     setIsLoading(true);
  //     api.get(`/ubs?search=${inputValue}`).then(response => {
  //       setDisplayedUBS(response.data);
  //       setIsLoading(false);
  //     });
  //   }
  // }, [inputValue, isSearchMode]);

  return (
    <div className="min-h-screen">
      {/* ── Header ── */}
      <header className="bg-white/70 backdrop-blur-md border-b border-white/40 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm group-hover:bg-blue-700 transition-colors">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-blue-900">ConectaUBS</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
              <a href="#ubs" className="hover:text-blue-600 transition-colors">Encontrar UBS</a>
              <a href="#servicos" className="hover:text-blue-600 transition-colors">Serviços</a>
              <a href="#contato" className="hover:text-blue-600 transition-colors">Contato</a>
            </nav>

            <div className="flex items-center gap-2">
              <Link to="/login-usuario">
                <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-700">
                  <User className="w-4 h-4 mr-1.5" />
                  Entrar
                </Button>
              </Link>
              <Link to="/registro">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Cadastrar
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="sm" className="hidden md:flex border-gray-300 text-gray-600 hover:border-blue-300">
                  <Shield className="w-3.5 h-3.5 mr-1.5" />
                  Admin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
        {/* decorative circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-blue-500/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-blue-900/40 blur-2xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left */}
            <div className="text-white space-y-8">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-full px-4 py-1.5 text-sm font-medium">
                  <Activity className="w-4 h-4" />
                  Rede pública de saúde
                </span>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Encontre uma{' '}
                  <span className="text-blue-200">Unidade Básica</span> de Saúde perto de você
                </h1>
                <p className="text-blue-100 text-lg max-w-md">
                  Acesse serviços de saúde gratuitos, informações de funcionamento e alertas da sua comunidade.
                </p>
              </div>

              {/* Search bar */}
              <div id="ubs" className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/30 space-y-3">
                <div className="relative flex items-center">
                  <Search className="absolute left-3 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="Buscar por nome, bairro ou endereço…"
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-gray-900 text-sm transition-all"
                  />
                  {inputValue && (
                    <button
                      onClick={handleClearSearch}
                      className="absolute right-3 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right – UBS card panel */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/30">
              <div className="bg-white/50 backdrop-blur-sm border-b border-white/30 px-5 py-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {isSearchMode ? 'Resultados da busca' : 'UBS próximas a você'}
                  </h3>
                  {isSearchMode && !isLoading && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      {totalResults} {totalResults === 1 ? 'resultado' : 'resultados'} encontrados
                    </p>
                  )}
                </div>
                {isSearchMode && (
                  <button
                    onClick={handleClearSearch}
                    className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <X className="w-3 h-3" /> Limpar
                  </button>
                )}
              </div>

              <div className="p-4 space-y-3 max-h-[420px] overflow-y-auto">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => <UBSCardSkeleton key={i} />)
                ) : displayedUBS.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-gray-400 gap-2">
                    <AlertCircle className="w-8 h-8" />
                    <p className="text-sm">
                      {isSearchMode ? 'Nenhuma UBS encontrada para esta busca.' : 'Nenhuma UBS disponível no momento.'}
                    </p>
                  </div>
                ) : (
                  displayedUBS.map((ubs) => (
                    <Link to={`/ubs/${ubs.id}`} key={ubs.id} className="block group">
                      <div className="bg-white/60 backdrop-blur-md border border-white/50 group-hover:border-blue-200/50 rounded-xl p-4 transition-all group-hover:shadow-lg group-hover:bg-white/80">
                        <div className="flex gap-3 items-start">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-semibold text-sm text-gray-900 line-clamp-1 group-hover:text-blue-700 transition-colors">
                                {ubs.name}
                              </h4>
                              <StatusBadge status={ubs.status} />
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                              {ubs.address} · {ubs.neighborhood}
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                              <StarRating rating={ubs.rating} />
                              <span className="text-xs text-gray-400">({ubs.totalRatings})</span>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                {ubs.openHours}
                              </div>
                            </div>
                            {ubs.specialties.length > 0 && (
                              <div className="flex gap-1.5 flex-wrap mt-2">
                                {ubs.specialties.slice(0, 2).map((sp) => (
                                  <span
                                    key={sp}
                                    className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-medium"
                                  >
                                    {sp}
                                  </span>
                                ))}
                                {ubs.specialties.length > 2 && (
                                  <span className="text-[10px] text-gray-400">
                                    +{ubs.specialties.length - 2} mais
                                  </span>
                                )}
                              </div>
                            )}
                            <div className="flex items-center justify-between mt-2">
                              {ubs.distance && (
                                <span className="text-xs font-semibold text-blue-600">{ubs.distance}</span>
                              )}
                              <span className="text-xs text-blue-500 flex items-center gap-0.5 ml-auto">
                                Ver detalhes <ChevronRight className="w-3 h-3" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>

              <div className="border-t border-white/30 bg-white/40 backdrop-blur-sm p-4">
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    setIsSearchMode(true);
                  }}
                  disabled={loadingSearch}
                >
                  {loadingSearch ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4 mr-2" />
                  )}
                  Buscar todas as unidades
                </Button>
              </div>
            </div>
          </div>
        </div>


      </section>

      {/* ── Stats banner ── */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-10 overflow-hidden">
        <div className="absolute inset-0 bg-blue-950/20 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-4 bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-white/30">
                  <Icon className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{value}</p>
                  <p className="text-xs text-blue-300">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick access ── */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-8">Acesso rápido</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Stethoscope, label: 'Agendamento', desc: 'Marque consultas online', color: 'bg-blue-100/60 text-blue-600' },
              { icon: Pill, label: 'Medicamentos', desc: 'Disponibilidade na rede', color: 'bg-purple-100/60 text-purple-600' },
              { icon: Baby, label: 'Pediatria', desc: 'Atendimento infantil', color: 'bg-pink-100/60 text-pink-600' },
              { icon: Smile, label: 'Odontologia', desc: 'Saúde bucal gratuita', color: 'bg-green-100/60 text-green-600' },
            ].map(({ icon: Icon, label, desc, color }) => (
              <Card key={label} className="bg-white/70 backdrop-blur-md border-white/40 hover:bg-white/90 hover:shadow-lg transition-all cursor-pointer group hover:border-white/60">
                <CardContent className="p-5 flex flex-col items-start gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Community services ── */}
      <section id="servicos" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-blue-900">Serviços para a comunidade</h2>
              <p className="text-gray-500 mt-1 text-sm">Alertas, campanhas e serviços de saúde disponíveis</p>
            </div>
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hidden md:flex items-center gap-1">
              Ver todos <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingServices
              ? Array.from({ length: 6 }).map((_, i) => <ServiceCardSkeleton key={i} />)
              : services.map((service) => {
                  const Icon = CATEGORY_ICONS[service.category] ?? Megaphone;
                  const colorClass = CATEGORY_COLORS[service.category] ?? 'bg-gray-100 text-gray-600';
                  return (
                    <Card
                      key={service.id}
                      className="bg-white/70 backdrop-blur-md border-white/40 overflow-hidden hover:shadow-xl transition-all cursor-pointer group hover:border-white/60 hover:-translate-y-1 hover:bg-white/90"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <ImageWithFallback
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className={`absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${colorClass} shadow-sm`}>
                          <Icon className="w-3.5 h-3.5" />
                          {service.tag}
                        </div>
                        {service.date && (
                          <span className="absolute bottom-3 right-3 text-xs text-white/90 bg-black/30 px-2 py-0.5 rounded-full">
                            {service.date}
                          </span>
                        )}
                      </div>
                      <CardContent className="p-5">
                        <h3 className="font-semibold text-gray-900 mb-1.5 line-clamp-1 group-hover:text-blue-700 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{service.description}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-blue-100 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
                        >
                          Saiba mais
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
          </div> */}

          <div className="mt-8 flex justify-center md:hidden">
            <Button variant="outline" className="border-blue-200 text-blue-600">
              Ver todos os serviços <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>


      {/* ── Footer ── */}
      <footer id="contato" className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 py-12 overflow-hidden">
        <div className="absolute inset-0 bg-blue-950/30 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">ConectaUBS</span>
              </div>
              <p className="text-blue-300 text-sm leading-relaxed">
                Conectando cidadãos aos serviços de saúde pública de forma rápida e acessível.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Serviços</h4>
              <ul className="space-y-2 text-sm text-blue-300">
                {['Encontrar UBS', 'Agendamento', 'Vacinação', 'Medicamentos'].map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-white transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Institucional</h4>
              <ul className="space-y-2 text-sm text-blue-300">
                {['Sobre o projeto', 'Política de privacidade', 'Termos de uso', 'Acessibilidade'].map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-white transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Contato</h4>
              <ul className="space-y-3 text-sm text-blue-300">
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <p>(83) 3421-5678</p>
                    <p className="text-xs text-blue-400">Seg–Sex 6h–18h</p>
                  </div>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  contato@conectaubs.gov.br
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p>Av. Epitácio Pessoa, 99 Centro – João Pessoa, PB</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-blue-900 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-blue-400">
            <p>© 2026 ConectaUBS. Todos os direitos reservados.</p>
            <p>Desenvolvido para o Sistema Único de Saúde – SUS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
