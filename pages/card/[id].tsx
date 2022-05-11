import { Box, Flex, Heading } from "@chakra-ui/react";
import Card from "models/Card";
import { GetServerSideProps } from "next/types";
import { getCard } from "services/apiCards";
import { withAuth } from "lib/withAuth";
import Image from "next/image";

interface CardProps {
  card: Card;
}

const Home = ({ card }: CardProps) => {
  if (!card) return <>No cards displayed</>;

  return (
    <>
      <Flex justify="center">
        <Box w="36">
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
      </Flex>
      <Heading>{card.name}</Heading>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth(
  async ({ req, params }, session) => {
    const card = await getCard(session.access.token, String(params.id));

    return {
      props: {
        card: card,
      },
    };
  }
);

export default Home;
