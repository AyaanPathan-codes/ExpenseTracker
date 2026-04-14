import { BarChart, Bar, XAxis, Tooltip } from "recharts";

function ChartBox({ data }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <h3 className="mb-2 font-semibold">Sales</h3>

      <BarChart width={400} height={200} data={data}>
        <XAxis dataKey="name" />
        <Tooltip />
        <Bar dataKey="amount" fill="#6366f1" />
      </BarChart>
    </div>
  );
}

export default ChartBox;