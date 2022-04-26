import { Flex, theme } from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { desktop } from "styles/mixins";
import MainHeader from "./MainHeader";
import DesktopNavigation from "./DesktopNavigation";
import { useState } from "react";

const LayoutContainer = styled.main`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
`;

const MainNavigationWrapper = styled(Flex)``;

const MainContainer = styled.div`
  width: 100%;
  ${desktop(
    css`
      margin: auto;
    `
  )}
`;

const BodyContainer = styled.div`
  padding: 0 ${theme.space[4]};
`;

const HIDDING_PATHS = ["/login"];
const MainLayout = ({ children }: any) => {
  const { pathname } = useRouter();

  const [navigationOpen, setNavigationOpen] = useState<boolean>(true);

  if (HIDDING_PATHS.includes(pathname))
    return (
      <MainContainer>
        <MainHeader
          navigationOpen={navigationOpen}
          toggleNavigation={setNavigationOpen}
        />
        <BodyContainer>{children}</BodyContainer>
      </MainContainer>
    );

  return (
    <LayoutContainer>
      <MainNavigationWrapper>
        <DesktopNavigation
          open={navigationOpen}
          toggleNavigation={setNavigationOpen}
        />
        <MainContainer>
          <MainHeader
            navigationOpen={navigationOpen}
            toggleNavigation={setNavigationOpen}
          />
          <BodyContainer>{children}</BodyContainer>
        </MainContainer>
      </MainNavigationWrapper>
    </LayoutContainer>
  );
};

export default MainLayout;
