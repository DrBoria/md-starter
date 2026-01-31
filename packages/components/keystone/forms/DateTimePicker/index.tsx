import React, { useState } from "react";
import { DatePicker } from "@keystone-ui/fields";
import moment from "moment";
import styled from "styled-components";

const DateTimePickerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
  font-weight: 500;
`;

const StyledDatePicker = styled.div`
  flex-grow: 1;
`;

const TimePicker = styled.input`
  width: 100px;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-bg-secondary);
  border-radius: 6px;
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
