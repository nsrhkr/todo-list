const TodoList = (props) => {
  return (
    <div id="todo-list" className="l-list">
      {props.tasks.map((task) => {
        return <TodoItem key={task.key} task={task} changeStatus={props.changeStatus} deleteTask={props.deleteTask}/>;
      })}
    </div>
  );
}

const TodoItem = (props) => {
  // TODOアイテムのステータス（完了/未完了）を変更
  const changeStatus = () => {
    props.changeStatus(props.task.key);
  }
  // TODOアイテムを削除
  const deleteTask = () => {
    props.deleteTask(props.task.key);
  }
  // TODOアイテムのステータス(色)を変更
  // 完了(グレー)⇔未完了(ホワイト)
  const color = props.task.done ? "is-done" : "is-not-done";
  return (
    <div className={`l-item md-item ${color}`}>
      <div className="l-item-checkbox">
        <input type="checkbox" defaultChecked={false} onClick={changeStatus} />
      </div>
      <div className="l-item-text">
        <span>{props.task.taskName}</span>
      </div>
      <div className="l-item-delete">
        <button onClick={deleteTask}>削除</button>
      </div>
    </div>
  );
}

export default TodoList;
