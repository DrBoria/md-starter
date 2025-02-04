import React from "react";
import styled, { css, keyframes } from "styled-components";

import { LoaderImage } from "../Loading";

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const SegmentStates = [
  { label: "Not Calculated", value: "not_calculated" },
  { label: "Processing", value: "queued" }, // We use same view for queued and processing states, user don't need to know this detail
  { label: "Processing", value: "processing" },
  { label: "Failed", value: "failed" },
  { label: "Success", value: "success" },
];
type StateValue = (typeof SegmentStates)[number]["value"];

const stateColors: Record<StateValue, string> = {
  not_calculated: "#9e9e9e",
  queued: "#03a9f4",
  processing: "#03a9f4",
  failed: "#f44336",
  success: "#4caf50",
};

const StateContainer = styled.div<{ state: StateValue }>`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
`;

const StatusDot = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  position: relative;

  ${({ color }) =>
    color === "#03a9f4" && // Light Blue (processing state) has a pulse effect
    css`
      animation: ${pulseAnimation} 1.5s infinite ease-in-out;
    `}
`;

const StatusLabel: React.FC<{ state?: StateValue }> = ({
  state = SegmentStates[0].value,
}) => {
  const stateLabel =
    SegmentStates.find((segment) => segment.value === state)?.label ||
    "Unknown";

  return (
    <StateContainer state={state}>
      <StatusDot color={stateColors[state]} />
      {(state === "queued" || state === "processing") && (
        <LoaderImage src="/ouroboros.svg" alt="Loading..." priority width={20} height={20} />
      )}
      {stateLabel}
    </StateContainer>
  );
};

export { StatusLabel };
