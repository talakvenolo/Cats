class Card {
    constructor(dataCat, selectorTemplate) {
        this.dataCat = dataCat;
        this.selectorTemplate = selectorTemplate;
    }

    _getTemplate() { // возвращает содержимое шаблона в виде DOM узла
        return document.querySelector(this.selectorTemplate).content.querySelector('.card');
    
    }

    getElement() {
        this.element = this._getTemplate().cloneNode(true); // клонируем полученное содержимое из шаблона
        const cardTitle = this.element.querySelector('.card__name');
        const cardImage = this.element.querySelector('.card__image');
        const cardLike = this.element.querySelector('.card__like');

        cardTitle.textContent = this.dataCat.name;
        cardImage.src = this.dataCat.image;


        if (this.dataCat.favourite) {
            cardLike.classList.toggle('card__like_active')
            // cardLike.remove() можно в элс чтоб удалить серые лайки
        }

        return this.element
    }

    setElement() {

    }
    
}

