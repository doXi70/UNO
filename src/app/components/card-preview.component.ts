import { Component, Input, VERSION } from '@angular/core';
import { Card } from '../constants/card';

@Component({
  selector: 'card-preview',
  templateUrl: './card-preview.component.html',
  styleUrls: ['./card-preview.component.css']
})
export class CardPreviewComponent {
  @Input() card: Card;

  constructor() {}

  ngOnInit(): void {}

  getCardColor(): string {
    return this.card.color.toLowerCase();
  }
}
