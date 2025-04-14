import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ArtistGallerys from "./ArtistGallerys";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  width: 94%;
  margin: 0 auto;
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

function ArtistGalleryLsit({ filteredItems }) {
  const navigate = useNavigate();
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    // 초기 데이터 로드 (전체 전시)
    fetchGalleryData("/api/artistgallery");
  }, []);

  useEffect(() => {
    // filteredItems prop이 변경될 때 상태 업데이트
    if (filteredItems && filteredItems.length > 0) {
      const transformed = filteredItems.map((item, index) => ({
        id: index + 1,
        imageUrl: item.posterUrl,
        title: item.title,
        date: `${item.startDate} ~ ${item.endDate}`,
        description: item.description,
      }));
      setGalleryItems(transformed);
    } else {
      // filteredItems가 없거나 비어있으면 전체 데이터를 다시 불러옴 (선택 사항)
      fetchGalleryData("/api/artistgallery");
    }
  }, [filteredItems]);

  const fetchGalleryData = (apiUrl) => {
    axios
      .get(apiUrl)
      .then((res) => {
        const transformed = res.data.map((item, index) => ({
          id: index + 1,
          imageUrl: item.posterUrl,
          title: item.title,
          date: `${item.startDate} ~ ${item.endDate}`,
          description: item.description,
        }));
        setGalleryItems(transformed);
      })
      .catch((err) => {
        console.error("갤러리 데이터 불러오기 실패:", err);
      });
  };

  return (
    <Container>
      <GalleryGrid>
        {galleryItems.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/gallery/artistgallery/${item.id}`)}
          >
            <ArtistGallerys {...item} />
          </div>
        ))}
      </GalleryGrid>
    </Container>
  );
}

export default ArtistGalleryLsit;
