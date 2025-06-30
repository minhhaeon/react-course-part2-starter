import { useRef } from "react";
import useAddTodo from "../hooks/useAddTodo";

const TodoForm = () => {
  const ref = useRef<HTMLInputElement>(null);
  const addTodo = useAddTodo(()=>{
    if(ref.current) ref.current.value = "";
  });
  return (
    <>
      {addTodo.error && <p>{addTodo.error.message}</p>}
      <form
        className="row mb-3"
        onSubmit={(event) => {
          event.preventDefault();
          addTodo.mutate({
            id: 0,
            title: ref.current?.value || "",
            completed: false,
            userId: 1,
          });
          if (ref.current) {
            ref.current.value = "";
          }
        }}
      >
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button
            className="btn btn-primary"
            disabled={addTodo.status === "pending"}
          >
            {addTodo.status === "pending" ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
