import { Component } from '@angular/core';

import { Quote } from '../../data/quote.interface';
import { QuotesService } from '../../services/quotes';
import { ModalController } from 'ionic-angular';
import { QuotePage } from '../quote/quote';
import { SettingsService } from '../../services/settings';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  quotes: Quote[];

  constructor(
    private quoteService: QuotesService,
    private modalCtrl: ModalController,
    private settingsService: SettingsService) {}

  ionViewWillEnter() {
    this.quotes = this.quoteService.getFavoriteQuotes();
  }

  onViewQuote(quote) {
    const modal = this.modalCtrl.create(QuotePage, quote);
    modal.present();
    modal.onDidDismiss((remove: boolean) => {
      if (remove) {
        this.onRemoveFromFavorite(quote);        
      }
    });
  }

  onRemoveFromFavorite(quote) {
    this.quoteService.removeQuoteFromFavorite(quote);
    this.quotes = this.quoteService.getFavoriteQuotes();
    // const position = this.quotes.findIndex((quoteEl: Quote) => {
        //   return quoteEl.id == quote.id;
        // });
        // this.quotes.splice(position, 1);
  }

  getBackground() {
    return this.settingsService.isAltBackground() ? 'altQuoteBackground' : 'quoteBackground';
  }

}
