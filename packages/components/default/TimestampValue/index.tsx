import React from "react";
import styled from "styled-components";

const TimestampContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
`;

const DateText = styled.span`
  color: #374151;
  font-weight: 500;
`;

const TimeText = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
`;

interface TimestampValueProps {
  date: string;
  time: string;
}

export const TimestampValue: React.FC<TimestampValueProps> = ({
  date,
  time,
}) => {
  if (!date && !time) return null;

  return (
    <TimestampContainer>
      <DateText>{date}</DateText>
      <TimeText>{time}</TimeText>
    </TimestampContainer>
  );
};
