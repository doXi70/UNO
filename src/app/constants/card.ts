export class Card {
  color: string;
  content: string;

  constructor(card: string) {
    let contents = card.split(' ');
    this.color = contents[1];
    this.content = contents[0];
  }
}
