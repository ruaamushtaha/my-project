/**
 * Mock Messages Service
 * Handles messaging between school manager, parents, teachers, and supervisors
 */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mockConversations = [
  {
    id: 1,
    recipientName: 'أحمد محمد العلي',
    recipientRole: 'parent',
    recipientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    lastMessage: 'شكراً لكم على المتابعة المستمرة',
    lastMessageTime: new Date(2024, 2, 14, 10, 30).toISOString(),
    unread: 2,
    messages: [
      {
        id: 1,
        sender: 'parent',
        content: 'السلام عليكم، أود الاستفسار عن مستوى ابني الدراسي',
        timestamp: new Date(2024, 2, 14, 9, 0).toISOString(),
        read: true
      },
      {
        id: 2,
        sender: 'manager',
        content: 'وعليكم السلام، نعم مستوى ابنك ممتاز ومتفوق',
        timestamp: new Date(2024, 2, 14, 9, 15).toISOString(),
        read: true
      },
      {
        id: 3,
        sender: 'parent',
        content: 'شكراً لكم على المتابعة المستمرة',
        timestamp: new Date(2024, 2, 14, 10, 30).toISOString(),
        read: false
      }
    ]
  },
  {
    id: 2,
    recipientName: 'د. فاطمة الزهراني',
    recipientRole: 'teacher',
    recipientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    lastMessage: 'سأقوم بإعداد التقرير اليوم',
    lastMessageTime: new Date(2024, 2, 13, 14, 20).toISOString(),
    unread: 0,
    messages: [
      {
        id: 1,
        sender: 'manager',
        content: 'أرجو تجهيز تقرير الأداء الشهري للطلاب',
        timestamp: new Date(2024, 2, 13, 13, 0).toISOString(),
        read: true
      },
      {
        id: 2,
        sender: 'teacher',
        content: 'سأقوم بإعداد التقرير اليوم',
        timestamp: new Date(2024, 2, 13, 14, 20).toISOString(),
        read: true
      }
    ]
  },
  {
    id: 3,
    recipientName: 'د. سارة خالد',
    recipientRole: 'supervisor',
    recipientAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    lastMessage: 'تم استلام التقرير، شكراً لكم',
    lastMessageTime: new Date(2024, 2, 12, 11, 45).toISOString(),
    unread: 1,
    messages: [
      {
        id: 1,
        sender: 'manager',
        content: 'تفضلوا التقرير الشهري المطلوب',
        timestamp: new Date(2024, 2, 12, 10, 0).toISOString(),
        read: true
      },
      {
        id: 2,
        sender: 'supervisor',
        content: 'تم استلام التقرير، شكراً لكم',
        timestamp: new Date(2024, 2, 12, 11, 45).toISOString(),
        read: false
      }
    ]
  }
];

const mockMessagesService = {
  async getConversations({ role, search, page = 1, limit = 20 }) {
    await delay(400);
    
    let filtered = [...mockConversations];
    
    if (role && role !== 'all') {
      filtered = filtered.filter(c => c.recipientRole === role);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(c => 
        c.recipientName.toLowerCase().includes(searchLower) ||
        c.lastMessage.toLowerCase().includes(searchLower)
      );
    }
    
    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);
    
    return {
      success: true,
      data: paginated,
      pagination: {
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit)
      }
    };
  },

  async getConversation(id) {
    await delay(300);
    const conversation = mockConversations.find(c => c.id === parseInt(id, 10));
    if (!conversation) {
      throw new Error('Conversation not found');
    }
    
    // Mark messages as read
    conversation.messages.forEach(msg => msg.read = true);
    conversation.unread = 0;
    
    return { success: true, data: conversation };
  },

  async sendMessage(conversationId, content) {
    await delay(500);
    const conversation = mockConversations.find(c => c.id === parseInt(conversationId, 10));
    if (!conversation) {
      throw new Error('Conversation not found');
    }
    
    const newMessage = {
      id: conversation.messages.length + 1,
      sender: 'manager',
      content,
      timestamp: new Date().toISOString(),
      read: true
    };
    
    conversation.messages.push(newMessage);
    conversation.lastMessage = content;
    conversation.lastMessageTime = newMessage.timestamp;
    
    return {
      success: true,
      data: newMessage,
      message: 'تم إرسال الرسالة بنجاح'
    };
  },

  async getUnreadCount() {
    await delay(200);
    const total = mockConversations.reduce((sum, c) => sum + c.unread, 0);
    return { success: true, data: { total } };
  },

  async searchUsers(query) {
    await delay(300);
    // Mock users list for starting new conversations
    const mockUsers = [
      { id: 1, name: 'أحمد محمد العلي', role: 'parent', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop' },
      { id: 2, name: 'د. فاطمة الزهراني', role: 'teacher', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop' },
      { id: 3, name: 'د. سارة خالد', role: 'supervisor', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop' }
    ];
    
    const filtered = query 
      ? mockUsers.filter(u => u.name.includes(query))
      : mockUsers;
    
    return { success: true, data: filtered };
  }
};

export default mockMessagesService;
