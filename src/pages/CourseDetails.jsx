import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAuthenticated, getUser } from "../utils/auth"; 
import { toast } from "react-hot-toast";
import CourseVideo from "../components/CourseVideo.jsx";
import { fetchCourseById } from "../services/courseApi";
import { createCheckoutSession } from "../services/payment";
import { fetchMyEnrollments } from "../services/enrollment";
import CourseDetailsSkeleton from "../components/skeletons/CourseDetailsSkeleton.jsx";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getUser(); 

  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);


  const learningOutcomes = [
    "Master core concepts and advanced techniques",
    "Build real-world projects from scratch",
    "Understand industry best practices and patterns",
    "Debug and optimize your code efficiently",
    "Collaborate effectively in modern development teams",
    "Prepare for technical interviews with confidence"
  ];
  console.log("Current User:", user);

  useEffect(() => {
    async function loadCourse() {
      try {
        const data = await fetchCourseById(id);
        setCourse(data);
      } catch (err) {
        console.error(err);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    }
    loadCourse();
  }, [id]);

  useEffect(() => {
    async function checkEnrollment() {
      if (!isAuthenticated() || user?.role === "instructor") return;
      
      try {
        const enrollments = await fetchMyEnrollments();
        const enrolled = enrollments.some((e) => e.course?._id === id);
        setIsEnrolled(enrolled);
      } catch (err) {
        console.error("Enrollment check failed", err);
      }
    }
    checkEnrollment();
  }, [id, user]);

  if (loading) {
    return <CourseDetailsSkeleton />;
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white">
        Course not found
      </div>
    );
  }

  const handleEnroll = async () => {
    if (!isAuthenticated()) {
      toast.error("Please login to enroll");
      navigate("/login", { state: { from: `/courses/${course._id}` } });
      return;
    }
    
    if (user?.role === "instructor") {
      toast.error("Instructors cannot enroll in courses.");
      return;
    }

    if (isEnrolled) {
      navigate("/dashboard");
      return;
    }
    try {
      const response = await createCheckoutSession({
        courseId: course._id,
        title: course.title,
        price: course.price,
      });
      const url = response.checkoutUrl || response.sessionUrl;
      if (url) window.location.href = url;
      else toast.error("Invalid payment URL received");
    } catch (error) {
      console.error(error);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-slate-900 min-h-screen transition-colors duration-300 pb-20">
      
      <Link
        to="/courses"
        className="fixed top-6 left-6 z-50 flex items-center gap-3 px-5 py-3 
                   bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-gray-200/50 dark:border-slate-700/50
                   text-gray-700 dark:text-gray-200 text-sm font-bold rounded-full 
                   shadow-lg hover:scale-105 transition-all duration-300"
      >
        <span>← Back to Courses</span>
      </Link>

      <div className="relative w-full h-[50vh] min-h-[400px]">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-gray-50 dark:to-slate-900" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 -mt-32">
        
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl border border-gray-100 dark:border-slate-700/50 mb-10">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div className="flex-1">
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-wider text-blue-600 uppercase bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400 rounded-full border border-blue-100 dark:border-blue-500/20">
                  {course.category || "Development"}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-2">
                {course.title}
              </h1>
            </div>
            <div className="flex flex-col items-end shrink-0">
               <div className="text-4xl font-black text-green-600 dark:text-green-400">
                ₹{course.price}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 pt-10 border-t border-gray-100 dark:border-slate-700">
             <MetaItem icon="🕒" label="Duration" value={course.duration || "Self-Paced"} />
             <MetaItem icon="📊" label="Level" value={course.level || "Beginner"} />
             <MetaItem icon="🎓" label="Students" value="1.2k+ Enrolled" />
             <MetaItem icon="⭐" label="Rating" value="4.8/5.0" />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            {/* ABOUT SECTION */}
            <section className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-700">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">About this course</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {course.description || "This course will help you gain hands-on experience and build real-world skills."}
              </p>
            </section>

            {/* WHAT YOU'LL LEARN SECTION */}
            <section className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-700 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                 <svg className="w-32 h-32 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/></svg>
               </div>
               
               <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-3">
                 <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                 </span>
                 What you'll learn
               </h2>
               
               <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4 relative z-10">
                 {learningOutcomes.map((item, index) => (
                   <div key={index} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors duration-200">
                     <div className="mt-1 flex-shrink-0">
                       <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                       </svg>
                     </div>
                     <span className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed">{item}</span>
                   </div>
                 ))}
               </div>
            </section>

            <div className="space-y-10">
              {/* VIDEO PREVIEW */}
              {course.videoUrl && (
                 <div className="rounded-3xl p-8 bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-slate-700">
                   <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                      <span>🎬</span> Course Preview
                   </h2>
                   <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-slate-700">
                     <CourseVideo 
                        videoUrl={course.videoUrl} 
                        courseId={course._id} 
                        isStudent={user?.role?.toLowerCase() === "student" && isEnrolled}                        
                     />
                   </div>
                 </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1 space-y-8">
            <section className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 text-center relative overflow-hidden">
              <div className="relative z-10 pt-4">
                <img
                    src={course.instructor?.avatar || "https://i.pravatar.cc/150"}
                    alt="Instructor"
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-white dark:border-slate-800 shadow-md"
                />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {course.instructor?.name || "Expert Instructor"}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm mb-4">Course Instructor</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed px-2">
                    {course.instructor?.bio || "Experienced professional with a passion for teaching."}
                </p>
              </div>
            </section>

            <div className="sticky bottom-6 lg:bottom-auto lg:top-24 z-30">
               <div className="bg-white/80 dark:bg-slate-800/90 backdrop-blur-xl border border-gray-200/50 dark:border-slate-600 rounded-3xl p-6 shadow-xl">
                  
                  {/* Status Badge - Hide for instructors */}
                  {user?.role !== "instructor" && (
                    <div className="flex justify-between items-center mb-6">
                      <p className="font-medium text-gray-500 dark:text-gray-400">Status</p>
                      <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide ${
                          isEnrolled 
                          ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" 
                          : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
                      }`}>
                        {isEnrolled ? "Enrolled" : "Open"}
                      </span>
                    </div>
                  )}

                  {user?.role === "instructor" ? (
                    <button
                      onClick={() => navigate("/dashboard/instructor")}
                      className="w-full py-4 rounded-xl text-white font-bold text-lg transition-all shadow-lg hover:scale-[1.02] bg-gradient-to-r from-green-600 to-emerald-600"
                    >
                      Go to Instructor Dashboard
                    </button>
                  ) : (
                    <button
                      onClick={() => isEnrolled ? navigate("/dashboard") : handleEnroll()}
                      className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all shadow-lg hover:scale-[1.02] ${
                        isEnrolled
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600"
                          : "bg-gradient-to-r from-green-600 to-emerald-600"
                      }`}
                    >
                      {isEnrolled ? "Go to Dashboard" : `Enroll Now`}
                    </button>
                  )}
               </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function MetaItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
        <p className="font-bold text-gray-900 dark:text-white text-base">{value}</p>
      </div>
    </div>
  );
}