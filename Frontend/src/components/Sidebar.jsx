function Sidebar() {
  return (
    <div className="w-60 h-screen bg-white dark:bg-gray-900 p-4 shadow">
      <h2 className="font-bold text-xl mb-6">Business</h2>

      <div className="space-y-3">
        <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded">Analytics</div>
        <div>Products</div>
        <div>Messages</div>
        <div>Customers</div>
      </div>
    </div>
  );
}

export default Sidebar;