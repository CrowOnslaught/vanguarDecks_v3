import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  IconButton,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { Avatar, Menu } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { VisibilityDesktop } from "components/utils/Visibility";
import { getCookie, checkCookies } from "cookies-next";
import User from "models/User";
import router from "next/router";
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
  }, [profile]);

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
        profile && (
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon h="50px" />}
              variant="unstyled">
              <Avatar size="md" name={profile.name} src={profile.photo} />
            </MenuButton>
            <MenuList>
              <Box p={3}>
                <Text fontSize="md">{profile.name}</Text>
                <Text>{profile.email}</Text>
              </Box>
              <MenuItem onClick={() => router.push("/api/auth/logout")}>
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
        )
      ) : (
        <Box>
          <Button bg="purple.600">Login</Button>
        </Box>
      )}
    </Flex>
  );
};

export default MainHeader;
