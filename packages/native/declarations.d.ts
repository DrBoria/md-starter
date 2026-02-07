declare module 'styled-components/native' {
    import type * as styled from 'styled-components';

    // Re-export everything from main styled-components types 
    // as native shares most APIs
    export * from 'styled-components';

    // Default export is the styled factory
    const nativeStyled: typeof styled.default;
    export default nativeStyled;
}
