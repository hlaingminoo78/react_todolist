function Search({ search, onClick, onChange }) {
  return (
    <>
      <div className="h-full absolute right-2 flex items-center pl-4 text-gray-600 cursor-pointer">
        {
          // -if user is currently searching, show cross icon
          search ? (
            <svg
              onClick={onClick}
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            // -if user is not currently searching, show search icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          )
        }
      </div>
      <input
        value={search}
        onChange={onChange}
        type="text"
        name="search"
        className="w-full flex items-center p-2 text-sm border-none border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
        placeholder="Search..."
      />
    </>
  );
}
export default Search;
