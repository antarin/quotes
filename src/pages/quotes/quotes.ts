import { Component, OnInit } from '@angular/core';

import { NavParams, AlertController } from 'ionic-angular';
import { Quote } from '../../data/quote.interface';
import { QuotesService } from '../../services/quotes';

@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage implements OnInit {

  quoteGroup: {category: string, quotes: Quote[], icon: string};

  constructor(
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private quoteService: QuotesService) {}

  ngOnInit() {
    this.quoteGroup = this.navParams.data;
  }

  onAddToFavorite(selectedQuote) {
    const alert = this.alertCtrl.create({
      title: 'Add Quote',
      message: 'Are your sure you want to add the quote?',
      buttons: [
        {
          text: 'Ye, go ahead',
          handler: () => {
            this.quoteService.addQuoteToFavorite(selectedQuote);
          }
        },
        {
          text: 'No, I changed my mind',
          role: 'cancel',
          handler: () => {console.log('Cancelled!')}
        }
      ]
    });

    alert.present();

  }

  onRemoveFromFavorite(quote) {
    this.quoteService.removeQuoteFromFavorite(quote);
  }

  isFavorite(quote: Quote) {
    return this.quoteService.isQouteFavorite(quote);
  }

}
