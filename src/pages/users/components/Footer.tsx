import React from 'react';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';

interface IFooterProps {
  onPageChange: (pageNumber: number, pageSize: number) => void;
  total: number;
  currentPage: number;
}

const Footer: React.FC<IFooterProps> = (props) => {
  const { onPageChange, total, currentPage } = props;
  return (
    <Pagination
      style={{ textAlign: 'right', marginTop: '10px' }}
      showQuickJumper
      // defaultCurrent={2}
      current={currentPage}
      total={total}
      onChange={onPageChange}
    />
  );
};

export default Footer;
