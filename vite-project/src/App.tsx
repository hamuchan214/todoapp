import React, { useState } from "react";

//"Todo型"の定義
type Todo = {
  value: string;
  readonly id: number;
  checked: boolean;
  removed: boolean;
};

type Filter = "all" | "checked" | "unchecked" | "removed";


export const App = () => {

  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  const handleSubmit = () => {
    
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };
    
    setTodos((todos) => [newTodo, ...todos]);
    setText("");
  }

  const handleChaneg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  const handleEdit = (id: number, value: string) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id == id){
          return{...todo, value: value};
        }
        return todo;
      });
      console.log("---Original todos---");
      todos.map((todo)=>{
        console.log(`id : ${todo.id}, value : ${todo.value}`);
      });
      return newTodos;
    });
  };

  const handleRemove = (id: number, removed: boolean) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id == id){
          return{...todo, removed: removed};
        }
        return todo;
      });
      return newTodos;
    });
  };

  const handleCheck = (id: number, checked: boolean) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id == id){
          return{...todo, checked: checked};
        }
        return todo;
      });
      return newTodos;
    });
  };

  const handleFilter = (filter: Filter) => {
    setFilter(filter);
  };

  const filteredTodos = todos.filter((todo)=> {
    switch(filter){
      case "all":
        return !todo.removed;
      case "checked":
        return todo.checked && !todo.removed;
      case "removed":
        return todo.removed;
      case "unchecked":
        return !todo.checked && !todo.removed;
    
    default:
      return todo;
    }
  });

  const handleEmpty = () => {
    setTodos((todos) => todos.filter((todo) => !todo.removed));
  }

  return (
    <div>
      <select defaultValue={"all"} onChange={(e) => handleFilter(e.target.value as Filter)}>
        <option value={"all"}>すべてのタスク</option>
        <option value={"checked"}>完了済みのタスク</option>
        <option value={"unchecked"}>未完了のタスク</option>
        <option value={"removed"}>削除済みのタスク</option>
      </select>
      {filter === "removed" ? 
      (
        <button
          onClick={handleEmpty}
          disabled = {todos.filter((todo) => todo.removed).length === 0}  
        >
          削除済みのタスクを消去
        </button>
      ):
      (
        filter !== "checked" && (
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
          }}
          >
        <input 
          type="text"
          value={text}
          onChange={(e) => handleChaneg(e)}
        />
        <input
          type="submit"
          value="追加"
          onSubmit = {handleSubmit}
        />
      </form>
      )
    )}
      <ul>
        {filteredTodos.map((todo) => {
          return (
          <li key={todo.id}>
            <input
            type = "text"
            disabled = {todo.checked || todo.removed}
            value = {todo.value}
            onChange={(e) => handleEdit(todo.id, e.target.value)}
            />
            <input
            type = "checkbox"
            disabled = {todo.removed}
            checked = {todo.checked}
            onChange={() => handleCheck(todo.id, !todo.checked)}
            />
            <button onClick={() => handleRemove(todo.id, !todo.removed)} >
              {todo.removed ? "復元" : "削除"}
              </button>
          </li>
          )
      })}
      </ul>
    </div>
  );
};
