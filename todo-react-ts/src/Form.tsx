import { useState } from "react"

type FormProps = {
  addTask: (taskName: string) => void
};

type TextBoxProps = {
  taskName: string;
  hundleChange: (event: any) => void
};

type SubmitButtonProps = {
  handleSubmit: (event: any) => void
}

// ラベル
const Label = () => {
  return <label htmlFor="todo">タスクを入力（1～30文字）</label>;
};

// テキストボックス
const TextBox: React.FC<TextBoxProps> = (props) => {
  return (
    <input
      id="new-todo"
      className="l-input-text"
      type="text"
      value={props.taskName}
      onChange={props.hundleChange}
      name="new-todo"
      minLength={1}
      maxLength={30}
      required
    />
  );
};

// 登録ボタン
const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  return (
    <input type="submit" value="登録" onSubmit={props.handleSubmit} />
  );
};

// 登録フォーム
export const Form: React.FC<FormProps> = (props) => {
  const [taskName, setTaskName] = useState("");
  // 入力値を更新
  function hundleChange(event: any) {
    setTaskName(event.target.value);
  }
  // 入力値を登録
  function handleSubmit(event: any) {
    event.preventDefault();
    props.addTask(taskName);
    setTaskName("");
  }
  return (
    <div className="l-input">
      <form onSubmit={handleSubmit}>
        <Label />
        <div>
          <TextBox taskName={taskName} hundleChange={hundleChange} />
          <SubmitButton handleSubmit={handleSubmit}/>
        </div>
      </form>
    </div>
  );
}

export default Form;
