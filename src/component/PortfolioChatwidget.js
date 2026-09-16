'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCommentDots, FaTimes, FaPaperPlane, FaRobot } from 'react-icons/fa';

const suggestedPrompts = [
    'What projects has Alomgir built?',
    'What tech stack does he know?',
    'How can I contact him?',
];

export default function PortfolioChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hi! I'm Alomgir's AI assistant. Ask me anything about his skills, projects, or experience! 👋" },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages, isTyping]);

    const sendMessage = async (text) => {
        if (!text.trim()) return;

        const newMessages = [...messages, { role: 'user', content: text }];
        setMessages(newMessages);
        setInput('');
        setIsTyping(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages }),
            });

            const data = await res.json();
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: data.reply || "Sorry, something went wrong." },
            ]);
        } catch (err) {
            console.error('Chat error:', err);
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: "Sorry, I couldn't connect right now. Please try again." },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <>
            {/* Floating toggle button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                    boxShadow: [
                        '0 0 0px rgba(34,211,238,0.4)',
                        '0 0 20px rgba(34,211,238,0.6)',
                        '0 0 0px rgba(34,211,238,0.4)',
                    ],
                }}
                transition={{ boxShadow: { duration: 2.5, repeat: Infinity } }}
                className="fixed bottom-5 right-5 z-[90] w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-lg"
                aria-label="Open AI assistant"
            >
                {isOpen ? <FaTimes size={20} /> : <FaCommentDots size={22} />}
            </motion.button>

            {/* Chat panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        className="fixed bottom-24 right-5 z-[90] w-[90vw] max-w-sm h-[500px] max-h-[70vh] rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0d1526] shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                <FaRobot size={16} />
                            </div>
                            <div>
                                <p className="text-sm font-semibold">Ask about Alomgir</p>
                                <p className="text-[10px] text-cyan-50">AI-powered portfolio assistant</p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${msg.role === 'user'
                                            ? 'self-end bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-sm'
                                            : 'self-start bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-300 rounded-bl-sm'
                                        }`}
                                >
                                    {msg.content}
                                </div>
                            ))}

                            {isTyping && (
                                <div className="self-start bg-slate-100 dark:bg-white/5 px-3 py-2 rounded-2xl rounded-bl-sm flex gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce [animation-delay:-0.3s]" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce [animation-delay:-0.15s]" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce" />
                                </div>
                            )}

                            {messages.length === 1 && (
                                <div className="flex flex-col gap-2 mt-2">
                                    {suggestedPrompts.map((prompt) => (
                                        <button
                                            key={prompt}
                                            onClick={() => sendMessage(prompt)}
                                            className="text-left text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-400 hover:border-cyan-400/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                                        >
                                            {prompt}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                sendMessage(input);
                            }}
                            className="flex items-center gap-2 p-3 border-t border-slate-100 dark:border-white/10"
                        >
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about my skills, projects..."
                                className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-xs text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                            <button
                                type="submit"
                                disabled={isTyping}
                                className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:opacity-90 transition-opacity disabled:opacity-50 flex-shrink-0"
                            >
                                <FaPaperPlane size={13} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}