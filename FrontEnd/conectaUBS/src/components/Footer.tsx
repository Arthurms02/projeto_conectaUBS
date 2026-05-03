import { MapPin, Clock, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-[#f4f7f9] border-t border-gray-200 py-8 px-6 md:px-12 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* Contatos */}
        <div className="flex flex-col gap-4 text-sm text-gray-700">
          <h3 className="text-lg font-bold text-black mb-2">Fale Conosco</h3>
          
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <p>Av. Korem ipsum, 99 Centro CEP.: 99.000-909</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <p>Segunda à Sexta de 8h às 18h</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <p>(99) 3421.5678</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-sm text-gray-700 md:mt-10">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <p>ipsum@XPTO.gov.br</p>
          </div>
        </div>

        {/* Logo */}
        <div className="mt-6 md:mt-0">
          <h2 className="text-3xl font-bold text-[#005c9a]">
            C<span className="text-blue-500 text-2xl">⌖</span>necta<span className="text-[#00a6e0]">UBS</span>
          </h2>
        </div>

      </div>
    </footer>
  );
}