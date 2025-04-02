import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import styled from "styled-components";
import ArtistDetail from "./ArtistDetail";

const TitleContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  margin-bottom: 20px;
  margin-top: 20px;
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

const ArtistContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
`;

const Artist = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <TitleContainer>
        <BackTitle>ARTIST</BackTitle>
        <Title>ARTIST</Title>
      </TitleContainer>
      <ArtistContainer>
        
      </ArtistContainer>

      <Footer />
    </div>
  );
};

export default Artist;
