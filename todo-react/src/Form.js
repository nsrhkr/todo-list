import { useState } from "react"

// ラベル
const InputLabel = () => {
  return (
    <label htmlFor="todo">タスクを入力（1～30文字）</label>
  );
}

// 登録ボタン
const SubmitButton = ({ handleSubmit }) => {
  return (
    <input type="submit" value="登録" onSubmit={handleSubmit} />
  );
};

// テキストボックス
const TextBox = ( {taskName, hundleChange} ) => {
  return (
    <input
      id="new-todo"
      className="l-input-text"
      type="text"
      value={taskName}
      onChange={hundleChange}
      name="new-todo"
      minLength="1"
      maxLength="30"
      required
    />
  );
};

// 登録フォーム
const Form = (props) => {
  const [taskName, setTaskName] = useState("");
  // 入力値を更新
  function hundleChange(event) {
    setTaskName(event.target.value);
  }
  // 入力値を登録
  function handleSubmit(event) {
    event.preventDefault();
    props.addTask(taskName);
    setTaskName("");
  }
  return (
    <div className="l-input">
      <form onSubmit={handleSubmit}>
        <InputLabel />
        <div>
          <TextBox taskName={taskName} hundleChange={hundleChange} />
          <SubmitButton handleSubmit={handleSubmit} />
        </div>
      </form>
    </div>
  );
}

export default Form;
