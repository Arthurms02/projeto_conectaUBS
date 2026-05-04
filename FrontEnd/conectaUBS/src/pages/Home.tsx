import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../lib/context/AuthContext';

// Interfaces para o TypeScript[cite: 7]
interface UBS {
  id: number;
  nome: string;
  local: string;
  horario: string;
  aberto: boolean;
  distancia: string;
}

interface Servico {
  id: number;
  titulo?: string; // Adicionado opcional para evitar erros de tipagem no seu mapeamento
  descricao?: string; // Adicionado opcional
  imagem: string; // Caminho da imagem em texto (da pasta public)[cite: 7]
}

const ubsData: UBS[] = [
  { id: 1, nome: 'UNIDADE DE SAÚDE DA FAMÍLIA ADERBAL MARTINS', local: 'Monte Castelo', horario: '08:00hrs às 18:00hs', aberto: true, distancia: '1 km' }, //[cite: 7]
  { id: 2, nome: 'UNIDADE DE SAÚDE DA FAMÍLIA ADERBAL MARTINS', local: 'Monte Castelo', horario: '08:00hrs às 18:00hs', aberto: false, distancia: '1 km' }, //[cite: 7]
];

// Dados dos 6 serviços usando o caminho direto da pasta public/assets[cite: 7]
const servicosData: Servico[] = [
  { 
    id: 1, 
    imagem: '/assets/aviso1.png' //[cite: 7]
  },
  { 
    id: 2, 
    imagem: '/assets/aviso7.png' //[cite: 7]
  },
  { 
    id: 3, 
    imagem: '/assets/aviso4.jpg' //[cite: 7]
  },
  { 
    id: 4, 
    imagem: '/assets/aviso5.jpg' //[cite: 7]
  },
  { 
    id: 5, 
    imagem: '/assets/aviso2.png' //[cite: 7]
  },
  { 
    id: 6, 
    imagem: '/assets/card6.jpg' //[cite: 7]
  },
];

const Home: React.FC = () => {
  // Implementação da verificação de autenticação
  const { isAuthenticated } = useAuth();

  // Se não estiver logado, redireciona para a página de login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // O restante do código permanece exatamente igual ao seu[cite: 7]
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="p-4 flex items-center gap-2 border-b">
        <img
              src="/assets/logo_sem_fundo.png" 
              alt="nome ubs" 
              className="w-100 object-contain" 
            />
      </header>

      {/* Hero Section */}
      <section className="bg-blue-400 p-8 flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1 text-white">
          <h1 className="text-4xl font-light leading-tight">
            Busque agora por uma <strong className="font-bold">Unidade Básica de Saúde</strong> mais próxima de você.
          </h1>
          <div className="mt-8 flex justify-center md:justify-start">
            {/* Imagem da médica vindo direto da public/assets */}
            <img
              src="/assets/foto-sem-fundo.png" 
              alt="Médica sorrindo com os braços cruzados" 
              className="w-100 object-contain" 
            />
          </div>
        </div>

        {/* Sidebar de UBS */}
        <aside className="w-full md:w-96 bg-blue-900 rounded-xl p-6 text-white shadow-xl">
          <h2 className="text-center text-xl font-bold">UBS próximas</h2>
          <p className="text-center text-sm mb-6 text-blue-200">Encontre uma unidade mais próxima de você</p>
          
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {ubsData.map((ubs) => (
              <div key={ubs.id} className="bg-white rounded-lg p-4 text-gray-800 shadow-md">
                <div className="flex gap-3">
                  <div className="text-2xl">🏢</div>
                  <div>
                    <h4 className="font-bold text-xs leading-tight mb-1">{ubs.nome}</h4>
                    <p className="text-[10px] text-gray-500 italic">Unidade básica de saúde • {ubs.local}</p>
                    <p className="text-[10px] text-gray-500 italic">Horários - Dias {ubs.horario}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className={`w-2 h-2 rounded-full ${ubs.aberto ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span className="text-[10px]">{ubs.aberto ? 'Aberto agora' : 'Fechado'}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-100 mt-3 p-1 text-center text-[10px] font-bold text-blue-900 rounded">
                  📍 Aproximadamente {ubs.distancia} de distância
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 bg-blue-800 hover:bg-blue-700 py-3 rounded-lg flex items-center justify-center gap-2 font-bold transition-all">
            🔍 Buscar novas unidades
          </button>
        </aside>
      </section>

      {/* Seção de Serviços */}
      <section className="p-12">
        <h2 className="text-center text-3xl font-bold text-blue-900 mb-12">Serviços para comunidade</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Mapeando os 6 serviços */}
          {servicosData.map((servico) => (
            <div key={servico.id} className="bg-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative min-h-[320px]">
              {/* Imagem preenchendo o fundo */}
              <img 
                src={servico.imagem} 
                alt={servico.titulo} 
                className="absolute inset-0 w-full h-full object-cover" 
              />
              {/* Camada de texto sobreposta */}
              <div className="absolute inset-0 p-6 text-center flex flex-col justify-center items-center">
                <div className="mt-12 mb-auto">
                  <h4 className="font-extrabold text-2xl mb-3 text-black leading-tight drop-shadow-sm">{servico.titulo}</h4>
                  <p className="text-base text-black font-medium drop-shadow-sm">{servico.descricao}</p>
                </div>
                <button className="bg-white border px-10 py-3 rounded text-sm font-bold text-black shadow-sm w-10/12 mt-4 hover:bg-gray-50 transition-colors">
                  Saiba mais.
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-gray-200 py-8 px-12 flex flex-col md:flex-row justify-between items-start md:items-center text-sm text-gray-700">
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-lg text-black">Fale Conosco</h3>
          <div className="flex items-center gap-2">
            <span className="text-lg">📍</span>
            <p>Av.Korem ipsum, 99 Centro CEP.: 99.000-909</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">🕒</span>
            <p>Segunda à Sexta de 8h às 18h<br/>(99) 3421.5678</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <span className="text-lg">✉️</span>
          <p>Ipsum@XPTO.gov.br</p>
        </div>

        <div className="flex items-center gap-2 mt-8 md:mt-0">
          <div className="text-blue-600 text-3xl font-bold">✚</div>
          <span className="text-blue-900 font-bold text-2xl tracking-tight">Conecta<span className="font-light text-blue-500">UBS</span></span>
        </div>
      </footer>
    </div>
  );
};

export default Home;