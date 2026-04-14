import { useEffect, useState } from "react";
import { getExpenses } from "../services/api";
import BalancedCard from "../components/BalancedCard";
import TransactionItem from "../components/TransactionItem";
import BottomNav from "../components/BottomNav";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    getExpenses().then(res => setExpenses(res.data));
  }, []);

  // 🔥 total balance
  const total = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);

  return (
    <div className="p-4 pb-20 bg-gray-100 min-h-screen space-y-6">

      {/* 🔥 HEADER */}
      <div>
        <h2 className="text-lg text-gray-500">Hello,</h2>
        <h1 className="text-2xl font-bold">Ayaan 👋</h1>
      </div>

      {/* 🔥 BALANCE */}
      <BalancedCard total={total} />

      {/* 🔥 UPCOMING (mock for now) */}
      <div>
        <div className="flex justify-between mb-2">
          <h3 className="font-semibold">Upcoming Payment</h3>
          <span className="text-sm text-gray-500">See all</span>
        </div>

        <div className="flex gap-3 overflow-x-auto">
          <div className="bg-purple-500 text-white p-4 rounded-xl min-w-[150px]">
            Netflix<br />₹500/month
          </div>
          <div className="bg-white p-4 rounded-xl min-w-[150px] shadow">
            Spotify<br />₹199/month
          </div>
        </div>
      </div>

      {/* 🔥 RECENT TRANSACTIONS */}
      <div>
        <div className="flex justify-between mb-2">
          <h3 className="font-semibold">Recent Transactions</h3>
        </div>

        <div className="space-y-3">
          {expenses.map(e => (
            <TransactionItem key={e.uid} item={e} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

export default Dashboard;