import { createContext, useContext, useEffect, useState } from "react";
import { getAllFolders, getAllTodos } from "../lib/api";

const TodoContext = createContext({
  todos: [],
  folders: [],
  loading: true,
  reRender: 0,
  setReRender: null,
});

export default function TodoProvider(props) {
  const [todos, setTodos] = useState([]);
  const [loadingT, setLoadingT] = useState(true);
  const [folders, setFolders] = useState([]);
  const [loadingF, setLoadingF] = useState(true);
  const [reRender, setReRender] = useState(0);

  useEffect(() => {
    getAllTodos().then((todos) => {
      setTodos(todos);
      setLoadingT(false);
    });
  }, [reRender]);

  useEffect(() => {
    getAllFolders().then((folders) => {
      setFolders(folders);
      setLoadingF(false);
    });
  }, [reRender]);

  return (
    <TodoContext.Provider
      value={{
        todos,
        folders,
        loading: loadingF || loadingT,
        reRender,
        setReRender,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  return useContext(TodoContext);
}
