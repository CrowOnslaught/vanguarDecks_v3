import styled from "@emotion/styled";

const VisibilityMobile = styled.div`
  @media (min-width: ${p => p.theme.breakpoints.lg}) {
    display: none;
  }
`;

const VisibilityDesktop = styled.div`
  display: none;
  @media (min-width: ${p => p.theme.breakpoints.lg}) {
    display: block;
  }
`;

export { VisibilityMobile, VisibilityDesktop };
