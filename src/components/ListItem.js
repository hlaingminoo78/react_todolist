import ProgressCircle from "./ProgressCircle";

function ListItem({
  id,
  name,
  description,
  currentId,
  onClickList,
  percentage,
}) {
  return (
    <div
      className={`${
        currentId === id ? "active" : ""
      } p-4 bg-primary text-white border-l-8 border-primary hover:border-black cursor-pointer`}
      onClick={onClickList}
    >
      <div className="flex items-center justify-between">
        <div className="text-lg">{name}</div>
        <ProgressCircle percentage={percentage} />
      </div>
      <div className="mt-2 text-sm">{description}</div>
    </div>
  );
}

export default ListItem;
