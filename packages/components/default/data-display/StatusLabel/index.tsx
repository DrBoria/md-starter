import React from "react";
import { Loader } from "@md/components/default/feedback/Loading";
import { StateContainer, StatusDot } from "./styles";

/**
 * Generic StatusLabel
 * Can accept a specific `status` (legacy) or generic `label` & `tone` properties.
 */

export type StatusTone = "neutral" | "processing" | "success" | "failed" | "warning";

// Legacy mapping
const LEGACY_STATES = {
  not_calculated: { label: "Not Calculated", tone: "neutral", color: "#9e9e9e" },
  queued: { label: "Processing", tone: "processing", color: "#03a9f4" },
  processing: { label: "Processing", tone: "processing", color: "#03a9f4" },
  failed: { label: "Failed", tone: "failed", color: "#f44336" },
  success: { label: "Success", tone: "success", color: "#4caf50" },
} as const;

export type LegacyStateValue = keyof typeof LEGACY_STATES;

export interface StatusLabelProps {
  // Option A: Generic Props
  label?: string;
  tone?: StatusTone;
  color?: string; // Explicit color override
  isLoading?: boolean;

  // Option B: Legacy Prop
  state?: LegacyStateValue | string;
}

export const StatusLabel: React.FC<StatusLabelProps> = ({
  label,
  tone = "neutral",
  color,
  isLoading,
  state,
}) => {
  // Resolve Props
  let finalLabel = label;
  let finalTone: StatusTone = tone;
  let finalColor = color;
  let finalLoading = isLoading;

  if (state && LEGACY_STATES[state as LegacyStateValue]) {
    const legacyConfig = LEGACY_STATES[state as LegacyStateValue];
    finalLabel = legacyConfig.label;
    finalTone = legacyConfig.tone as StatusTone;
    finalColor = legacyConfig.color;
    if (state === 'queued' || state === 'processing') finalLoading = true; // Implicit loading
  } else if (state) {
    finalLabel = state; // Fallback for unknown strings
  }

  // Default color if not provided
  if (!finalColor) {
    switch (finalTone) {
      case "processing": finalColor = "#03a9f4"; break;
      case "success": finalColor = "#4caf50"; break;
      case "failed": finalColor = "#f44336"; break;
      case "warning": finalColor = "#ff9800"; break;
      default: finalColor = "#9e9e9e";
    }
  }

  return (
    <StateContainer $tone={finalTone}>
      {!finalLoading && <StatusDot className="status-dot" $color={finalColor} $animate={finalTone === 'processing'} />}
      {finalLoading && <Loader $size="small" />}
      <span>{finalLabel || "Unknown"}</span>
    </StateContainer>
  );
};
