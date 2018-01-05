import { Quote } from "../data/quote.interface";

export class QuotesService {
    private favoriteQuotes: Quote[] = [];

    addQuoteToFavorite(quote: Quote) {
        if (this.favoriteQuotes.indexOf(quote) < 0) {
            this.favoriteQuotes.push(quote);
        }
        
    }

    removeQuoteFromFavorite(quote: Quote) {
        const position = this.favoriteQuotes.findIndex((quoteEl: Quote) => { return quoteEl.id == quote.id });
        this.favoriteQuotes.splice(position, 1);
    }

    getFavoriteQuotes() {
        return this.favoriteQuotes.slice();
    }

    isQouteFavorite(quote: Quote) {
        return this.favoriteQuotes.find((quoteEl) => {
            return quoteEl.id == quote.id;
        });
    }

}