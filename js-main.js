import imgArray from './gallery-items.js'

const refs = {
    galleryList: document.querySelector('.js-gallery'),
    modal: document.querySelector('div.lightbox'),
    closeModalBtn: document.querySelector('.lightbox__button'),
    modalImg: document.querySelector('.lightbox__image'),
    overlay: document.querySelector('.lightbox__overlay')
}

refs.galleryList.addEventListener('click',onImgClick)
refs.closeModalBtn.addEventListener('click', closeModal)
refs.overlay.addEventListener('click', OnBackDropClick)

createGallery(imgArray);

function createGallery (array){
    const galleryArray = array.map((img, i) => {
        const listItem = document.createElement('li');
        const listLink = document.createElement('a');
        const listImg = document.createElement('img');

        listItem.classList.add('gallery__item');
        listLink.classList.add('gallery__link');
        listImg.classList.add('gallery__image');
        
        listLink.setAttribute('href', img.original );

        listImg.setAttribute('src' , img.preview);
        listImg.setAttribute('alt', img.description);

        listImg.dataset.source = img.original;
        listImg.dataset.index = i;

        listItem.appendChild(listLink);
        listLink.appendChild(listImg);

        return listItem;
    })
    refs.galleryList.append(...galleryArray);
}

function onImgClick (event) {
    event.preventDefault();

    const currnetImg = event.target;
    
    currnetImg.nodeName === 'IMG' ? refs.modal.classList.add('is-open'): false;

    const fullSizedImageSrc = currnetImg.dataset.source;
    const modalImg = refs.modalImg

    modalImg.src = fullSizedImageSrc;
    refs.modalImg.dataset.index = currnetImg.dataset.index;

    window.addEventListener('keydown', changeImg)
}

function changeImg(event){
    const currentImgIndex = Number(refs.modalImg.dataset.index);
        switch (event.code) {
            case 'Escape' : closeModal();
            break;

            case 'ArrowRight' : 
            currentImgIndex < imgArray.length -1 ? setNextImg(currentImgIndex, 1) : false;
            break;

            case 'ArrowLeft' : 
            0 < currentImgIndex ? setNextImg(currentImgIndex, -1) : false;
            break;
        }
}

function closeModal(){
    refs.modal.classList.remove('is-open')
    window.removeEventListener('keydown', changeImg )
    refs.modalImg.src = '';
    refs.modalImg.dataset.index = '';
}

function setNextImg(currentImgIndex, modifier){
    const imgToSet = document.querySelector(`.js-gallery  img[data-index='${currentImgIndex + modifier}']`)
    
    refs.modalImg.src = imgToSet.dataset.source
    refs.modalImg.dataset.index = imgToSet.dataset.index
}

function OnBackDropClick(event){
    return event.target === event.currentTarget ? closeModal() : false;
}