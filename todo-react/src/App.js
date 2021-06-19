import React, { useState, useCallback } from "react";
import { nanoid } from "nanoid";

import "./App.css";
import Form from "./Form";
import TodoList from "./TodoList";

// ヘッダ
const Header = () => {
  return (
    <header className="l-block">
      <h1>TODO LIST</h1>
    </header>
  );
};

const Main = () => {
  // TODOリスト（配列）
  const [tasks, setTasks] = useState([]);

  // 新しいTODOアイテムを追加
  const addTask = (taskName) => {
    const newTask = { key: nanoid(), taskName: taskName, done: false };
    setTasks([newTask, ...tasks]);
  };

  // TODOアイテムのステータスを変更
  const changeStatus = (key) => {
    const updateTasks = tasks.map((task) => {
      if (task.key === key) {
        return { ...task, done: !task.done };
      }
      return task;
    });
    setTasks(updateTasks);
  };

  // TODOアイテムを削除
  const deleteTask = (key) => {
    const updateTasks = tasks.filter((task) => task.key !== key);
    setTasks(updateTasks);
  };

  return (
    <>
      <Form addTask={addTask} />
      <TodoList
        tasks={tasks}
        changeStatus={changeStatus}
        deleteTask={deleteTask}
      />
    </>
  );
};

const App = () => {
  return (
    <>
      <Header />
      <Main />
    </>
  );
};

export default App;
