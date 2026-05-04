import { Card, CardContent } from './Card'; // Importando a fábrica do Arthur

type UBS = {
  nome: string;
  endereco: string;
  horario: string;
  aberto: boolean;
};

// Mantemos o nome original CardUBS para ficar padronizado
export function CardUBS({ ubs }: { ubs: UBS }) {
  return (
    <Card className="overflow-hidden mb-4 border-2 border-blue-100 rounded-xl bg-white">
      <CardContent className="p-4 flex gap-4">
        {/* Avatar/Imagem */}
        <div className="w-12 h-12 rounded-full bg-slate-300 flex-shrink-0"></div>
        
        {/* Informações */}
        <div className="flex flex-col gap-1 w-full">
          <h4 className="text-sm font-bold text-[#1f2937]">{ubs.nome}</h4>
          <p className="text-xs text-gray-500">📍 {ubs.endereco}</p>
          <p className="text-xs text-gray-500">🕒 Horários : {ubs.horario}</p>
          
          <div className="flex items-center gap-1 mt-1">
            <span className={`w-2 h-2 rounded-full ${ubs.aberto ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className="text-xs text-gray-600">{ubs.aberto ? 'Aberto agora' : 'Fechado'}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-[10px] border border-gray-300 rounded px-2 py-1">💉 Campanha de vacinação</span>
            <span className="text-[10px] border border-gray-300 rounded px-2 py-1">🦷 Consulta Odontológica</span>
          </div>
        </div>
      </CardContent>
      
      {/* Faixa Azul de Distância */}
      <div className="bg-[#1a5b8f] text-white text-center py-1.5 text-xs font-bold w-full">
        ▼ Aproximadamente 1 km de distância
      </div>
    </Card>
  );
}