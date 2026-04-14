import { useState } from "react";
import { addExpense } from "../services/api";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { CATEGORIES } from "../components/constants/Category";

function AddExpense() {
  const [form, setForm] = useState({
    amount: "",
    description: "",
    category: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔥 handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 format date to dd/MM/yyyy (backend expects this)
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
  };

  // 🔥 submit
  const handleSubmit = async () => {
    if (!form.amount || !form.description || !form.category || !form.date) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    const payload = {
      ...form,
      amount: Number(form.amount),
      date: formatDate(form.date),
    };

    try {
      await addExpense(payload);
      alert("Expense Added ✅");

      // reset form
      setForm({
        amount: "",
        description: "",
        category: "",
        date: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error adding expense");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-6 space-y-4">
          {/* 🔥 Heading */}
          <div>
            <h2 className="text-xl font-bold">Add Expense</h2>
            <p className="text-gray-500 text-sm">Track your daily spending</p>
          </div>

          {/* 🔥 Amount */}
          <Input
            name="amount"
            type="number"
            placeholder="Amount (₹)"
            value={form.amount}
            onChange={handleChange}
          />

          {/* 🔥 Description */}
          <Input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

          {/* 🔥 Category */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Category</option>

            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* 🔥 Date */}
          <Input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
          />

          {/* 🔥 Button */}
          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? "Adding..." : "Add Expense"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddExpense;
