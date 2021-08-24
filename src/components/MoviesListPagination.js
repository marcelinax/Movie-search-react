import React from "react";

export const MoviesListPagination = ({
  currentPage,
  setCurrentPage,
  pagesAmount,
  pagesOffSet,
}) => {
  const renderPaginationButtons = () => {
    const buttons = [];

    buttons.push(
      <button
        className={
          currentPage === 1 ? "pagination-btn--active" : "pagination-btn"
        }
        key={1}
        onClick={() => {
          setCurrentPage(1);
        }}
      >
        {1}
      </button>
    );
    if (currentPage - pagesOffSet > 1) buttons.push(<span>...</span>);

    for (let i = pagesOffSet; i >= 1; i--) {
      if (currentPage - i > 1) {
        buttons.push(
          <button
            className={
              currentPage === currentPage - i
                ? "pagination-btn--active"
                : "pagination-btn"
            }
            key={currentPage - i}
            onClick={() => {
              setCurrentPage(currentPage - i);
            }}
          >
            {currentPage - i}
          </button>
        );
      }
    }
    if (currentPage > 1 && currentPage < pagesAmount)
      buttons.push(
        <button
          className="pagination-btn--active"
          key={currentPage}
          onClick={() => {
            setCurrentPage(currentPage);
          }}
        >
          {currentPage}
        </button>
      );
    for (let i = 1; i <= pagesOffSet; i++) {
      if (currentPage + i < pagesAmount) {
        buttons.push(
          <button
            className={
              currentPage === currentPage + i
                ? "pagination-btn--active"
                : "pagination-btn"
            }
            key={currentPage + i}
            onClick={() => {
              setCurrentPage(currentPage + i);
            }}
          >
            {currentPage + i}
          </button>
        );
      }
    }
    if (currentPage + pagesOffSet < pagesAmount - 1)
      buttons.push(<span>...</span>);
    if (pagesAmount < 2) return;
    else {
      buttons.push(
        <button
          className={
            currentPage === pagesAmount
              ? "pagination-btn--active"
              : "pagination-btn"
          }
          key={pagesAmount}
          onClick={() => {
            setCurrentPage(pagesAmount);
          }}
        >
          {pagesAmount}
        </button>
      );
    }

    return buttons;
  };

  return <div className="pagination">{renderPaginationButtons()}</div>;
};
