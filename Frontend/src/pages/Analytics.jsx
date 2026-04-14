import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import ChartBox from "../components/ChartBox";
import Table from "../components/Table";
import { getExpenses } from "../services/api";

function Analytics() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    getExpenses().then(res => setExpenses(res.data));
  }, []);

  // 🔥 Stats
  const total = expenses.reduce((s, e) => s + (e.amount || 0), 0);
  const count = expenses.length;

  // 🔥 Chart data (group by date)
  const chartData = expenses.map(e => ({
    name: e.date,
    amount: e.amount
  }));

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">

        {/* 🔥 TOP CARDS */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard title="Total Expenses" value={`₹${total}`} />
          <StatCard title="Transactions" value={count} />
          <StatCard title="Average" value={`₹${Math.floor(total / (count || 1))}`} />
          <StatCard title="Max Expense" value={`₹${Math.max(...expenses.map(e => e.amount || 0), 0)}`} />
        </div>

        {/* 🔥 CHART */}
        <div className="mb-6">
          <ChartBox data={chartData} />
        </div>

        {/* 🔥 TABLE */}
        <Table data={expenses} />

      </div>
    </div>
  );
}

export default Analytics;