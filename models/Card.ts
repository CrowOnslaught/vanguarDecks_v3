export default interface Card {
  card_id: string;
  name: string;
  description: string;
  image: string;
  type: string;
  clan: string;
  grade: string;
  power: string;
  shield: string;
  regulation: Array<string>;
  originalPhoto: string;
}
