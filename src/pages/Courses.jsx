import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import CourseCardSkeleton from "../components/skeletons/CourseCardSkeleton";
import { fetchCourses } from "../services/courseApi";
import ChatbotWidget from "../components/chatbot/ChatbotWidget";
import { getUser } from "../utils/auth";

export default function Courses() {
  const user = getUser();
  const [params, setParams] = useSearchParams();
  const searchFromURL = params.get("search") || "";

  const [search, setSearch] = useState(searchFromURL);
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");
  const [duration, setDuration] = useState("All");
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await fetchCourses(search);
        setCourses(data);
      } catch (error) {
        console.error("Failed to load courses", error);
      } finally {
        setLoading(false);
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  useEffect(() => {
    if (search) setParams({ search });
    else setParams({});
  }, [search, setParams]);

  const filteredCourses = courses
    .filter((course) => {
      const isCategoryMatch = category === "All" || course.category === category;
      const isLevelMatch = level === "All" || course.level === level;
      const isDurationMatch = duration === "All" || course.duration === duration;
      return isCategoryMatch && isLevelMatch && isDurationMatch;
    })
    .sort((a, b) => (sort === "title" ? a.title.localeCompare(b.title) : 0));

  const SelectIcon = () => (
    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
    </div>
  );

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300 pt-24 pb-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-96 bg-blue-500/5 dark:bg-blue-900/10 -skew-y-3 origin-top-left pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
            Explore Our <span className="text-blue-600 dark:text-blue-400">Catalog</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Browse expert-led courses and find the perfect path for your next learning adventure.</p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 p-4 md:p-6 mb-12">
          
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input
              type="text"
              name="catalog-search"
              id="catalog-search"   
              placeholder="Search by title or instructor"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 transition-shadow text-lg"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: category, set: setCategory, label: "Category", options: ["All", "Web Development", "Backend Development", "Database", "AI & ML", "DevOps", "Cloud Computing"] },
              { value: level, set: setLevel, label: "Level", options: ["All", "Beginner", "Intermediate", "Advanced"] },
              { value: duration, set: setDuration, label: "Duration", options: ["All", "2 weeks", "3 weeks", "4 weeks", "5 weeks", "6 weeks", "8 weeks", "10 weeks", "12 weeks"] },
              { value: sort, set: setSort, label: "Sort By", options: ["default", "title"] },
            ].map((item, i) => (
              <div key={i} className="relative group">
                <label htmlFor={item.label} className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 ml-1 uppercase tracking-wider">
                  {item.label}
                </label>
                <div className="relative">
                  <select
                    id={item.label}   
                    name={item.label} 
                    value={item.value}
                    onChange={(e) => item.set(e.target.value)}
                    className="w-full appearance-none pl-4 pr-10 py-3 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-200 font-medium border border-gray-200 dark:border-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer hover:bg-white dark:hover:bg-slate-700 transition-colors"
                  >
                    {item.options.map((opt) => (
                      <option key={opt} value={opt}>{opt === "default" ? "Popularity" : opt}</option>
                    ))}
                  </select>
                  <SelectIcon />
                </div>
              </div>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => <CourseCardSkeleton key={i} />)}
          </div>
        ) : (
          <>
            {filteredCourses.length > 0 ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map((course) => (
                  <Link to={`/courses/${course._id}`} key={course._id} className="block h-full group transform hover:-translate-y-1 transition-all duration-300">
                    <CourseCard course={course} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center opacity-75">
                <div className="bg-gray-100 dark:bg-slate-800 p-6 rounded-full mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No courses found</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm">We couldn't find any courses matching "{search}".</p>
                <button onClick={() => { setSearch(""); setCategory("All"); setLevel("All"); setDuration("All"); }} className="mt-6 text-blue-600 font-semibold hover:underline">Clear all filters</button>
              </div>
            )}
          </>
        )}
      </div>
      <ChatbotWidget user={user} />
    </section>
  );
}