export default class moviesModule {
    constructor(mediator) {
        this.mediator = mediator
        this.movies = []
        this.page = 1
        this.init()
    }
    init() {
        this.mediator.on("next.pressed", () => {
            this.page++
            this.fetchMovies()
        })
        this.mediator.on("prev.pressed", () => {
            this.page--
            this.fetchMovies()
        })
        this.fetchMovies()
    }
    fetchMovies() {
        $.ajax({
            url: `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${this.page}`,
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTQ2MzgxMDgzNzliODFjZWNiYTE4ZmI4MDMzZTBiNSIsInN1YiI6IjY0NzczZTc3MDA1MDhhMDExNmQ1NTViNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5aEDM2F7O2mNwqxa-ktSn9xPYzgqNlL-KLaNEyHQxfg'
            }, success: (result) => {
                $(".myloader").addClass("d-none");
                this.movies = result.results
                this.render()
                this.getTopRating()
                this.mediator.emit("movies.loaded", this.movies.length);
            }
        });
    }
    getTopRating() {
        const topRatingMovie = this.movies.reduce(
            (prev, current) => {
                return prev.vote_average > current.vote_average ? prev : current
            })
        this.mediator.emit("topRated.update", topRatingMovie);
    }
    render() {
        $(".my-grid").html("")
        for (let i = 0; i < this.movies.length; i++) {
            let movie = this.movies[i]
            let imgUrl = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`
            $(".my-grid").append(
                `<div class=" card card${i}">
                    <div class="item">
                        <img src="${imgUrl}" class="img-fluid card-img-top">
                    </div>
                    <div class="card-body text-center">
                        <h6>${movie.original_title}</h6>
                        <h6>${movie.vote_average}</h6>
                    </div>
                </div>`)

            $(".card" + i).on('click',  ()=> {
                this.mediator.emit("modal.opened", { name: movie.original_title, rating: movie.vote_average, img: imgUrl, desc: movie.overview });
            });
        }

    }
}
