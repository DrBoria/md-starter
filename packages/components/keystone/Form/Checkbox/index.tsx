import { Checkbox as KeystoneCheckbox } from "@keystone-ui/fields";
import styled from "styled-components";

const Checkbox = styled(KeystoneCheckbox)`
    & div {
        background-color: ${({ theme }) => theme.colors.section};
        color: ${({ theme }) => theme.colors.sectionContent};
        border: ${({ theme }) => theme.border.size} solid ${({ theme }) => theme.colors.sectionContent};
    }
`

export { Checkbox };
