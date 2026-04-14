
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Stats from "./pages/Stats";
import AddExpense from "./pages/AddExpense";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/add" element={<AddExpense />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App