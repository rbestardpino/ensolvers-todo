class Todo {
  constructor(id, name, folderId, done) {
    this.id = id;
    this.name = name;
    this.folderId = folderId;
    this.done = done;
  }
}

class Folder {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

export async function getData(slug) {
  const url = process.env.REACT_APP_API_URI + slug;
  const data = await (await fetch(url)).json();
  return data.statusCode === 404 ? null : data;
}

export async function getAllTodos() {
  const todos = (await getData("todos")) || [];
  return todos.map(
    (todo) => new Todo(todo.id, todo.name, todo.folderId, todo.done)
  );
}

export async function getAllFolders() {
  const folders = (await getData("folders")) || [];
  return folders.map((folder) => new Folder(folder.id, folder.name));
}

export async function updateTodo(todoId, data) {
  const url = process.env.REACT_APP_API_URI + "todo/" + todoId;
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  });
}

export async function updateFolder(folderId, data) {
  const url = process.env.REACT_APP_API_URI + "folder/" + folderId;
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  });
}

export async function deleteTodo(todoId) {
  const url = process.env.REACT_APP_API_URI + "todo/" + todoId;
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}

export async function deleteFolder(folderId) {
  const url = process.env.REACT_APP_API_URI + "folder/" + folderId;
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}

export async function createTodo(data) {
  const url = process.env.REACT_APP_API_URI + "todo";
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  });
}

export async function createFolder(data) {
  const url = process.env.REACT_APP_API_URI + "folder";
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  });
}
