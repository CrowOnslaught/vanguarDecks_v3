import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { Text, Flex, Button, theme } from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import IconButton from "components/Common/IconButton";
import firebase from "firebase";
import { useRouter } from "next/router";
import React from "react";
import { adaptiveColor } from "styles/mixins";

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
  margin-left: ${(p: any) => (p.open ? 0 : -250)}px;

  padding: ${theme.space[6]};
  transition: all 0.5s;

  gap: ${theme.space[2]};
  ${adaptiveColor(
    "background-color",
    theme.colors.purple[300],
    theme.colors.purple[800]
  )};
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

const DesktopNavigation: React.FC<NavigationProps> = ({
  open,
  toggleNavigation,
}) => {
  const { push, route } = useRouter();

  const navigationItems: NavigationItem[] = [
    {
      label: "cards",
      route: "/",
      icon: <CloseIcon />,
      action: async () => await push("/"),
    },
    {
      label: "My Decks",
      route: "/decks",
      icon: <CloseIcon />,
      action: async () => await push("/decks"),
    },
    {
      label: "Browse Decks",
      route: "/decks/browse",
      icon: <SearchIcon />,
      action: async () => await push("/decks/browse"),
    },
    {
      label: "about",
      route: "/about",
      icon: <CloseIcon />,
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
      <CloseIconButton
        onClick={() => toggleNavigation(false)}
        icon={<CloseIcon />}
      />
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
