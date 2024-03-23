const Todo = ({
  id,
  title,
  description,
  complete,
  deleteTodo,
  mongoID,
  completeTodo,
}) => {
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th
        scope="row"
        className="px-2 py-1 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {id + 1}
      </th>
      <td className={`px-2 py-1 text-center ${complete ? "line-through" : ""}`}>
        {title}
      </td>
      <td className={`px-2 py-1 text-center ${complete ? "line-through" : ""}`}>
        {description}
      </td>
      <td className="px-2 py-1 text-center">
        {complete ? "Completed" : "Pending"}
      </td>
      <td className="px-2 py-1 flex justify-center gap-1">
        <button
          onClick={() => deleteTodo(mongoID)}
          className="bg-red-500 px-3 py-2 text-white"
        >
          Delete
        </button>
        {complete ? (
          ""
        ) : (
          <button
            onClick={() => completeTodo(mongoID)}
            className="bg-green-500 px-3 py-2 text-white"
          >
            Done
          </button>
        )}
      </td>
    </tr>
  );
};

export default Todo;
