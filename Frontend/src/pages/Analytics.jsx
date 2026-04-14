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
  }, []);

  // 🔥 Toggle theme
  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  // 🔥 Stats
  const total = expenses.reduce((s, e) => s + (e.amount || 0), 0);

  const chartData = expenses.map(e => ({
    name: e.date,
    amount: e.amount
  }));

  // 🔥 Category breakdown
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
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">

      {/* 🔥 SIDEBAR */}
      <div className="w-64 bg-white dark:bg-gray-800 p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-6">Finance</h2>

        <div className="space-y-4">
          <div className="flex items-center gap-2 p-2 bg-gray-200 dark:bg-gray-700 rounded">
            <LayoutDashboard size={18} /> Dashboard
          </div>
          <div className="flex items-center gap-2">
            <ShoppingCart size={18} /> Expenses
          </div>
          <div className="flex items-center gap-2">
            <Users size={18} /> Users
          </div>
        </div>
      </div>

      {/* 🔥 MAIN CONTENT */}
      <div className="flex-1 p-6 space-y-6">

        {/* 🔥 TOP BAR */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Analytics
          </h1>

          <button onClick={toggleTheme}>
            {dark ? <Sun /> : <Moon />}
          </button>
        </div>

        {/* 🔥 STATS */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
            <p>Total</p>
            <h2 className="text-xl font-bold">₹{total}</h2>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
            <p>Transactions</p>
            <h2>{expenses.length}</h2>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
            <p>Max</p>
            <h2>
              ₹{Math.max(...expenses.map(e => e.amount || 0), 0)}
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
            <p>Avg</p>
            <h2>
              ₹{Math.floor(total / (expenses.length || 1))}
            </h2>
          </div>
        </div>

        {/* 🔥 CHARTS */}
        <div className="grid grid-cols-2 gap-6">

          {/* BAR CHART */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
            <h3 className="mb-2">Spending Trend</h3>

            <BarChart width={400} height={250} data={chartData}>
              <XAxis dataKey="name" />
              <Tooltip />
              <Bar dataKey="amount" fill="#6366f1" />
            </BarChart>
          </div>

          {/* PIE CHART */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
            <h3 className="mb-2">Category Breakdown</h3>

            <PieChart width={300} height={250}>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

        </div>

        {/* 🔥 TABLE */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <h3 className="mb-4">Recent Transactions</h3>

          {expenses.map(e => (
            <div key={e.uid} className="flex justify-between border-b py-2">
              <div>
                <p>{e.description}</p>
                <p className="text-sm text-gray-500">{e.category}</p>
              </div>
              <p className="font-bold">₹{e.amount}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Analytics;