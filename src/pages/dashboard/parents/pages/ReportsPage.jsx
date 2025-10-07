import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaChartBar, 
  FaBook, 
  FaStar, 
  FaClipboardList, 
  FaTrophy,
  FaUser,
  FaSchool
} from 'react-icons/fa';
import { useReportsData } from '../hooks/useReports';
import { Card, Loading } from '../components/ui';

/**
 * Component for displaying academic grades
 * مكون لعرض الدرجات الأكاديمية
 */
const GradesSection = ({ grades, loading }) => {
  // Group grades by child
  const groupedGrades = grades.reduce((acc, grade) => {
    if (!acc[grade.childId]) {
      acc[grade.childId] = {
        childName: grade.childName,
        grades: []
      };
    }
    acc[grade.childId].grades.push(grade);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <Card key={i} className="p-6">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="flex items-center justify-between py-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/6"></div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Object.values(groupedGrades).map((childData, index) => (
        <motion.div
          key={childData.childName}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <FaUser className="text-blue-500 dark:text-blue-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {childData.childName}
              </h3>
            </div>
            
            <div className="space-y-4">
              {childData.grades.map((grade) => (
                <div key={grade.id} className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-700">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{grade.subject}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{grade.teacher}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {grade.grade}/{grade.maxGrade}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        (معدل الصف: {grade.classAverage})
                      </span>
                    </div>
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(grade.grade / grade.maxGrade) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

/**
 * Component for displaying behavior and evaluation reports
 * مكون لعرض تقارير السلوك والتقييم
 */
const EvaluationsSection = ({ evaluations, loading }) => {
  // Group evaluations by child
  const groupedEvaluations = evaluations.reduce((acc, evaluation) => {
    if (!acc[evaluation.childId]) {
      acc[evaluation.childId] = {
        childName: evaluation.childName,
        evaluations: []
      };
    }
    acc[evaluation.childId].evaluations.push(evaluation);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <Card key={i} className="p-6">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
              <div className="space-y-3">
                {[1, 2].map((j) => (
                  <div key={j} className="flex items-center gap-3 py-2">
                    <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Object.values(groupedEvaluations).map((childData, index) => (
        <motion.div
          key={childData.childName}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <FaStar className="text-yellow-500 dark:text-yellow-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {childData.childName}
              </h3>
            </div>
            
            <div className="space-y-4">
              {childData.evaluations.map((evaluation) => (
                <div key={evaluation.id} className="flex items-start gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="mt-1">
                    {evaluation.type === 'behavior' ? (
                      <FaStar className="text-yellow-500" />
                    ) : (
                      <FaClipboardList className="text-green-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {evaluation.title}
                      </h4>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={`${i < Math.floor(evaluation.rating) ? 'text-yellow-400' : 'text-gray-300'} text-sm`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {evaluation.comment}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {evaluation.teacher}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(evaluation.date).toLocaleDateString('ar-SA')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

/**
 * Component for displaying performance summary
 * مكون لعرض ملخص الأداء
 */
const PerformanceSummary = ({ performance, loading }) => {
  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-3"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-3"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
          <FaChartBar className="text-green-500 dark:text-green-300" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          ملخص الأداء
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {performance.map((perf, index) => (
          <motion.div
            key={perf.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900 dark:text-white">
                {perf.childName}
              </h3>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium rounded-full">
                +{perf.improvement}%
              </span>
            </div>
            
            <div className="mb-4">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {perf.overallGrade}%
                </span>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    معدل الصف: {perf.classAverage}%
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    معدل المدرسة: {perf.schoolAverage}%
                  </p>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${perf.overallGrade}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
              <span>
                عدد المواد: {perf.subjectsCount}
              </span>
              <span>
                أفضل مادة: {perf.topSubject}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

/**
 * Component for displaying project and activity reports
 * مكون لعرض تقارير المشاريع والأنشطة
 */
const ProjectReports = ({ projects, loading }) => {
  // Group projects by child
  const groupedProjects = projects.reduce((acc, project) => {
    if (!acc[project.childId]) {
      acc[project.childId] = {
        childName: project.childName,
        projects: []
      };
    }
    acc[project.childId].projects.push(project);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <Card key={i} className="p-6">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
              <div className="space-y-4">
                {[1, 2].map((j) => (
                  <div key={j} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-3"></div>
                    <div className="flex items-center justify-between">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Object.values(groupedProjects).map((childData, index) => (
        <motion.div
          key={childData.childName}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <FaTrophy className="text-purple-500 dark:text-purple-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {childData.childName}
              </h3>
            </div>
            
            <div className="space-y-4">
              {childData.projects.map((project) => (
                <div key={project.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">
                        {project.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {project.description}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      project.status === 'completed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {project.status === 'completed' ? 'مكتمل' : 'قيد التنفيذ'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                      {project.result}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(project.date).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

/**
 * Reports Page Component
 * مكون صفحة التقارير
 */
const ReportsPage = () => {
  const { grades, evaluations, performance, projects, loading } = useReportsData();
  const [activeTab, setActiveTab] = useState('grades');

  const tabs = [
    { id: 'grades', label: 'الدرجات الأكاديمية', icon: FaBook },
    { id: 'evaluations', label: 'التقييمات والسلوك', icon: FaStar },
    { id: 'performance', label: 'ملخص الأداء', icon: FaChartBar },
    { id: 'projects', label: 'المشاريع والأنشطة', icon: FaTrophy }
  ];

  return (
    <div className="container mx-auto p-4" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg">
            <FaBook className="text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              التقارير
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              عرض جميع التقارير المتعلقة بأبنائك
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tabs Navigation */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="text-lg" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'grades' && (
          <GradesSection grades={grades} loading={loading} />
        )}
        
        {activeTab === 'evaluations' && (
          <EvaluationsSection evaluations={evaluations} loading={loading} />
        )}
        
        {activeTab === 'performance' && (
          <PerformanceSummary performance={performance} loading={loading} />
        )}
        
        {activeTab === 'projects' && (
          <ProjectReports projects={projects} loading={loading} />
        )}
      </motion.div>
    </div>
  );
};

export default ReportsPage;