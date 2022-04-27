import React from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

import AnimatedButton from "components/Common/AnimatedButton";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Text,
  Flex,
  Icon,
  theme,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

import Cards from "public/assets/svg/icons/Cards.svg";
import Decks from "public/assets/svg/icons/Decks.svg";
import Settings from "public/assets/svg/icons/Settings.svg";

interface NavigationItem {
  label: string;
  action(): Promise<any>;
  route?: string;
  upTitle?: string;
  icon?: JSX.Element;
}

const DesktopNavigationContainer = styled(Flex)<{ open: boolean }>`
  height: 100vh;
  width: 250px;
  position: sticky;
  flex-direction: column;
  top: 0;
  margin-left: ${p => (p.open ? 0 : -250)}px;

  padding: ${p => p.theme.spaces._300};
  transition: all 0.5s;

  gap: ${p => p.theme.spaces._100};
  background-color: ${p => p.theme.colors.purple[600]};
`;

const DesktopNavigationUpTitle = styled(Text)`
  text-transform: uppercase;

  &:first-of-type {
    margin-top: auto;
  }
`;

const CloseAnimatedButton = styled(Button)`
  margin-bottom: ${p => p.theme.spaces._900};
  font-size: ${p => p.theme.sizes._300};
  text-align: left;
  width: fit-content;
`;

const DesktopNavigationButton = styled(AnimatedButton)<{ selected: boolean }>`
  background-color: ${(p: any) => p.selected && p.theme.colors.gray[100]};
  color: ${(p: any) =>
    p.selected ? p.theme.colors.purple[600] : p.theme.colors.gray[100]};
`;

interface NavigationProps {
  open: boolean;
  toggleNavigation: (e: boolean) => void;
}

const DesktopNavigation: React.FC<NavigationProps> = ({
  open,
  toggleNavigation,
}) => {
  const { push, route } = useRouter();

  const navigationItems: NavigationItem[] = [
    {
      label: "cards",
      route: "/",
      icon: (
        <Icon boxSize={6}>
          <Cards />
        </Icon>
      ),
      action: async () => await push("/"),
    },
    {
      label: "My Decks",
      route: "/decks",
      icon: (
        <Icon boxSize={6}>
          <Decks />
        </Icon>
      ),
      action: async () => await push("/decks"),
    },
    {
      label: "Browse Decks",
      route: "/decks/browse",
      icon: <SearchIcon boxSize={5} />,
      action: async () => await push("/decks/browse"),
    },
    {
      label: "about",
      route: "/about",
      icon: (
        <Icon boxSize={6}>
          <Settings />
        </Icon>
      ),
      action: async () => await push("/about"),
    },
  ];

  const onNavigationItemClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: NavigationItem
  ) => {
    e.stopPropagation();
    await item.action();
  };

  return (
    <DesktopNavigationContainer open={open}>
      <CloseAnimatedButton
        variant="unstyled"
        onClick={() => toggleNavigation(false)}>
        <CloseIcon color="gray.100" boxSize={6} />
      </CloseAnimatedButton>
      {navigationItems.map((item, key) => (
        <React.Fragment key={key}>
          {item.upTitle && (
            <DesktopNavigationUpTitle>{item.upTitle}</DesktopNavigationUpTitle>
          )}
          <DesktopNavigationButton
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              onNavigationItemClick(e, item)
            }
            label={item.label}
            icon={item.icon}
            selected={item.route == route}
          />
        </React.Fragment>
      ))}
    </DesktopNavigationContainer>
  );
};

export default DesktopNavigation;
