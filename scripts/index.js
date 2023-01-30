// 1 Сделать свой стиль и создать проект
// 2 Перебрать массив котов и отобразить их на странице

const btnOpenPopupForm = document.querySelector('#add');
const btnLoginOpenPopup = document.querySelector('#login');
const formAddCat = document.querySelector('#popup-form-cat');
const formLogin = document.querySelector('#popup-form-login');
const sectionCard = document.querySelector('.cards');

const popupAddCat = new Popup("popup-add-cats");
popupAddCat.setEventListener();

const popupLogin = new Popup('popup-login');
popupLogin.setEventListener();

function createCat(dataCat) {
    const cat = new Card(dataCat, '#card-template')
    const firstCat = cat.getElement()
    sectionCard.append(firstCat);
}


function serializeForm(elements) {
    const formData = {};

    elements.forEach(input => {
        if (input.type === 'submit') return

        if (input.type !== 'checkbox') {
            if (input.name === 'id') {
                formData[input.name] = Number(input.value);
            } else {
                formData[input.name] = input.value;
            }
        }

        if (input.type === 'checkbox') {
            formData[input.name] = input.checked;
        }
    });
    return formData
}

function setDataRefrash(minutes) {
    const setTime = new Date(new Date().getTime() + minutes * 60000)
    localStorage.setItem('catsRefrash', setTime);
}



function checkLocalStorage() {
    const localData = JSON.parse(localStorage.getItem('cats'));
    const getTimeExpires = localStorage.getItem('catsRefrash')

    if (localData && localData.length && (new Date() < new Date(getTimeExpires))) {
        localData.forEach(catData => {
            createCat(catData);
            })
    } else {
        api.getAllCats().then((data) => {
            data.forEach(catData => {
            createCat(catData);
            })
            localStorage.setItem('cats', JSON.stringify(data));
            setDataRefrash(5);
        })

        
    }
}

checkLocalStorage();

function handleFormAddCat(e) {
    e.preventDefault();

    const elementsFromCat = [...formAddCat.elements];
    const dataFormCat = serializeForm(elementsFromCat)

    api.addNewCat(dataFormCat).then(() => {
        console.log('dataFormCat',dataFormCat);
        createCat(dataFormCat);
    })

    popupAddCat.close();
}

function handleFormLogin(e) {
    e.preventDefault();

    const loginData = [...formLogin.elements];
    const serializeData = serializeForm(loginData);

    Cookies.set('email', `email=${serializeData.email}`);
    btnOpenPopupForm.classList.remove('visually-hidden');
    btnLoginOpenPopup.classList.add('visually-hidden');
    
    popupLogin.close();
}

btnOpenPopupForm.addEventListener('click', () => popupAddCat.open());
btnLoginOpenPopup.addEventListener('click', () => popupLogin.open())
formAddCat.addEventListener('submit', handleFormAddCat);
formLogin.addEventListener('submit', handleFormLogin);

const isAuth = Cookies.get('email');

if (!isAuth) {
    popupLogin.open();
    btnOpenPopupForm.classList.add('visually-hidden');
} 

// document.cookie = 'email=sber@sb.ru;samesite=strict;max-age=360'
// Cookies.set('cook', 'res');
// console.log(Cookies.get('cook'));
// Cookies.remove('cook');
// localStorage.setItem('name', 'Вася');
// console.log(localStorage.getItem('name'));
// localStorage.setItem('tel', JSON.stringify({sass: '+79863576', mess: 'yydydydy'}))
// console.log(JSON.parse(localStorage.getItem('tel')));
// localStorage.removeItem('name');
// localStorage.clear()