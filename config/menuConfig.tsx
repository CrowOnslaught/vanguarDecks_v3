import Cards from "public/assets/svg/icons/Cards.svg";
import Decks from "public/assets/svg/icons/Decks.svg";
import Settings from "public/assets/svg/icons/Settings.svg";
import { SearchIcon } from "@chakra-ui/icons";
import Icon from "@chakra-ui/icon";

export type MenuConfigItem = {
  label: string;
  route: string;
  upTitle?: string;
  icon?: JSX.Element;
};

export const menuConfig: MenuConfigItem[] = [
  {
    label: "Home",
    route: "/",
    icon: (
      <Icon boxSize={6}>
        <Cards />
      </Icon>
    ),
  },
  {
    label: "Decks",
    route: "/decks",
    icon: (
      <Icon boxSize={6}>
        <Decks />
      </Icon>
    ),
  },
  {
    label: "Search",
    route: "/decks/browse",
    icon: <SearchIcon boxSize={5} />,
  },
  {
    label: "Settings",
    route: "/about",
    icon: (
      <Icon boxSize={6}>
        <Settings />
      </Icon>
    ),
  },
];
