import { Card, CardContent } from './Card'; 

interface CardServicoProps {
  titulo: string;
  descricao: string;
  imagemBg: string;
}

export function CardServico({ titulo, descricao, imagemBg }: CardServicoProps) {
  return (
    <Card className="relative overflow-hidden w-full h-[280px] border-none rounded-xl group">
      
      {/* Imagem de Fundo e Filtro escuro para dar leitura no texto */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundImage: `url(${imagemBg})` }}
      />
      <div className="absolute inset-0 bg-black/30" /> {/* Camada levemente escura */}

      {/* Conteúdo por cima da imagem */}
      <CardContent className="relative z-10 flex flex-col items-center justify-between h-full p-6 text-center">
        
        {/* Espaço para o ícone no canto esquerdo (pode adicionar depois) */}
        <div className="w-full flex justify-start">
          <div className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center font-bold">
            +
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-extrabold text-black mb-2 leading-tight">
            {titulo}
          </h3>
          <p className="text-sm text-black font-medium px-2">
            {descricao}
          </p>
        </div>

        <button className="mt-4 bg-white text-black text-xs font-bold py-2 px-8 rounded-md hover:bg-gray-100 transition">
          Saiba mais.
        </button>
      </CardContent>
    </Card>
  );
}