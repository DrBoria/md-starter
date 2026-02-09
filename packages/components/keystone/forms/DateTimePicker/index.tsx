import React, { useState } from "react";
import { DatePicker } from "@keystone-ui/fields";
import moment from "moment";
import styled from "styled-components";

const DateTimePickerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.offsets.elementContent};
  font-size: ${({ theme }) => theme.font.sizes.regular};
  font-weight: 500;
`;

const StyledDatePicker = styled.div`
  flex-grow: 1;
`;

const TimePicker = styled.input`
  width: ${({ theme }) => theme.elements.form.minWidth};
  padding: ${({ theme }) => theme.offsets.elementContent};
  font-size: ${({ theme }) => theme.font.sizes.regular};
  border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.disabled};
  background-color: ${({ theme }) => theme.colors.section};
  border-radius: ${({ theme }) => theme.border.radius}px;
  text-align: center;
`;

const DateTimePicker = ({
  value,
  onUpdate,
}: {
  value: string | null;
  onUpdate: (value: string) => void;
}) => {
  const [date, setDate] = useState<string>(value ? value.split("T")[0] : "");
  const [time, setTime] = useState<string>(value ? value.split("T")[1] : "");

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    onUpdate(
      newDate && time
        ? moment(`${newDate}T${time}`).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
        : moment(newDate).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
    );
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = event.target.value;
    setTime(newTime);
    onUpdate(
      date && newTime
        ? moment(`${date}T${newTime}`).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
        : "",
    );
  };

  const handleClear = () => {
    setDate("");
    setTime("");
    onUpdate("");
  };

  return (
    <DateTimePickerContainer>
      <StyledDatePicker>
        <DatePicker
          onUpdate={handleDateChange}
          onClear={handleClear}
          value={date as string}
        />
      </StyledDatePicker>
      <TimePicker
        type="time"
        value={time || ""}
        onChange={handleTimeChange}
        placeholder="Select time"
      />
    </DateTimePickerContainer>
  );
};

export { DateTimePicker };
