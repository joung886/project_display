import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column; /* 세로 배치 */
  padding: 40px 60px;
  min-height: 80vh;
  background: #f8f9fa;
`;
const Title = styled.h1`
  font-size: 35px;
  margin-bottom: 20px;
    margin-left: -20px;
`;

const Sidebar = styled.div`
  width: 240px;
  height: 500px;
  margin-left: -30px;
  padding: 20px;
  background: #e9ecef;
  border-radius: 8px;
`;



const AdminInfo = styled.div`
  padding: 16px;
  background: #dee2e6;
  text-align: center;
  border-radius: 6px;
  font-size: 18px;
  color: #3DA9FC;
  font-weight: bold;
  margin-bottom: 20px;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
`;

const MenuItem = styled.li`
  padding: 10px 12px;
  margin: 6px 0;
  background: ${({ active }) => (active ? '#3DA9FC' : 'transparent')};
  color: ${({ active }) => (active ? 'white' : '#333')};
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: ${({ active }) => (active ? '#3da0e5' : '#ccc')};
  }
`;

const AdminMenu = ({ tab, setTab }) => {
  return (
    <Container><Title>관리자 페이지</Title>
      <Sidebar>
        <AdminInfo>관리자 김동근님 <br /> 어서오세요</AdminInfo>
        <MenuList>
          <MenuItem active={tab === 'check'} onClick={() => setTab('check')}>
            <Link to="/AdminPage" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%', height: '100%' }}>
              작품 조회
            </Link>
          </MenuItem>
          <MenuItem active={tab === 'goods'} onClick={() => setTab('goods')}>
            <Link to="/AdminGoods" style={{textDecoration: 'none',color: 'inherit', display: 'block', width: '100%', height: '100%'}}>
        
            굿즈 판매 내역
            </Link>
          </MenuItem>
          <MenuItem active={tab === 'tickets'} onClick={() => setTab('tickets')}>
            티켓 판매 내역
          </MenuItem>
          <MenuItem active={tab === 'users'} onClick={() => setTab('users')}>
            유저 관리
          </MenuItem>
        </MenuList>
      </Sidebar>
    </Container>
  );
};

export default AdminMenu;
