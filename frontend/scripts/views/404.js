const pageNotFound = (data = {}) => {
    let pageNotFound = document.createElement("div");
    pageNotFound.id = "page-not-found-content";
    pageNotFound.innerHTML =
        /*html*/
        `
        <section class='not-found container'>
            <div class="not-found__box">
                <h3>404 - Tokio puslapio nėra</h3>
            </div>
        </section>
        `;

    const mountView = () => {};

    const viewDidMount = () => {};

    const unmountView = () => {};

    // - Events

    mountView();

    return { view: pageNotFound, viewDidMount: viewDidMount };
};

export default pageNotFound;
