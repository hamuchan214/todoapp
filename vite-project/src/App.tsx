import React, { useState } from "react";

//"Todo型"の定義
type Todo = {
  value: string;
  readonly id: number;
};


export const App = () => {

  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleSubmit = () => {
    
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
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

  return (
    <div>
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
          }}
          >
        <input type="text"  value={text}  onChange={(e) => handleChaneg(e)} />
        <input  type="submit"  value="追加"  onSubmit = {handleSubmit}  />
      </form>
      <ul>
        {todos.map((todo) => {
          return <li key={todo.id}>
            <input
            type = "text"
            value = {todo.value}
            onChange={(e) => handleEdit(todo.id, e.target.value)}
            />
      </li>
      })}
      </ul>
    </div>
  );
};
