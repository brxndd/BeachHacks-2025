'use client';
import { useEffect, useState, useRef, KeyboardEvent } from 'react';

interface Message {
  text: string;
  isBot: boolean;
}

interface ApiResponse {
  response: string;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial welcome message immediately
    setMessages([{
      text: "❤️ Welcome to HeartBot! How can I assist with your heart health today?",
      isBot: true
    }]);
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const messageToSend: string = inputMessage;
    setMessages(prev => [...prev, { text: messageToSend, isBot: false }]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response: Response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_message: messageToSend }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data: ApiResponse = await response.json();
      setMessages(prev => [...prev, { text: data.response, isBot: true }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I'm having trouble responding right now.", 
        isBot: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-3xl p-4 rounded-lg ${msg.isBot ? 'bg-white text-gray-800' : 'bg-red-600 text-white'} shadow-sm`}>
                            <div className="flex items-center gap-2 mb-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.isBot ? 'bg-blue-100' : 'bg-blue-100'}`}>
                                    {msg.isBot ? '❤️' : '👤'}
                                </div>
                                <span className="font-medium">{msg.isBot ? 'HeartBot' : 'You'}</span>
                            </div>
                            <div className="whitespace-pre-wrap">{msg.text}</div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="max-w-3xl p-4 rounded-lg bg-white shadow-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                    ❤️
                                </div>
                                <div className="flex space-x-2">
                                    <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            
            <div className="border-t p-4 bg-white">
                <div className="max-w-3xl mx-auto flex gap-2">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                    <button 
                        onClick={handleSendMessage} 
                        disabled={isLoading}
                        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}