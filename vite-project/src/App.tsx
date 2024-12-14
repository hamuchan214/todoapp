import React, { useState } from "react";
import{
  Container,
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  Checkbox,
  List,
  ListItem,
  IconButton,
  FormControl,
  InputLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreIcon from "@mui/icons-material/Restore";


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
    <Container>
      <Typography>
        Todo App
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel id="filter-label">タスクのフィルター</InputLabel>
        <Select
          labelId="filter-label"
          value={filter}
          onChange={(e) => handleFilter(e.target.value as Filter)}
        >
          <MenuItem value="all">すべてのタスク</MenuItem>
          <MenuItem value="checked">完了したタスク</MenuItem>
          <MenuItem value="unchecked">未完了のタスク</MenuItem>
          <MenuItem value="removed">削除されたタスク</MenuItem>
        </Select>
      </FormControl>
      {filter === "removed" ? 
      (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleEmpty}
          disabled = {todos.filter((todo) => todo.removed).length === 0}  
        >
          削除済みのタスクを消去
        </Button>
      ):
      (
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
          }}
          >
        <TextField 
          label="タスクの追加"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
          追加
        </Button>
      </form>
      )
    }
      <List>
        {filteredTodos.map((todo) => {
          return (
          <ListItem key={todo.id} divider>
            <TextField
            disabled = {todo.checked || todo.removed}
            value = {todo.value}
            onChange={(e) => handleEdit(todo.id, e.target.value)}
            />
            <Checkbox
            disabled = {todo.removed}
            checked = {todo.checked}
            onChange={() => handleCheck(todo.id, !todo.checked)}
            />
            <IconButton onClick={() => handleRemove(todo.id, !todo.removed)} >
              {todo.removed ? <RestoreIcon/> : <DeleteIcon/>}
              </IconButton>
          </ListItem>
          )
      })}
      </List>
    </Container>
  );
};
