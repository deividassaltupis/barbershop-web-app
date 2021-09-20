const pageRequest = () => {
    let req = '/';
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.has('page'))
        req += urlParams.get('page');
    return req;
}

export default pageRequest;