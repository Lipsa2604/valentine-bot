import React, { useState } from 'react';
import { Heart, Send } from 'lucide-react';
import { sendMessage } from './services/chatApi';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    try {
      const reply = await sendMessage(input);
      setMessages(prev => [...prev, { role: 'ai', content: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: 'Oops! Check server 💔' }]);
    }
    setInput('');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-rose-400 to-orange-400 flex flex-col">
      <header className="p-6 text-center">
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          💕 <Heart className="w-10 h-10 text-valentine animate-pulse" /> Valentine&apos;s Chatbot 💕
        </h1>
        <p className="text-white/90">Ask for love advice, poems & pickup lines.</p>
      </header>

      <div className="flex-1 max-w-2xl mx-auto w-full p-4 space-y-4 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs lg:max-w-md p-3 rounded-2xl shadow-lg ${
                msg.role === 'user'
                  ? 'bg-white text-gray-900 rounded-br-sm'
                  : 'bg-valentine/20 text-gray-900 rounded-bl-sm border border-white/50'
              }`}
            >
              <p>{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-valentine/20 p-3 rounded-2xl animate-pulse">
              Cupid is thinking... 💭
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white/20">
        <div className="flex gap-2 max-w-2xl mx-auto">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Write something for your crush..."
            className="flex-1 p-4 rounded-full border-2 border-white/50 focus:border-valentine focus:outline-none bg-white/70 text-gray-900 placeholder-gray-500"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="p-4 bg-valentine hover:bg-pink-600 text-white rounded-full shadow-lg flex items-center gap-1 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
