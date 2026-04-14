import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getExpenses } from "../services/api";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    getExpenses().then(res => setExpenses(res.data));
  }, []);

  return (
    <div className="p-4 space-y-4">

      {/* Header */}
      <div>
        <h2 className="text-xl font-bold">Good Morning 👋</h2>
        <p className="text-gray-500">Your Expenses</p>
      </div>

      {/* Progress Card */}
      <Card className="bg-green-200">
        <CardContent className="p-4">
          <h3 className="font-semibold">Weekly Spending</h3>
          <p className="text-2xl font-bold">₹5000</p>
        </CardContent>
      </Card>

      {/* Expense List */}
      {expenses.map(e => (
        <Card key={e.uid}>
          <CardContent className="flex justify-between p-4">
            <div>
              <p>{e.description}</p>
              <p className="text-gray-500">{e.category}</p>
            </div>
            <p className="font-bold">₹{e.amount}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Dashboard;