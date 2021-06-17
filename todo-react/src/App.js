import "./App.css";

function Header() {
  return (
    <header class="l-block">
      <h1>TODO LIST</h1>
    </header>
  );
}

function Input() {
  return(
    <div className="l-input">
      <label for="todo">タスクを入力（1～30文字）</label>
      <div>
        <input id="new-todo" className="l-input-text" type="text" name="new-todo" required minlength="1" maxlength="30" />
        <input type="button" value="登録" onclick="submit()" />
      </div>
    </div>
  );
}

function TodoList(props) {
  return (
    <div id="todo-list" class="l-list">
      <TodoItem />
    </div>
  );
}

function TodoItem() {
  return (
    <div className="l-item md-item">
      <div className="l-item-checkbox">
        <input type="checkbox" />
      </div>
      <div className="l-item-text">
        <span>hoge</span>
      </div>
      <div className="l-item-delete">
        <button>削除</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <Header />
      <Input />
      <TodoList />
    </>
  );
}

export default App;
