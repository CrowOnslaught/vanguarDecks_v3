interface Comment {
  user: string;
  message: string;
}

export default interface Deck {
  id: string;
  clan: string;
  comments: Array<Comment>;
  likes: number;
  name: string;
  user: string;
}
