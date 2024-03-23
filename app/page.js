"use client";
import Todo from "@/Components/Todo";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Home() {
  const [todos, setTodos] = useState({
    title: "",
    description: "",
  });
  const [todosList, setTodosList] = useState([]);
  const fetchTodos = async () => {
    try {
      const res = await axios.get("/api");
      setTodosList(res.data.todos);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteTodo = async (id) => {
    try {
      const res = await axios.delete("/api", {
        params: { mongoID: id },
      });
      toast.warning(res.data.msg);
      await fetchTodos();
      // console.log(res.data);
    } catch (error) {
      toast.error("Something went wrong");
      // console.error(error);
    }
  };
  const completeTodo = async (id) => {
    try {
      const res = await axios.put(
        "/api",
        {},
        {
          params: { mongoID: id },
        }
      );
      toast.success(res.data.msg);
      await fetchTodos();
      // console.log(res.data);
    } catch (error) {
      toast.error("Something went wrong");
      // console.error(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  const addTodo = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTodos({ ...todos, [name]: value });
    // console.log(todos);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api", todos);
      toast.success(res.data.msg);
      setTodos({ title: "", description: "" });
      await fetchTodos();
      // console.log(res.data);
    } catch (error) {
      toast.error("Something went wrong");
      // console.error(error);
    }
  };
  return (
    <>
      <ToastContainer theme="dark" />
      <form
        className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto"
        onSubmit={onSubmit}
      >
        <input
          onChange={addTodo}
          value={todos.title}
          type="text"
          name="title"
          id=""
          placeholder="Title"
          className="px-3 py-2 border-2 w-full"
        />
        <textarea
          onChange={addTodo}
          value={todos.description}
          name="description"
          placeholder="Description"
          className="px-3 py-2 border-2 w-full"
        ></textarea>
        <button type="submit" className="bg-blue-500 px-3 py-2 text-white">
          Add Todo
        </button>
      </form>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-12 w-[60%] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todosList.map((todo, index) => {
              return (
                <Todo
                  key={index}
                  id={index}
                  title={todo.title}
                  description={todo.description}
                  complete={todo.isCompleted}
                  mongoID={todo._id}
                  deleteTodo={deleteTodo}
                  completeTodo={completeTodo}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
