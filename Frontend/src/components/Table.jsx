function Table({ data }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <h3 className="mb-4 font-semibold">Transactions</h3>

      {data.map(e => (
        <div key={e.uid} className="flex justify-between border-b py-2">
          <p>{e.description}</p>
          <p>₹{e.amount}</p>
        </div>
      ))}
    </div>
  );
}

export default Table;