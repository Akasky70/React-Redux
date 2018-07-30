import React from "react";
import axios from "axios";

let res = null;
const baseUrl = "http://127.0.0.1:8848/api/todo/";

export const fetchTodos = async (
  serviceMethod,
  page,
  perpage,
  query = null
) => {
  console.log(query);

  try {
    res = await axios({
      method: serviceMethod,
      url: baseUrl,
      params: {
        title: query,
        page: page,
        perpage: perpage
      },
      headers: {
        responseType: "json",
        authorization: "b787c1fc-4380-47e8-9d46-c1a9cc1fae71",
        refresh_token: "b787c1fc-4380-47e8-9d46-c1a9cc1fae71",
        user_id: 1
      }
    });

    return res;
  } catch (err) {
    return err;
  }
};
