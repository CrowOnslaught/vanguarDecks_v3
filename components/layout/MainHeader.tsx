import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Button, IconButton, useColorModeValue } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { VisibilityDesktop } from "components/utils/Visibility";
import { getCookie, checkCookies } from "cookies-next";
import User from "models/User";
import { useEffect, useState } from "react";

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
  const [profile, setProfile] = useState<User>();
  const titleColor = useColorModeValue("purple.600", "white");

  useEffect(() => {
    if (checkCookies("profile")) {
      const profileCookie = getCookie("profile") as string;
      setProfile(JSON.parse(profileCookie));
    }
  }, []);

  return (
    <Flex align="center" justify="space-between" p="4">
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

      {logged ? (
        <Avatar
          name={profile?.name}
          src={profile?.photo || "https://bit.ly/dan-abramov"}
        />
      ) : (
        <Box>
          <Button bg="purple.600">Login</Button>
        </Box>
      )}
    </Flex>
  );
};

export default MainHeader;
