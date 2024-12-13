import React, { useState } from "react";

//"Todo型"の定義
type Todo = {
  value: string;
};


export const App = () => {

  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleSubmit = () => {
    
    if (!text) return;

    const newTodo: Todo = {
      value: text,
    };
    
    setTodos((todos) => [newTodo, ...todos]);
    setText("");
  }

  const handleChaneg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

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
    </div>
  );
};
