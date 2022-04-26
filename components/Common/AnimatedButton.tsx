import { Button, theme } from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { adaptiveColor } from "styles/mixins";

const DesktopNavigationButton = styled(Button)<{ selected: boolean }>`
  transition: color 1s;
  overflow: hidden;
  border-radius: 3px;
  border-width: 2px;
  ${adaptiveColor(
    "border-color",
    theme.colors.purple[500],
    theme.colors.purple[300]
  )};
  ${adaptiveColor("color", theme.colors.purple[500], theme.colors.purple[300])};

  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: -50px;
    width: 0;
    height: 100%;
    ${adaptiveColor(
      "background-color",
      theme.colors.purple[500],
      theme.colors.purple[300]
    )};
    transform: skewX(35deg);
    z-index: -1;
    transition: width 1s;
  }

  :hover {
    ${(p: any) =>
      !p.selected &&
      css`
        background: transparent;
        ${adaptiveColor(
          "color",
          theme.colors.purple[300],
          theme.colors.purple[800]
        )};

        ::before {
          width: 150%;
        }
      `}
  }

  ${(p: any) =>
    p.selected &&
    css`
      font-weight: 700;
      ${adaptiveColor(
        "color",
        theme.colors.purple[300],
        theme.colors.purple[800]
      )};
      ${adaptiveColor(
        "background-color",
        theme.colors.purple[800],
        theme.colors.purple[300]
      )};

      :hover {
        ${adaptiveColor(
          "color",
          theme.colors.purple[300],
          theme.colors.purple[800]
        )};
        ${adaptiveColor(
          "background-color",
          theme.colors.purple[800],
          theme.colors.purple[300]
        )};
      }
    `}
`;

interface NavigationButtonProps extends Record<string, any> {
  selected: boolean;
  className?: string;
}

const AnimatedButton = (props: NavigationButtonProps) => {
  return (
    <DesktopNavigationButton {...props} colorScheme="purple">
      {props.children}
    </DesktopNavigationButton>
  );
};

export default AnimatedButton;
