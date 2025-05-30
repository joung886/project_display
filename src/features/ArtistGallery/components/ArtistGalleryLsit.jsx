import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ArtistGallerys from "./ArtistGallerys";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";

const Container = styled.div`
  width: 94%;
  margin: 0 auto;
`;

const GalleryGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 75%;
  margin: 0 auto;
  margin-top: 70px;
  padding-bottom: 200px;
`;

function ArtistGalleryLsit({ filteredItems }) {
  const navigate = useNavigate();
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    fetchGalleryData("/artistgallery");
  }, []);

  useEffect(() => {
    if (filteredItems && filteredItems.length > 0) {
      const transformed = filteredItems.map((item) => ({
        id: item.id,
        imageUrl: item.posterUrl,
        title: item.title,
        date: `${item.startDate} ~ ${item.endDate}`,
        description: item.description,
      }));
      setGalleryItems(transformed);
    } else {
      fetchGalleryData("/artistgallery");
    }
  }, [filteredItems]);

  const fetchGalleryData = async (apiUrl) => {
    try {
      const res = await axiosInstance.get(apiUrl);
      const transformed = res.data.map((item) => ({
        id: item.id,
        imageUrl: item.posterUrl,
        title: item.title,
        date: `${item.startDate} ~ ${item.endDate}`,
        description: item.description,
      }));
      setGalleryItems(transformed);
    } catch (error) {
      console.error("갤러리 데이터 불러오기 실패:", error);
    }
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
