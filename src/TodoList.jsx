import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalDetail from "./components/ModalDetail";
import {
  fetchTodoList,
  deleteTodoList,
  createTodoList,
  editTodoList,
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

  const handleEdit = () => {
    dispatch(editTodoList(todo));
    setIsOpen(false);
  };

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg ">
        <div className="mb-4">
          <h1 className="text-grey-darkest text-lg font-bold">Todo List</h1>
          <div className="flex flex-col space-y-2 mt-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-sm focus:outline-none"
              placeholder="Title"
              value={createTodo.title}
              onChange={(e) =>
                setCreateTodo({ ...createTodo, title: e.target.value })
              }
            />

            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-sm focus:outline-none"
              placeholder="Description"
              value={createTodo.description}
              onChange={(e) =>
                setCreateTodo({ ...createTodo, description: e.target.value })
              }
            />
            <button
              onClick={() => handleAdd()}
              className="flex-no-shrink p-2 border-2 rounded text-white border-teal hover:text-white hover:bg-green-300 bg-green-500"
            >
              Add
            </button>
          </div>
        </div>
        <div className="flex space-x-2">
          <div>
            {todoList &&
              todoList.data.map((todo) => {
                return (
                  todo.status === 0 && (
                    <div
                      key={todo.id}
                      onClick={() => openModal(todo)}
                      class="flex bg-yellow-100 w-full mb-4 cursor-pointer"
                    >
                      <div className="w-16 bg-yellow-400">
                        <div className="p-4">
                          <svg
                            className="h-8 w-8 text-white fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M503.191 381.957c-.055-.096-.111-.19-.168-.286L312.267 63.218l-.059-.098c-9.104-15.01-23.51-25.577-40.561-29.752-17.053-4.178-34.709-1.461-49.72 7.644a66 66 0 0 0-22.108 22.109l-.058.097L9.004 381.669c-.057.096-.113.191-.168.287-8.779 15.203-11.112 32.915-6.569 49.872 4.543 16.958 15.416 31.131 30.62 39.91a65.88 65.88 0 0 0 32.143 8.804l.228.001h381.513l.227.001c36.237-.399 65.395-30.205 64.997-66.444a65.86 65.86 0 0 0-8.804-32.143zm-56.552 57.224H65.389a24.397 24.397 0 0 1-11.82-3.263c-5.635-3.253-9.665-8.507-11.349-14.792a24.196 24.196 0 0 1 2.365-18.364L235.211 84.53a24.453 24.453 0 0 1 8.169-8.154c5.564-3.374 12.11-4.381 18.429-2.833 6.305 1.544 11.633 5.444 15.009 10.986L467.44 402.76a24.402 24.402 0 0 1 3.194 11.793c.149 13.401-10.608 24.428-23.995 24.628z" />
                            <path d="M256.013 168.924c-11.422 0-20.681 9.26-20.681 20.681v90.085c0 11.423 9.26 20.681 20.681 20.681 11.423 0 20.681-9.259 20.681-20.681v-90.085c.001-11.421-9.258-20.681-20.681-20.681zM270.635 355.151c-3.843-3.851-9.173-6.057-14.624-6.057a20.831 20.831 0 0 0-14.624 6.057c-3.842 3.851-6.057 9.182-6.057 14.624 0 5.452 2.215 10.774 6.057 14.624a20.822 20.822 0 0 0 14.624 6.057c5.45 0 10.772-2.206 14.624-6.057a20.806 20.806 0 0 0 6.057-14.624 20.83 20.83 0 0 0-6.057-14.624z" />
                          </svg>
                        </div>
                      </div>
                      <div className="w-auto text-grey-darker items-center p-4">
                        <span className="text-sm font-bold pb-2">
                          {todo.title}
                        </span>
                        <p className="leading-tight text-xs">
                          {todo.description}
                        </p>
                      </div>
                    </div>
                  )
                );
              })}
          </div>
          <div>
            {todoList &&
              todoList.data.map((todo) => {
                return (
                  todo.status === 1 && (
                    <div
                      key={todo.id}
                      onClick={() => openModal(todo)}
                      className="flex bg-green-100 w-full mb-4 cursor-pointer"
                    >
                      <div className="w-16 bg-green-400">
                        <div className="p-4">
                          <svg
                            className="h-8 w-8 text-white fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M468.907 214.604c-11.423 0-20.682 9.26-20.682 20.682v20.831c-.031 54.338-21.221 105.412-59.666 143.812-38.417 38.372-89.467 59.5-143.761 59.5h-.12C132.506 459.365 41.3 368.056 41.364 255.883c.031-54.337 21.221-105.411 59.667-143.813 38.417-38.372 89.468-59.5 143.761-59.5h.12c28.672.016 56.49 5.942 82.68 17.611 10.436 4.65 22.659-.041 27.309-10.474 4.648-10.433-.04-22.659-10.474-27.309-31.516-14.043-64.989-21.173-99.492-21.192h-.144c-65.329 0-126.767 25.428-172.993 71.6C25.536 129.014.038 190.473 0 255.861c-.037 65.386 25.389 126.874 71.599 173.136 46.21 46.262 107.668 71.76 173.055 71.798h.144c65.329 0 126.767-25.427 172.993-71.6 46.262-46.209 71.76-107.668 71.798-173.066v-20.842c0-11.423-9.259-20.683-20.682-20.683z" />
                            <path d="M505.942 39.803c-8.077-8.076-21.172-8.076-29.249 0L244.794 271.701l-52.609-52.609c-8.076-8.077-21.172-8.077-29.248 0-8.077 8.077-8.077 21.172 0 29.249l67.234 67.234a20.616 20.616 0 0 0 14.625 6.058 20.618 20.618 0 0 0 14.625-6.058L505.942 69.052c8.077-8.077 8.077-21.172 0-29.249z" />
                          </svg>
                        </div>
                      </div>
                      <div className="w-auto text-grey-darker items-center p-4">
                        <span className="text-sm font-bold pb-2">
                          {todo.title}
                        </span>
                        <p className="leading-tight text-xs">
                          {todo.description}
                        </p>
                      </div>
                    </div>
                  )
                );
              })}
          </div>
        </div>
        <ModalDetail
          isOpen={isOpen}
          closeModal={closeModal}
          todo={todo}
          setTodo={setTodo}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
    </div>
  );
}
