import { theme } from '@chakra-ui/react';
import { css } from '@emotion/react';

export const adaptiveColor = (
  property: string,
  lightColor: string,
  darkColor: string
) => {
  return css`
    ${property}: ${lightColor};
    @media (prefers-color-scheme: dark) {
      ${property}: ${darkColor};
    }
  `;
};

export const desktop = (inner: any) => css`
  @media (min-width: ${theme.sizes.container.lg}) {
    max-width: ${theme.sizes.container.lg};
    ${inner}
  }
`;
