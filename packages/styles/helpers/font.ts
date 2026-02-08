import { css } from 'styled-components';

export const basicFont = css`
  ${({ theme }) => {
        const t = theme as { font?: { sizes?: { regular?: string }; family?: { text?: string } }; fontFamily?: string };
        return `500 ${t?.font?.sizes?.regular || '1rem'} ${t?.fontFamily || t?.font?.family?.text || 'sans-serif'}`;
    }}
`;
