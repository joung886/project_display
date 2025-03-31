import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../features/home/Home";
import Login from "../features/home/Login";
import Join from "../features/home/components/Join";
import MyPage from "../features/mypage/MyPage";
import GoodsMain from "../features/goodsMain/GoodsMain";
import ArtistGallery from "../features/ArtistGallery/ArtistGallery";
import UserGallery from "../features/UserGallery/UserGallery";
import ArtistGalleryDetail from "../features/ArtistGalleryDetail/ArtistGalleryDetail";
import UserGalleryDetail from "../features/UserGalleryDetail/UserGalleryDetail";
import Directions from "../features/Directions/Directions";
import Guide from "../features/Guide/Guide";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/goods" element={<GoodsMain />} />
      <Route path="/artistgallery" element={<ArtistGallery />} />
      <Route path="/usergallery" element={<UserGallery />} />
      <Route path="/artistgallerydetail" element={<ArtistGalleryDetail />} />
      <Route path="/usergallerydetail" element={<UserGalleryDetail />} />
      <Route path="/directions" element={<Directions />} />
      <Route path="/guide" element={<Guide />} />
    </Routes>
  );
};

export default AppRoutes;
