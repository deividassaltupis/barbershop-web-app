const footer = (data = {}) => {
    let footer = document.createElement('div');
    footer.id = 'footer-content';
    footer.innerHTML = /*html*/
    `
    <div class='footer__top'>
        <div class='footer__working-time'>
            <h3><span>Darbo laikas</span></h3>
            <div class='footer__working_hours'>
                <div class='footer__working-hours-left'>
                    <span>
                        I-V<br>
                        VI-VII
                    </span>
                </div>
                <div class='footer__working-hours-right'>
                    <span>
                        10:00-22:00<br>
                        12:00-17:00
                    </span>
                </div>
            </div>
            <div class="footer__working_time_extra_info">
                <span>Šventinėmis dienomis nedirbame</span>
            </div>
        </div>
        <div class='footer__contacts'>

            <h3><span>Kontaktai</span></h3>

            <!--  Phone numbers  -->

            <div class='footer__info-row'>
                <div class='footer__info-icon'>
                    <img src='styles/images/icons/phone-call.png' alt='Phone-icon'>
                </div>
                <div class='footer__info-content'>
                    <span>Bendras</span>
                    <span>+37064444411</span>
                </div>
            </div>
            <div class='footer__info-row'>
                <div class='footer__info-icon'>
                    <img src='styles/images/icons/phone-call.png' alt='Phone-icon'>
                </div>
                <div class='footer__info-content'>
                    <span>Ferdinand</span>
                    <span>+37060000011</span>
                </div>
            </div>
            <div class='footer__info-row'>
                <div class='footer__info-icon'>
                    <img src='styles/images/icons/phone-call.png' alt='Phone-icon'>
                </div>
                <div class='footer__info-content'>
                    <span>Daniella</span>
                    <span>+37067777711</span>
                </div>
            </div>
            <div class='footer__info-row'>
                <div class='footer__info-icon'>
                    <img src='styles/images/icons/phone-call.png' alt='Phone-icon'>
                </div>
                <div class='footer__info-content'>
                    <span>Elisa</span>
                    <span>+37068888811</span>
                </div>
            </div>

            <!--  Other contacts  -->

            <div class='footer__info-row'>
                <div class='footer__info-icon'>
                    <img src='styles/images/icons/at.png' alt='Phone-icon'>
                </div>
                <div class='footer__info-content'>
                    <span>info@oldschoolbarbershop.lt</span>
                </div>
            </div>

            <div class='footer__info-row'>
                <div class='footer__info-icon'>
                    <img src='styles/images/icons/placeholder.png' alt='Phone-icon'>
                </div>
                <div class='footer__info-content'>
                    <span>Vilnius, Senamiesčio g. 99</span>
                </div>
            </div>

        </div>
    </div>
    <div class='footer__bottom'>
        <p>2021 &copy; Visos teisės saugomos</p>
    </div>
    `;
    return footer;
};

const initFooter = (parentElement, data = {}) => {
    if(parentElement.innerHTML == '') 
        parentElement.append(footer(data));
};

export default initFooter;