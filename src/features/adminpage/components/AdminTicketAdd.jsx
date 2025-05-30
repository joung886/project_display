import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import styled from "styled-components";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 60px;
`;

const MainContent = styled.div`
  flex: 1;
  max-width: 1200px;
`;

const Title = styled.h1`
  text-align: start;
  font-size: 30px;
  color: #3da9fc;
  margin-top: 43px;
  margin-bottom: 24px;
  font-weight: 500;
`;

const FlexRow = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;
  margin-top: 30px;
`;

const ImageBox = styled.div`
  width: 300px;
  height: 300px;
  background-color: rgba(255, 255, 255, 0.07);
  border: 2px dashed #ccc;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FormWrapper = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CardSection = styled.div`
  background: rgba(255, 255, 255, 0.07);
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 5px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 6px;
  color: #e1e1e1;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  width: 100%;
  margin-bottom: 10px;
  color:#222;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 12px 16px;
  font-size: 16px;
  background-color: #6ea8fe;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 200px;

  &:hover {
    background-color: #4a90e2;
  }
`;

const ChartBlock = styled.div`
  margin-bottom: 10px;
`;

const AdminTicketAdd = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    deadline: "",
    capacity: "",
    price: "",
    poster: "",
    artistIdList: [],
    artIdList: [],
  });

  const [previewImage, setPreviewImage] = useState("");
  const [artistOptions, setArtistOptions] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [artOptions, setArtOptions] = useState([]);
  const [selectedArts, setSelectedArts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await axiosInstance.get("/artist");
        const formatted = res.data.map((artist) => ({
          value: artist.id,
          label: artist.name,
        }));
        setArtistOptions(formatted);
      } catch (error) {
        console.error("작가 목록 로딩 실패:", error);
      }
    };
    fetchArtists();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (["capacity", "price"].includes(name)) {
      newValue = value.replace(/\D/g, "");
    }

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handlePosterChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;

      setForm((prev) => ({
        ...prev,
        poster: base64Image,
      }));

      setPreviewImage(base64Image);
    };

    reader.readAsDataURL(file);
  };

  const handleSelectChange = async (selected) => {
    setSelectedArtists(selected);
    const artistIds = selected.map((s) => s.value);
    console.log("artistIds", artistIds);

    setForm((prev) => ({
      ...prev,
      artistIdList: artistIds,
      artIdList: [],
    }));

    try {
      const res = await axiosInstance.get("/art/art-list", {
        params: { artistIds: artistIds.join(",") },
      });

      const formatted = res.data.map((art) => ({
        value: art.id,
        label: art.title,
      }));
      console.log("art response", res.data);

      setArtOptions(formatted);
      setSelectedArts([]); // UI 초기화
    } catch (error) {
      console.error("작품 불러오기 실패:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.capacity === "" || form.price === "") {
      alert("정원과 가격은 반드시 입력해야 합니다.");
      return;
    }

    try {
      const formData = new FormData();

      const dtoBlob = new Blob(
        [
          JSON.stringify({
            title: form.title,
            description: form.description,
            startDate: form.startDate,
            endDate: form.endDate,
            deadline: form.deadline,
            capacity: parseInt(form.capacity, 10),
            price: parseInt(form.price, 10),
            artistIdList: form.artistIdList,
            artIdList: form.artIdList,
          }),
        ],
        { type: "application/json" }
      );

      formData.append("dto", dtoBlob);

      const posterInput = document.querySelector('input[type="file"]');
      if (posterInput.files.length > 0) {
        formData.append("poster", posterInput.files[0]);
      } else {
        alert("포스터 이미지를 업로드해주세요.");
        return;
      }

      await axiosInstance.post("/artistgallery/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("전시 티켓이 등록되었습니다!");
      navigate("/AdminPage?tab=ticket");
    } catch (error) {
      console.error("등록 실패:", error);
      alert("등록 중 오류 발생");
    }
  };

  return (
    <Container>
      <MainContent>
        <Title>전시 티켓 추가</Title>

        <FlexRow>
          <ImageBox>
            {previewImage ? (
              <PreviewImage src={previewImage} alt="포스터 미리보기" />
            ) : (
              <span style={{ color: "#888" }}>이미지를 업로드 해주세요</span>
            )}
          </ImageBox>

          <FormWrapper onSubmit={handleSubmit}>
            <CardSection>
              <Label>전시명</Label>
              <Input name="title" value={form.title} onChange={handleChange} required />
              <Label>전시 설명</Label>
              <Input name="description" value={form.description} onChange={handleChange} required />
              <Label>시작일</Label>
              <Input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                required
              />
              <Label>종료일</Label>
              <Input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                required
              />
              <Label>예약 마감일</Label>
              <Input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                required
              />
              <Label>정원</Label>
              <Input
                type="number"
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
                inputMode="numeric"
                pattern="\d*"
                required
              />
              <Label>티켓 가격</Label>
              <Input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                inputMode="numeric"
                pattern="\d*"
                required
              />
            </CardSection>

            <CardSection>
              <Label>작가 선택</Label>
              <ChartBlock>
                <Select
                  isMulti
                  options={artistOptions}
                  value={selectedArtists}
                  onChange={handleSelectChange}
                  placeholder="작가를 선택하세요"
                />
              </ChartBlock>

              <Label>작품 선택</Label>
              <ChartBlock>
                <Select
                  isMulti
                  options={artOptions}
                  value={selectedArts}
                  onChange={(selected) => {
                    setSelectedArts(selected);
                    setForm((prev) => ({
                      ...prev,
                      artIdList: selected.map((s) => s.value),
                    }));
                  }}
                  placeholder="작품을 선택하세요"
                  isDisabled={artOptions.length === 0}
                />
              </ChartBlock>

              <Label>포스터 이미지 업로드</Label>
              {selectedArts.length > 0 && (
                <CardSection>
                  <Label>선택된 작품 미리보기</Label>
                  <ul style={{ paddingLeft: "1rem", color: "#fff" }}>
                    {selectedArts.map((art) => (
                      <li key={art.value}>• {art.label}</li>
                    ))}
                  </ul>
                </CardSection>
              )}
              <Input type="file" accept="image/*" onChange={handlePosterChange} />

              <Button type="submit">티켓 추가</Button>
            </CardSection>
          </FormWrapper>
        </FlexRow>
      </MainContent>
    </Container>
  );
};

export default AdminTicketAdd;
