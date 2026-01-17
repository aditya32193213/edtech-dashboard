import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSkeleton from "../components/skeletons/DashboardSkeleton"; 
import { getUser } from "../utils/auth";
import { fetchMyEnrollments } from "../services/enrollment";
import { fetchProgressByCourse } from "../services/progress.js";
import ChatbotWidget from "../components/chatbot/ChatbotWidget.jsx";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [enrollments, setEnrollments] = useState([]);
  const user = getUser();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadEnrollments() {
      try {
        const enrollmentData = await fetchMyEnrollments();

        const validEnrollments = enrollmentData.filter(item => item && item.course);

        const enriched = await Promise.all(
          validEnrollments.map(async (enrollment) => {
            try {
              const progress = await fetchProgressByCourse(enrollment.course._id);
              return {
                ...enrollment,
                completedPercentage: progress?.completedPercentage ?? 0,
              };
            } catch {
              return { ...enrollment, completedPercentage: 0 };
            }
          })
        );

        setEnrollments(enriched);
      } catch {
        setEnrollments([]);
      } finally {
        setLoading(false);
      }
    }

    loadEnrollments();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  // --- DYNAMIC STATS CALCULATION ---
  const totalCourses = enrollments.length;
  const totalProgress = totalCourses
    ? Math.round(
        enrollments.reduce((acc, curr) => acc + curr.completedPercentage, 0) / totalCourses
      )
    : 0;
  const completedCoursesCount = enrollments.filter(e => e.completedPercentage === 100).length;
  const learningHours = Math.round(
    enrollments.reduce((acc, curr) => acc + (curr.completedPercentage / 100 * 5), 0)
  );
  
  // Safe navigation for current focus
  const currentFocus = totalCourses > 0 
    ? (enrollments[0]?.course?.category || "General Learning") 
    : "Explore Courses";
    
  const activeMilestones = enrollments
    .filter(e => e.completedPercentage < 100)
    .slice(0, 2);

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300 pb-20 pt-24">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-900/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 dark:bg-indigo-900/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest border border-blue-200 dark:border-blue-800">
               👋 Welcome Back
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">{user?.name || "Learner"}</span>!
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              You've got some exciting goals to crush today. Let's get learning! 🚀
            </p>
          </div>
          
          <div className="hidden md:block text-right">
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Today's Focus</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{currentFocus}</p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          <StatCard
            title="Enrolled Courses"
            value={totalCourses}
            icon={
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            }
            color="bg-blue-500"
          />
          <StatCard
            title="Avg. Progress"
            value={`${totalProgress}%`}
            icon={
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            }
            color="bg-green-500"
          />
          <StatCard
            title="Certificates"
            value={completedCoursesCount}
            icon={
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            }
            color="bg-purple-500"
          />
          <StatCard
            title="Learning Hours"
            value={`${learningHours}h`}
            icon={
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            color="bg-orange-500"
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-800">
              <div className="flex justify-between items-center mb-8">
                <div>
                   <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                     📚 My Learning Path
                   </h2>
                   <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Continue where you left off</p>
                </div>
                <button 
                  onClick={() => navigate("/courses")}
                  className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  View All Courses →
                </button>
              </div>

              {enrollments.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-gray-200 dark:border-slate-700">
                   <div className="text-5xl mb-4">🎓</div>
                   <h3 className="text-lg font-bold text-gray-900 dark:text-white">No active courses</h3>
                   <p className="text-gray-500 dark:text-gray-400 mb-6">You haven't enrolled in any courses yet.</p>
                   <button 
                      onClick={() => navigate("/courses")}
                      className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
                   >
                     Browse Catalog
                   </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {enrollments.map((e) => (
                    <CourseRow
                      key={e._id}
                      enrollment={e}
                      onClick={() => navigate(`/courses/${e.course._id}`)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-8 text-center text-white shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="relative z-10">
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-md">🔥</div>
                <h2 className="text-lg font-bold uppercase tracking-widest opacity-90 mb-1">Current Streak</h2>
                <div className="flex justify-center items-baseline gap-2 mb-4">
                   <span className="text-6xl font-black">{totalCourses > 0 ? "1" : "0"}</span>
                   <span className="text-xl font-medium opacity-80">Day</span>
                </div>
                <p className="text-sm bg-white/20 backdrop-blur-md rounded-lg py-2 px-4 inline-block">Keep learning daily!</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-800">
               <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">🎯 Next Milestones</h3>
               <ul className="space-y-4">
                 {activeMilestones.length > 0 ? (
                   activeMilestones.map((e) => (
                     <MilestoneItem 
                       key={e._id}
                       title={`Complete ${e.course?.title ? e.course.title.substring(0, 20) : "Course"}...`} 
                       progress={`${e.completedPercentage}%`} 
                       color="bg-blue-500" 
                     />
                   ))
                 ) : (
                   <li className="text-sm text-gray-500 dark:text-gray-400 p-2 text-center">
                     {totalCourses === 0 ? "Enroll in a course to set goals" : "All caught up! 🎉"}
                   </li>
                 )}
               </ul>
            </div>
          </div>
        </div>
      </div>
      <ChatbotWidget user={user} />
    </section>
    
  );
}
function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-slate-800 flex items-center gap-5 transition-transform hover:-translate-y-1">
      <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center shadow-md shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
      </div>
    </div>
  );
}

function CourseRow({ enrollment, onClick }) {
  if (!enrollment.course) return null;

  return (
    <div
      onClick={onClick}
      className="group flex flex-col sm:flex-row gap-5 items-center p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-transparent hover:border-gray-100 dark:hover:border-slate-700"
    >
      <div className="relative w-full sm:w-24 h-40 sm:h-24 rounded-xl overflow-hidden shrink-0 shadow-sm">
        <img
          src={enrollment.course.thumbnail || "https://via.placeholder.com/150"}
          alt={enrollment.course.title || "Course"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="flex-1 w-full">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
            {enrollment.course.title}
          </h3>
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-lg">
            {enrollment.completedPercentage}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5 mb-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${enrollment.completedPercentage}%` }}
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {enrollment.completedPercentage === 100 ? (
                <span className="text-green-600 flex items-center gap-1">
                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                   Completed
                </span>
            ) : (
                <span className="group-hover:text-blue-500 transition-colors">Continue Learning</span>
            )}
        </div>
      </div>

      <div className="hidden sm:block text-gray-300 dark:text-slate-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all">
         <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
         </svg>
      </div>
    </div>
  );
}

function MilestoneItem({ title, progress, color }) {
    return (
        <li className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-slate-800/50">
            <div className={`w-3 h-3 rounded-full ${color}`} />
            <div className="flex-1">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{title}</p>
            </div>
            <span className="text-xs font-bold text-gray-400">{progress}</span>
        </li>
    )
}