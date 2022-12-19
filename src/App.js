import { useState, useEffect } from "react";
import List from "./components/List";
import Task from "./components/Task";
import Button from "./components/Button";
import Alert from "./components/Alert";
import Search from "./components/Search";
import "./css/App.css";

function App() {
  // -store all the lists
  const [lists, setLists] = useState([]);
  // -store all the tasks
  const [tasks, setTasks] = useState([]);
  // -store id of the currently active (selected) list
  const [currentListId, setCurrentListId] = useState();
  // -store id of the currently active (selected) task
  const [currentTaskId, setCurrentTaskId] = useState();
  // -form data of list
  const [listFormData, setListFormData] = useState({
    listName: "",
    listDescription: "",
  });
  // -form data of task
  const [taskName, setTaskName] = useState("");
  // -store state that an item is currently editing
  const [isEditing, setIsEditing] = useState({
    list: false,
    task: false,
  });
  // -store alert type, message and state
  const [alert, setAlert] = useState({ show: false, type: "", msg: "" });
  // -store search form data of list and task
  const [search, setSearch] = useState({
    list: "",
    task: "",
  });

  // -DATA FETCHING for populating initial data
  const fetchListData = () => {
    fetch("./data/lists.json")
      .then((resp) => resp.json())
      .then((data) => {
        setLists(data);
      });
  };

  const fetchTaskData = () => {
    fetch("./data/tasks.json")
      .then((resp) => resp.json())
      .then((data) => {
        setTasks(data);
      });
  };

  // -LIFE CYCLE METHOD (componentWillMount)
  useEffect(() => {
    fetchListData();
    fetchTaskData();
  }, []);

  // -FUNCTION
  const showAlert = (show, type, msg) => {
    setAlert({ show, type, msg });
    return;
  };

  // -task count of a list
  const taskCount = (id) => {
    // -if id is not a Number, then return 0
    if (isNaN(id)) return 0;

    // -else count the task of a list with the id in the param
    let totalTasks = 0;
    tasks.forEach((task) => {
      if (task.list_id === id) {
        totalTasks++;
      }
    });
    return totalTasks;
  };

  // -function to calculate the total completed percentage
  const calculatePercentage = (id) => {
    if (id === undefined) return 0;

    // -get total number of tasks and completed tasks
    let totalCompletedTasks = 0;
    let totalTasks = 0;
    tasks.forEach((task) => {
      if (task.list_id === id) {
        totalTasks++;
        if (task.completed) totalCompletedTasks++;
      }
    });
    // -if there is no tasks, return 0
    if (totalTasks === 0) return 0;

    // -calculate the percentage the return the value
    return Math.round((totalCompletedTasks / totalTasks) * 100);
  };

  // -EVENT HANDLER FOR LIST
  // -CREATE
  const onCreateList = (e) => {
    // -prevent from reloading page
    e.preventDefault();
    // -if there is no data in the form, then show alert
    if (!listFormData.listName || !listFormData.listDescription)
      return showAlert(true, "danger", "Please enter your data!");
    // -add new list item to lists
    const newListItem = {
      id: new Date().getTime().toString(),
      name: listFormData.listName,
      description: listFormData.listDescription,
    };
    // -update the lists
    setLists([...lists, newListItem]);
    // -clear the form data
    setListFormData({ listName: "", listDescription: "" });
    // -set new list as an active list
    setCurrentListId(newListItem.id);
    // -show alert after successfully created
    showAlert(true, "success", "List Created Successfully!");
  };

  // -DELETE
  const onDeleteList = (e) => {
    e.preventDefault();
    // -if there is no active list, then show alert
    if (isNaN(currentListId))
      return showAlert(true, "danger", "No Item selected");

    // -remove the current list from lists
    setLists(lists.filter((list) => list.id !== currentListId));

    // -remove all the tasks associated with current list
    setTasks(tasks.filter((task) => task.list_id !== currentListId));

    setIsEditing(false);

    // -clear the form data
    setListFormData({ listName: "", listDescription: "" });

    // -remove the currentListId
    setCurrentListId(undefined);

    showAlert(true, "success", "Item deleted successfully!");
  };

  // -EDIT
  const onEditList = (e) => {
    e.preventDefault();
    if (isNaN(currentListId))
      return showAlert(true, "danger", "No item selected!");

    // -find the list with currentListId
    const currentList = lists.find((list) => list.id === currentListId);

    // -fill previous data in the form
    setListFormData({
      listName: currentList.name,
      listDescription: currentList.description,
    });

    // -set editing state for list as true
    setIsEditing({
      ...isEditing,
      list: true,
    });
  };

  // -UPDATE
  const onUpdateList = (e) => {
    e.preventDefault();
    if (!listFormData.listName || !listFormData.listDescription)
      return showAlert(true, "danger", "Please enter data!");

    // -get all lists with updated data in the form
    const newLists = lists.map((list) => {
      if (list.id === currentListId) {
        return {
          ...list,
          name: listFormData.listName,
          description: listFormData.listDescription,
        };
      }
      return list;
    });

    // -update the lists
    setLists(newLists);

    // -empty form data
    setListFormData({ listName: "", listDescription: "" });

    // -set editing state for list as false
    setIsEditing({
      ...isEditing,
      list: false,
    });

    showAlert(true, "success", "Item updated successfully!");
  };

  // -EVENT HANDLER FOR TASK
  // -CREATE
  const onCreateTask = (e) => {
    e.preventDefault();

    // -if there is no data in the form, then show alert
    if (!taskName || taskName.trim() == "")
      return showAlert(true, "danger", "Please enter data!");

    // -create new task
    const newTaskItem = {
      id: new Date().getTime().toString(),
      list_id: currentListId,
      name: taskName,
      completed: false,
    };

    // -update the tasks
    setTasks([...tasks, newTaskItem]);

    // -empty the form data
    setTaskName("");

    // -set new task as the active task
    setCurrentTaskId(newTaskItem.id);
    showAlert(true, "success", "Task created successfully!");
  };

  // -EDIT
  const onEditTask = (e) => {
    e.preventDefault();
    if (isNaN(currentTaskId))
      return showAlert(true, "danger", "No Task selected!");

    // -find the task by currentListId
    const currentTask = tasks.find((task) => task.id === currentTaskId);

    // -fill taskName in the form
    setTaskName(currentTask.name);

    // -set editing mode for task as true
    setIsEditing({
      ...isEditing,
      task: true,
    });
  };

  // -UPDATE
  const onUpdateTask = (e) => {
    e.preventDefault();
    if (!taskName) return showAlert(true, "danger", "Please enter data");

    // -get all tasks with updated data in the form
    const newTasks = tasks.map((task) => {
      if (task.id === currentTaskId) {
        return {
          ...task,
          name: taskName,
        };
      }
      return task;
    });

    // -update the tasks
    setTasks(newTasks);

    // -clear the form data
    setTaskName("");

    // -set editing mode for task as false
    setIsEditing({
      ...isEditing,
      task: false,
    });

    showAlert(true, "success", "Item updated successfully!");
  };

  // -DELETE
  const onDeleteTask = (e) => {
    e.preventDefault();

    if (isNaN(currentTaskId))
      return showAlert(true, "danger", "No tasks selected");

    // -remove the task with currentTaskId
    setTasks(tasks.filter((task) => task.id !== currentTaskId));

    // -set editing mode for task as false
    setIsEditing({
      ...isEditing,
      task: false,
    });
    // -empty the form data
    setTaskName("");

    // -unset the currentTaskId
    setCurrentTaskId(undefined);

    showAlert(true, "success", "Item deleted successfully!");
  };

  // -MARK AS COMPLETED
  // -function to toggle the complete status of task
  const onCompleteTask = (id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });
    setTasks(newTasks);
  };

  // -get search lists
  const searchedLists = lists.filter((list) => {
    return (
      list.name.toLowerCase().includes(search.list.toLowerCase()) ||
      list.description.toLowerCase().includes(search.list.toLowerCase())
    );
  });

  // -get search tasks
  const searchedTasks = tasks
    .filter((task) => task.list_id === currentListId)
    .filter((task) =>
      task.name.toLowerCase().includes(search.task.toLowerCase())
    );

  // -ELEMENT
  // -Alert element
  const alertElement = alert.show && (
    <Alert {...alert} removeAlert={() => showAlert(false, "", "")} />
  );

  // -RENDERING
  return (
    <div className="w-screen h-screen flex items-center justify-center py-8 bg-gradient-to-b from-underwater-top to-underwater-bottom">
      <div className="w-11/12 h-full flex flex-col">
        <div className="header flex justify-between pb-3">
          <div className="flex flex-col gap-y-1">
            <h1 className="text-2xl lg:text-3xl text-white">Todolist App</h1>
            <h2 className="text-sm md:text-base lg:text-lg text-white">
              Create your unlimited daily tasks with your custom defined
              category.
            </h2>
          </div>
          <div className="flex items-center">{alertElement}</div>
        </div>

        <div className="body flex-1 flex flex-row md:gap-x-2 overflow-y-hidden">
          <div className="list-container flex-1 flex flex-col p-8 bg-gray-200">
            <div className="list-header flex justify-between pb-4 border-b border-gray-400">
              <div>
                Category: <span>{lists.length}</span>
              </div>

              <div className="list-buttons flex gap-x-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="create-list-button w-6 h-6 hover:text-primary cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  title="Create"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <svg
                  onClick={onEditList}
                  xmlns="http://www.w3.org/2000/svg"
                  className="edit-list-button w-6 h-6 hover:text-primary cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  title="Edit"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  ></path>
                </svg>
                <svg
                  onClick={onDeleteList}
                  xmlns="http://www.w3.org/2000/svg"
                  className="delete-list-button w-6 h-6 hover:text-primary cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  title="Delete"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="list-form">
              <form className="search-list-form relative mt-4">
                <Search
                  search={search.list}
                  onClick={() => setSearch({ ...search, list: "" })}
                  onChange={(e) =>
                    setSearch({ ...search, list: e.target.value })
                  }
                />
              </form>

              <form className="create-list-form flex flex-col lg:flex-row lg:flex-wrap justify-between lg:items-end gap-x-4 gap-y-4 mt-4">
                <div className="flex-auto">
                  <label
                    className="block mb-2 text-sm text-gray-600"
                    htmlFor="listname"
                  >
                    Name
                  </label>
                  <input
                    value={listFormData.listName}
                    onChange={(e) =>
                      setListFormData({
                        ...listFormData,
                        listName: e.target.value,
                      })
                    }
                    type="text"
                    name="listname"
                    className="w-full block p-2 text-sm border-none rounded focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="eg. Sport"
                  />
                </div>

                <div className="flex-auto">
                  <label
                    className="block mb-2 text-sm text-gray-600"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <input
                    value={listFormData.listDescription}
                    onChange={(e) =>
                      setListFormData({
                        ...listFormData,
                        listDescription: e.target.value,
                      })
                    }
                    type="text"
                    name="description"
                    className="w-full block p-2 text-sm border-none rounded focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="eg. Sport to try in 2022"
                  />
                </div>

                <div className="grow-0">
                  {
                    // -if user is editing, then show update button
                    isEditing.list ? (
                      <Button onClick={onUpdateList} value="Update" />
                    ) : (
                      // -if user is creating, then show create button
                      <Button onClick={onCreateList} value="Create" />
                    )
                  }
                </div>
              </form>
            </div>

            <div className="list-content myscrollbar mt-8 overflow-y-auto">
              <List
                lists={searchedLists}
                onClickList={(id) => {
                  setCurrentListId(id);
                  setIsEditing({ list: false, task: false });
                  setListFormData({ listName: "", listDescription: "" });
                  setTaskName("");
                }}
                currentId={currentListId}
                calculatePercentage={(id) => calculatePercentage(id)}
              />
            </div>
          </div>

          <div className="chevron-left w-6 relative md:hidden">
            <div className="w-10 h-10 hover:h-11 hover:w-11 absolute top-1/2 right-0 flex items-center justify-center bg-primary rounded-full shadow-xl cursor-pointer duration-150 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </div>
          </div>

          <div className="chevron-right hidden md:hidden relative w-6">
            <div className="w-10 h-10 hover:h-11 hover:w-11 absolute top-1/2 flex items-center justify-center bg-primary cursor-pointer duration-150 rounded-full shadow-xl transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 text-white w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </div>
          </div>

          <div className="task-container flex-1 hidden md:flex md:flex-col p-8 bg-gray-200">
            <div className="task-header flex justify-between pb-4 border-b border-gray-400">
              <div>
                Task: <span>{taskCount(currentListId)}</span>
              </div>

              <div className="tasks-buttons flex flex-row gap-x-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="create-task-button w-6 h-6 hover:text-primary cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  title="Create"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <svg
                  onClick={onEditTask}
                  xmlns="http://www.w3.org/2000/svg"
                  className="edit-task-button w-6 h-6 hover:text-primary cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  title="Edit"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  ></path>
                </svg>
                <svg
                  onClick={onDeleteTask}
                  xmlns="http://www.w3.org/2000/svg"
                  className="delete-task-button w-6 h-6 hover:text-primary cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  title="Delete"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="task-form">
              <form className="search-task-form relative mt-4">
                <Search
                  search={search.task}
                  onClick={() => setSearch({ ...search, task: "" })}
                  onChange={(e) =>
                    setSearch({ ...search, task: e.target.value })
                  }
                />
              </form>

              <form className="create-task-form flex flex-col lg:flex-row justify-between lg:items-end lg:gap-x-4 gap-y-4 mt-4">
                <div className="flex-auto">
                  <label
                    className="block mb-2 text-sm text-gray-600"
                    htmlFor="taskname"
                  >
                    Name
                  </label>
                  <input
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    type="text"
                    name="taskname"
                    className="w-full block p-2 text-sm border-none rounded focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="eg. to swim every weekend"
                  />
                </div>

                <div className="grow-0">
                  {
                    // -if user is currently editing task, then show update button
                    isEditing.task ? (
                      <Button onClick={onUpdateTask} value="Update" />
                    ) : (
                      // -else show create button
                      <Button onClick={onCreateTask} value="Create" />
                    )
                  }
                </div>
              </form>
            </div>

            <div className="task-content myscrollbar flex-1 flex items-center mt-8 overflow-y-auto">
              <div className="w-full h-full flex flex-col gap-y-4 lg:pr-2 pr-1 xl:pr-4">
                {
                  // -if user does not select any list, then show nothing
                  isNaN(currentListId) ? (
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
                        <div className="mt-4 opacity-30">
                          No Todolist selected!
                        </div>
                      </div>
                    </div>
                  ) : (
                    // -else show all tasks
                    <Task
                      onClickTask={(id) => {
                        setCurrentTaskId(id);
                        setIsEditing({ ...isEditing, task: false });
                        setTaskName("");
                      }}
                      currentId={currentTaskId}
                      tasks={searchedTasks}
                      onCompleteTask={(id) => onCompleteTask(id)}
                    />
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
