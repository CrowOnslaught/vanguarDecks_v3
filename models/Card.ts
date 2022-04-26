export default interface Card {
  id: string;
  name: string;
  description: string;
  photo: string;
  type: string;
  clan: string;
  grade: string;
  power: string;
  shield: string;
  regulation: Array<string>;
}
