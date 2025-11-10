// Mock API service for school data
const SCHOOL_API_ENDPOINT = '/api/schools';
const ACTIVITIES_API_ENDPOINT = '/api/activities';
const ACHIEVEMENTS_API_ENDPOINT = '/api/achievements';
const POSTS_API_ENDPOINT = '/api/posts';

// Mock data
const mockSchoolData = {
  id: 'school_001',
  name: 'مدرسة الأمل النموذجية',
  type: 'ابتدائية',
  gender: 'بنين',
  ownership: 'خاصة',
  region: 'الرياض',
  location: 'حي المروج، شارع الأمير سلطان',
  establishedYear: '2010',
  contactInfo: {
    phone: '+966 11 123 4567',
    email: 'info@amal-school.edu.sa',
    website: 'https://www.amal-school.edu.sa'
  },
  description: 'مدرسة الأمل النموذجية تقدم تعليماً متميزاً للطلاب من جميع الأعمار، مع تركيز على التطوير الشامل للطالب وتحقيق التميز الأكاديمي. نسعى دائماً لتقديم بيئة تعليمية محفزة وآمنة تتيح للطلاب اكتشاف مهاراتهم وتنمية قدراتهم.',
  coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
  logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
  achievements: [
    { 
      id: 1, 
      title: 'الفوز في مسابقة الرياضيات على مستوى المدينة', 
      description: 'فريق مدرسة الأمل يفوز بالمرتبة الأولى في مسابقة الرياضيات',
      image: 'https://images.unsplash.com/photo-1570572740437-0d0a04bde0a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      date: '2023-10-15' 
    },
    { 
      id: 2, 
      title: 'مشاركة الطلاب في معرض العلوم الوطني', 
      description: 'طلاب المدرسة يشاركون في معرض العلوم الوطني بالرياض',
      image: 'https://images.unsplash.com/photo-1570572740437-0d0a04bde0a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      date: '2023-09-20' 
    }
  ],
  activities: [
    { 
      id: 1, 
      title: 'رحلة تعليمية لمتحف العلوم', 
      description: 'رحلة تعليمية لطلاب الصف الخامس إلى متحف العلوم بالرياض',
      images: [
        'https://images.unsplash.com/photo-1570572740437-0d0a04bde0a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1570572740437-0d0a04bde0a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
      ],
      date: '2023-10-05',
      location: 'متحف العلوم، الرياض'
    },
    { 
      id: 2, 
      title: 'اليوم المفتوح للآباء', 
      description: 'تنظيم يوم مفتوح للآباء لزيارة فصول الطلاب',
      images: [
        'https://images.unsplash.com/photo-1570572740437-0d0a04bde0a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
      ],
      date: '2023-09-15',
      location: 'مبنى المدرسة'
    }
  ]
};

const mockPosts = [
  {
    id: 1,
    text: 'نشكر جميع أولياء الأمور على مشاركتهم في اليوم المفتوح الذي أقيم الأسبوع الماضي. كانت تجربة رائعة لجميع الطلاب والمعلمين.',
    images: [
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
    ],
    timestamp: '2023-10-15T10:30:00Z',
    likes: 42,
    comments: 8,
    liked: false
  },
  {
    id: 2,
    text: 'تهانينا لطلابنا على حصولهم على المرتبة الأولى في مسابقة العلوم على مستوى المدينة. نفخر بكم جميعاً!',
    images: [],
    timestamp: '2023-10-10T14:15:00Z',
    likes: 87,
    comments: 15,
    liked: true
  }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// School API functions
export const schoolService = {
  // Get school data
  async getSchoolData(schoolId) {
    await delay(800); // Simulate network delay
    return mockSchoolData;
  },

  // Update school data
  async updateSchoolData(schoolId, data) {
    await delay(1000); // Simulate network delay
    // In a real app, this would make an API call
    return { success: true, data };
  },

  // Get activities
  async getActivities(schoolId) {
    await delay(500); // Simulate network delay
    return mockSchoolData.activities;
  },

  // Add activity
  async addActivity(schoolId, activity) {
    await delay(700); // Simulate network delay
    const newActivity = {
      id: Date.now(),
      ...activity
    };
    mockSchoolData.activities.unshift(newActivity);
    return { success: true, activity: newActivity };
  },

  // Update activity
  async updateActivity(schoolId, activityId, activity) {
    await delay(700); // Simulate network delay
    const index = mockSchoolData.activities.findIndex(a => a.id === activityId);
    if (index !== -1) {
      mockSchoolData.activities[index] = { ...mockSchoolData.activities[index], ...activity };
      return { success: true, activity: mockSchoolData.activities[index] };
    }
    return { success: false, error: 'Activity not found' };
  },

  // Delete activity
  async deleteActivity(schoolId, activityId) {
    await delay(500); // Simulate network delay
    mockSchoolData.activities = mockSchoolData.activities.filter(a => a.id !== activityId);
    return { success: true };
  },

  // Get achievements
  async getAchievements(schoolId) {
    await delay(500); // Simulate network delay
    return mockSchoolData.achievements;
  },

  // Add achievement
  async addAchievement(schoolId, achievement) {
    await delay(700); // Simulate network delay
    const newAchievement = {
      id: Date.now(),
      ...achievement
    };
    mockSchoolData.achievements.unshift(newAchievement);
    return { success: true, achievement: newAchievement };
  },

  // Update achievement
  async updateAchievement(schoolId, achievementId, achievement) {
    await delay(700); // Simulate network delay
    const index = mockSchoolData.achievements.findIndex(a => a.id === achievementId);
    if (index !== -1) {
      mockSchoolData.achievements[index] = { ...mockSchoolData.achievements[index], ...achievement };
      return { success: true, achievement: mockSchoolData.achievements[index] };
    }
    return { success: false, error: 'Achievement not found' };
  },

  // Delete achievement
  async deleteAchievement(schoolId, achievementId) {
    await delay(500); // Simulate network delay
    mockSchoolData.achievements = mockSchoolData.achievements.filter(a => a.id !== achievementId);
    return { success: true };
  }
};

// Posts API functions
export const postsService = {
  // Get posts
  async getPosts(schoolId) {
    await delay(500); // Simulate network delay
    return mockPosts;
  },

  // Add post
  async addPost(schoolId, post) {
    await delay(700); // Simulate network delay
    const newPost = {
      id: Date.now(),
      ...post,
      likes: 0,
      comments: 0,
      liked: false
    };
    mockPosts.unshift(newPost);
    return { success: true, post: newPost };
  },

  // Update post
  async updatePost(schoolId, postId, post) {
    await delay(700); // Simulate network delay
    const index = mockPosts.findIndex(p => p.id === postId);
    if (index !== -1) {
      mockPosts[index] = { ...mockPosts[index], ...post };
      return { success: true, post: mockPosts[index] };
    }
    return { success: false, error: 'Post not found' };
  },

  // Delete post
  async deletePost(schoolId, postId) {
    await delay(500); // Simulate network delay
    mockPosts = mockPosts.filter(p => p.id !== postId);
    return { success: true };
  },

  // Like post
  async likePost(schoolId, postId) {
    await delay(300); // Simulate network delay
    const post = mockPosts.find(p => p.id === postId);
    if (post) {
      post.liked = !post.liked;
      post.likes = post.liked ? post.likes + 1 : post.likes - 1;
      return { success: true, liked: post.liked, likes: post.likes };
    }
    return { success: false, error: 'Post not found' };
  }
};

export default { schoolService, postsService };