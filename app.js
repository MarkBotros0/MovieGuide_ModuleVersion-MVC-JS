import modalModule from "./modalModule.js";
import moviesModule from "./moviesModule.js";
import statsModule from "./statsModule.js";
import eventsMediator from "./eventsMediator.js";


var mediator, stats, movie, modal


$(document).ready(function () {

    mediator = new eventsMediator()

    stats = new statsModule(mediator)
    movie = new moviesModule(mediator)
    modal = new modalModule(mediator)


    $(".nextBtn").on('click', function () {
        $(".myloader").toggleClass("d-none");
        mediator.emit("next.pressed");
    })
    $(".prevBtn").on('click', function () {
        if (movie.page > 1) {
            $(".myloader").toggleClass("d-none");
            mediator.emit("prev.pressed");
        }
    })

});


