export default function StandardButton({ onClick, type, text, style }) {
  return (
    <button
      className={`bg-theme-white border border-gray-400 hover:border-gray-600 py-2 px-4 text-theme-black w-min font-bold rounded-md ${style}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
}
