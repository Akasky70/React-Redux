import * as http from "../utils/http";

let res = null;
const segment = "todo/";

export const fetchTodos = async (page, perpage, query = null) => {
  try {
    let params = {
      title: query,
      page: page,
      perpage: perpage
    };

    res = await http.get(segment, params);

    return res;
  } catch (err) {
    return err;
  }
};
