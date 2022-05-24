import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalDetail from "./components/ModalDetail";
import { fetchTodoList, deleteTodoList } from "./features/TodoList/actions";
export default function TodoList() {
  let dispatch = useDispatch();
  let todoList = useSelector((state) => state.todoList);
  const [todo, setTodo] = useState();
  let [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTodoList());
  }, [dispatch]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(todo) {
    setTodo(todo);
    setIsOpen(true);
  }

  const handleDelete = (id) => {
    dispatch(deleteTodoList(id));
    setIsOpen(false);
  };
  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-grey-darkest">Todo List</h1>
          <div className="flex mt-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              placeholder="Add Todo"
            />
            <button className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">
              Add
            </button>
          </div>
        </div>
        <div>
          {todoList &&
            todoList.data.map((todo) => {
              return (
                <div
                  onClick={() => openModal(todo)}
                  className="flex mb-4 items-center cursor-pointer"
                  key={todo.id}
                >
                  <p className="w-full text-grey-darkest">{todo.title}</p>
                  <p className="w-full text-grey-darkest">{todo.description}</p>
                </div>
              );
            })}

          <ModalDetail
            isOpen={isOpen}
            closeModal={closeModal}
            todo={todo}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
