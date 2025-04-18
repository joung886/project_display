import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../Header';
import Footer from '../../Footer';
import AdminMenu from './AdminMenu';
import AdminTicketMenubar from './AdminTicketMenubar';

// ✅ 정적 이미지 처리
const artImages = import.meta.glob("/public/images/ArtistGalleryIMG/*", {
  eager: true,
});
const getImageUrl = (filename) => {
  if (!filename) return '/images/default-image.png';
  const matched = Object.entries(artImages).find(([path]) =>
    path.endsWith(filename)
  );
  return matched ? matched[1].default : '/images/default-image.png';
};

// ✅ 스타일 정의
const Container = styled.div`
  display: flex;
  padding: 20px;
  margin-left: 23px;
  position: relative;
`;
const AdminGoodsMenubarWrapper = styled.div`
  position: relative;
  top: 100px;
  left: 45px;
  z-index: 10;
  margin-left: -85px;
`;
const AdminMenuWrapper = styled.div`
  position: relative;
  top: -30px;
  margin-left: 13px;
`;
const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  margin-top: -60px;
  margin-left: 30px;
`;
const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 30px;
`;
const Table = styled.table`
  width: 100%;
  max-width: 1300px;
  border-collapse: collapse;
  margin-top: 90px;
  font-size: 16px;
  text-align: center;
`;
const Th = styled.th`
  background: #f0f0f0;
  padding: 12px;
  border: 1px solid #ddd;
`;
const Td = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`;
const Thumbnail = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  cursor: pointer;
`;
const ActionButton = styled.button`
  padding: 6px 12px;
  margin: 2px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #333;
  background-color: ${props =>
    props.variant === 'edit' ? '#a4d4f3' :
    props.variant === 'delete' ? '#f7b6b6' : '#d6ccf7'};

  &:hover {
    background-color: ${props =>
      props.variant === 'edit' ? '#7dc5f3' :
      props.variant === 'delete' ? '#f48c8c' : '#c4b8f0'};
`;

const AdminTicketManagement = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ deadline: '' });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const galleryRes = await fetch('/api/artistgallery/now');
        const galleries = await galleryRes.json();

        const formatted = await Promise.all(
          galleries.map(async (gallery) => {
            try {
              const res = await fetch(`/api/reservation/admin/users/by-gallery/${gallery.id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              if (!res.ok) {
                console.warn(`ID ${gallery.id} 예약자 불러오기 실패: ${res.status}`);
                return formatTicket(gallery, 0);
              }

              const reservations = await res.json();
              const totalVisitors = reservations.reduce((sum, r) => sum + r.headcount, 0);
              return formatTicket(gallery, totalVisitors);

            } catch (err) {
              console.error(`ID ${gallery.id} 예약자 호출 실패`, err);
              return formatTicket(gallery, 0);
            }
          })
        );

        setTickets(formatted);
      } catch (error) {
        console.error('데이터 로딩 오류:', error);
      }
    };

    fetchData();
  }, []);

  const formatTicket = (gallery, visitorCount) => ({
    id: gallery.id,
    title: gallery.title,
    dateRange: `${gallery.startDate} - ${gallery.endDate}`,
    image: getImageUrl(gallery.posterUrl),
    visitors: visitorCount, // 방문자 수를 표시
    reservationLimit: 100, // 예약 한도
    deadline: gallery.deadline,
  });

  const handleThumbnailClick = (id) => {
    navigate(`/gallery/artistgallery/${id}`);
  };

  const handleEditClick = (ticket) => {
    setEditingId(ticket.id);
    setFormData({ deadline: ticket.deadline });
  };

  const handleSave = async (id) => {
    try {
      const response = await fetch(`/api/artistgallery/deadline/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ deadline: formData.deadline }),
      });

      if (!response.ok) throw new Error('마감일 수정 실패');

      alert(await response.text());

      setTickets(prev =>
        prev.map(ticket =>
          ticket.id === id ? { ...ticket, deadline: formData.deadline } : ticket
        )
      );

      setEditingId(null);
    } catch (error) {
      console.error('마감일 수정 오류:', error);
      alert('수정 중 오류 발생');
    }
  };

  const handleDelete = (id) => {
    setTickets(prev => prev.filter(ticket => ticket.id !== id));
  };

  return (
    <>
      <Header />
      <AdminGoodsMenubarWrapper>
        <AdminTicketMenubar />
      </AdminGoodsMenubarWrapper>
      <Container>
        <AdminMenuWrapper>
          <AdminMenu />
        </AdminMenuWrapper>

        <MainContent>
          <Title>티켓 판매 내역 및 마감일 관리</Title>

          <Table>
            <thead>
              <tr>
                <Th>전시 이미지</Th>
                <Th>전시명</Th>
                <Th>기간</Th>
                <Th>예약 가능 수량</Th>
                <Th>예약자 수</Th> {/* 예약자 수 열 */}
                <Th>예약 마감일</Th>
                <Th>관리</Th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(ticket => (
                <tr key={ticket.id}>
                  <Td>
                    <Thumbnail
                      src={ticket.image}
                      alt="전시 이미지"
                      onClick={() => handleThumbnailClick(ticket.id)}
                    />
                  </Td>
                  <Td>{ticket.title}</Td>
                  <Td>{ticket.dateRange}</Td>
                  <Td>{ticket.reservationLimit}</Td>
                  <Td>{ticket.visitors}</Td> {/* 예약자 수 표시 */}
                  <Td>
                    {editingId === ticket.id ? (
                      <input
                        type="date"
                        value={formData.deadline}
                        onChange={(e) =>
                          setFormData({ ...formData, deadline: e.target.value })
                        }
                      />
                    ) : (
                      ticket.deadline
                    )}
                  </Td>
                  <Td>
                    {editingId === ticket.id ? (
                      <ActionButton variant="edit" onClick={() => handleSave(ticket.id)}>저장</ActionButton>
                    ) : (
                      <ActionButton variant="edit" onClick={() => handleEditClick(ticket)}>수정</ActionButton>
                    )}
                    <ActionButton variant="delete" onClick={() => handleDelete(ticket.id)}>삭제</ActionButton>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </MainContent>
      </Container>
      <Footer />
    </>
  );
};

export default AdminTicketManagement;
