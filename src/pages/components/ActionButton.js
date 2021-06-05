export default function ActionButton({ onClick, type, text, style }) {
  return (
    <button
      className={`bg-theme-red hover:bg-theme-red-dark py-2 px-4 text-theme-white font-bold rounded-md ${style}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
}
