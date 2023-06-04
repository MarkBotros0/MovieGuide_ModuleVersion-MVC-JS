class statsModule {
    constructor(mediator) {
        this.mediator = mediator
        this.currentPage = 1
        this.numberOfMovies = 20
        this.topRatedMovie = {
            movieName: "",
            rating: "",
        }
        this.init()
    }

    init() {
        this.mediator.on("movies.loaded", (numberOfMovies) => {
            this.numberOfMovies = numberOfMovies
            this.render()
        })
        this.mediator.on("topRated.update", (topRatingMovie) => {
            this.topRatedMovie.movieName = topRatingMovie.original_title
            this.topRatedMovie.rating = topRatingMovie.vote_average
        })
        this.mediator.on("next.pressed", () => {
            this.currentPage++
        })
        this.mediator.on("prev.pressed", () => {
            this.currentPage--
        })
        this.render()
    }
    render() {
        $(".curr-page").text("Current Page: " + this.currentPage)
        $(".number").text("Number of Movies: " + this.numberOfMovies)
        $(".top-rated").text("Top rated movie: " + this.topRatedMovie.movieName)
        $(".rating").text("Rating: " + this.topRatedMovie.rating)
    }
}

export default statsModule