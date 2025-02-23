import React from "react";

const Pagination = ({ totalPage, eventPerPage,setCurrentPage,CurrentPage }) => {
  let pages = [];

  for (let index = 1; index <= Math.ceil(totalPage / eventPerPage); index++) {
    pages.push(index);
  }

 let prev = function Previous() {
    let Prev = CurrentPage - 1;
    if (CurrentPage == 1) {
        Prev = 1;
    }
    return Prev;
  }

  let next = function Previous() {
    let Next = CurrentPage + 1;
    if (CurrentPage == Math.ceil(totalPage / eventPerPage)) {
        Next = Math.ceil(totalPage / eventPerPage);
    }
    return Next;
  }

  return (
    <div className="flex justify-center">
    <div className="flex gap-2 max-w-fit ">
    <button className="w-15 bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:text-green-600" onClick={() => setCurrentPage(prev)}>Prev</button>
      {pages.map((page) => (
        <button key={page} className={`w-10 bg-gray-100 rounded-lg overflow-hidden shadow-lg ${page === CurrentPage ? "w-10 bg-gray-100 text-green-600 rounded-lg overflow-hidden shadow-lg" : ""}`} onClick={() => setCurrentPage(page)}>{page}</button>
      ))}
      <button className="w-15 bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:text-green-600" onClick={() => setCurrentPage(next)}>Next</button>
    </div>
    </div>
  );
};

export default Pagination;
