import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { Calendar } from "lucide-react";

const COLORS = ["#FFB74D", "#FF9800", "#F57C00", "#FB8C00", "#FFA726"];

const PremiumDashboard = () => {
  const [insights, setInsights] = useState([]);
  const [sampleData, setSampleData] = useState([]);

  useEffect(() => {
    axios("https://smart-bills-orcin.vercel.app/aiMonthly").then((res) =>
      setInsights(res?.data)
    );
    axios("https://smart-bills-orcin.vercel.app/analytics").then((res) => {
      // console.log(res?.data);
      setSampleData(res?.data);
    });
  }, []);

  return (
    <div className="w-full px-4 py-16 space-y-20">
      <div className="w-11/12 mx-auto border-b h-2 mb-7 mt-5 opacity-30 border-amber-500 border-dashed shadow-lg shadow-amber-500/40"></div>
      {/* Analytics Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <div className="mb-7 flex justify-center items-center gap-2">
          <Calendar className="text-amber-300 text-2xl" />
          <h2
            className="text-4xl font-extrabold
    bg-gradient-to-r from-orange-300 via-yellow-300 to-amber-400 
    bg-clip-text text-transparent 
    drop-shadow-[0_4px_15px_rgba(255,181,100,0.45)]"
          >
            Monthly Analytics
          </h2>
        </div>

        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={sampleData}
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sampleData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-col justify-center space-y-4 text-white">
              <h3 className="text-2xl font-bold">Spending Summary</h3>
              {sampleData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex justify-between bg-white/10 px-4 py-3 rounded-xl backdrop-blur-md border border-white/20 shadow-md"
                >
                  <span className="font-medium">{item.name}</span>
                  <span className="font-bold">$ {item.value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* AI Insights Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-11/12 mx-auto"
      >
        <div className="border-b h-2 mb-7 mt-5 opacity-30 border-amber-500 border-dashed shadow-lg shadow-amber-500/40"></div>
        <div className="flex justify-center mb-8 items-center gap-2 ">
          <img
            className="w-12 rounded-2xl"
            src={
              "https://i.ibb.co.com/Rp8gtTKj/Chat-GPT-Image-Dec-3-2025-11-47-12-AM.png"
            }
            alt=""
          />
          <h2
            className=" text-4xl font-extrabold text-center 
    bg-gradient-to-r from-orange-300 via-yellow-300 to-amber-400 
    bg-clip-text text-transparent 
    drop-shadow-[0_4px_15px_rgba(255,181,100,0.45)]"
          >
            AI Insights
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-neumorphic hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-xl font-bold mb-2 text-white">
                {insight.title}
              </h3>
              <p className="text-white/80">{insight.message}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PremiumDashboard;
