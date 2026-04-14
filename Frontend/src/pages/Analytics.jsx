import { useEffect, useState } from "react";
import { getExpenses } from "../services/api";
import {
  BarChart, Bar, XAxis, Tooltip,
  PieChart, Pie, Cell
} from "recharts";
import {
  LayoutDashboard, ShoppingCart, Users, Sun, Moon
} from "lucide-react";

function Analytics() {
  const [expenses, setExpenses] = useState([]);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    getExpenses().then(res => setExpenses(res.data));

    // 🔥 load theme from localStorage
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  // ✅ FIXED TOGGLE
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");

    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDark(true);
    }
  };

  // 🔥 STATS
  const total = expenses.reduce((s, e) => s + (e.amount || 0), 0);

  const chartData = expenses.map(e => ({
    name: e.date,
    amount: e.amount
  }));

  // 🔥 CATEGORY
  const categoryMap = {};
  expenses.forEach(e => {
    categoryMap[e.category] =
      (categoryMap[e.category] || 0) + e.amount;
  });

  const pieData = Object.keys(categoryMap).map(key => ({
    name: key,
    value: categoryMap[key]
  }));

  const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

  return (
    <div className="flex min-h-screen bg-[#f5f6fa] dark:bg-[#0f172a] transition-all">

      {/* 🔥 SIDEBAR */}
      <div className="w-64 bg-white dark:bg-[#111827] p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
          Business
        </h2>

        <div className="space-y-4">
          <div className="flex items-center gap-2 p-2 bg-gray-200 dark:bg-gray-700 rounded">
            <LayoutDashboard size={18} /> Analytics
          </div>

          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <ShoppingCart size={18} /> Products
          </div>

          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Users size={18} /> Users
          </div>
        </div>
      </div>

      {/* 🔥 MAIN */}
      <div className="flex-1 p-6 space-y-6">

        {/* 🔥 TOP BAR */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Analytics
          </h1>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            {dark ? <Sun /> : <Moon />}
          </button>
        </div>

        {/* 🔥 STATS */}
        <div className="grid grid-cols-4 gap-5">

          <div className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl shadow-sm">
            <p className="text-gray-500 text-sm">Total</p>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              ₹{total}
            </h2>
          </div>

          <div className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl shadow-sm">
            <p className="text-gray-500 text-sm">Transactions</p>
            <h2 className="text-2xl font-bold">{expenses.length}</h2>
          </div>

          <div className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl shadow-sm">
            <p className="text-gray-500 text-sm">Max</p>
            <h2 className="text-2xl font-bold">
              ₹{Math.max(...expenses.map(e => e.amount || 0), 0)}
            </h2>
          </div>

          <div className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl shadow-sm">
            <p className="text-gray-500 text-sm">Avg</p>
            <h2 className="text-2xl font-bold">
              ₹{Math.floor(total / (expenses.length || 1))}
            </h2>
          </div>

        </div>

        {/* 🔥 CHARTS */}
        <div className="grid grid-cols-2 gap-6">

          {/* BAR */}
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm">
            <h3 className="mb-4 text-gray-700 dark:text-white">
              Sales Dynamics
            </h3>

            <BarChart width={400} height={250} data={chartData}>
              <XAxis dataKey="name" />
              <Tooltip />
              <Bar dataKey="amount" fill="#6366f1" />
            </BarChart>
          </div>

          {/* PIE */}
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm">
            <h3 className="mb-4 text-gray-700 dark:text-white">
              Category Breakdown
            </h3>

            <PieChart width={300} height={250}>
              <Pie data={pieData} dataKey="value" outerRadius={80}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

        </div>

        {/* 🔥 TABLE */}
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm">
          <h3 className="mb-4 text-gray-700 dark:text-white">
            Recent Transactions
          </h3>

          {expenses.map(e => (
            <div key={e.uid} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
              <div>
                <p className="text-gray-800 dark:text-white">{e.description}</p>
                <p className="text-sm text-gray-500">{e.category}</p>
              </div>
              <p className="font-bold text-red-500">₹{e.amount}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Analytics;