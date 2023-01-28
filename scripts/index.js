// 1 Сделать свой стиль и создать проект
// 2 Перебрать массив котов и отобразить их на странице

const btnOpenPopupForm = document.querySelector('#add');
const formAddCat = document.querySelector('#popup-form-cat');
const sectionCard = document.querySelector('.cards');

const popupAddCat = new Popup("popup-add-cats");
popupAddCat.setEventListener();

const cat = new Card(cats[0], '#card-template')
const firstCat = cat.getElement()

sectionCard.append(firstCat);

function handleFormAddCat(e) {
    e.preventDefault()

    popupAddCat.close();
}

btnOpenPopupForm.addEventListener('click', () => popupAddCat.open());
formAddCat.addEventListener('submit', handleFormAddCat);