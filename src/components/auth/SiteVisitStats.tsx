// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { getSiteVisitStats } from "@/core/server/server-actions/site-visits";
// import { AnimatePresence, motion } from "framer-motion";
// import { Activity, BarChart, ChevronUp, Eye, Users } from "lucide-react";
// import { useEffect, useState } from "react";

// const Modal = ({ isOpen, onClose, children }) => (
//   <AnimatePresence>
//     {isOpen && (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 bg-white/90 backdrop-blur-md flex items-center justify-center z-50"
//         onClick={onClose}
//       >
//         <motion.div
//           initial={{ scale: 0.95, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.95, opacity: 0 }}
//           transition={{ type: "spring", damping: 20 }}
//           className="bg-white text-gray-900 p-8 rounded-lg shadow-xl max-w-2xl w-full mx-4"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {children}
//         </motion.div>
//       </motion.div>
//     )}
//   </AnimatePresence>
// );

// const StatCard = ({ title, value, icon: Icon, delay }) => (
//   <motion.div
//     initial={{ y: 50, opacity: 0 }}
//     animate={{ y: 0, opacity: 1 }}
//     transition={{ delay, duration: 0.6 }}
//   >
//     <Card className="overflow-hidden bg-white text-gray-900 border border-gray-200 shadow-sm rounded-md">
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
//         <CardTitle className="text-lg font-semibold">{title}</CardTitle>
//         <Icon className="h-6 w-6 text-gray-400" />
//       </CardHeader>
//       <CardContent>
//         <motion.div
//           initial={{ scale: 0.85 }}
//           animate={{ scale: 1 }}
//           transition={{ type: "spring", stiffness: 100, delay: delay + 0.2 }}
//           className="text-3xl font-bold"
//         >
//           {value}
//         </motion.div>
//         <Progress value={value % 100} className="mt-4 bg-blue-300" />
//       </CardContent>
//     </Card>
//   </motion.div>
// );

// const LoadingSkeleton = () => (
//   <div className="space-y-4">
//     <div className="h-8 bg-gray-300 rounded animate-pulse" />
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       {[0, 1].map((i) => (
//         <div key={i} className="h-32 bg-gray-300 rounded animate-pulse" />
//       ))}
//     </div>
//     <div className="h-64 bg-gray-300 rounded animate-pulse" />
//   </div>
// );

// export default function SiteVisitStats() {
//   const [stats, setStats] = useState(null);
//   const [error, setError] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     async function fetchStats() {
//       try {
//         const data = await getSiteVisitStats();
//         setStats(data);
//       } catch (err) {
//         setError("Failed to load statistics");
//         console.error(err);
//       }
//     }
//     fetchStats();
//   }, []);

//   const StatsContent = () => (
//     <div className="space-y-10">
//       <motion.h2
//         initial={{ y: -40, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         className="text-4xl font-extrabold text-center text-gray-800"
//       >
//         Analytics Overview
//       </motion.h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <StatCard
//           title="Total Visits"
//           value={stats?.totalVisits}
//           icon={Eye}
//           delay={0.1}
//         />
//         <StatCard
//           title="Unique Visitors"
//           value={stats?.uniqueVisitors}
//           icon={Users}
//           delay={0.2}
//         />
//       </div>
//       <motion.div
//         initial={{ y: 40, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.3, duration: 0.6 }}
//       >
//         <Card className="bg-white text-gray-900 border border-gray-200 shadow-sm rounded-md">
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               <BarChart className="mr-2 h-5 w-5 text-gray-400" />
//               Top 5 Visited Pages
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ul className="space-y-3">
//               {stats?.topPaths.map((path, index) => (
//                 <motion.li
//                   key={index}
//                   initial={{ x: -30, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
//                   className="flex items-center justify-between"
//                 >
//                   <span className="text-sm text-gray-600">{path.path}</span>
//                   <span className="text-sm font-semibold">
//                     {path.count} visits
//                   </span>
//                 </motion.li>
//               ))}
//             </ul>
//           </CardContent>
//         </Card>
//       </motion.div>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1 }}
//         className="text-center text-xs text-gray-500"
//       >
//         <Activity className="inline-block mr-1 h-3 w-3" />
//         Last updated: {new Date().toLocaleString()}
//       </motion.div>
//     </div>
//   );

//   if (error) return <div className="text-red-600">Error: {error}</div>;
//   if (!stats) return <LoadingSkeleton />;

//   return (
//     <>
//       <motion.button
//         className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg"
//         whileHover={{ scale: 1.15 }}
//         whileTap={{ scale: 0.9 }}
//         onClick={() => setIsModalOpen(true)}
//       >
//         <ChevronUp className="h-6 w-6" />
//       </motion.button>

//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <StatsContent />
//       </Modal>
//     </>
//   );
// }
"use client";

import { getSiteVisitStats } from "@/core/server/server-actions/site-visits";
import { useEffect, useState } from "react";

export default function SiteVisitStats() {
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getSiteVisitStats();
        setStats(data);
      } catch (err) {
        setError("Failed to load statistics");
        console.error(err);
      }
    }
    fetchStats();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!stats) return <div>Loading stats...</div>;

  return (
    <div className="bg-section p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Site Visit Statistics</h2>
      <p className="mb-2">Total Visits: {stats.totalVisits}</p>
      <p className="mb-4">Unique Visitors: {stats.uniqueVisitors}</p>
      <h3 className="text-xl font-semibold mb-2">Top 5 Visited Pages:</h3>
      <ul>
        {stats.topPaths.map((path: any, index: number) => (
          <li key={index} className="mb-1">
            {path.path}: {path.count} visits
          </li>
        ))}
      </ul>
    </div>
  );
}
