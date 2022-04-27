import React from "react";
import { Button, Text, theme } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface AnimatedButtonProps {
  icon: JSX.Element;
  onClick: (e?: any) => any;
  className?: string;
  label?: string;
  selected?: boolean;
}

const ButtonContainer = styled(Button)<{ label: boolean; selected: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  height: fit-content;
  width: ${p => (p.label ? "150px" : "fit-content")};

  gap: ${p => p.theme.spaces._100};
  padding: ${p => p.theme.spaces._200} ${p => p.theme.spaces._100};

  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: -50px;
    width: 0;
    height: 100%;
    background-color: ${p => p.theme.colors.purple[300]};
    transform: skewX(35deg);
    z-index: -1;
    transition: width 1s;
  }

  :hover {
    ${(p: any) =>
      !p.selected &&
      css`
        background: transparent;
        color: ${theme.colors.purple[600]};
        ::before {
          width: 150%;
        }
      `}
  }
`;

const AnimatedButtonLabel = styled(Text)`
  text-transform: capitalize;
`;

const Content: React.FC<AnimatedButtonProps> = ({
  icon,
  label,
  onClick,
  className,
  selected,
}) => {
  return (
    <ButtonContainer
      label={label}
      selected={selected}
      className={className}
      variant="unstyled"
      onClick={() => onClick(false)}>
      {icon}
      <AnimatedButtonLabel>{label}</AnimatedButtonLabel>
    </ButtonContainer>
  );
};

export default Content;
