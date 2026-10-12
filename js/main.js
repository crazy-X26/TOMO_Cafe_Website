import './gallery.js';
import menuPdfUrl from '../assets/menue.pdf';

const menuFrame = document.querySelector('#menu');
console.log(menuFrame)
if (menuFrame) {
    menuFrame.src = `${menuPdfUrl}#toolbar=0&zoom=page-width`;
}
