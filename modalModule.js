export default class modalModule {
    constructor(mediator) {
        this.mediator = mediator
        this.init()
    }
    init() {
        $("#close-btn").on('click', () => {
            this.closeModal()
        });
        this.mediator.on("modal.opened", this.openModal)
    }
    openModal({ name, rating, img, desc }) {
        $(".my-modal-view").toggleClass("d-none")
        $(".movie-name").text(name)
        $(".movie-rate").text("IMDB Rating: " + rating + "/10")
        $(".movie-desc").text(desc)
        $(".movie-img").attr("src", img)
    }
    closeModal() {
        $(".my-modal-view").toggleClass("d-none")
    }
}