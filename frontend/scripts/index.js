import route from './modules/route.js';
import pageRequest from './modules/pageRequest.js';

window.addEventListener('DOMContentLoaded', () => 
    route(pageRequest())
);