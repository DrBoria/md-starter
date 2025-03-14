import React, {
  ChangeEvent,
  CSSProperties,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

// Высота из темы через CSS-переменную или напрямую
const INPUT_HEIGHT = "var(--height-form)"; // Предполагается, что тема задает --height-form как 50px

// Обертка для инпута
const InputWrapper = styled.div`
  width: 100%;
  height: ${INPUT_HEIGHT};
  position: relative;
`;

// Контейнер для редактируемого инпута
const StyledInputContainer = styled.div<{ isFocused: boolean }>`
  position: absolute;
  overflow-x: hidden;
  width: 100%;
  padding: ${({ theme }) => theme.variables.offsets.elementContent.mobile}px;
  border-radius: ${({ theme }) => theme.variables.border.radius}px;
  border: ${({ theme }) => theme.variables.border.size}px solid ${({ theme }) => theme.colors.label};
  font-size: ${({ theme }) => theme.font.size};
  font-family: ${({ theme }) => theme.font.family.text};
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.section};
  color: ${({ theme }) => theme.colors.sectionContent};
  outline: none;
  transition: border-color 0.3s ease;
  cursor: text;
  white-space: nowrap;

  // Стили при фокусе
  ${({ isFocused, theme }) =>
    isFocused && `border-color: ${theme.colors.highlighted};`}

  // Стили плейсхолдера
  &:empty:before {
    content: attr(data-placeholder);
    color: ${({ theme }) => theme.colors.label};
  }

  // Маскировка пароля
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
        spellCheck={false} // Отключаем проверку орфографии для пароля
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

export { InputField as DivInput };
