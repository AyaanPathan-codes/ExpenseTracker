import { Card, CardContent } from "@/components/ui/card";

const Stats = () => {
  return (
    <div className="p-4">
      <Card>
        <CardContent className="p-4">
          <h2>Total Spend</h2>
          <p className="text-3xl font-bold">₹12000</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Stats;
