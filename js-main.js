import imgArray from './gallery-items.js'
console.log(imgArray);
const refs = {
    galleryList: document.querySelector('.js-gallery'),
    modal: document.querySelector('div.lightbox'),
    closeModalBtn: document.querySelector('.lightbox__button'),
    modalImg: document.querySelector('.lightbox__image')
}

refs.galleryList.addEventListener('click',onImgClick)
refs.closeModalBtn.addEventListener('click', onCloseBtnClick)

createGallery(imgArray);

function createGallery (array){
    const galleryArray = array.map(img => {
        const listItem = document.createElement('li');
        const listLink = document.createElement('a');
        const listImg = document.createElement('img');

        listItem.classList.add('gallery__item');
        listLink.classList.add('gallery__link');
        listImg.classList.add('gallery__image');
        
        listLink.setAttribute('href', img.original );

        listImg.setAttribute('src' , img.preview);
        listImg.setAttribute('src' , img.preview);
        listImg.setAttribute('alt', img.description);

        listImg.dataset.source = img.original;

        listItem.appendChild(listLink);
        listLink.appendChild(listImg);

        return listItem;
    })
    refs.galleryList.append(...galleryArray);
}

function onCloseBtnClick(){
    refs.modal.classList.remove('is-open')
    const modalImg = refs.modalImg
    modalImg.src = '';
}

function onImgClick (event) {
    event.preventDefault();
    const img = event.target
    if(img.nodeName !== 'IMG'){return};

    refs.modal.classList.add('is-open');

    const fullSizedImageSrc = img.dataset.source;
    const modalImg = refs.modalImg
    console.log(fullSizedImageSrc);

    modalImg.src = fullSizedImageSrc;

}