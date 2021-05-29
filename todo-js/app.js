const input = document.getElementById("new-todo"); // 入力欄
const todoList = document.getElementById("todo-list"); // TODOリストエリア


/**
 * TODOアイテムオブジェクトを作成するクラス
 */
class TodoItem {
  constructor(todoText) {
    this.id = '';
    this.todoText = todoText;
    this.todoHtml = this.createTodo();
  }

  /**
   * TODOアイテムのhtml要素を作成
   * @returns {string} html elementの文字列
   */
  createTodo() {
    this.id = this.generateId(3); // idを生成（idが重複した場合3回まで再生成）
    return `<div id="${this.id}" class="l-item md-item">
<div class="l-item-checkbox"><input type="checkbox" onclick="changeStatus(${this.id})"></div>
<div class="l-item-text">
<span>${this.todoText}</span>
</div>
<div class="l-item-delete"><button onclick="remove(${this.id})">削除</button></div>
</div>`;
  }

  /**
   * 一意のidを生成
   * @param {number} n idが重複した場合n回まで再生成
   * @return {string} id
   */
  generateId(n) {
    // ミリ秒から簡易idを生成
    let id = new Date().getTime().toString();
    try {
      // 重複チェック
      Array.prototype.map.call(todoList.children, (child) => {
        if (child.id === id) {
          throw new Error(`${id} is conflict ID.`);
        }
      });
    } catch (e) {
      if (n > 0) {
        // 再生成
        this.generateId(n - 1);
      } else {
        // 試行回数を超えた場合はアラートを表示
        alert('IDの生成に失敗しました。もう一度登録ボタンをクリックしてください。');
        throw (e);
      }
    }
    return id;
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
  todoList.insertAdjacentHTML('afterbegin', todoItem.todoHtml);
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
