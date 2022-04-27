import { GridItem, Icon, Text, theme } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Card from "models/Card";
import React, { useEffect, useRef } from "react";
import StyledCardDescription from "./StyledCardDescription";
import Image from "next/image";
import Power from "public/assets/svg/icons/Power.svg";
import Shield from "public/assets/svg/icons/Shield.svg";
import Grade from "public/assets/svg/icons/Grade.svg";
import Type from "public/assets/svg/icons/Type.svg";

interface CardDisplayProps {
  card: Card;
  className?: string;
}

const CardTitle = styled(Text)`
  font-weight: 700;
`;

const CardDescrition = styled(StyledCardDescription)`
  position: absolute;
  opacity: 0;
  top: 100%;
  transition: all 0.5s ease-in;
  padding: ${p => p.theme.spaces._200};
  background-color: #00000099;

  width: 100%;
  height: 100%;
`;

const CardItem = styled(GridItem)`
  display: flex;
  gap: ${p => p.theme.spaces._100};
  flex-direction: column;
  margin-bottom: ${p => p.theme.spaces._300};
`;

const ImageDescriptionWrapper = styled.div`
  position: relative;
  overflow: hidden;

  :hover {
    .cardImage {
      filter: blur(2px);
      transition: all 0.5s;
    }

    .floatingText {
      top: 0;
      opacity: 1;
    }
  }
`;

const StatsWrapper = styled.div`
  margin-top: auto;
  line-height: ${p => p.theme.sizes._400};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: currentColor;

  > div {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    height: ${p => p.theme.spaces._200};
    margin-right: ${p => p.theme.spaces._100};

    > svg {
      padding: 2px;
      background-color: ${p => p.theme.colors.purple[600]};
      margin-right: ${p => p.theme.spaces._050};
      color: ${p => p.theme.colors.gray[100]};

      height: ${p => p.theme.spaces._200};
      width: ${p => p.theme.spaces._200};
    }

    &:nth-of-type(2) {
      > svg {
        padding: 1px;
      }
    }
  }
`;

interface dataConfigProps {
  text: string;
  icon: JSX.Element;
}

const CardDisplay: React.FC<CardDisplayProps> = ({ card, className }) => {
  const descRef = useRef(null);

  const DataConfig: dataConfigProps[] = [
    {
      text: card.power || "-",
      icon: <Power color={theme.colors.gray[100]} />,
    },
    {
      text: card.shield || "-",
      icon: <Shield color={theme.colors.gray[100]} />,
    },
    {
      text: card.grade,
      icon: <Grade color={theme.colors.gray[100]} />,
    },
    {
      text: card.type,
      icon: <Type />,
    },
  ];

  useEffect(() => {
    if (!descRef) return;

    descRef.current?.addEventListener("mouseover", e => {
      e.stopPropagation();
    });
  }, [descRef]);

  return (
    <CardItem className={className}>
      <ImageDescriptionWrapper ref={descRef}>
        <Image
          src={card.originalPhoto}
          alt={card.name}
          layout="responsive"
          width={350}
          height={510}
          placeholder="blur"
          blurDataURL={card.originalPhoto}
          className="cardImage"
        />
        <CardDescrition
          className="floatingText"
          fontSize="sm"
          align="left"
          text={card.description}
        />
      </ImageDescriptionWrapper>
      <CardTitle fontSize="sm" align="center">
        {card.name}
      </CardTitle>
      <Text fontSize="sm" align="center">
        {card.card_id.replace("_", "/")}
      </Text>
      <StatsWrapper>
        {DataConfig.map((e, i) => (
          <div key={i}>
            <Icon>{e.icon}</Icon>
            <Text fontSize="sm">{e.text}</Text>
          </div>
        ))}
      </StatsWrapper>
    </CardItem>
  );
};

export default CardDisplay;
