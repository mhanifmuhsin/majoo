import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function ModalDetail({
  isOpen,
  closeModal,
  todo,
  handleDelete,
  setTodo,
  handleEdit,
}) {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="flex flex-col  leading-6 ">
                    {isEdit ? (
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-sm"
                        placeholder="Title"
                        value={todo.title}
                        onChange={(e) =>
                          setTodo({
                            ...todo,
                            title: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <>
                        <span className="text-sm">Title</span>
                        <span className="text-xs text-gray-500">
                          {todo?.title}
                        </span>
                      </>
                    )}
                  </Dialog.Title>
                  <div className="flex flex-col mt-2">
                    {isEdit ? (
                      <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-sm"
                        placeholder="Description"
                        value={todo.description}
                        onChange={(e) =>
                          setTodo({
                            ...todo,
                            description: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <>
                        <span className="text-sm">Description</span>
                        <span className="text-xs text-gray-500">
                          {todo?.description}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex flex-col mt-2">
                    {isEdit ? (
                      <>
                        <div className="flex space-x-2 items-center">
                          <input
                            className="text-sm"
                            type="radio"
                            name="status"
                            checked={todo.status === 0}
                            onChange={() => setTodo({ ...todo, status: 0 })}
                          />
                          <span className="text-sm">Not Done</span>
                          <input
                            type="radio"
                            name="status"
                            checked={todo.status === 1}
                            onChange={() => setTodo({ ...todo, status: 1 })}
                          />
                          <span className="text-sm">Done</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="text-sm">Status</span>
                        <span className="text-xs text-gray-500">
                          {todo?.status === 0 ? "Not Done" : "Done"}
                        </span>
                      </>
                    )}
                  </div>

                  <div className="mt-4 flex space-x-2 justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        closeModal();
                        setIsEdit(false);
                      }}
                    >
                      Cancel
                    </button>
                    {isEdit ? (
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          handleEdit();
                          setIsEdit(false);
                        }}
                      >
                        Save
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-yellow-500 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => setIsEdit(true)}
                        >
                          Edit
                        </button>
                        {todo.status === 0 && (
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={() => handleDelete(todo.id)}
                            disabled={todo?.status === 1}
                          >
                            Delete
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
