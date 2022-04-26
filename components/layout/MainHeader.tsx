import { HamburgerIcon } from "@chakra-ui/icons";
import { IconButton, useColorModeValue } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { VisibilityDesktop } from "components/utils/Visibility";

interface MainHeaderProps {
  className?: string;
  navigationOpen: boolean;
  toggleNavigation: (e: boolean) => void;
  logged?: boolean;
}

const MainHeader: React.FC<MainHeaderProps> = ({
  navigationOpen,
  toggleNavigation,
  logged = true,
}) => {
  const titleColor = useColorModeValue("purple.600", "white");

  return (
    <Flex align="center" justify={logged ? "space-between" : "center"} p="4">
      {logged && (
        <VisibilityDesktop>
          <IconButton
            aria-label=""
            variant="unstyled"
            icon={<HamburgerIcon boxSize="2em" />}
            onClick={() => {
              toggleNavigation(!navigationOpen);
            }}
          />
        </VisibilityDesktop>
      )}
      <Heading color={titleColor} size="lg">
        VanguarDecks
      </Heading>

      {logged && (
        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
      )}
    </Flex>
  );
};

export default MainHeader;
