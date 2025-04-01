import React from "react";
import styled from "styled-components";
import ArtistGallerys from "./ArtistGallerys";

const Container = styled.div`
  width: 94%;
`;
const GalleryGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 75%;
  margin: 0 auto;
  overflow-y: auto;
  max-height: 1000px;
  margin-top: 70px;
  margin-bottom: 70px;
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: #eaeaea;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #018ec8;
    border-radius: 5px;
    max-height: 30px;
  }
`;

function ArtistGalleryLsit() {
  const galleryItems = [
    {
      id: 1,
      imageUrl: "/src/assets/ArtistGalleryIMG/삶의 예찬.jpg",
      title: "삶의 예찬",
      date: "2025.01.20 ~ 2025.02.01",
      artists: "곽두팔 화백, 김철용 화백",
      description:
        "아티스트 갤러리 포스터 설명...아티스트 갤러리 포스터 설명...아티스트 갤러리 포스터 설명...아티스트 갤러리 포스터 설명...",
    },
    {
      id: 2,
      imageUrl: "/src/assets/ArtistGalleryIMG/삶의 예찬.jpg",
      title: "또 다른 전시 제목",
      date: "2025.02.05 ~ 2025.02.15",
      artists: "박세리 화백, 최민수 화백",
      description:
        "또 다른 전시 포스터 설명...아티스트 갤러리 포스터 설명...아티스트 갤러리 포스터 설명...아티스트 갤러리 포스터 설명...아티스트 갤러리 포스터 설명...",
    },
    {
      id: 3,
      imageUrl: "/src/assets/ArtistGalleryIMG/삶의 예찬.jpg",
      title: "세 번째 전시 제목",
      date: "2025.02.10 ~ 2025.02.20",
      artists: "홍길동 화백, 임꺽정 화백",
      description:
        "세 번째 전시 포스터 설명...아티스트 갤러리 포스터 설명...아티스트 갤러리 포스터 설명...아티스트 갤러리 포스터 설명...아티스트 갤러리 포스터 설명...",
    },
    {
      id: 4,
      imageUrl: "/src/assets/ArtistGalleryIMG/삶의 예찬.jpg",
      title: "네 번째 전시 제목",
      date: "2025.02.15 ~ 2025.02.25",
      artists: "장보고 화백, 이순신 화백",
      description:
        "네 번째 전시 포스터 설명...아티스트 갤러리 포스터 설명...아티스트 갤러리 포스터 설명...아티스트 갤러리 포스터 설명...아티스트 갤러리 포스터 설명...",
    },
  ];

  return (
    <Container>
      <GalleryGrid>
        {galleryItems.map((item, index) => (
          <ArtistGallerys key={index} {...item} />
        ))}
      </GalleryGrid>
    </Container>
  );
}

export default ArtistGalleryLsit;
