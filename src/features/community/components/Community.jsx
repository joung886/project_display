import React, { useState } from "react";
import styled from "styled-components";
import {
  BsThreeDots,
  BsHeart,
  BsHeartFill,
  BsChat,
  BsArrowsFullscreen,
} from "react-icons/bs";
import FullImageModal from "./FullImageModal";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 800px;
  padding: 15px;
  border-radius: 8px;
  background: white;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  position: relative;
  margin-bottom: 40px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Nickname = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #777;
`;

const DateText = styled.span`
  font-size: 13px;
  color: #a0a0a0;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #018ec8;
  margin: 10px 0;
`;

const Content = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
`;

const PostImageWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const PostImage = styled.img`
  width: 100%;
  max-height: 380px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 10px;
`;

const ExpandButton = styled(BsArrowsFullscreen)`
  position: absolute;
  width: 30px;
  height: 30px;
  top: 17px;
  right: 8px;
  font-size: 24px;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 25%;
  padding: 5px;
  cursor: pointer;
  z-index: 5;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const MenuIconWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const MenuIcon = styled(BsThreeDots)`
  font-size: 18px;
  color: #888;
`;

const MenuDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  overflow: hidden;
  z-index: 10;
`;

const MenuItemM = styled.div`
  width: 100px;
  padding: 10px;
  background: white;
  font-size: 14px;
  color: #018ec8;
  cursor: pointer;
  text-align: center;

  &:hover {
    background: #f0f0f0;
  }
`;

const MenuItemD = styled.div`
  width: 100px;
  padding: 10px;
  background: white;
  font-size: 14px;
  color: #e16060;
  cursor: pointer;
  text-align: center;

  &:hover {
    background: #f0f0f0;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 15px;
  align-items: center;
`;

const ActionIcon = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  margin-right: 25px;
  color: #ff6347;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;

  &:active {
    transform: scale(1.3);
  }

  span {
    font-size: 16px;
    margin-left: 6px;
    color: #444;
  }
`;

const ChatIcon = styled(BsChat)`
  font-size: 24px;
  color: #888;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

function Community({
  id,
  nickname,
  datetext,
  content,
  drawingImage,
  onOpenModal,
  onDelete,
  onEdit,
}) {
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleHeart = () => {
    setLikeCount(isHeartFilled ? likeCount - 1 : likeCount + 1);
    setIsHeartFilled(!isHeartFilled);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleEdit = () => {
    navigate(`/community/modify/${id}`);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <Container>
      <Header>
        <UserInfo>
          <Nickname
            onClick={(e) =>
              onOpenModal(e, { id, nickname, datetext, content, drawingImage })
            }
          >
            {nickname}
          </Nickname>
          <DateText
            onClick={(e) =>
              onOpenModal(e, { id, nickname, datetext, content, drawingImage })
            }
          >
            {datetext}
          </DateText>
        </UserInfo>
        <MenuIconWrapper onClick={toggleMenu}>
          <MenuIcon />
          {isMenuOpen && (
            <MenuDropdown>
              <MenuItemM onClick={handleEdit}>수정</MenuItemM>
              <MenuItemD onClick={handleDelete}>삭제</MenuItemD>
            </MenuDropdown>
          )}
        </MenuIconWrapper>
      </Header>
      <Divider />

      <Content
        onClick={(e) =>
          onOpenModal(e, { id, nickname, datetext, content, drawingImage })
        }
      >
        {content}
      </Content>

      {drawingImage && (
        <PostImageWrapper>
          <PostImage
            src={drawingImage}
            alt="Attached Content"
            onClick={(e) =>
              onOpenModal(e, { id, nickname, datetext, content, drawingImage })
            }
          />
          <ExpandButton onClick={openModal} />
        </PostImageWrapper>
      )}

      <Actions>
        <ActionIcon onClick={toggleHeart}>
          {isHeartFilled ? <BsHeartFill /> : <BsHeart />}
          <span>{likeCount}</span>
        </ActionIcon>
        <ChatIcon
          onClick={(e) =>
            onOpenModal(e, { id, nickname, datetext, content, drawingImage })
          }
        />
      </Actions>

      {isModalOpen && (
        <FullImageModal image={drawingImage} onClose={closeModal} />
      )}
    </Container>
  );
}

export default Community;
