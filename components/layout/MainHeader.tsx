import { HamburgerIcon } from "@chakra-ui/icons";
import styled from "@emotion/styled";
import { Button, IconButton, Text, useColorModeValue } from "@chakra-ui/react";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: ${p => p.theme.spaces._500};
  margin: ${p => p.theme.spaces._400} 0;
  padding: 0 ${p => p.theme.spaces._200};
`;

const HeaderTitle = styled(Text)`
  font-weight: 700;
`;

interface MainHeaderProps {
  className?: string;
  navigationOpen: boolean;
  toggleNavigation: (e: boolean) => void;
}

const MainHeader: React.FC<MainHeaderProps> = ({
  className,
  navigationOpen,
  toggleNavigation,
}) => {
  return (
    <HeaderContainer className={className}>
      {!navigationOpen ? (
        <Button variant="unstyled" onClick={() => toggleNavigation(true)}>
          <HamburgerIcon
            boxSize={8}
            color={useColorModeValue("purple.600", "white")}
          />
        </Button>
      ) : (
        <div></div>
      )}
      <HeaderTitle
        color={useColorModeValue("purple.600", "white")}
        fontSize="2xl">
        VanguarDecks
      </HeaderTitle>
      <p>photo</p>
    </HeaderContainer>
  );
};

export default MainHeader;
