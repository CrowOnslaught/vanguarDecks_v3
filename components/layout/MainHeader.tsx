import { Box, theme } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { adaptiveColor } from 'styles/mixins';

const HeaderBox = styled(Box)`
  ${adaptiveColor(
    'background-color',
    theme.colors.purple[300],
    theme.colors.purple[800]
  )}
`;

const MainHeader = () => {
  return (
    // <HeaderBox p={4} w="100%">
    //   Vanguar[D]ecks
    // </HeaderBox>
    <></>
  );
};

export default MainHeader;
