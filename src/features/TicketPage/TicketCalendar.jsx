import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  background-color: #f8f9fa;
  padding: 30px;
  border-radius: 12px;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const MonthTitle = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
`;

const NavigationButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #333;
  cursor: pointer;
  padding: 5px 10px;

  &:hover {
    color: #0066ff;
  }
`;

const WeekdayHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 10px;
  text-align: center;
`;

const WeekdayCell = styled.div`
  color: #666;
  font-size: 0.9rem;
  padding: 10px;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
`;

const DayCell = styled.div`
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 50%;
  color: ${props => props.isCurrentMonth ? '#333' : '#ccc'};
  background-color: ${props => props.isSelected ? '#0066ff' : 'transparent'};
  color: ${props => props.isSelected ? '#fff' : props.isCurrentMonth ? '#333' : '#ccc'};

  &:hover {
    background-color: ${props => props.isCurrentMonth && !props.isSelected ? '#e9ecef' : props.isSelected ? '#0066ff' : 'transparent'};
  }
`;

const TicketCalendar = ({ selectedDate, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);

  useEffect(() => {
    generateCalendarDays();
  }, [currentDate]);

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // 이전 달의 날짜들
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push({ date, isCurrentMonth: false });
    }

    // 현재 달의 날짜들
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push({ date, isCurrentMonth: true });
    }

    // 다음 달의 날짜들
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({ date, isCurrentMonth: false });
    }

    setCalendarDays(days);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const isSelected = (date) => {
    return selectedDate && 
           date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear();
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <NavigationButton onClick={handlePrevMonth}>{'<'}</NavigationButton>
        <MonthTitle>{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월</MonthTitle>
        <NavigationButton onClick={handleNextMonth}>{'>'}</NavigationButton>
      </CalendarHeader>
      <WeekdayHeader>
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <WeekdayCell key={day}>{day}</WeekdayCell>
        ))}
      </WeekdayHeader>
      <DaysGrid>
        {calendarDays.map(({ date, isCurrentMonth }, index) => (
          <DayCell
            key={index}
            isCurrentMonth={isCurrentMonth}
            isSelected={isSelected(date)}
            onClick={() => isCurrentMonth && onDateSelect(date)}
          >
            {date.getDate()}
          </DayCell>
        ))}
      </DaysGrid>
    </CalendarContainer>
  );
};

export default TicketCalendar; 