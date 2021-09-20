import route from "../modules/route.js";

const home = (data = {}) => {
    let home = document.createElement("div");
    home.id = "home-content";
    home.innerHTML =
        /*html*/
        `
        <section class='carousel-section container-fluid'>
            <div class='carousel__box'>
                <div class='carousel__image-box'>
                    <img src="./styles/images/carousel-img.jpg" alt="Carousel image" />
                </div>
                <div class='carousel__heading-box'>
                    <button id='linkToRegistration' class='btn btn-lg btn-gold-bg-dark'>Registracija</button>
                </div>
            </div>
        </section>
        <section class='about-us-section container'>
            <div class='section-heading'>
                <img src="./styles/images/icons/mustache-curled-tip-variant.png" alt="" />
                <h2><span>Apie mus</span></h2>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eum doloribus, expedita quasi veniam aliquam minima sequi aperiam nihil facere neque, placeat, excepturi cupiditate cum debitis sint mollitia odit esse temporibus eos numquam dolor tempore fuga. Blanditiis illum impedit, hic sit, suscipit quae alias natus laborum tempora, laboriosam eum quos fugiat voluptatibus eius quasi nostrum? Tempore, ducimus praesentium. Similique eaque quos eius aspernatur! Amet earum, molestias reprehenderit dolorem asperiores voluptatibus quibusdam iste enim nihil non, commodi consequuntur repellat sed tempore doloribus delectus veniam sit architecto nostrum tenetur sint minima voluptate. Possimus amet excepturi harum aspernatur aperiam! Temporibus sit corporis tempora.</p>
        </section>
        <section class='masters-section container'>
            <div class='section-heading'>
                <img src="./styles/images/icons/mustache-curled-tip-variant.png" alt="" />
                <h2><span>Meistrai</span></h2>
            </div>
            <div class='masters__list'>
                <div class='masters__item'>
                    <img src="./styles/images/ferdinand.jpg" alt="Ferdindand" />
                    <span class='masters__item-name'>Ferdinand</span>
                    <span class='masters__item-summary'>Apie mane trumpas aprašymas Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, facere.</span>
                </div>
                <div class='masters__item'>
                    <img src="./styles/images/carla.jpg" alt="Ferdindand" />
                    <span class='masters__item-name'>Carla</span>
                    <span class='masters__item-summary'>Apie mane trumpas aprašymas Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, facere.</span>
                </div>
                <div class='masters__item'>
                    <img src="./styles/images/daniella.jpg" alt="Ferdindand" />
                    <span class='masters__item-name'>Daniella</span>
                    <span class='masters__item-summary'>Apie mane trumpas aprašymas Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, facere.</span>
                </div>
            </div>
        </section>
        <section class='contact-section container-fluid'>
            <div class='carousel__box'>
                <div class='carousel__image-box'>
                    <img src="./styles/images/photo_wallpaper.jpg" alt="Carousel image" />
                </div>
                <div class='carousel__heading-box'>
                    <div>
                        <span>Susisiekime</span>
                        <span>+37061111111</span>
                        <span>arba</span>
                        <span>info@oldschoolbarbershop.lt</span>
                    </div>
                </div>
            </div>
        </section>
        <section class='find-us-section container'>
            <div class='section-heading'>
                <img src="./styles/images/icons/mustache-curled-tip-variant.png" alt="" />
                <h2><span>Mus rasite</span></h2>
            </div>
            <div class='find-us__location-text'>
                <img src="./styles/images/icons/placeholder.png" alt="" />
                <span>Vilnius, senamiescio g. 99</span>
            </div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4596.208530845928!2d23.87200799985313!3d54.83085319497911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e7239c8869b601%3A0x8c293ed5e8d9d6d5!2sGarliavos%20%22Neighborhood%20Park!5e0!3m2!1sen!2slt!4v1629322760289!5m2!1sen!2slt" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
        </section>
        `;

    const linkToRegistrationButton = home.querySelector("#linkToRegistration");

    const mountView = () => {};

    const viewDidMount = () => {};

    const unmountView = () => {};

    // - Events

    mountView();

    linkToRegistrationButton.addEventListener("click", () =>
        route("/registracija", {}, unmountView)
    );
    return { view: home, viewDidMount: viewDidMount };
};

export default home;
