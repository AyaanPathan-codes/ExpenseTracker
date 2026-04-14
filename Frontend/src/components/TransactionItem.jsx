function TransactionItem({ item }) {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">

      <div>
        <p className="font-semibold">{item.description}</p>
        <p className="text-sm text-gray-500">{item.date}</p>
      </div>

      <p className="text-red-500 font-bold">
        -₹{item.amount}
      </p>

    </div>
  );
}

export default TransactionItem;