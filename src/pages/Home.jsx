// import { Link, useNavigate } from "react-router-dom";
// import { useState, useEffect, useRef } from "react";
// import CourseCard from "../components/CourseCard";
// import { fetchCourses } from "../services/courseApi";

// export default function Home() {
//   const [search, setSearch] = useState("");
//   const [courses, setCourses] = useState([]);
//   const navigate = useNavigate();
//   const carouselRef = useRef(null);

//   const handleSearch = (e) => {
//     if (e.key === "Enter" && search.trim()) {
//       navigate(`/courses?search=${encodeURIComponent(search)}`);
//     }
//   };

//   useEffect(() => {
//     async function loadCourses() {
//       try {
//         const data = await fetchCourses();
//         setCourses(data.slice(0, 6)); 
//       } catch (error) {
//         console.error("Failed to fetch courses", error);
//       }
//     }
//     loadCourses();
//   }, []);

//   useEffect(() => {
//     const el = carouselRef.current;
//     const interval = setInterval(() => {
//       if (!el) return;
//       el.scrollLeft += 1;
//       if (el.scrollLeft + el.clientWidth >= el.scrollWidth) {
//         el.scrollLeft = 0;
//       }
//     }, 30);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      
//       {/* --- HERO SECTION --- */}
//       <section className="relative pt-32 pb-40 overflow-hidden">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/20 dark:bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

//         <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
//           <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide uppercase">
//             <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
//             New Courses Added Weekly
//           </div>

//           <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
//             Master New Skills with <br className="hidden md:block" />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
//               LearnPro Premium
//             </span>
//           </h1>

//           <p className="mt-6 text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
//             Unlock your potential with expert-led courses in coding, design, and business. 
//             Join over 50,000 learners achieving their goals today.
//           </p>

//           {/* Search Bar */}
//           <div className="mt-10 max-w-xl mx-auto relative group">
//             <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
//             <div className="relative bg-white dark:bg-slate-900 rounded-lg shadow-xl flex items-center p-2 border border-gray-100 dark:border-slate-800">
//                <svg className="w-6 h-6 ml-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                </svg>
//                <input
//                 type="text"
//                 name="home-search" // ✅ FIXED
//                 id="home-search"   // ✅ FIXED
//                 aria-label="Search courses" // ✅ FIXED
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 onKeyDown={handleSearch}
//                 placeholder="What do you want to learn?"
//                 className="w-full px-4 py-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none text-lg"
//               />
//               <button 
//                 onClick={() => search.trim() && navigate(`/courses?search=${encodeURIComponent(search)}`)}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md font-medium transition-colors"
//               >
//                 Search
//               </button>
//             </div>
//           </div>

//           <div className="mt-10 flex flex-wrap justify-center gap-4">
//             <Link to="/courses" className="px-8 py-3.5 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
//               🚀 Explore All Courses
//             </Link>
//             <Link to="/about" className="px-8 py-3.5 rounded-lg bg-white dark:bg-slate-800 text-gray-700 dark:text-white border border-gray-200 dark:border-slate-700 font-bold hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-200">
//               📘 How It Works
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* --- FLOATING METRICS --- */}
//       <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20">
//          <div className="grid md:grid-cols-3 gap-6">
//             <Metric icon="👨‍🎓" value="50,000+" label="Active Learners" />
//             <Metric icon="📚" value="200+" label="Expert Courses" />
//             <Metric icon="🏆" value="95%" label="Completion Rate" />
//          </div>
//       </div>

//       {/* --- FEATURED COURSES --- */}
//       <section className="bg-gray-50 dark:bg-slate-950 py-24 pt-32">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
//              <div>
//                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Courses</h2>
//                <p className="text-gray-600 dark:text-slate-400 max-w-xl text-lg">
//                  Hand-picked by our experts. Start your journey with our most popular and highly rated content.
//                </p>
//              </div>
//              <Link to="/courses" className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 flex items-center gap-1 group">
//                View All Courses <span className="group-hover:translate-x-1 transition-transform">→</span>
//              </Link>
//           </div>

//           <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//             {courses.map((course) => (
//               <Link to={`/courses/${course._id}`} key={course._id} className="group block h-full transform hover:-translate-y-2 transition-all duration-300">
//                 <CourseCard course={course} />
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* --- TESTIMONIALS --- */}
//       <section className="bg-white dark:bg-slate-900 py-24 border-t border-gray-100 dark:border-slate-800 overflow-hidden">
//         <div className="text-center max-w-3xl mx-auto px-6 mb-16">
//           <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Loved by students worldwide</h2>
//           <p className="text-gray-600 dark:text-slate-400 text-lg">
//             Don't just take our word for it. Here is what our community has to say.
//           </p>
//         </div>

