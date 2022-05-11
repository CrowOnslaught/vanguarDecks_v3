import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Text,
  theme,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import Card from "models/Card";
import React from "react";
import StyledCardDescription from "./StyledCardDescription";
import Image from "next/image";
import Power from "public/assets/svg/icons/Power.svg";
import Shield from "public/assets/svg/icons/Shield.svg";
import Grade from "public/assets/svg/icons/Grade.svg";
import { VisibilityDesktop, VisibilityMobile } from "./utils/Visibility";
import { Grid } from "@chakra-ui/react";

export enum CardDisplayModes {
  List = "list",
  Grid = "grid",
}

interface CardDisplayProps {
  card: Card;
  className?: string;
  mode: CardDisplayModes;
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

const CardDisplay: React.FC<CardDisplayProps> = ({ card, className, mode }) => {
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
  ];

  if (mode === CardDisplayModes.List) {
    return (
      <Grid gap="4" templateColumns="1fr 1fr 4fr" marginBottom="4">
        <Flex direction="column" gap="4">
          <Button bg="purple.600">
            <Text fontSize="xs">
              + <br />
              Add card
            </Text>
          </Button>
          <Button bg="purple.600">
            <Text fontSize="xs">View details</Text>
          </Button>
        </Flex>
        <Box>
          <Box w="4em">
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
          </Box>
        </Box>
        <Box h="100%">
          <Text fontSize="sm" align="left">
            {card.card_id.replace("_", "/")}
          </Text>
          <CardTitle fontSize="md" align="left">
            {card.name}
          </CardTitle>
          <StatsWrapper>
            {DataConfig.map((e, i) => (
              <div key={i}>
                <Icon>{e.icon}</Icon>
                <Text fontSize="sm">{e.text}</Text>
              </div>
            ))}
          </StatsWrapper>
          <VisibilityDesktop>
            <Text>{card.description}</Text>
          </VisibilityDesktop>
        </Box>
      </Grid>
    );
  }

  return (
    <Flex direction={"column"} marginBottom="4">
      <a href={`/card/${card.card_id}`}>
        <VisibilityDesktop>
          <ImageDescriptionWrapper>
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
        </VisibilityDesktop>
        <VisibilityMobile>
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
        </VisibilityMobile>
      </a>
      <Button
        marginTop="-5px"
        bg="purple.600"
        w="100%"
        borderRadius="0 0 6px 6px">
        + Add card
      </Button>
      <Box my="2">
        <Text fontSize="sm" align="left">
          {card.card_id.replace("_", "/")}
        </Text>
        <Heading size="xs">{card.name}</Heading>
      </Box>
      <StatsWrapper>
        {DataConfig.map((e, i) => (
          <div key={i}>
            <Icon>{e.icon}</Icon>
            <Text fontSize="sm">{e.text}</Text>
          </div>
        ))}
      </StatsWrapper>
    </Flex>
  );
};

export default CardDisplay;
