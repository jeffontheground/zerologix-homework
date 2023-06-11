export default function Toolbar({
  onPlusClick,
  onMinusClick,
}: {
  onPlusClick: () => void;
  onMinusClick: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-700 text-white flex items-center justify-center m-4"
        onClick={onPlusClick}
      >
        <span className="text-xl font-bold">+</span>
      </button>
      <button
        type="button"
        className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-700 text-white flex items-center justify-center m-4"
        onClick={onMinusClick}
      >
        <span className="text-xl font-bold">-</span>
      </button>
    </div>
  );
}
