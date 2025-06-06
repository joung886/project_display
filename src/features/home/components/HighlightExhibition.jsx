import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Section = styled.section`
  display: flex;
  width: 100%;
  height: 300px;
  cursor: pointer;
`;

const LeftBox = styled.div`
  width: 25%;
  background: linear-gradient(to right,rgb(0, 33, 66),rgb(0, 58, 144));
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding-right: 60px;
  padding-left: 50px;
`;

const Title = styled.h2`
  font-size: 45px;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 25px;
  margin-top: 6px;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: white;
  margin-top: 20px;
`;

const RightBox = styled.div`
  width: 75%;
  background-size: cover;
  background-position: center;
  background-image: url("/images/sample.png");
`;

const HighlightExhibition = () => {
  const navigate = useNavigate();

  return (
    <Section onClick={() => navigate("/gallery/usergallery")}>
      <LeftBox>
        <Title>기획전</Title>
        <Subtitle>USER’S GALLERY</Subtitle>
        <Line />
      </LeftBox>

      <RightBox />
    </Section>
  );
};

export default HighlightExhibition;
