import ListItem from "../components/ListItem";

function List({ lists, onClickList, currentId, calculatePercentage }) {
  // -if list length is 0, then show nothing
  if (lists.length === 0)
    return (
      <div className="flex justify-center mt-32">
        <div>
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 opacity-30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
              />
            </svg>
          </div>
          <div className="mt-4 opacity-30">No Todolist</div>
        </div>
      </div>
    );
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 pr-2">
      {lists.map((list) => (
        <ListItem
          {...list}
          key={list.id}
          currentId={currentId}
          onClickList={() => onClickList(list.id)}
          percentage={calculatePercentage(list.id)}
        />
      ))}
    </div>
  );
}
export default List;
