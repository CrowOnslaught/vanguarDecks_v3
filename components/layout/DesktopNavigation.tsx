import { Text, Flex, Button, theme } from '@chakra-ui/react';
import styled from '@emotion/styled';
import firebase from 'firebase';
import { useRouter } from 'next/router';
import React from 'react';
import { adaptiveColor } from 'styles/mixins';

interface NavigationItem {
  label: string;
  action(): Promise<any>;
  route?: string;
  upTitle?: string;
}

const DesktopNavigationContainer = styled(Flex)`
  height: 100vh;
  position: sticky;
  flex-direction: column;
  top: 0;
  padding: ${theme.space[2]};
  gap: ${theme.space[2]};
  ${adaptiveColor(
    'background-color',
    theme.colors.purple[300],
    theme.colors.purple[900]
  )};
`;

const DesktopNavigationUpTitle = styled(Text)`
  text-transform: uppercase;

  &:first-of-type {
    margin-top: auto;
  }
`;

const DesktopNavigation: React.FC = () => {
  const { push, route } = useRouter();

  const navigationItems: NavigationItem[] = [
    {
      label: 'cards',
      route: '/',
      action: async () => await push('/'),
    },
    {
      label: 'My Decks',
      route: '/decks',
      action: async () => await push('/decks'),
    },
    {
      label: 'Browse Decks',
      route: '/decks/browse',
      action: async () => await push('/decks/browse'),
    },
    {
      label: 'about',
      route: '/about',
      action: async () => await push('/about'),
    },
    {
      label: 'Log out',
      upTitle: ' ',
      action: async () => await firebase.auth().signOut(),
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
    <DesktopNavigationContainer>
      {navigationItems.map((item, key) => (
        <React.Fragment key={key}>
          {item.upTitle && (
            <DesktopNavigationUpTitle>{item.upTitle}</DesktopNavigationUpTitle>
          )}

          <Button
            onClick={e => onNavigationItemClick(e, item)}
            colorScheme="purple"
            variant={item.route == route ? 'solid' : 'outline'}>
            {item.label}
          </Button>
        </React.Fragment>
      ))}
    </DesktopNavigationContainer>
  );
};

export default DesktopNavigation;
