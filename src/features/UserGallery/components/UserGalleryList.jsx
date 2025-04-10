import React from "react";
import UserGallerys from "./UserGallerys";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 94%;
`;

const GalleryGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 75%;
  margin: 0 auto;
  margin-top: 70px;
  margin-bottom: 70px;
`;

function UserGalleryList() {
  const navigate = useNavigate();
  const galleryItems = [
    {
      id: 1,
      imageUrl: "/src/assets/ArtistGalleryIMG/산업디자인.jpg",
      title: "삶의 예찬",
      date: "2025.01.20 ~ 2025.02.01",
      artists: "곽두팔 화백, 김철용 화백",
      description: "아티스트 갤러리 포스터 설명...",
    },
    {
      id: 2,
      imageUrl: "/src/assets/ArtistGalleryIMG/산업디자인.jpg",
      title: "자연의 숨결",
      date: "2025.03.15 ~ 2025.04.01",
      artists: "박서준 화백",
      description: "자연의 아름다움을 표현한 작품들...",
    },
    {
      id: 3,
      imageUrl: "/src/assets/ArtistGalleryIMG/산업디자인.jpg",
      title: "도시와 인간",
      date: "2025.05.10 ~ 2025.06.01",
      artists: "이정화 화백",
      description: "도시 속에서 살아가는 인간의 모습을 조명한 전시...",
    },
    {
      id: 1,
      imageUrl: "/src/assets/ArtistGalleryIMG/산업디자인.jpg",
      title: "삶의 예찬",
      date: "2025.01.20 ~ 2025.02.01",
      artists: "곽두팔 화백, 김철용 화백",
      description:
        "아티스트 갤러리 포스터 설명...아티스트 갤러리 포스터 설명...아티스트 갤러리 포스터 설명...아티스트 갤러리 포스터 설명...",
    },

    {
      id: 1,
      imageUrl: "/src/assets/ArtistGalleryIMG/산업디자인.jpg",
      title: "삶의 예찬",
      date: "2025.01.20 ~ 2025.02.01",
      artists: "곽두팔 화백, 김철용 화백",
      description:
        "아티스트 갤러리 포스터 설명...아티스트 갤러리 포스터 설명...아티스트 갤러리 포스터 설명...아티스트 갤러리 포스터 설명...",
    },
  ];

  return (
    <Container>
      <GalleryGrid>
        {galleryItems.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/gallery/usergallery/${item.id}`)}
          >
            <UserGallerys {...item} />
          </div>
        ))}
      </GalleryGrid>
    </Container>
  );
}

export default UserGalleryList;
