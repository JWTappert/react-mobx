import React, { Component } from "react";
import ReactDOM from "react-dom";
import { observable, computed } from "mobx";
import { observer } from "mobx-react";

class Todo {
  id = Math.random();
  @observable title = "";
  @observable finished = false;
  constructor(title) {
    this.title = title;
  }
}

class TodoList {
  @observable todos = [];
  @computed get unfinishedTodoCount() {
    return this.todos.filter(todo => !todo.finished).length;
  }
}

@observer
class TodoListView extends Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.todoList.todos.map(todo => (
            <TodoView todo={todo} key={todo.id} />
          ))}
        </ul>
        Tasks left: {this.props.todoList.unfinishedTodoCount}
      </div>
    );
  }
}

const TodoView = observer(({ todo }) => (
  <li>
    <input
      type="checkbox"
      checked={todo.finished}
      onClick={() => (todo.finished = !todo.finished)}
    />
    {todo.title}
  </li>
));

const store = new TodoList();
store.todos.push(new Todo("Grocery shop"));
store.todos.push(new Todo("Payoff credit card"));
store.todos.push(new Todo("Go to Japan"));
store.todos.push(new Todo("Become Programming Master"));
store.todos.push(new Todo("Take Over the World!"));

ReactDOM.render(
  <TodoListView todoList={store} />,
  document.getElementById("index")
);
