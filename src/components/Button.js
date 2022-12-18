function Button({ onClick, value }) {
  return (
    <button
      onClick={(e) => onClick(e)}
      className="w-full px-6 py-2 text-sm rounded text-white bg-primary duration-150 ease-in-out focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-2 hover:bg-primary-hover transition"
    >
      {value}
    </button>
  );
}
export default Button;
