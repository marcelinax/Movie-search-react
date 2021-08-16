import React, { useState } from "react";

export const MoviesListPagination = ({
  currentPage,
  setCurrentPage,
  pagesAmount,
}) => {
  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= pagesAmount; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => {
            setCurrentPage(i);
          }}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return <div className="pagination">{renderPaginationButtons()}</div>;
};
