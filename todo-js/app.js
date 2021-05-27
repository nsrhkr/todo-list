const input = document.getElementById("new-todo"); // 入力欄
const todoList = document.getElementById("todo-list"); // TODOリストエリア


/**
 * TODOアイテムオブジェクトを作成するクラス
 */
class TodoItem {
  constructor(todoText) {
    this.id = new Date().getTime().toString(); // 経過ミリ秒から簡易idを生成
    this.todoText = todoText;
    this.todoElement = this.createTodo();
  }
  /**
   * TODOアイテムのhtml要素を作成
   * @returns {string} html elementの文字列
   */
  createTodo() {
    return `<div id="${this.id}" class="l-item md-item">
<div class="l-item-checkbox"><input type="checkbox" onclick="changeStatus(${this.id})"></div>
<div class="l-item-text">
<span>${this.todoText}</span>
</div>
<div class="l-item-delete"><button onclick="remove(${this.id})">削除</button></div>
</div>`;
  }
}


/**
 * 新しいTODOアイテムを登録
 * @param 無し
 * @return 無し
 */
const submit = () => {
  // TODOアイテムのhtml要素(テキスト)を用意
  const todoItem = new TodoItem(input.value);
  // TODOリストの先頭に挿入
  todoList.insertAdjacentHTML('afterbegin', todoItem.todoElement);
  // テキストボックスの中身をリセット
  input.value = '';
  console.log(`New TODO: ${todoItem.todoText}`);
};

/**
 * TODOアイテムのステータス(色)を変更する
 * 完了(グレー)⇔未完了(ホワイト)
 * @param {string} id アイテムの一番外側のhtml要素のid
 * @return 無し
 */
const changeStatus = (id) => {
  const todo = document.getElementById(id);
  const todoCheckbox = todo.querySelector('input');
  todo.style.backgroundColor = todoCheckbox.checked ? 'lightgray' : 'white';
  console.log(`Change Status`);
}

/**
 * TODOアイテムを削除
 * @param {string} id アイテムの一番外側のhtml要素のid
 * @return 無し
 */
const remove = (id) => {
  const todo = document.getElementById(id);
  while (todo.firstChild) {
    todo.removeChild(todo.firstChild);
  }
  todo.remove();
  console.log(`Remove`);
}
