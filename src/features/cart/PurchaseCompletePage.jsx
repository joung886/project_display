import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
`;

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 40px;
  flex: 1;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: #333;
  margin-bottom: 40px;
`;

const CompletedMessage = styled.div`
  font-size: 24px;
  color: #0066ff;
  margin-bottom: 60px;
  font-weight: bold;
`;

const PurchaseInfo = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const ItemList = styled.div`
  margin-bottom: 32px;
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

const ItemDetails = styled.div`
  text-align: left;
`;

const ItemName = styled.div`
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
`;

const ItemQuantity = styled.div`
  font-size: 14px;
  color: #666;
`;

const ItemPrice = styled.div`
  font-size: 16px;
  color: #333;
  font-weight: bold;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  border-top: 2px solid #eee;
  margin-top: 24px;
`;

const TotalLabel = styled.span`
  font-size: 18px;
  color: #333;
  font-weight: bold;
`;

const TotalPrice = styled.span`
  font-size: 24px;
  color: #0066ff;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 40px;
`;

const Button = styled.button`
  padding: 16px 48px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
  }

  background-color: ${(props) => (props.primary ? "#0066ff" : "white")};
  color: ${(props) => (props.primary ? "white" : "#666")};
  border: ${(props) => (props.primary ? "none" : "1px solid #ddd")};

  &:hover {
    background-color: ${(props) => (props.primary ? "#0052cc" : "#f8f9fa")};
  }
`;

const PurchaseCompletePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items = [], totalPrice = 0 } = location.state || {};

  if (!items || items.length === 0) {
    return (
      <Wrapper>
        <Header />
        <PageContainer>
          <Title>구매 내역이 없습니다.</Title>
          <ButtonContainer>
            <Button onClick={() => navigate("/cartpage")}>
              장바구니로 돌아가기
            </Button>
          </ButtonContainer>
        </PageContainer>
        <Footer />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Header />
      <PageContainer>
        <Title>굿즈가 구매 완료되었습니다!</Title>
        <CompletedMessage>구매해 주셔서 감사합니다.</CompletedMessage>
        <PurchaseInfo>
          <ItemList>
            {items.map((item, idx) => {
              const imgUrl = item.thumbnailUrl || item.image || "";

              return (
                <ItemRow key={idx}>
                  <ItemInfo>
                    <ItemImage
                      src={
                        imgUrl.includes("/uploads")
                          ? `http://localhost:8081${imgUrl}`
                          : `/images/goods-images/${imgUrl.replace(
                              /^.*[\\/]/,
                              ""
                            )}`
                      }
                      alt={item.goodsName}
                    />
                    <ItemDetails>
                      <ItemName>{item.goodsName}</ItemName>
                      <ItemQuantity>수량: {item.quantity}개</ItemQuantity>
                    </ItemDetails>
                  </ItemInfo>
                  <ItemPrice>
                    {(item.price * item.quantity).toLocaleString()}원
                  </ItemPrice>
                </ItemRow>
              );
            })}
          </ItemList>
          <TotalRow>
            <TotalLabel>총 결제 금액</TotalLabel>
            <TotalPrice>{totalPrice.toLocaleString()}원</TotalPrice>
          </TotalRow>
        </PurchaseInfo>
        <ButtonContainer>
          <Button onClick={() => navigate("/goods")}>계속 쇼핑하기</Button>
          <Button
            primary
            onClick={() =>
              navigate("/mypage", { state: { activeTab: "purchase" } })
            }
          >
            나의 굿즈 구매현황
          </Button>
        </ButtonContainer>
      </PageContainer>
      <Footer />
    </Wrapper>
  );
};

export default PurchaseCompletePage;
