declare module '@emotion/styled' {
  import { CreateStyled } from '@emotion/styled/types/index';
  import { theme } from '@chakra-ui/react';
  export * from '@emotion/styled/types/index';
  const customStyled: CreateStyled<theme>;
  export default customStyled;
}
