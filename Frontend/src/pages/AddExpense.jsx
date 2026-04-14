import { useState } from "react";
import { addExpense } from "../services/api";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function AddExpense() {
  const [form, setForm] = useState({
    amount: "",
    description: "",
    category: "",
    date: ""
  });

  const handleSubmit = async () => {
    await addExpense(form);
    alert("Added");
  };

  return (
    <div className="p-4 space-y-2">
      <Input placeholder="Amount" onChange={e => setForm({...form, amount: e.target.value})} />
      <Input placeholder="Description" onChange={e => setForm({...form, description: e.target.value})} />
      <Button onClick={handleSubmit}>Add</Button>
    </div>
  );
}

export default AddExpense;