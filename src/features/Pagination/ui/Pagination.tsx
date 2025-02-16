import cn from 'classnames';
import {memo} from 'react';

import styles from './Pagination.module.scss';

type PaginationProps = {
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export const Pagination = memo(
  ({
    currentPage,
    onPageChange,
    totalPages,
    onNextPageClick,
    onPrevPageClick,
    className,
  }: PaginationProps) => {
    const handleNextPageClick = () => {
      onNextPageClick();
    };

    const handlePrevPageClick = () => {
      onPrevPageClick();
    };

    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages) {
        onPageChange(page);
      }
    };

    const renderPageNumbers = () => {
      const pageNumbers = [];

      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={cn(styles.pageNumber, {
              [styles.active]: i === currentPage,
            })}
          >
            {i}
          </button>,
        );
      }

      return pageNumbers;
    };

    return (
      <div className={cn(styles.paginator, className)}>
        <button
          className={cn(styles.arrow, styles.left)}
          type="button"
          onClick={handlePrevPageClick}
          disabled={currentPage === 1}
        >
          {'<'}
        </button>
        {renderPageNumbers()}
        <button
          className={cn(styles.arrow, styles.right)}
          type="button"
          onClick={handleNextPageClick}
          disabled={currentPage === totalPages}
        >
          {'>'}
        </button>
      </div>
    );
  },
);

Pagination.displayName = 'Pagination';
