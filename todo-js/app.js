const input = document.getElementById("new-todo"); // 入力欄
const todoList = document.getElementById("todo-list"); // TODOリストエリア


/**
 * TODOアイテムオブジェクトを作成するクラス
 */
class TodoItem {
  constructor(todoText) {
    this.id = "";
    this.todoText = todoText;
    this.todoHtml = this.createTodo();
  }

  /**
   * TODOアイテムのhtml要素を作成
   * @returns {string} html elementの文字列
   */
  createTodo() {
    this.id = this.generateId(3); // idを生成（idが重複した場合3回まで再生成）
    console.log('id:', this.id);

    // 完了チェックボックス
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    // チェックイベント登録
    checkbox.addEventListener("change", (event) => {
      changeStatus(event);
    });
    // 完了チェックボックスの親
    const checkboxArea = document.createElement("div");
    checkboxArea.className = "l-item-checkbox";
    checkboxArea.appendChild(checkbox);

    // タスク名表示部
    const span = document.createElement("span");
    span.appendChild(document.createTextNode(this.todoText));
    // タスク名表示部の親
    const textarea = document.createElement("div");
    textarea.className = "l-item-text";
    textarea.appendChild(span);

    // 削除ボタン
    const deleteButtonArea = document.createElement("div");
    deleteButtonArea.className = "l-item-delete";
    // 削除ボタンの親
    const deleteButton = document.createElement("button");
    deleteButton.appendChild(document.createTextNode("削除"));
    // 削除イベント登録
    deleteButton.addEventListener("click", (event) => {
      remove(event);
    });
    deleteButtonArea.appendChild(deleteButton);

    // TODOアイテムの一番外側の要素
    const box = document.createElement("div");
    box.id = this.id;
    box.classList.add("l-item", "md-item");
    box.appendChild(checkboxArea);
    box.appendChild(textarea);
    box.appendChild(deleteButtonArea);
    return box;
  }

  /**
   * 一意のidを生成
   * @param {number} n idが重複した場合n回まで再生成
   * @return {string} id
   */
  generateId(n) {
    for (let i = 0; i <= n; i++) {
      // ミリ秒から簡易idを生成
      let id = new Date().getTime().toString();
      try {
        // 重複チェック
        console.log('try:', i);
        Array.prototype.map.call(todoList.children, (child) => {
          if (child.id === id) {
            throw new Error(`${id} is conflict ID.`);
          }
        });
        return id;
      } catch (e) {
        if (n === i) {
          // 試行回数を超えた場合はアラートを表示
          alert("IDの生成に失敗しました。もう一度登録ボタンをクリックしてください。");
          throw e;
        }
      }
    }
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
  let theFirstChild = todoList.firstChild
  todoList.insertBefore(todoItem.todoHtml, theFirstChild);
  // テキストボックスの中身をリセット
  input.value = '';
  console.log(`New TODO: ${todoItem.todoText}`);
};

/**
 * TODOアイテムのステータス(色)を変更する
 * 完了(グレー)⇔未完了(ホワイト)
 * @param {object} event チェックボックスの値変更イベント
 * @return 無し
 */
const changeStatus = (event) => {
  // TODOアイテムの一番外側の要素を取得
  // 注意：DOMの構造を変更した場合は適切に取得できない可能性がある
  const todo = event.path[2];
  const todoCheckbox = event.path[0];
  todo.style.backgroundColor = todoCheckbox.checked ? 'lightgray' : 'white';
  console.log(`Change Status`);
}

/**
 * TODOアイテムを削除
 * @param {object} event 削除ボタンのクリックイベント
 * @return 無し
 */
const remove = (event) => {
  // TODOアイテムの一番外側の要素を取得
  // 注意：DOMの構造を変更した場合は適切に取得できない可能性がある
  const todo = event.path[2];
  while (todo.firstChild) {
    todo.removeChild(todo.firstChild);
  }
  todo.remove();
  console.log(`Remove`);
}
