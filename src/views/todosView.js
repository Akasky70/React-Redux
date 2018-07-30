import React from "react";
import { connect } from "react-redux";
import TodoRow from "../components/todos/todoRow";
import { fetchTodos } from "../services/todoServices";
import Pagination from "../components/todos/pagination";
import {
  fetchTodosBegin,
  fetchTodosSuccess,
  fetchTodosError
} from "../actions/todoActions";

let query = "";
let response = null;
let statusMessage = "";

const mapStateToProps = state => {
  if (state.todo.loading) {
    statusMessage = "Todos Loading...";
  } else if (state.todo.error) {
    statusMessage = state.todo.error.response.statusText;
  } else {
    statusMessage = null;
  }

  return {
    todoList: state.todo.todos,
    totalData: !state.todo.loading
      ? state.todo.metadata.totalData.fulfillmentValue
      : "",
    fetchingStatus: statusMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTodos: async (page = 1, perpage, searchQuery = "") => {

      dispatch(fetchTodosBegin());
      response = await fetchTodos("get", page, perpage, searchQuery);

      if (response.status === 200) {
        dispatch(
          fetchTodosSuccess(
            response.data.data.todo,
            response.data.data.metaData
          )
        );
      } else {
        dispatch(fetchTodosError(response));
      }
    }
  };
};

class TodoTable extends React.Component {
  constructor() {
    super();

    this.state = {
      perPage: 1,
      pages: [],
      pageNo: 1
    };
  }

  // COMPONENT DID MOUNTED FUNCTION
  async componentDidMount() {
    await this.props.fetchTodos(this.state.pageNo, this.state.perPage);

    this.createPages();
  }

  // SETTING QUERY FOR SEARCH
  setQuery = input => {
    query = input.target.value;
  };

  // SET PERPAGE DATA
  setPerPage = async perPageTodo => {

    // FETCHING TODOS FROM ACTION
    await this.props.fetchTodos(this.state.pageNo, perPageTodo, query);
    
    // SETTING STATE OF PERPAGE
    await this.setState({
      perPage: perPageTodo
    });
    this.createPages();
  };

  // CREATE PAGES
  createPages = () => {
    let perPage = this.state.perPage;
    let totalData = this.props.totalData;

    let pages = Array.from(
      new Array(Math.ceil(totalData / perPage)),
      (val, index) => index + 1
    );

    this.setState({
      pages: pages
    });
  };

  // UPDATE PAGE AS CLICK ON PAGINATION TABLE
  updatePage = async (page) => {

    let perPageTodo = this.state.perPage;

    // FETCHING TODOS FROM ACTION
    await this.props.fetchTodos(page, perPageTodo, query);
  }

  // RENDERING TODOS
  render() {
    return (
      <div className="body-wrapper">
        <h2>MyTodos</h2>
        <div className="filter-table-container clearfix">
          <div>
            <select onChange={e => this.setPerPage(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>

            <input
              onChange={input => this.setQuery(input)}
              placeholder="Type keyword to search"
            />
            <button
              onClick={() => this.props.fetchTodos(this.state.pageNo, this.state.perPage, query)}
              className="search-button"
            >
            SEARCH
            </button>
          </div>
          <div id="data-table">
            <table className="filter-table">
              <thead>
                <tr className="table-header">
                  <td width="40">ID</td>
                  <td width="200">
                    Date
                    <div className="sort-icon">
                      <img
                        src={require("../images/downarrow.png")}
                        alt="down arrow"
                      />
                    </div>
                  </td>
                  <td width="200">
                    Title
                    <div className="sort-icon">
                      <img
                        src={require("../images/downarrow.png")}
                        alt="down arrow"
                      />
                    </div>
                  </td>
                  <td width="200">
                    Description
                    <div className="sort-icon">
                      <img
                        src={require("../images/downarrow.png")}
                        alt="down arrow"
                      />
                    </div>
                  </td>
                  <td width="150">Category</td>
                  <td width="150">Status</td>
                  <td width="100">Edit</td>
                  <td width="100">Delete</td>
                </tr>
              </thead>
              <tbody>
                {!this.props.fetchingStatus ? (
                  this.props.todoList.map((todo, index) => (
                    <TodoRow {...todo} key={index} />
                  ))
                ) : (
                  <tr className="data-not-found">
                    <td colSpan="8">{this.props.fetchingStatus}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="page-number">
            {this.state.pages.map(page => (
              <span key={page} id={page} onClick={() => this.updatePage(page)}>
                {page}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const TodosTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoTable);

export default TodosTable;
