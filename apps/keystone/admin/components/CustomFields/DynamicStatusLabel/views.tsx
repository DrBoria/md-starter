import { useQuery  } from "@apollo/client";
import type {QueryResult} from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { BasicSection, Label, StatusLabel } from "@md/components";
import { useQueryListItem } from "@md/api/graphql";

interface IErrorMapping {
  regex: RegExp;
  message: string | ((...groups: string[]) => string);
}

const parseCalculationError = (error?: string): string => {
  if (!error) return "";

  const errorMappings: IErrorMapping[] = [
    {
      regex: /ERROR:\s*argument of AND must be type boolean, not type integer/,
      message: "argument of AND must be type boolean, not type integer",
    },
    {
      regex: /unexpected token "<EOF>"/,
      message: "expected Value",
    },
    {
      regex: /unexpected token "(.+?)"/,
      message: (_, token) => `unexpected token "${token}"`,
    },
    {
      regex: /invalid input text "(.+?)"/,
      message: (_, text) => `invalid input text "${text}"`,
    },
    {
      regex: /ERROR:\s*syntax error at or near "(.+?)"/,
      message: (_, token) => `syntax error at or near "${token}"`,
    },
    {
      regex: /ERROR:\s*operator does not exist: (.+?) \+ (.+?)\b/,
      message: (_, leftType, rightType) =>
        `operator does not exist: ${leftType} + ${rightType}`,
    },
  ];

  for (const { regex, message } of errorMappings) {
    const match = error.match(regex);
    if (match) {
      return typeof message === "function" ? message(...match) : message;
    }
  }

  return error;
};

interface IFieldProps {
  value: { value: { value: string } };
  field: {
    label: string;
    path: string;
    description?: string;
  };
}

const Field: React.FC<IFieldProps> = ({ value, field }) => {
  const router = useRouter();
  const { id } = router.query;

  // Initial state derived from the value prop
  const [currentStatus, setCurrentStatus] = useState(value?.value?.value);

  const {
    data: segmentData,
    refetch,
  }: QueryResult<{
    segment: { status: string; calculationError: string; contacts: string };
  }> = useQueryListItem({
    listName: "Segment",
    selectedFields: "status calculationError contacts { id }",
    itemId: id as string,
    useQuery
  });

  // Update current status when value prop changes
  useEffect(() => {
    // Assuming sourcce of truth is value from props
    if (value?.value?.value !== currentStatus) {
      setCurrentStatus(value?.value?.value);
    }
  }, [value?.value?.value, currentStatus]);

  // Polling logic based on the current status
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (currentStatus === "queued" || currentStatus === "processing") {
      // Check new status value every 5 seconds
      interval = setInterval(refetch, 5000);
    } else {
      interval && clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentStatus, refetch, value]);

  const calculationError = segmentData?.segment?.calculationError;

  return (
      <BasicSection as="fieldset">
        <Label>{field.label}</Label>

        {
          {
            /* Status label */
            queued: <StatusLabel state={currentStatus} />,
            processing: <StatusLabel state={currentStatus} />,
            /* Error message */
            failed: (
              <div style={{ color: "#f44336" }}>
                Calculation Error: {parseCalculationError(calculationError)}
              </div>
            ),
            // Success Status - show amount of users
            success: (
              <div>
                There are {segmentData?.segment?.contacts.length} Contacts linked
                to this Segment
              </div>
            ),
            // Not calculadet should show all contacts
            not_calculated: (
              <div>
                There are {segmentData?.segment?.contacts.length} Segment
                Relations linked to this Segment
              </div>
            ),
          }[currentStatus]
        }
      </BasicSection>
  );
};

export { Field };
