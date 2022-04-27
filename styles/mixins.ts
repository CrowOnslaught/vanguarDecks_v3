import { theme } from "@chakra-ui/react";
import { css } from "@emotion/react";

export const desktop = (inner: any) => css`
  @media (min-width: ${theme.sizes.container.lg}) {
    max-width: ${theme.sizes.container.lg};
    ${inner}
  }
`;
