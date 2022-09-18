import { FC, ReactElement, useState } from "react";

export interface CustomPaginatorProps {
  className?: string;
  totalPage: number;
  onChangePage?: (pageNumber: number, type: "NEXT" | "PREVIOUS") => void;
}

const classNames =
  "px-3 py-2 border bg-gray-400  border-white rounded hover:bg-gray-500 cursor-pointer";

export const CustomPaginator: FC<CustomPaginatorProps> = ({
  className = "",
  totalPage,
  onChangePage,
}) => {
  const [current, setcurrent] = useState(1);
  const pagesArray = Array.from(Array(totalPage).keys()).map((num) => num + 1);

  const handleClickPagnitorItem = (pageNumber: number) => {
    if (pageNumber !== 0 && pageNumber !== totalPage + 1) {
      setcurrent(pageNumber);
      onChangePage &&
        onChangePage(pageNumber, pageNumber > current ? "NEXT" : "PREVIOUS");
    }
  };
  if (totalPage === 0) return <></>;

  return (
    <div className={`flex space-x-1 justify-center my-4 ${className}`}>
      <a
        className={classNames}
        onClick={() => handleClickPagnitorItem(current - 1)}
      >
        &laquo;
      </a>
      {pagesArray.map((num) => (
        <PagnitorItem
          pageNumber={num}
          active={num === current}
          onClick={handleClickPagnitorItem}
          key={num}
        />
      ))}

      <a
        className={classNames}
        onClick={() => handleClickPagnitorItem(current + 1)}
      >
        &raquo;
      </a>
    </div>
  );
};

interface PagnitorItemProps {
  pageNumber: number;
  active: boolean;
  onClick: (pageNumber: number) => void;
}

const PagnitorItem: FC<PagnitorItemProps> = ({
  pageNumber,
  active,
  onClick,
}) => {
  return (
    <a
      className={`${classNames} ${active ? "bg-gray-600" : ""}`}
      onClick={() => onClick(pageNumber)}
    >
      {pageNumber}
    </a>
  );
};
