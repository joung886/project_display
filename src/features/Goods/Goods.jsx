import React, { useState } from "react";
import styled from "styled-components";
import Header from "../Header";
import Footer from "../Footer";
import { FaSearch } from "react-icons/fa";
import goods1 from "../../assets/GoodsIMG/goods1.jpg";
import goods2 from "../../assets/GoodsIMG/goods2.jpg";
import goods3 from "../../assets/GoodsIMG/goods3.jpg";
import goods4 from "../../assets/GoodsIMG/goods4.jpg";
import goods5 from "../../assets/GoodsIMG/goods5.jpg";
import goods6 from "../../assets/GoodsIMG/goods6.jpg";
import goods7 from "../../assets/GoodsIMG/goods7.jpg";
import goods8 from "../../assets/GoodsIMG/goods8.jpg";
import goods9 from "../../assets/GoodsIMG/goods9.jpg";
import goods10 from "../../assets/GoodsIMG/goods10.jpg";
import { useNavigate } from "react-router-dom";
import TopButton from "../TopButton";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const TitleContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 50px;
`;

const BackTitle = styled.h1`
  font-size: 80px;
  text-align: center;
  color: #deeaff;
  padding: 0;
  margin: 0;
  position: absolute;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 50px;
  text-align: center;
  margin: 0;
  position: relative;
  z-index: 2;
`;

const DataController = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 0 22px;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 300px;
`;

const SearchBar = styled.input`
  width: 100%;
  height: 50px;
  border: 1px solid #54adff;
  padding-left: 40px;
  outline: none;
`;

// 라이브러리 사용 - react-icons
//import { FaSearch } from "react-icons/fa" => Fa:
const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #0068ca;
  font-size: 16px;
`;

const SortBar = styled.select`
  width: 150px;
  height: 40px;
  border: 1px solid #0068ca;
  outline: none;
  text-align: center;
  transition: all 0.5s ease;

  &:hover {
    background-color: #0068ca;
    color: #ffffff;
  }

  option {
    background-color: white;
    color: #0068ca;
  }
`;

// 그리드 설정
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  padding: 20px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: all 0.3s ease;
`;

const ProductInfo = styled.div`
  padding: 15px;
  background: white;
  transition: all 0.3s ease;
`;

const ProductName = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  transition: all 0.3s ease;
`;

const ProductPrice = styled.div`
  font-size: 16px;
  color: #333;
  font-weight: 400;
  transition: all 0.3s ease;
`;

const ProductCard = styled.div`
  border: 1px solid #eee;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.5s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: scale(0.98);

    ${ProductImage} {
      filter: brightness(1.1);
      // filter 옵션 기억! : brightness 이미지 밝기 올리기
      // filter: blur는 이미지 블러 처리
    }

    ${ProductInfo} {
      background-color: #e9e9e9;
    }

    ${ProductName} {
      color: #1a1a1a;
    }

    ${ProductPrice} {
      color: #1a1a1a;
    }
  }
`;

function Goods() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");

  const products = [
    {
      id: 1,
      name: "전시 굿즈 1",
      price: 30000,
      image: goods1,
    },
    {
      id: 2,
      name: "전시 굿즈 2",
      price: 25000,
      image: goods2,
    },
    {
      id: 3,
      name: "전시 굿즈 3",
      price: 35000,
      image: goods3,
    },
    {
      id: 4,
      name: "전시 굿즈 4",
      price: 28000,
      image: goods4,
    },
    {
      id: 5,
      name: "전시 굿즈 5",
      price: 32000,
      image: goods5,
    },
    {
      id: 6,
      name: "전시 굿즈 6",
      price: 27000,
      image: goods6,
    },
    {
      id: 7,
      name: "전시 굿즈 7",
      price: 33000,
      image: goods7,
    },
    {
      id: 8,
      name: "전시 굿즈 8",
      price: 29000,
      image: goods8,
    },
    {
      id: 9,
      name: "전시 굿즈 9",
      price: 31000,
      image: goods9,
    },
    {
      id: 10,
      name: "전시 굿즈 10",
      price: 26000,
      image: goods10,
    },
  ];

  const handleProductClick = (productId) => {
    navigate(`/goods/${productId}`);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e) => {
    setSortOption(e.target.value);
  };

  const filteredAndSortedProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "name_asc":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <>
      <Header />
      <Container>
        <TitleContainer>
          <BackTitle>Gallery Goods</BackTitle>
          <Title>Gallery Goods</Title>
        </TitleContainer>
        <DataController>
          <SearchContainer>
            <SearchIcon />
            <SearchBar
              placeholder="검색어를 입력하세요"
              value={searchTerm}
              onChange={handleSearch}
            />
          </SearchContainer>
          <SortBar value={sortOption} onChange={handleSort}>
            <option value="">정렬</option>
            <option value="price_asc">가격 낮은순</option>
            <option value="price_desc">가격 높은순</option>
            <option value="name_asc">이름순</option>
          </SortBar>
        </DataController>

        <ProductGrid>
          {filteredAndSortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              onClick={() => handleProductClick(product.id)}
            >
              <ProductImage src={product.image} alt={product.name} />
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>{product.price.toLocaleString()}원</ProductPrice>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductGrid>
      </Container>
      <TopButton />
      <Footer />
    </>
  );
}

export default Goods;
