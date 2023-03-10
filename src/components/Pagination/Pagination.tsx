import { Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import "./index.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
  setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onChange,
  setPage,
}) => {
  const [pages, setPages] = useState<number[]>([]);
  useEffect(() => {
    const newPages = [];
    let startPage = 1;
    let endPage = 16;
    const maxPages = 5;
    if (totalPages > maxPages) {
      const middlePage = Math.floor(maxPages / 2);
      if (currentPage > middlePage) {
        startPage = currentPage - middlePage;
        endPage = currentPage + middlePage - 1;
      } else {
        startPage = 1;
        endPage = maxPages;
      }
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = endPage - maxPages + 1;
      }
    }
    for (let i = startPage; i <= endPage; i++) {
      newPages.push(i);
    }

    setPages(newPages);
  }, [currentPage, totalPages]);

  const handlePageChange = (page: any) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      setPage(page);
      onChange(page);
    }
  };

  return (
    <nav>
      <ul className="pagination">
        <li>
          <Button
            isDisabled={currentPage === 1}
            w="auto"
            borderRadius="6px"
            h="32px"
            className="page-link"
            bg="white"
            color="rgb(107,114,128)"
            border="1px solid rgb(209,213,219)"
            onClick={() => handlePageChange(currentPage - 1)}
          >
           <i className="fa-solid fa-chevron-left"></i>
          </Button>
        </li>

        {pages.map((page) => (
          <li key={page}>
            <Button
              bg={currentPage === page ? "rgb(37,54,235)" : "white"}
              color={currentPage === page ? "white" : "rgb(107,114,128)"}
              w="auto"
              borderRadius="6px"
              h="32px"
              border="1px solid rgb(209,213,219)"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          </li>
        ))}

        <li>
          <Button
            isDisabled={currentPage === totalPages}
            w="auto"
            borderRadius="6px"
            h="32px"
            bg="white"
            color="rgb(107,114,128)"
            border="1px solid rgb(209,213,219)"
            onClick={() => handlePageChange(currentPage + 1)}
          >
           <i className="fa-solid fa-chevron-right"></i>
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
