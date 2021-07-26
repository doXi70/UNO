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

  constructor() {}

  ngOnInit(): void {
    this.buildUnoDeck();
    console.log(this.deck);
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

  shuffleDeck(): void {}
}
