import React, { useEffect, useState } from "react";
import Lists from "../../components/list";
import axios from "axios";
import "./shoppingList.scss";
import { Pagination } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
// ... (your existing imports)

const ShoppingList = () => {
  const [data, setAllData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); 
  const location = useLocation();
  const navigate = useNavigate();
  const url = new URLSearchParams(location.search);

  const onPageChange = (page, pageSize) => {
    setCurrentPage(page);
    url.set("pageNo", page);
    navigate(`?${url}`);
  };

  const fetchSize = 20;


  useEffect(() => {
    const apiUrl = `http://localhost:8001/getData?fetchSize=${fetchSize}&pageNo=${currentPage}&search=${searchTerm}`;

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
    const searchParam = url.get("search");

    if (pageParam) {
      setCurrentPage(parseInt(pageParam, 10));
    }

    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [location.search]);
  const onSearch = () => {
    const apiUrl = `http://localhost:8001/getData?fetchSize=${fetchSize}&pageNo=1&search=${searchTerm}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setAllData(response?.data?.data || []);
        setTotalCount(response?.data?.totalRecords || 0);
      })
      .catch((error) => {
        console.error("API request error:", error);
      });
    navigate(`?${url}`);
  };
  return (
    <div className="shopping-list">
      <div className="title">Shopping List</div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Title or SKU"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={onSearch}>Search</button>
      </div>
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
