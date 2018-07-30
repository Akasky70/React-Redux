import React from "react";
import "./todo.css";

// let count = 1;

const TodoRow = (todo, { count = 1 }) => (
  <tr className="table-body-tr">
    <td> {count++} </td>
    <td> {todo.updatedAt.split("T")[0]} </td>
    <td> {todo.title} </td>
    <td> {todo.description} </td>
    <td> {todo.hasCategory.map(todo => todo.name)}</td>
    <td> {todo.isCompleted ? "Completed" : "Pending"} </td>
    <td>
      <div
        className="action-icon"
        onClick={() => this.todoAction(todo.id, "edit")}
      >
        <img src={require("../../images/edit.png")} alt="edit png" />
      </div>
    </td>
    <td>
      <div
        className="action-icon"
        onClick={() => this.todoAction(todo.id, "delete")}
      >
        <img src={require("../../images/delete.png")} alt="delete png" />
      </div>
    </td>
  </tr>
);
export default TodoRow;
