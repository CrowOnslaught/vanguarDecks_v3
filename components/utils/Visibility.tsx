import styled from "@emotion/styled";

const VisibilityMobile = styled.div`
  @media (min-width: 1280px) {
    display: none;
  }
`;

const VisibilityDesktop = styled.div`
  display: none;
  @media (min-width: 1280px) {
    display: block;
  }
`;

export { VisibilityMobile, VisibilityDesktop };
