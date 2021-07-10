export default function StandardButton({ onClick, type, text, styling }) {
  return (
    <button
      className={`bg-theme-white border-2 border-gray-400 hover:border-gray-600 py-2 px-4 text-theme-black  font-bold rounded-md ${styling}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
}
