import React from "react";

export const MovieStars = ({ voteAverage }) => {
  const rednerStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <i
          className={countVoteAverage() > i ? "bx bxs-star" : "bx bx-star"}
        ></i>
      );
    }
    return stars;
  };

  const countVoteAverage = () => {
    return Math.ceil(voteAverage / 2);
  };

  return <div className="starts">{rednerStars()}</div>;
};
