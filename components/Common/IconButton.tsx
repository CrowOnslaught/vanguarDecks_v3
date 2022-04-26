import React from "react";
import { Button, IconButton, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import styled from "@emotion/styled";

interface IconButtonProps {
  icon: JSX.Element;
  onClick: (e?: any) => any;
  className?: string;
  label?: string;
}

const ButtonContainer = styled(Button)<{ label: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  height: fit-content;
  width: ${(p: any) => (p.label ? "150px" : "fit-content")};

  gap: ${(p: any) => p.theme.space[2]};
  padding: 16px 8px;
`;

const IconButtonLabel = styled(Text)`
  text-transform: capitalize;
`;

const Content: React.FC<IconButtonProps> = ({
  icon,
  label,
  onClick,
  className,
}) => {
  return (
    <ButtonContainer
      label={label}
      className={className}
      variant="unstyled"
      onClick={() => onClick(false)}>
      {icon}
      <IconButtonLabel>{label}</IconButtonLabel>
    </ButtonContainer>
  );
};

export default Content;
