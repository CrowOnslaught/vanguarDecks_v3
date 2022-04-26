import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { CloseIcon } from "@chakra-ui/icons";
import { Text, Flex, theme, Box } from "@chakra-ui/react";
import IconButton from "components/common/IconButton";
import { menuConfig } from "config/menuConfig";
import {
  VisibilityDesktop,
  VisibilityMobile,
} from "components/utils/Visibility";

const DesktopNavigationContainer = styled(Flex)<{ open: boolean }>`
  height: 100vh;
  width: 250px;
  position: sticky;
  flex-direction: column;
  top: 0;
  margin-left: ${(p: any) => (p.open ? 0 : -250)}px;

  padding: ${theme.space[6]};
  transition: all 0.5s;

  gap: ${theme.space[2]};
`;

const DesktopNavigationUpTitle = styled(Text)`
  text-transform: uppercase;

  &:first-of-type {
    margin-top: auto;
  }
`;

const CloseIconButton = styled(IconButton)`
  margin-bottom: 64px;
`;

const DesktopNavigationButton = styled(IconButton)<{ selected: boolean }>`
  background-color: ${(p: any) => p.selected && p.theme.colors.gray[100]};
  color: ${(p: any) =>
    p.selected ? p.theme.colors.purple[700] : p.theme.colors.gray[100]};
`;

interface NavigationProps {
  open: boolean;
  toggleNavigation: (e: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({ open, toggleNavigation }) => {
  const { push, route } = useRouter();

  return (
    <>
      <VisibilityMobile>
        <Box
          bg="purple.600"
          position="fixed"
          left="0"
          bottom="0"
          w="100vw"
          zIndex="10">
          <Box>
            <Flex justify="center" align="center">
              {menuConfig?.map((item, key) => (
                <Box
                  mx="4"
                  py="2"
                  borderTop={item.route === route ? "3px solid white" : "none"}
                  key={key}>
                  <Link href={item.route}>
                    <a>
                      <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        h="100%">
                        <Box
                          borderRadius="20%"
                          h="1.5em"
                          w="2.5em"
                          color={item.route === route ? "white" : "purple.300"}
                          marginBottom="0.3em">
                          <Flex
                            direction="column"
                            align="center"
                            justify="center"
                            h="100%">
                            {item.icon}
                          </Flex>
                        </Box>
                        <Text
                          fontSize="10px"
                          color={item.route === route ? "white" : "purple.300"}>
                          {item.label}
                        </Text>
                      </Flex>
                    </a>
                  </Link>
                </Box>
              ))}
            </Flex>
          </Box>
        </Box>
      </VisibilityMobile>
      <VisibilityDesktop>
        <DesktopNavigationContainer open={open} bg="purple.600">
          <CloseIconButton
            onClick={() => toggleNavigation(false)}
            icon={<CloseIcon boxSize="1.5em" />}
          />
          {menuConfig.map((item, key) => (
            <React.Fragment key={key}>
              {item.upTitle && (
                <DesktopNavigationUpTitle>
                  {item.upTitle}
                </DesktopNavigationUpTitle>
              )}
              <DesktopNavigationButton
                onClick={() => push(item.route)}
                label={item.label}
                icon={item.icon}
                selected={item.route == route}
              />
            </React.Fragment>
          ))}
        </DesktopNavigationContainer>
      </VisibilityDesktop>
    </>
  );
};

export default Navigation;
