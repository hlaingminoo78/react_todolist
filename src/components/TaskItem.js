function TaskItem({
  id,
  name,
  completed,
  currentId,
  onClickTask,
  onCompleteTask,
}) {
  return (
    <div
      className="task-item flex items-center justify-between gap-x-2 lg:gap-x-4 xl:gap-x-6"
      onClick={onClickTask}
    >
      <div
        className={`${
          currentId === id && "active"
        } flex-1 flex border-l-4 lg:border-l-6 border-primary cursor-pointer hover:border-black`}
      >
        <div className="flex items-center lg:pl-2 lg:pr-4 pl-1 pr-2 bg-primary text-sm text-white">
          {id}
        </div>
        <div
          className={`${
            completed && "line-through"
          } flex-1 p-2 pl-4 bg-white text-sm xl:text-base`}
        >
          {name}
        </div>
      </div>
      <div className="cursor-pointer">
        {
          // -if task is completed, then show fill correct icon
          completed ? (
            <svg
              onClick={onCompleteTask}
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-primary hover:text-primary-hover"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
          ) : (
            // -else show stroke correct icon
            <svg
              onClick={onCompleteTask}
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-primary hover:text-primary-hover"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          )
        }
      </div>
    </div>
  );
}
export default TaskItem;
