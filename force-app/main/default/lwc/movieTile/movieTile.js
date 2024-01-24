import { LightningElement , api} from 'lwc';

export default class MovieTile extends LightningElement 
{
    @api movie;
    @api selectedMovieId;

    clickHandler(event)
    {
        console.log(this.movie.imdbID);
        //custom Event to communicate from child to parent
        // create Event
        const evt = new CustomEvent('selectedmovie' , 
        {
            detail: this.movie.imdbID
        })
        // Fire/dispatch the event
        this.dispatchEvent(evt);
    }
    get tileSelected()
    {
        return this.selectedMovieId === this.movie.imdbID ? 'tile selected' : 'tile';
    }
}