import { Checkbox as KeystoneCheckbox } from "@keystone-ui/fields";
import styled from "styled-components";

const Checkbox = styled(KeystoneCheckbox)`
    & div {
        background-color: ${({ theme }) => theme.colors.overlay};
        color: ${({ theme }) => theme.colors.sectionContent};
        border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.sectionContent};
        border-radius: ${({ theme }) => theme.border.radius}px;
        backdrop-filter: ${({ theme }) => theme.effects.texture};
    }
`

export { Checkbox };
