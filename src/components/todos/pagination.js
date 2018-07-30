import React from "react";

const Pagination = (pages = []) =>
  pages.map(page => (
    <span key={page} id={page} onClick={() => this.updatePage(page)}>
      {page}
    </span>
  ));
export default Pagination;
