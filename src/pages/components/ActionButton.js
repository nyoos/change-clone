export default function ActionButton({
  onClick,
  type,
  text,
  styling,
  isLoading,
}) {
  const loadingStyle = isLoading
    ? "border-gray-300 bg-gray-300 text-gray-500"
    : "bg-theme-red border-theme-red active:bg-white active:text-theme-red hover:bg-theme-red-dark text-theme-white";

  return (
    <button
      className={`py-2 px-3  font-bold rounded-md border-2  ${styling} ${loadingStyle}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
}
