import React, {
  ChangeEvent,
  CSSProperties,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

// Input height, input wrapper and absolute position for input - is fix for bug, when div got content more, than width of viewport.
const INPUT_HEIGHT = 38;
const InputWrapper = styled.div`
  width: 100%;
  height: ${INPUT_HEIGHT}px;
  position: relative;
`;

const StyledInputContainer = styled.div<{ isFocused: boolean }>`
  position: absolute;
  overflow: hidden;
  width: 100%;
  padding: 7px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  font-size: 16px;
  box-sizing: border-box;
  background-color: #f9fafb;
  color: #374151;
  outline: none;
  transition: border-color 0.3s ease;
  cursor: text;
  white-space: nowrap;

  ${({ isFocused }) => isFocused && `border-color: #d1d5db;`}

  &:empty:before {
    content: attr(data-placeholder);
    color: #9ca3af;
  }

  // Make symbols looks like dots
  &.password {
    -webkit-text-security: disc;
    -webkit-appearance: textfield;
    -webkit-user-select: text;
  }
`;

interface InputFieldProps {
  value?: string | string[];
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void;
  id?: string;
  type?: "text" | "password";
  autoFocus?: boolean;
  placeholder?: string;
  autoComplete?: string;
  style?: CSSProperties;
  className?: string;
  readOnly?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  value = "",
  type = "text",
  autoFocus,
  onChange,
  onKeyDown,
  placeholder,
  style,
  readOnly,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  const handleInput = () => {
    const inputValue = inputRef.current?.textContent || "";
    if (onChange)
      onChange({
        target: { value: inputValue },
      } as ChangeEvent<HTMLInputElement>);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    if (inputRef.current && inputRef.current.textContent !== value) {
      inputRef.current.textContent = (value as string) || "";
    }
  }, [value]);

  return (
    <InputWrapper>
      <StyledInputContainer
        id={id}
        ref={inputRef}
        role="textbox"
        contentEditable={!readOnly}
        suppressContentEditableWarning
        data-placeholder={placeholder}
        spellCheck={false} // We need it to remove red underline for password field (with dots)
        className={type === "password" ? "password" : ""}
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={onKeyDown}
        isFocused={isFocused}
        style={style}
        {...rest}
      />
    </InputWrapper>
  );
};

export { InputField as Input };
