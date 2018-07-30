import {
  FETCH_TODOS_BEGIN,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE
} from "../actions/todoActions";

const INITIAL_STATE = {
  todos: [],
  metadata: {},
  loading: true,
  error: null
};

const todoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TODOS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: action.payload.todos,
        metadata: action.payload.metaData
      };

    case FETCH_TODOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        todos: []
      };

    default:
      return state;
  }
};

export default todoReducer;
