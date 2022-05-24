import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalDetail from "./components/ModalDetail";
import {
  fetchTodoList,
  deleteTodoList,
  createTodoList,
} from "./features/TodoList/actions";
import moment from "moment";
export default function TodoList() {
  let dispatch = useDispatch();
  let todoList = useSelector((state) => state.todoList);
  const [todo, setTodo] = useState();
  const initCreateTodo = {
    id: Math.floor(Math.random() * 100),
    title: "",
    description: "",
    status: 0,
    createdAt: moment().format("YYYY-MM-DD h:mm"),
  };
  const [createTodo, setCreateTodo] = useState(initCreateTodo);
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

  const handleAdd = () => {
    dispatch(createTodoList(createTodo));
    setCreateTodo(initCreateTodo);
  };

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-grey-darkest">Todo List</h1>
          <div className="flex flex-col space-y-2 mt-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              placeholder="Title"
              value={createTodo.title}
              onChange={(e) =>
                setCreateTodo({ ...createTodo, title: e.target.value })
              }
            />

            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              placeholder="Description"
              value={createTodo.description}
              onChange={(e) =>
                setCreateTodo({ ...createTodo, description: e.target.value })
              }
            />
            <button
              onClick={() => handleAdd()}
              className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
            >
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
            setTodo={setTodo}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
