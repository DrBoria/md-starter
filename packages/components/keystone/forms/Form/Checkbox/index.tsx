import { Checkbox as KeystoneCheckbox } from "@keystone-ui/fields";
import styled from "styled-components";

const Checkbox = styled(KeystoneCheckbox)`
    & div {
        background-color: ${({ theme }) => theme?.colors?.overlay || 'transparent'};
        color: ${({ theme }) => theme?.colors?.sectionContent || 'inherit'};
        border: ${({ theme }) => theme?.border?.size || 1}px solid ${({ theme }) => theme?.colors?.sectionContent || 'black'};
        border-radius: ${({ theme }) => theme?.colors?.borderRadius || theme?.border?.radius || 0}px;
        backdrop-filter: var(--glass-effect);
    }
`

export { Checkbox };
