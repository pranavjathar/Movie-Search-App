**Project Details**

**Component 1 – movieSearch.html (Template)**
1.	Filter Section: This section contains three input fields - a combobox for selecting the type of content (movie, series or episodes), a search input for entering the search term, and a number input for specifying the page number. These inputs are used to filter the search results.
2.	Display Section: This section displays the search results in a grid layout. Each item in the grid is a c-movie-tile component, which likely displays the details of a movie or series. The selected-movie-id attribute and onselectedmovie event handler suggest that a movie can be selected from the grid.

**Component 1 - movieSearch.js (javaScript)**
1.	Type Options: The typeOptions getter returns an array of options for the type of content to search for (movie, series, or episode).
2.	Handle Change: The handleChange method handles changes to the input fields. It updates the corresponding variables and triggers the searchMovie method after a delay. This delay is implemented using setTimeout, creating a debouncing effect. Debouncing is a technique used to limit the number of times a function is executed, especially useful in cases where the function is computationally expensive or makes network requests.
3.	Search Movie: The searchMovie method sends a request to the OMDB API to search for movies based on the user input. The results are stored in the searchResult array.
4.	Movie Selected Handler: The movieSelectedHandler method handles the selection of a movie from the search results. It publishes a message with the selected movie’s ID to the MOVIE_CHANNEL Lightning Message Channel.
5.	Display Search Result: The displaySearchResult getter returns a boolean indicating whether there are search results to display.
Component 1 - movieSearch.js-meta.xml (Configuration file)
1.	isExposed: This is set to true, which means the component is exposed and can be used in Lightning pages.
2.	targets: This defines where the component can be used. In this case, the component can be used in Lightning App Pages (lightning__AppPage) and Lightning Community Pages (lightningCommunity__Page).
Component 1 - movieSearch.css (css)
1.	.filterstyle: This class applies a 2px solid border with a color of #171717 , a border radius of 5px for rounded corners, and a background color of whitesmoke.
2.	.displayStyle: This class sets the height of the element to 600px and applies a background color of #171717 .


**Component 2 – movieDetail.html (Template)**
•	The outer <template> tags are standard HTML tags used in LWC to define a block of HTML.
•	The <template lwc:if={loadComponent}> is a conditional rendering directive in LWC. It will render the inner HTML only if the loadComponent property is truthy.
•	Inside this, there is a <div> with class container which contains a grid layout (slds-grid) with gutters (slds-gutters). This grid has two columns (slds-col).
•	The first column contains an image (<img>) tag that displays a movie poster. The source of the image (src) is bound to movieDetails.Poster.
•	The second column contains movie details like title, year, rating, release date, genre, writer, actors, plot, language, and awards. Each detail is displayed in a separate paragraph (<p>), and the values are bound to respective properties of movieDetails.
•	There’s also a custom lightning icon (<lightning-icon>) next to the awards detail.
This template essentially displays detailed information about a movie, given that the information is stored in the movieDetails object and loadComponent is true. The layout is styled using Salesforce Lightning Design System (SLDS) classes.

**Component 2 - movieDetail.js (javaScript)**
•	The MovieDetail class extends LightningElement, which is the base class for LWCs.
•	It imports several modules from the lightning/messageService for subscribing to a message channel.
•	The MOVIE_CHANNEL is imported, which is a reference to a specific message channel.
•	The movieDetails object will hold the details of the movie, and loadComponent is a flag to control the rendering of the component.
•	The @wire decorator is used with MessageContext, which provides the context of the Lightning message service.
•	In the connectedCallback() lifecycle hook, it subscribes to the message channel.
•	In the disconnectedCallback() lifecycle hook, it unsubscribes from the message channel.
•	The subscribeToMessageChannel() method subscribes to the MOVIE_CHANNEL message channel if not already subscribed. It also defines a message handler.
•	The handleMessage() method is the handler for the received message. It extracts the movieId from the message and fetches the movie details.
•	The unsubscribeToMessageChannel() method unsubscribes from the message channel.
•	The fetchMovieDetail() method fetches movie details from the OMDB API using the provided movieId. It sets loadComponent to true and updates movieDetails with the fetched data.


**Component 3 - movieTile.html (Template)**
•	The outer <template> tags are standard HTML tags used in LWC to define a block of HTML.
•	Inside, there is a <div> with a class that is dynamically bound to the tileSelected property. This div also has a click event handler clickHandler.
•	Within this div, there is another div with the class innerTile which contains an image and a div for movie title.
•	The <img> tag displays a movie poster. The source of the image (src) is bound to movie.Poster.
This Template essentially creates a clickable movie tile with a poster and title. The tileSelected property and clickHandler method would be defined in the component’s JavaScript file.

**Component 3 - movieTile.js (javaScript)**
•	It has two public properties (@api), movie and selectedMovieId, set by the parent component.
•	The clickHandler(event) method handles click events on the movie tile. It logs the imdbID of the movie and dispatches a custom event named selectedmovie with the imdbID as the event detail. This allows the parent component to react to the selection of a movie tile.
•	The tileSelected getter returns a CSS class string based on whether the imdbID of the movie matches selectedMovieId. This can be used to apply different styles to the selected movie tiles.








