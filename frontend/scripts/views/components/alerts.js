const displayError = (text, parentElem, beforeElem) => {
    const alertID = "error-alert";
    const iconLink = "styles/images/icons/exclamation-mark.png";
    if (document.getElementById(alertID)) {
        document.getElementById(alertID).innerHTML =
            `<img src='${iconLink}' alt='error-icon'/>` +
            "<span>" +
            text +
            "</span>";
    } else {
        const alertElement = document.createElement("div");
        alertElement.id = alertID;
        alertElement.classList.add("error-alert");
        alertElement.innerHTML =
            `<img src='${iconLink}' alt='error-icon'/>` +
            "<span>" +
            text +
            "</span>";
        parentElem.insertBefore(alertElement, beforeElem);
    }
};
const displayWarning = (text, parentElem, beforeElem) => {
    const alertID = "warning-alert";
    const iconLink = "styles/images/icons/caution.png";
    if (document.getElementById(alertID)) {
        document.getElementById(alertID).innerHTML =
            `<img src='${iconLink}' alt='warning-icon'/>` +
            "<span>" +
            text +
            "</span>";
    } else {
        const alertElement = document.createElement("div");
        alertElement.id = alertID;
        alertElement.classList.add("warning-alert");
        alertElement.innerHTML =
            `<img src='${iconLink}' alt='warning-icon'/>` +
            "<span>" +
            text +
            "</span>";
        parentElem.insertBefore(alertElement, beforeElem);
    }
};
const displaySuccess = (text, parentElem, beforeElem) => {
    const alertID = "success-alert";
    const iconLink = "styles/images/icons/success.png";
    if (document.getElementById(alertID)) {
        document.getElementById(alertID).innerHTML =
            `<img src='${iconLink}' alt='success-icon'/>` +
            "<span>" +
            text +
            "</span>";
    } else {
        const alertElement = document.createElement("div");
        alertElement.id = alertID;
        alertElement.classList.add("success-alert");
        alertElement.innerHTML =
            `<img src='${iconLink}' alt='success-icon'/>` +
            "<span>" +
            text +
            "</span>";
        parentElem.insertBefore(alertElement, beforeElem);
    }
};
const displayInfo = (text, parentElem, beforeElem) => {
    const alertID = "info-alert";
    const iconLink = "styles/images/icons/information-button.png";
    if (document.getElementById(alertID)) {
        document.getElementById(alertID).innerHTML =
            `<img src='${iconLink}' alt='info-icon'/>` +
            "<span>" +
            text +
            "</span>";
    } else {
        const alertElement = document.createElement("div");
        alertElement.id = alertID;
        alertElement.classList.add("info-alert");
        alertElement.innerHTML =
            `<img src='${iconLink}' alt='info-icon'/>` +
            "<span>" +
            text +
            "</span>";
        parentElem.insertBefore(alertElement, beforeElem);
    }
};

export { displayError, displayWarning, displaySuccess, displayInfo };
