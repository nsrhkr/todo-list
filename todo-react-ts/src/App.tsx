import React, { useState } from "react";
import { nanoid } from "nanoid";

import "./App.css";
import Form from "./Form";
import TodoList, { Task } from "./TodoList";

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
  const [tasks, setTasks] = useState<Task[]>([]);

  // 新しいTODOアイテムを追加
  const addTask = (taskName: string): void => {
    const newTask: Task = { key: nanoid(), taskName: taskName, done: false };
    setTasks([newTask, ...tasks]);
  };

  // TODOアイテムのステータスを変更
  const changeStatus = (key: string): void => {
    const updateTasks = tasks.map((task: Task) => {
      if (task.key === key) {
        return { ...task, done: !task.done };
      }
      return task;
    });
    setTasks(updateTasks);
  };

  // TODOアイテムを削除
  const deleteTask = (key: string): void => {
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