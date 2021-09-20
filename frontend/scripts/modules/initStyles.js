const normalizeCssID = "normalize-css-link";
const globalCssID = "global-css-link";

const headerCssID = "header-css-link";
const mainCssID = "main-css-link";
const footerCssID = "footer-css-link";

const initStyles = () => {
    if (!document.getElementById(normalizeCssID)) {
        let linkElement = document.createElement("link");
        linkElement.id = normalizeCssID;
        linkElement.href = "styles/css/normalize.css";
        linkElement.rel = "stylesheet";
        linkElement.type = "text/css";
        document.head.appendChild(linkElement);
    }
    if (!document.getElementById(globalCssID)) {
        let linkElement = document.createElement("link");
        linkElement.id = globalCssID;
        linkElement.href = "styles/css/global.css";
        linkElement.rel = "stylesheet";
        linkElement.type = "text/css";
        document.head.appendChild(linkElement);
    }
    if (!document.getElementById(headerCssID)) {
        let linkElement = document.createElement("link");
        linkElement.id = headerCssID;
        linkElement.href = "styles/css/header.css";
        linkElement.rel = "stylesheet";
        linkElement.type = "text/css";
        document.head.appendChild(linkElement);
    }
    if (!document.getElementById(mainCssID)) {
        let linkElement = document.createElement("link");
        linkElement.id = mainCssID;
        linkElement.href = "";
        linkElement.rel = "stylesheet";
        linkElement.type = "text/css";
        document.head.appendChild(linkElement);
    }
    if (!document.getElementById(footerCssID)) {
        let linkElement = document.createElement("link");
        linkElement.id = footerCssID;
        linkElement.href = "styles/css/footer.css";
        linkElement.rel = "stylesheet";
        linkElement.type = "text/css";
        document.head.appendChild(linkElement);
    }
};

const setMainStyle = (cssLink) =>
    (document.getElementById(mainCssID).href = cssLink);

export { initStyles, setMainStyle };
