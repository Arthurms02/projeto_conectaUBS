import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Users,
  Heart,
  AlertCircle,
  Star,
  Shield,
  ChevronRight
} from 'lucide-react';

export function UBSProfilePage() {
  const services = [
    { name: 'Vacinação', icon: '💉' },
    { name: 'Dentista', icon: '🦷' },
    { name: 'Médico', icon: '🩺' },
    { name: 'Psicólogo', icon: '🧠' },
    { name: 'Pediatra', icon: '👶' },
  ];

  const team = [
    { name: 'Dra. Ana Souza', role: 'Clínica Geral', icon: '👩‍⚕️' },
    { name: 'Dr. Carlos Lima', role: 'Pediatra', icon: '👨‍⚕️' },
    { name: 'Dra. Marcia Dias', role: 'Psicóloga', icon: '👩‍⚕️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-xl border-b border-white/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-md group-hover:shadow-blue-300 transition-shadow">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">ConectaUBS</h1>
            </Link>
            <Link to="/">
              <Button variant="ghost" className="text-blue-600 hover:bg-blue-50/60 backdrop-blur-sm">
                ← Voltar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-24 overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* glass badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/30 rounded-full px-4 py-1.5 mb-6 text-sm font-medium">
            <Shield className="w-4 h-4" />
            Unidade Básica de Saúde
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow">
            Pedro Leandro Sobrinho
          </h2>
          <p className="text-blue-100 text-lg mb-2">Monte Castelo · Patos</p>
          <p className="text-blue-200 text-sm">Cuidando da sua saúde com excelência</p>

          {/* rating pill */}
          <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mt-6 text-sm">
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <Star className="w-4 h-4 text-yellow-300/50" />
            <span className="ml-1 text-white/80">4.0 · Bem avaliada</span>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl shadow-blue-100/50 p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Contatos e Informações</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Phone, label: 'Telefone', value: '(083) 1234-4578' },
              { icon: Mail, label: 'Email', value: 'Email@gmail.gov.com' },
              { icon: MapPin, label: 'Endereço', value: 'Av. Korem ipsum, 99 — Centro, CEP: 99.000-909' },
              { icon: Clock, label: 'Horário', value: 'Segunda a Sexta, 6h às 18h' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-blue-50/80 border border-blue-100/60 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100/80 transition-colors">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">{label}</p>
                  <p className="text-gray-500 text-sm">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Serviços Oferecidos</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {services.map((service) => (
            <div
              key={service.name}
              className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 text-center shadow-md shadow-blue-50 hover:bg-white/80 hover:shadow-lg hover:shadow-blue-100/60 hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{service.icon}</div>
              <p className="font-medium text-gray-700 text-sm">{service.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Report Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-orange-50/70 backdrop-blur-xl border border-orange-200/50 rounded-2xl shadow-md shadow-orange-100/40 p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-100/80 border border-orange-200/60 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Denúncia de Endemias</h3>
              <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                Ajude a comunidade reportando casos de dengue, zika, chikungunya e outras endemias.
                Sua denúncia é importante para a saúde de todos.
              </p>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm shadow-orange-200">
                Fazer Denúncia
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-600" />
          Nossa Equipe
        </h3>
        <p className="text-gray-500 text-sm mb-6">
          Profissionais qualificados e dedicados ao cuidado da sua saúde.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 text-center shadow-md shadow-blue-50 hover:bg-white/80 hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="text-5xl mb-3">{member.icon}</div>
              <p className="font-semibold text-gray-800">{member.name}</p>
              <p className="text-blue-600 text-sm mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white py-12 overflow-hidden">
        <div className="absolute inset-0 bg-blue-950/40 backdrop-blur-sm" />
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5">
              <h4 className="font-semibold mb-3 text-white">Fale Conosco</h4>
              <p className="text-blue-200 text-sm">Av. Korem ipsum, 99 — Centro</p>
              <p className="text-blue-200 text-sm">CEP: 99.000-909</p>
              <p className="text-blue-200 text-sm mt-2">Segunda a Sexta, 6h às 18h</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5">
              <h4 className="font-semibold mb-3 text-white">Contato</h4>
              <p className="text-blue-200 text-sm">(99) 3421.5678</p>
              <p className="text-blue-200 text-sm">Ipsum@XPTO.gov.br</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-blue-500/40 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-semibold text-white">ConectaUBS</h4>
              </div>
              <p className="text-blue-200 text-sm">Sistema integrado de saúde pública para conectar cidadãos às UBS.</p>
            </div>
          </div>

          <div className="border-t border-white/10 mt-10 pt-6 text-center text-blue-300/60 text-sm">
            <p>© 2026 ConectaUBS. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
