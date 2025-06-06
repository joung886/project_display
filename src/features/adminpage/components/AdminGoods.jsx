import React, { useEffect, useState } from "react";
import AdminGoodsMenubar from "./AdminGoodsMenubar";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "../../../api/axiosInstance";

const AdminGoodsWrapper = styled.div``;

const TitleWrapper = styled.div`
  font-size: 30px;
  color: #3da9fc;
  margin-top: 43px;
  margin-bottom: 24px;
  font-weight: 500;
`;

const AdminGoodsMenubarWrapper = styled.div`
  margin-bottom: 24px;
`;

const Table = styled.table`
  width: 100%;
  max-width: 1300px;
  border-collapse: collapse;
  font-size: 16px;
  text-align: center;
  table-layout: fixed;
  margin-bottom: 200px;
`;

const Th = styled.th`
  color: #e1e1e1;
  padding: 9px 0;
  font-weight: bold;
  border-top: 3px solid #686868;
`;

const Td = styled.td`
  color: #e1e1e1;
  font-size: 16px;
  vertical-align: middle;
  border: 1px solid #686868;
`;

const ProductRow = styled.tr`
  height: 140px;
  border: 1px solid #686868;
`;

const ProductCell = styled.td`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const ProductImage = styled.img`
  width: 180px;
  height: 130px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
  text-align: left;
  min-width: 110px;
  color: #e1e1e1;
`;

function AdminGoods() {
  const [goodsData, setGoodsData] = useState([]);

  useEffect(() => {
    fetchGoods();
  }, []);

  const fetchGoods = async () => {
    try {
      const response = await axios.get("/goods/admin");
      setGoodsData(response.data);
    } catch (error) {
      console.error("굿즈 데이터를 불러오는 중 오류 발생:", error);
    }
  };

  return (
    <AdminGoodsWrapper>
      <TitleWrapper>전체 굿즈 판매량 통계</TitleWrapper>
      <AdminGoodsMenubarWrapper>
        <AdminGoodsMenubar />
      </AdminGoodsMenubarWrapper>

      <Table>
        <thead>
          <tr>
            <Th>상품정보</Th>
            <Th>재고량</Th>
            <Th>누적 판매량</Th>
          </tr>
        </thead>
        <tbody>
          {goodsData.map((item) => (
            <ProductRow key={item.id}>
              <ProductCell>
                <Link to={`/goods/${item.id}`}>
                  <ProductImage
                    src={`${import.meta.env.VITE_API_URL}${
                      item.imgUrlList?.[0]
                    }`}
                    alt={item.name}
                  />
                </Link>
                <ProductInfo>
                  <strong>{item.name}</strong>
                </ProductInfo>
              </ProductCell>
              <Td>{item.stock}</Td>
              <Td>{item.totalSales}</Td>
            </ProductRow>
          ))}
        </tbody>
      </Table>
    </AdminGoodsWrapper>
  );
}

export default AdminGoods;
