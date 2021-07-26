import { Component, EventEmitter, Input, Output, VERSION } from '@angular/core';
import { Card } from '../constants/card';

@Component({
  selector: 'card-preview',
  templateUrl: './card-preview.component.html',
  styleUrls: ['./card-preview.component.css']
})
export class CardPreviewComponent {
  @Input() card: Card;
  @Input() isPlayerCard: boolean = false;

  @Output() selectedCard: EventEmitter<Card> = new EventEmitter<Card>();
  @Output() drawCard: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  getCardColor(): string {
    return this.card.color.toLowerCase();
  }

  onCardClick(): void {
    if (this.isPlayerCard) {
      this.selectedCard.emit(this.card);
    } else {
      this.drawCard.emit();
    }
  }
}
