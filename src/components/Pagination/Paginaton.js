// Pagination.js
import React from "react";

function Pagination({ totalPages, currentPage, onPageChange }) {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav style={{ marginTop: "40px" }}>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              href="#!"
              className="page-link"
              onClick={() => onPageChange(number)}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
