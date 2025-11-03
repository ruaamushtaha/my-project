import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Search, 
  Send,
  User,
  Clock,
  Filter,
  MessageSquare,
  Users,
  GraduationCap,
  Shield
} from 'lucide-react';
import mockMessagesService from '../../../../services/mock/mockMessagesService';
import { useToast } from '@/hooks/use-toast';

const MessagesPage = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [filters, setFilters] = useState({ role: 'all', search: '' });
  const [unreadCount, setUnreadCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    loadConversations();
    loadUnreadCount();
  }, [filters]);

  const loadConversations = async () => {
    try {
      const response = await mockMessagesService.getConversations(filters);
      setConversations(response.data);
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل في تحميل الرسائل',
        variant: 'destructive'
      });
    }
  };

  const loadUnreadCount = async () => {
    try {
      const response = await mockMessagesService.getUnreadCount();
      setUnreadCount(response.data.total);
    } catch (error) {
      console.error('Failed to load unread count');
    }
  };

  const handleSelectConversation = async (conversation) => {
    try {
      const response = await mockMessagesService.getConversation(conversation.id);
      setSelectedConversation(response.data);
      loadUnreadCount();
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل في فتح المحادثة',
        variant: 'destructive'
      });
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      await mockMessagesService.sendMessage(selectedConversation.id, newMessage);
      setNewMessage('');
      const response = await mockMessagesService.getConversation(selectedConversation.id);
      setSelectedConversation(response.data);
      loadConversations();
      toast({
        title: 'نجح',
        description: 'تم إرسال الرسالة بنجاح'
      });
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل في إرسال الرسالة',
        variant: 'destructive'
      });
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'parent': return Users;
      case 'teacher': return GraduationCap;
      case 'supervisor': return Shield;
      default: return User;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'parent': return 'from-blue-500 to-indigo-600';
      case 'teacher': return 'from-emerald-500 to-green-600';
      case 'supervisor': return 'from-purple-500 to-fuchsia-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="container mx-auto" dir="rtl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          الرسائل
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          تواصل مع أولياء الأمور، المعلمين، والمشرفين
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-2xl p-4">
            {/* Stats */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary dark:text-accent" />
                <span className="font-bold text-gray-900 dark:text-white">المحادثات</span>
              </div>
              {unreadCount > 0 && (
                <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold rounded-full">
                  {unreadCount} جديد
                </span>
              )}
            </div>

            {/* Filters */}
            <div className="space-y-3 mb-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="بحث..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-full glass-card pr-10 pl-4 py-2 rounded-xl border-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <select
                value={filters.role}
                onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                className="w-full glass-card px-4 py-2 rounded-xl border-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">الكل</option>
                <option value="parent">أولياء الأمور</option>
                <option value="teacher">المعلمين</option>
                <option value="supervisor">المشرفين</option>
              </select>
            </div>

            {/* Conversations */}
            <div className="space-y-2 max-h-[calc(100vh-400px)] overflow-y-auto">
              {conversations.map((conv) => {
                const RoleIcon = getRoleIcon(conv.recipientRole);
                return (
                  <motion.div
                    key={conv.id}
                    onClick={() => handleSelectConversation(conv)}
                    className={`p-3 rounded-xl cursor-pointer transition-all ${
                      selectedConversation?.id === conv.id
                        ? 'bg-gradient-to-r from-primary/20 to-accent/20'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={conv.recipientAvatar}
                          alt={conv.recipientName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br ${getRoleColor(conv.recipientRole)} flex items-center justify-center`}>
                          <RoleIcon className="w-3 h-3 text-white" strokeWidth={2.5} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                            {conv.recipientName}
                          </h4>
                          {conv.unread > 0 && (
                            <span className="w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                          {conv.lastMessage}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          {new Date(conv.lastMessageTime).toLocaleString('ar-SA', { 
                            month: 'short', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2">
          {selectedConversation ? (
            <div className="glass-card rounded-2xl h-[calc(100vh-200px)] flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedConversation.recipientAvatar}
                    alt={selectedConversation.recipientName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {selectedConversation.recipientName}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedConversation.recipientRole === 'parent' && 'ولي أمر'}
                      {selectedConversation.recipientRole === 'teacher' && 'معلم'}
                      {selectedConversation.recipientRole === 'supervisor' && 'مشرف'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {selectedConversation.messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === 'manager' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-2xl ${
                        message.sender === 'manager'
                          ? 'bg-gradient-to-r from-primary to-accent text-white'
                          : 'glass-card'
                      }`}
                    >
                      <p className={message.sender === 'manager' ? 'text-white' : 'text-gray-900 dark:text-white'}>
                        {message.content}
                      </p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'manager' ? 'text-white/70' : 'text-gray-500'
                      }`}>
                        {new Date(message.timestamp).toLocaleTimeString('ar-SA', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="اكتب رسالتك..."
                    className="flex-1 glass-card px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-primary"
                  />
                  <motion.button
                    onClick={handleSendMessage}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 bg-gradient-to-r from-primary to-accent text-white rounded-xl flex items-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    <span className="hidden sm:inline">إرسال</span>
                  </motion.button>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-2xl h-[calc(100vh-200px)] flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">اختر محادثة للبدء</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
