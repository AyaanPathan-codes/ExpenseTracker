function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-3 flex justify-around shadow-lg">

      <button>🏠</button>
      <button>💳</button>

      <button className="bg-purple-500 text-white rounded-full w-12 h-12">
        +
      </button>

      <button>📊</button>
      <button>👤</button>

    </div>
  );
}

export default BottomNav;