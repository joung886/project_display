import React from "react";
import styled from "styled-components";

const MessageContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.$isArtist ? "row" : "row-reverse")};
  align-items: flex-end;
  gap: 8px;
  margin: 8px 0;
`;

const ProfileCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${(props) => (props.$isArtist ? "#0095E1" : "#f5f5f5")};
  color: ${(props) => (props.$isArtist ? "white" : "#666")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.$isArtist ? "flex-start" : "flex-end")};
  gap: 4px;
`;

const MessageBubble = styled.div`
  background: ${(props) => (props.$isArtist ? "#f0f0f0" : "#0095E1")};
  color: ${(props) => (props.$isArtist ? "#333" : "#fff")};
  padding: 8px 12px;
  border-radius: ${(props) =>
    props.$isArtist ? "0 12px 12px 12px" : "12px 0 12px 12px"};
  word-break: break-word;
  font-size: 15px;
  max-width: 600px;
  line-height: 1.4;
`;

const MessageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
`;

const ProfileName = styled.span`
  color: #666;
  font-weight: 500;
`;

const TimeStamp = styled.span`
  color: #aaa;
`;

const FilePreview = styled.div`
  margin-top: 8px;
  border-radius: 8px;
  overflow: hidden;
`;

const ImagePreview = styled.img`
  max-width: 200px;
  max-height: 200px;
  border-radius: 8px;
  object-fit: cover;
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  font-size: 13px;
  color: ${(props) => (props.$isArtist ? "#333" : "#fff")};
`;

const ChatMessage = ({ message, timestamp, isArtist, file }) => {
  const renderFilePreview = () => {
    if (!file) return null;

    if (file.type.startsWith("image/")) {
      return (
        <FilePreview>
          <ImagePreview src={URL.createObjectURL(file)} alt="이미지" />
        </FilePreview>
      );
    }

    return <FileInfo $isArtist={isArtist}>📎 {file.name}</FileInfo>;
  };

  return (
    <MessageContainer $isArtist={isArtist}>
      {isArtist && <ProfileCircle $isArtist={isArtist}>A</ProfileCircle>}
      <MessageContent $isArtist={isArtist}>
        {isArtist && (
          <MessageInfo>
            <ProfileName>ARTIST</ProfileName>
            <TimeStamp>{timestamp}</TimeStamp>
          </MessageInfo>
        )}
        {!isArtist && (
          <MessageInfo>
            <ProfileName>NICKNAME</ProfileName>
            <TimeStamp>{timestamp}</TimeStamp>
          </MessageInfo>
        )}
        <MessageBubble $isArtist={isArtist}>
          {message}
          {renderFilePreview()}
        </MessageBubble>
      </MessageContent>
      {!isArtist && <ProfileCircle $isArtist={isArtist}>N</ProfileCircle>}
    </MessageContainer>
  );
};

export default ChatMessage;
