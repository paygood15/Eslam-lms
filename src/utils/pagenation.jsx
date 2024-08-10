
import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ numberOfPages, onPageChange, currentPage }) => {
  const handlePageClick = (event) => {
    onPageChange(event.selected + 1); // تغيير الصفحة للقيمة المحددة
  };

  const pageCount = !isNaN(parseInt(numberOfPages))
    ? Math.ceil(parseInt(numberOfPages))
    : 0;

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={
        <>
               <svg
            fill="#000000"
            width="20px"
            height="20px"
            viewBox="-128 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z" />
          </svg>
        </>
      }
      onPageChange={handlePageClick}
      marginPagesDisplayed={2}
      pageRangeDisplayed={2}
      pageCount={pageCount}
      previousLabel={
        <>
     

          <svg
            fill="#000000"
            width="20px"
            height="20px"
            viewBox="-128 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
          </svg>
        </>
      }

      containerClassName={"pagination flex justify-center p-3 gap-3 items-center"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link  text-black px-4 py-2 rounded-md shadow-md hover:shadow-lg"}
      previousClassName={"page-item-dir"}
      nextClassName={"page-item-dir"}
      previousLinkClassName={" text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg"}
      nextLinkClassName={"page-link  text-black px-4 py-2 rounded-md shadow-md hover:shadow-lg"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
      activeClassName={"bg-gradient-to-r from-red-400 to-red-600 text-white px-4 py-2 rounded-md shadow-md"}
      forcePage={currentPage - 1}
    />
  );
};

export default Pagination;
