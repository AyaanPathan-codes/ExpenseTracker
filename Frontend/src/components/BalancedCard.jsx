import { Card, CardContent } from "./ui/card";

function BalancedCard({ total }) {
  return (
    <Card className="bg-gradient-to-r from-purple-400 to-indigo-400 text-white rounded-2xl">
      <CardContent className="p-6 flex justify-between items-center">
        <div>
          <p className="text-sm">Current Balance</p>
          <h2 className="text-2xl font-bold">₹{total}</h2>
        </div>
        <button className="bg-white text-black rounded-full w-10 h-10">+</button>
      </CardContent>
    </Card>
  );
}

export default BalancedCard;