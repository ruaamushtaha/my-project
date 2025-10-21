import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaComments, FaUser, FaSchool } from 'react-icons/fa';
import { useChat } from '../hooks/useData';

const ChatPage = () => {
  const {
    conversations,
    activeConversation,
    messages,
    loading,
    error,
    startConversation,
    sendMessage,
    setActiveConversation
  } = useChat();
  
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '' || !activeConversation) return;

    try {
      await sendMessage(activeConversation.id, newMessage);
      setNewMessage('');
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col h-[calc(100vh-120px)]" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden flex flex-col flex-1"
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <FaComments className="ml-2 text-blue-500" />
            المحادثات
          </h1>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Schools List */}
          <div className={`border-l border-gray-200 dark:border-gray-700 flex flex-col ${activeConversation ? 'hidden md:flex md:w-1/3' : 'w-full md:w-1/3'}`}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">مدارس أبنائي</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">اختر مدرسة للبدء في المحادثة</p>
            </div>
            
            <div className="overflow-y-auto flex-1">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-full p-4">
                  <div className="text-red-500 dark:text-red-400 text-center">
                    <p>حدث خطأ أثناء تحميل المدارس</p>
                    <p className="text-sm mt-2">{error}</p>
                  </div>
                </div>
              ) : conversations.length === 0 ? (
                <div className="flex items-center justify-center h-full p-4">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <FaSchool className="mx-auto text-3xl mb-2" />
                    <p>لا توجد مدارس متاحة</p>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {conversations.map((school) => (
                    <motion.div
                      key={school.id}
                      whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 cursor-pointer transition-colors ${
                        activeConversation?.id === school.id 
                          ? 'bg-blue-50 dark:bg-blue-900/20' 
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => startConversation(school)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                            <FaSchool className="text-blue-500 dark:text-blue-400" />
                          </div>
                          <div className="mr-3">
                            <h3 className="font-medium text-gray-900 dark:text-white">{school.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{school.type}</p>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            startConversation(school);
                          }}
                        >
                          <FaComments />
                        </motion.button>
                      </div>
                      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <FaUser className="ml-1" />
                        <span>{school.manager.name}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chat Window */}
          <AnimatePresence>
            {activeConversation && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex-1 flex flex-col border-l border-gray-200 dark:border-gray-700"
              >
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <div className="flex items-center">
                    <button
                      onClick={() => setActiveConversation(null)}
                      className="md:hidden mr-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <FaSchool className="text-blue-500 dark:text-blue-400" />
                    </div>
                    <div className="mr-3">
                      <h3 className="font-medium text-gray-900 dark:text-white">{activeConversation.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{activeConversation.manager.name}</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900/50">
                  {loading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                  ) : error ? (
                    <div className="flex items-center justify-center h-full p-4">
                      <div className="text-red-500 dark:text-red-400 text-center">
                        <p>حدث خطأ أثناء تحميل الرسائل</p>
                        <p className="text-sm mt-2">{error}</p>
                      </div>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full p-4">
                      <div className="text-center text-gray-500 dark:text-gray-400">
                        <FaComments className="mx-auto text-3xl mb-2" />
                        <p>لا توجد رسائل بعد</p>
                        <p className="text-sm mt-1">ابدأ بكتابة رسالة جديدة</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${message.from === 'parent' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs md:max-w-md lg:max-w-lg rounded-2xl px-4 py-2 ${
                              message.from === 'parent'
                                ? 'bg-blue-500 text-white rounded-br-none'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                            <p className={`text-xs mt-1 ${message.from === 'parent' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                              {new Date(message.timestamp).toLocaleTimeString('ar-SA', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="اكتب رسالتك..."
                      className="flex-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-2xl py-3 px-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows="1"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="mr-2 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <FaPaperPlane />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile back button when no conversation is selected */}
        {!activeConversation && (
          <div className="md:hidden p-4 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
            اختر مدرسة من القائمة لبدء المحادثة
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ChatPage;