//         <div ref={carouselRef} className="flex gap-8 overflow-x-hidden pb-10 px-6 mask-linear-gradient" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
//           {[...testimonials, ...testimonials].map((t, i) => (
//             <div key={i} className="min-w-[350px] bg-gray-50 dark:bg-slate-800 p-8 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
//               <div className="flex gap-1 text-yellow-400 mb-4">{"★★★★★".split("").map((star, idx) => <span key={idx}>{star}</span>)}</div>
//               <p className="text-gray-700 dark:text-gray-300 text-lg italic mb-6 leading-relaxed">"{t.text}"</p>
//               <div className="flex items-center gap-4">
//                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">{t.name.charAt(0)}</div>
//                  <div><p className="font-bold text-gray-900 dark:text-white">{t.name}</p><p className="text-sm text-gray-500 dark:text-slate-500">{t.role}</p></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* --- TRUSTED BY --- */}
//       <section className="bg-gray-50 dark:bg-slate-950 py-16 border-t border-gray-200 dark:border-slate-800">
//         <p className="text-center text-sm font-semibold text-gray-500 dark:text-slate-500 uppercase tracking-widest mb-10">Trusted by learners from top companies</p>
//         <div className="flex justify-center gap-12 flex-wrap items-center px-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
//           <Logo src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" />
//           <Logo src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" />
//           <Logo src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" />
//           <Logo src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" />
//           <Logo src="https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" />
//         </div>
//       </section>
//     </div>
//   );
// }

// function Metric({ icon, value, label }) {
//   return (
//     <div className="p-8 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-white/20 dark:border-slate-700 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:scale-105 transition-transform duration-300 text-center">
//       <div className="text-5xl mb-4 filter drop-shadow-md">{icon}</div>
//       <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-1">{value}</h3>
//       <p className="text-gray-500 dark:text-gray-400 font-medium">{label}</p>
//     </div>
//   );
// }

// function Logo({ src }) {
//   return <img src={src} alt="company logo" className="h-8 md:h-10 opacity-70 hover:opacity-100 transition-opacity duration-300" />;
// }

// const testimonials = [
//   { name: "Alex Johnson", role: "Frontend Dev", text: "The hands-on projects were a game changer. I literally built my portfolio while learning." },
//   { name: "Priya Sharma", role: "Data Analyst", text: "Incredible depth. The instructors don't just teach code, they teach how to think like an engineer." },
//   { name: "Rahul Verma", role: "AI Engineer", text: "I've used Udemy and Coursera, but the structured path here helped me land my first job." },
//   { name: "Sarah Jenkins", role: "Product Manager", text: "Clear, concise, and straight to the point. Perfect for upskilling on weekends." },
// ];











import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import CourseCard from "../components/CourseCard";
import { fetchCourses } from "../services/courseApi";
import * as Sentry from "@sentry/react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/courses?search=${encodeURIComponent(search)}`);
    }
  };

  useEffect(() => {
    async function loadCourses() {
      try {
        const data = await fetchCourses();
        setCourses(data.slice(0, 6));
      } catch (error) {
        // ✅ Send error to Sentry
        Sentry.captureException(error);
        console.error("Failed to fetch courses", error);
      }
    }
    loadCourses();
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    const interval = setInterval(() => {
      if (!el) return;
      el.scrollLeft += 1;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth) {
        el.scrollLeft = 0;
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-slate-950 transition-colors duration-300">

      {/* 🔴 TEMPORARY SENTRY TEST BUTTON (REMOVE AFTER TEST) */}
      <div className="flex justify-center pt-6">
        <button
          onClick={() => {
            throw new Error("Sentry Home Page Test Error");
          }}
          className="bg-red-600 text-white px-6 py-2 rounded-md font-semibold"
        >
          Test Sentry
        </button>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/20 dark:bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            New Courses Added Weekly
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
            Master New Skills with <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              LearnPro Premium
            </span>
          </h1>

          <p className="mt-6 text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Unlock your potential with expert-led courses in coding, design, and business.
            Join over 50,000 learners achieving their goals today.
          </p>

          {/* Search Bar */}
          <div className="mt-10 max-w-xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-slate-900 rounded-lg shadow-xl flex items-center p-2 border border-gray-100 dark:border-slate-800">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="What do you want to learn?"
                className="w-full px-4 py-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none text-lg"
              />
              <button
                onClick={() =>
                  search.trim() &&
                  navigate(`/courses?search=${encodeURIComponent(search)}`)
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md font-medium transition-colors"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
