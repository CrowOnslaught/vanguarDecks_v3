import { HamburgerIcon } from "@chakra-ui/icons";
import styled from "@emotion/styled";
import { IconButton } from "@chakra-ui/react";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 36px;
  margin: 32px 0;
  padding: 0 16px;
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
    <HeaderContainer>
      {!navigationOpen ? (
        <IconButton
          size="xl"
          aria-label=""
          variant="unstyled"
          icon={<HamburgerIcon />}
          onClick={() => toggleNavigation(true)}
        />
      ) : (
        <div></div>
      )}
      <p>VanguarDecks</p>
      <p>photo</p>
    </HeaderContainer>
  );
};

export default MainHeader;
