import { LightningElement , wire} from 'lwc';
// Import message service features required for publishing and the message channel
import { publish, MessageContext } from 'lightning/messageService';
import MOVIE_CHANNEL from '@salesforce/messageChannel/movieChannel__c';

const DELAY = 300;

export default class MovieSearch extends LightningElement 
{
    selectedType = '';
    selectedSearch = '';
    selectedPageNo = '1';
    selectedMovie = '';
    loading = false;
    delayTimeout;
    searchResult=[];

            @wire(MessageContext)
            messageContext;

    get typeOptions() 
    {
        return [
            { label: 'None', value: '' },
            { label: 'Movie', value: 'movie' },
            { label: 'Series', value: 'series' },
            { label: 'Episode', value: 'episode' }
        ];
    }
    handleChange(event)
    {
        let {name,value} = event.target;
        this.loading = true;
        if(name === 'type')
        {
            this.selectedType = value;
        }
        else if(name === 'search')
        {
            this.selectedSearch = value;
        }
        else if(name === 'pageno')
        {
            this.selectedPageNo = value;
        }
        //debouncing delaying the execution of the logic
        clearTimeout(this.delayTimeout);
        this.delayTimeout = setTimeout(() => {this.searchMovie();} , DELAY)
        
    }
    //this method will search for the entered movie
    async searchMovie(event)
    {
        //
        const url = `https://www.omdbapi.com/?s=${this.selectedSearch}&type=${this.selectedType}&page=${this.selectedPageNo}&apikey=28f73296`;
        const res = await fetch(url);
        const data = await res.json();
        console.log('Movie search output' ,  data);
        this.loading = false;
        if(data.Response === 'True')
        {
            this.searchResult = data.Search;
        }
    }
    movieSelectedHandler(event)
    {
        this.selectedMovie = event.detail;

        const payload = { movieId: this.selectedMovie };
        publish(this.messageContext, MOVIE_CHANNEL, payload);
    }
    get displaySearchResult()
    {
        return this.searchResult.length > 0 ? true : false;
    }
}