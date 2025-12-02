/* SITE.JS: THIS FILE CONTAINS THE METHODS/FUNCTIONS AND VARIABLES CONTROLLING YOUR SITE
//
*/

/* NOTE: MOVIES.JSON CONTAINS A LIST OF MOVIES AND ACCOMPANYING METADATA
//
//    They are in the following format:
//    title (String): the name of the movie
//    iscore (Number): the IMDB score
//    rating (String): the movie's MPAA rating
//    released (Array): the release date. Note that the order of the array is:  YYYY, MM, DD
//    country (String): the country of production
//    posters (Array): an array of String values with the URL to movie posters (in your img/ directory)
//    imdb (String): the URL to the corresponding IMDB website
//    website (String): the URL to the corresponding official website
//    likes (Number): a fictitious number of user likes
//    dislikes (Number): a fictitious number of user dislikes
//    posterindex (Number): a counter to use with the "posters" array to keep track of the current displayed poster index
//
// FOR STEP 16, ADD THREE OF YOUR OWN FAVORITE MOVIES WITH METADATA TO THE END OF THE JSON FILE LIST
*/

/* SITE.JS — Controls your Vue app, movie data, and all interactions */

const vue_app = Vue.createApp({
  // Load movies.json
  created() {
    fetch("movies.json")
      .then((response) => response.json())
      .then((json) => {
        json.forEach((movie) => {
          if (!("posterindex" in movie)) {
            movie.posterindex = 0;
          }
        });

        this.movies = json;
      });
  },

  data() {
    return {
      title: "Alexa's Top 8 Movies",
      owner: "Alexa",
      github: "https://github.com/alexagold1",
      movies: [],
    };
  },

  methods: {
    /* Convert release date array  */
    getMonthText(dateArray) {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      let year = dateArray[0];
      let month = months[dateArray[1] - 1];
      let day = dateArray[2];

      return `${month} ${day}, ${year}`;
    },

    /* Convert minutes */
    timeText(minutes) {
      let h = Math.floor(minutes / 60);
      let m = minutes % 60;
      return `${h}h ${m}m`;
    },

    /* Like button handler */
    like(index) {
      this.movies[index].likes++;
    },

    /* Dislike button handler */
    dislike(index) {
      this.movies[index].dislikes++;
    },

    /* STEP 7 + 8 */
    posterClick(index) {
      let movie = this.movies[index];
      movie.posterindex = (movie.posterindex + 1) % movie.posters.length;
    },
  },
});

vue_app.mount("#vue_app");
