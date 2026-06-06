import { useEffect } from 'react';
import '@n8n/chat/style.css'; // Importação obrigatória dos estilos visuais
import { createChat } from '@n8n/chat';

export default function ChatBot() {
  useEffect(() => {
    // Inicializa o widget do n8n chat
    const chatInstance = createChat({
      webhookUrl: 'https://arthurms02.app.n8n.cloud/webhook/3822a421-8e5b-496c-9780-96e174f58cfe/chat', // Subsitua pela URL de Produção do n8n
      mode: 'window', // Pode ser 'window' (balão flutuante) ou 'fullscreen'
      showWelcomeScreen: true,
      chatInputKey: 'chatInput',
      title: 'Assistente Virtual',
      subtitle: 'Estou aqui para ajudar com seus projetos e dúvidas.',
      initialMessages: [
        'Olá! Seja bem-vindo.',
        'Como posso te ajudar hoje?'
      ],
      i18n: {
        en: {
          title: 'Assistente',
          subtitle: 'Online',
          inputPlaceholder: 'Digite sua mensagem aqui...',
          welcomeMessages: ['Olá! Como posso ajudar?', 'Pergunte-me algo.'],
        }
      }
    });

    // Cleanup opcional ao desmontar o componente (evita duplicações no StrictMode)
    return () => {
      const existingChat = document.querySelector('#n8n-chat');
      if (existingChat) {
        existingChat.remove();
      }
    };
  }, []);

  return (
    // O pacote do n8n injeta a estrutura globalmente, mas você pode definir o contêiner se necessário.
    <div id="n8n-chat-container"></div>
  );
};
