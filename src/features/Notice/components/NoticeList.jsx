import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const TitleContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 60px;
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

const TabBar = styled.div`
  width: 80%;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 300px;
`;

const SearchBar = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #626262;
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
  color: #626262;
  font-size: 16px;
`;

const SortBar = styled.select`
  width: 150px;
  height: 40px;
  border: 1px solid #0068ca;
  border-radius: 2px;
  outline: none;
`;

const Container = styled.div`
  width: 80%;
  margin: 20px auto;
  padding: 20px;
`;

const Box = styled.div`
  display: grid;
  grid-template-columns: 25% 65% 10%;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 20px;

  & > div {
    padding: 8px;
  }
`;

export default function NoticeList() {
  return (
    <div>
      <TitleContainer>
        <BackTitle>Notice</BackTitle>
        <Title>Notice</Title>
      </TitleContainer>
      <TabBar>
        <SearchContainer>
          <SearchIcon />
          <SearchBar placeholder="검색어를 입력하세요" />
        </SearchContainer>
        <SortBar>
          <option value="">정렬</option>
          <option value="price_asc">가격 낮은순</option>
          <option value="price_desc">가격 높은순</option>
        </SortBar>
      </TabBar>
      <Container>
        <Box>
          <div>2025.03.03</div>
          <div>업데이트..</div>
          <img src="/src/assets/Icon/bord_right_icon.png"></img>
        </Box>
        <Box>
          <div>2025.03.03</div>
          <div>업데이트..</div>
          <img src="/src/assets/Icon/bord_right_icon.png"></img>
        </Box>
        <Box>
          <div>2025.03.03</div>
          <div>업데이트..</div>
          <img src="/src/assets/Icon/bord_right_icon.png"></img>
        </Box>
        <Box>
          <div>2025.03.03</div>
          <div>업데이트..</div>
          <img src="/src/assets/Icon/bord_right_icon.png"></img>
        </Box>
      </Container>
    </div>
  );
}
