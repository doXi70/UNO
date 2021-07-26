import { Component, VERSION } from '@angular/core';
import { Card } from './constants/card';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  colors: string[] = ['YELLOW', 'BLUE', 'RED', 'GREEN'];
  numbers: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  zeroes: string[] = ['0 YELLOW', '0 BLUE', '0 RED', '0 GREEN'];

  deck: Card[] = [];
  lastPlayedCard: Card;

  computerDeck: Card[] = [];
  playerDeck: Card[] = [];

  isPlayerTurn: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.buildUnoDeck();
    this.shuffleDeck();
    this.computerDeck = this.drawCards(7);
    this.playerDeck = this.drawCards(7);
    this.lastPlayedCard = this.drawCards(1)[0];
    this.computerLogic();
  }

  buildUnoDeck(): void {
    for (let i = 0; i < this.colors.length; i++) {
      for (let j = 0; j < this.numbers.length; j++) {
        if (j === 0) {
          this.deck.push(new Card(this.zeroes[i]));
        }
        this.deck.push(new Card(this.numbers[j] + ' ' + this.colors[i]));
      }
    }

    for (let i = 0; i < this.colors.length; i++) {
      for (let j = 0; j < this.numbers.length; j++) {
        this.deck.push(new Card(this.numbers[j] + ' ' + this.colors[i]));
      }
    }
  }

  shuffleDeck(): void {
    for (let i = 0; i < 10000; i++) {
      const takeCardOnIndex = this.getRandomInt(this.deck.length);
      const currentCard = Object.assign(this.deck[0]);

      this.deck[0] = this.deck[takeCardOnIndex];
      this.deck[takeCardOnIndex] = currentCard;
    }
  }

  drawCards(amount: number): Card[] {
    return this.deck.splice(0, amount);
  }

  onCardSelection(card: Card): void {
    if (
      this.isPlayerTurn &&
      (card.color === this.lastPlayedCard.color ||
        card.content === this.lastPlayedCard.content)
    ) {
      this.removeCard(this.playerDeck, card);
      this.lastPlayedCard = Object.assign(card);
      this.isPlayerTurn = false;
    }
  }

  onCardDraw(): void {
    if (this.isPlayerTurn) {
      this.playerDeck = this.playerDeck.concat(this.drawCards(1));
    }
  }

  computerLogic(): void {
    setInterval(() => {
      if (this.isPlayerTurn === false && this.computerDeck.length > 0) {
        setTimeout(() => {
          let found: Card = this.computerDeck.find(
            x =>
              x.color === this.lastPlayedCard.color ||
              x.content === this.lastPlayedCard.content
          );

          while (!found) {
            this.computerDeck = this.computerDeck.concat(this.drawCards(1));
            found = this.computerDeck.find(
              x =>
                x.color === this.lastPlayedCard.color ||
                x.content === this.lastPlayedCard.content
            );
          }

          this.removeCard(this.computerDeck, found);
          this.lastPlayedCard = Object.assign(found);

          if (this.computerDeck.length !== 0) {
            this.isPlayerTurn = true;
          }
        }, 1000);
      }
    }, 2000);
  }

  private getRandomInt(max: number) {
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - 0) + 0);
  }

  private removeCard(hand: Card[], cardToRemove: Card) {
    let cardIndex = hand.indexOf(cardToRemove);
    if (cardIndex > -1) {
      const removed = hand.splice(cardIndex, 1);
      this.deck = this.deck.concat(removed);
    }
  }
}
