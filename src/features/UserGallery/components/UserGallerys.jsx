import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  align-items: center; /* 변경: 세로 방향 중앙 정렬 */
  cursor: pointer;
  border: 1px solid #a2a2a2;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(0.99);
  }
`;

const Img = styled.img`
  width: 230px;
  height: 310px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 40px;
  margin-left: 40px;
  flex-shrink: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
  &:hover {
    transform: scale(0.95);
    opacity: 0.8;
  }
`;

const ArtistGalleryIntro = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 250px;

  & h1 {
    font-size: 26px;
    color: #1e1e1e;
    margin: 0;
  }

  & h2 {
    font-size: 18px;
    color: #606060;
    margin: 10px 0 0;
  }

  & h3 {
    font-size: 16px;
    color: #606060;
    margin: 8px 0 0;
  }

  & p {
    font-size: 14px;
    color: #606060;
    margin-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;

function UserGallerys({ id, imageUrl, title, date, artists, description }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/gallery/usergallery/${id}`);
  };

  return (
    <Container onClick={handleClick}>
      <Img src={imageUrl} alt={title} />
      <ArtistGalleryIntro>
        <h1>{title}</h1>
        <h2>{date}</h2>
        <h3>{artists}</h3>
        <p>{description}</p>
      </ArtistGalleryIntro>
    </Container>
  );
}

export default UserGallerys;
