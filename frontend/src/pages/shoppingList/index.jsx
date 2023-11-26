import React, { useEffect, useState } from "react";
import Lists from "../../components/list";
import axios from "axios";
import "./shoppingList.scss";
import { Pagination } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const ShoppingList = () => {
  const [data, setAllData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const url = new URLSearchParams(location.search);

  const onPageChange = (page, pageSize) => {
    setCurrentPage(page);
    url.set("pageNo", page);
    navigate(`/shoppingList?${url}`);
  };

  useEffect(() => {
    const fetchSize = 20;
    const apiUrl = `http://localhost:8001/getData?fetchSize=${fetchSize}&pageNo=${currentPage}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setAllData(response?.data?.data || []);
        setTotalCount(response?.data?.totalRecords || 0);
      })
      .catch((error) => {
        console.error("API request error:", error);
      });
  }, [currentPage, location.search]);

  useEffect(() => {
    const pageParam = url.get("pageNo");
    if (pageParam) {
      setCurrentPage(parseInt(pageParam, 10));
    }
  }, [location.search]);

  return (
    <div className="shopping-list">
      <div className="title">Shopping List</div>
      <Lists data={data} />
      <Pagination
        total={totalCount}
        current={currentPage}
        pageSize={20}
        onChange={onPageChange}
        showQuickJumper={false}
        showSizeChanger={false}
      />
    </div>
  );
};

export default ShoppingList;
