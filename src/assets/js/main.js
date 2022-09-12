/*
  Показать/скрыть поиск на десктоп
*/

const hBtnSearch = document.querySelector('.h-btn-search');
const btnHideSearchPanel = document.querySelector('.h-search__hide');

hBtnSearch.addEventListener('click', showSearchPanel);
btnHideSearchPanel.addEventListener('click', hideSearchPanel);

const hamburgerMenu = document.querySelector('.hamburger-menu');
const hamburger = document.querySelector('.hamburger');


const hamburgerMenuCatalogBtn = document.querySelector('.hamburger-menu__catalog');


hamburgerMenuCatalogBtn.addEventListener('click', function(){
    hamburger.classList.remove('active');
    hamburgerMenu.classList.remove('open');


    const windowWidth = document.documentElement.clientWidth;
    if ( windowWidth > 1024 ){
      opendesktopCatalog(event)
    } else{
      document.body.classList.add('hide-scroll');
      mobileCatalog.classList.add('open');
      
    }
})






function showSearchPanel(event){
  const hSearch = document.querySelector('.h-search');
  hSearch.classList.add('show');

  const searchInput = hSearch.querySelector('.h-search-form__input');
  searchInput.focus();

}

function hideSearchPanel(event){
  const hSearch = document.querySelector('.h-search');
  const searchInput = hSearch.querySelector('.h-search-form__input');
  searchInput.value = '';
  hSearch.classList.remove('show');
}

/*
  КОНЕЦ:
  Показать/скрыть поиск на десктоп
*/


/*Открытие каталога*/
const hCatalogBtn = document.querySelector('.h-catalog');
const mobileCatalog = document.querySelector('.mobile-catalog');


hCatalogBtn.addEventListener('mouseenter', function(event){

  const windowWidth = document.documentElement.clientWidth;
  
  if ( windowWidth > 1024 ){
    
    opendesktopCatalog(event)
  } else{
    //event.preventDefault();
    //document.body.classList.add('hide-scroll');
    //mobileCatalog.classList.add('open');
    
  }

  
});

hCatalogBtn.addEventListener('click', function(event){
  const windowWidth = document.documentElement.clientWidth;
  

  if ( windowWidth <= 1024 ){
    document.body.classList.add('hide-scroll');
    mobileCatalog.classList.add('open');
    
    event.preventDefault();
  } else{
    
    
    
  }

  
});



hCatalogBtn.addEventListener('mouseleave', function(event){
  setTimeout( ()=>{

    if ( !desktopCatalog.classList.contains('mouseenter') ){
      closeDesktopCatalog()
    } 
  }, 150 )
})

/*
  КОНЕЦЖ Открытие каталога
*/

/*
  Работа с десктоп версией каталога
*/

const desktopCatalog = document.querySelector('.desktop-catalog');
const desktopCatalogInner = document.querySelector('.desktop-catalog__inner');
const dhParent = document.querySelector('.dc-parent');

let dhParentHeight = dhParent.offsetHeight;
let bufChildHeight = 0;

desktopCatalog.addEventListener('click', desktopCatalogClick);



desktopCatalog.addEventListener('mouseenter', function(event){
  this.classList.add('mouseenter');
});
desktopCatalog.addEventListener('mouseleave', function(event){
    
});


desktopCatalogInner.addEventListener('mouseenter', function(){
  
})

desktopCatalogInner.addEventListener('mouseleave', function(){
  closeDesktopCatalog()
})

function opendesktopCatalog(event){
  

  if (!desktopCatalog.classList.contains('open')){
    hamburgerMenu.classList.remove('open');
    hamburger.classList.remove('active');
    desktopCatalog.classList.add('open');
    dhParentHeight = dhParent.offsetHeight;
    
  } else {
    //closeDesktopCatalog()
  }

}


function desktopCatalogClick(event){
  if ( event.target.classList.contains('desktop-catalog__inner') || event.target.classList.contains('desktop-catalog')){
    closeDesktopCatalog()
  }
}

function closeDesktopCatalog(){
  desktopCatalog.classList.remove('open');
  desktopCatalog.classList.remove('mouseenter');
  dhParent.removeAttribute('style');

  let hasStyleChildItems =  document.querySelectorAll('.dc-child[style]');
  let hasStyleParentItems =  document.querySelectorAll('.dc-parent[style]');
  

  if ( hasStyleChildItems.length ){
    hasStyleChildItems.forEach( item => {
      item.removeAttribute('style');
    })
  }


  if ( hasStyleParentItems.length ){
    hasStyleParentItems.forEach( item => {
      item.removeAttribute('style');
    })
  }


  let enteredParentItems = document.querySelectorAll('.dc-parent__item.mouseenter');
  let clickedParentItems = document.querySelectorAll('.dc-parent__item.openclick');

  let enteredChildItems = document.querySelectorAll('.dc-child__item.mouseenter');
  let clickedChildItems = document.querySelectorAll('.dc-child__item.openclick');



  dhParent.classList.remove('has-child');

  let hasChildClasses = document.querySelectorAll('.dc-child.has-child');

  if ( hasChildClasses.length ){
    hasChildClasses.forEach(item => {
      item.classList.remove('has-child')
    })
  }
  

  if (enteredParentItems.length){
    enteredParentItems.forEach( item => {
      item.classList.remove('mouseenter')
    })
  }

  if (clickedParentItems.length){
    clickedParentItems.forEach( item => {
      item.classList.remove('openclick')
    })
  }

  if (enteredChildItems.length){
    enteredChildItems.forEach( item => {
      item.classList.remove('mouseenter')
    })
  }

  if (clickedChildItems.length){
    clickedChildItems.forEach( item => {
      item.classList.remove('openclick')
    })
  }

}



const deskParentItems = document.querySelectorAll('.dc-parent__item');

const dcChildItems = document.querySelectorAll('.dc-child__item');



deskParentItems.forEach( (item) => {
  item.addEventListener('mouseenter', function(event){
    let childList = this.querySelector('.dc-child');
    

    let prevActive = dhParent.querySelector('.dc-parent__item.mouseenter');

    if (prevActive){
      dhParent.style.height = dhParentHeight +'px';
      prevActive.classList.remove('mouseenter');
    }

    this.classList.add('mouseenter');
    if ( childList ){
      dhParent.style.height = childList.clientHeight + 'px';

      bufChildHeight = childList.clientHeight;
      childList.removeAttribute('style');

      dhParent.classList.add('has-child');

    } else{
      dhParent.style.height = dhParentHeight + 'px';
      dhParent.classList.remove('has-child');
    }
  })


  item.addEventListener('mouseleave', function(event){

    /*
    dhParent.style.height = dhParentHeight +'px';
    this.classList.remove('mouseenter');
    dhParent.classList.remove('has-child');
    */
    
      
    
  })


  item.addEventListener('click', function(event){
    if ( this.classList.contains('mouseenter') ){
      return null
    } else{
      
      
      
            
      if ( !this.classList.contains('openclick')){
        let childList = this.querySelector('.dc-child');
    
        
        let opened = document.querySelector('.dc-parent__item.openclick');
        if ( opened  && opened !== event.target){
          opened.classList.remove('openclick');
          
        }


        this.classList.add('openclick');
        if ( childList ){
          dhParent.style.height = childList.clientHeight + 'px';
    
          bufChildHeight = childList.clientHeight;
          childList.removeAttribute('style');
        } else{
          dhParent.style.height = dhParentHeight + 'px';
        }
      } else{


        
        dhParent.style.height = dhParentHeight +'px';
        this.classList.remove('openclick')
      }


    }
  })

})


let childMenuHeight;


dcChildItems.forEach( item => {
  item.addEventListener('mouseenter', function(event){


      let childList = this.querySelector('.dc-child');
      let childContainer = this.closest('.dc-child');
      
      let prevActive = childContainer.querySelector('.dc-child__item.mouseenter');
      if (prevActive){
        prevActive.classList.remove('mouseenter');
      }


      this.classList.add('mouseenter');


      if ( childList ){
        
        
        childContainer.style.height = childList.clientHeight + 'px';
        
        dhParent.style.height = childList.clientHeight + 'px';
        
        let thisParent = this.closest('.dc-child');
        thisParent.classList.add('has-child');
        
      } else{
        
        let thisParent = this.closest('.dc-child');
        thisParent.classList.remove('has-child');


        if ( bufChildHeight <  dhParentHeight){
          dhParent.style.height = dhParentHeight  + 'px';
          childContainer.style.height = dhParentHeight  + 'px';
        } else{
          dhParent.style.height = bufChildHeight  + 'px';
          childContainer.style.height = bufChildHeight  + 'px';
        }
        

      }

    

    
  })
  item.addEventListener('mouseleave', function(){
    /*
    let childContainer = this.closest('.dc-child');
    this.classList.remove('mouseenter');
    if ( bufChildHeight <  dhParentHeight){
      dhParent.style.height = dhParentHeight  + 'px';
      childContainer.style.height = dhParentHeight  + 'px';
    } else{
      dhParent.style.height = bufChildHeight  + 'px';
      childContainer.style.height = bufChildHeight  + 'px';
    }*/
     
     //dhParent.style.height = dhParentHeight  + 'px';
  })


  item.addEventListener('click', function(event){

    event.stopPropagation();

    if ( this.classList.contains('mouseenter') ){
      return null
    } else{
      let childList = this.querySelector('.dc-child');
      let childContainer = this.closest('.dc-child');
      if ( !this.classList.contains('openclick') ){
        
        let opened = document.querySelector('.dc-child__item.openclick');

       
        if ( opened  ){
          opened.classList.remove('openclick');
          
        }
        
        
  
        this.classList.add('openclick');
  
  
        if ( childList ){
          
          
          childContainer.style.height = childList.clientHeight + 'px';
          
          dhParent.style.height = childList.clientHeight + 'px';
          
          
          
        } else{
          
          if ( bufChildHeight <  dhParentHeight){
            dhParent.style.height = dhParentHeight  + 'px';
            childContainer.style.height = dhParentHeight  + 'px';
          } else{
            dhParent.style.height = bufChildHeight  + 'px';
            childContainer.style.height = bufChildHeight  + 'px';
          }
          
  
        }
  
      } else{
        dhParent.style.height = bufChildHeight  + 'px';
        childContainer.style.height = bufChildHeight  + 'px';
        this.classList.remove('openclick')
      }


    }
  })
} )

/*
  КОНЕЦ:
  Работа с десктоп версией каталога
*/


const mobCatalogItems = document.querySelectorAll('.mcc-list__item[data-target]');

mobCatalogItems.forEach( item => {
  item.addEventListener('click', function(){
    const targetSubmenuName = this.getAttribute('data-target');
    

    const targetSubmenu = document.querySelector(".mc-container[data-name='"+targetSubmenuName+"']");
    console.log(targetSubmenu);
    targetSubmenu.classList.add('open');
  })
})

/*Мобильный каталог*/

const mcPrevBtns = document.querySelectorAll('.mc-container__prev');
const mnCatalogBtn = document.querySelector('.mn-catalog');

mcPrevBtns.forEach( btn => {
  btn.addEventListener('click', function(event){
    const targetClick = this.getAttribute('data-role');
    const parentContainer = this.closest('.mc-container');
    
    switch( targetClick ){
      case 'prev': 
        parentContainer.classList.remove('open');
      break;

      default: 
        mobileCatalog.classList.remove('open');
        document.body.classList.remove('hide-scroll');
    }
  })
})

const mcCloseBtns = document.querySelectorAll('.mc-container__close');
mcCloseBtns.forEach( btn => {
  btn.addEventListener('click', function(){
    mobileCatalog.classList.remove('open');
    document.body.classList.remove('hide-scroll');
    let containers = document.querySelectorAll('.mc-container.open');

    if ( containers.length > 0 ){
      containers.forEach( container => {
        container.classList.remove('open');
        
      } )
    }
  })
} )

mnCatalogBtn.addEventListener('click', function(){
    document.body.classList.add('hide-scroll');
    mobileCatalog.classList.add('open');
})

/*КОНЕЦ: Мобильный каталог*/

/*Мобильное меню*/

hamburger.addEventListener('click', function(){
  if ( !hamburger.classList.contains('active') ){
    closeDesktopCatalog();
    hamburger.classList.add('active');
    hamburgerMenu.classList.add('open');
  } else{
    hamburger.classList.remove('active');
    hamburgerMenu.classList.remove('open');
  }
})

/*КОНЕЦ: Мобильное меню*/


/*
  Промо-слайдер на index
*/
let indexPromoSlider = new Swiper(".ia-slider__swiper", {
    speed: 1000,
    autoplay: {
        delay: 26000,
    },
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    pagination: {
        el: '.ai-slider__pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.ia-slider__next',
        prevEl: '.ia-slider__prev',
    },
    
})
/*
  КОНЕЦ:
  Промо-слайдер на index
*/


/*Карточки товаров*/

//Слайдеры
let cardProductSliders = document.querySelectorAll('.pc-slider');

if ( cardProductSliders.length ){
  cardProductSliders.forEach(n => {
    const slider = new Swiper(n.querySelector('.pc-slider__swiper'), {
      
      spaceBetween: 10,
  
      pagination: {
        el: n.querySelector('.pc-slider__pagination'),
        clickable: true,
      },
    });
    
  });
}


//Добавление в корзину
const addProductToCartBtns = document.querySelectorAll('.product-card__add-cart');

if ( addProductToCartBtns.length ){

  addProductToCartBtns.forEach( btn => {

    btn.addEventListener('click', function(){

     

      let card = this.closest('.product-card');
      card.classList.add('product-selected');

      card.setAttribute('data-in-cart', '1');
      let totalQty = Number( card.getAttribute('data-total') );
      
      let calcMethod =  Number( card.getAttribute('data-calcmethod') );
      let price =  Number( card.getAttribute('data-price') );
      let weight =  Number( card.getAttribute('data-weight') );
      if ( totalQty === 1 ){
        card.querySelector('.product-card__plus').setAttribute('disabled', 'disabled');
      }
      card.querySelector('.product-card__calc-qty').innerHTML = '1';

      switch ( calcMethod ){
        case 1: 
            card.querySelector('.product-card__calc-summ').innerHTML = price; 

        break; 

        case 2: 
            card.querySelector('.product-card__calc-summ').innerHTML =  (weight * price).toFixed(2); 
            card.querySelector('.product-card__calc-weight').innerHTML = weight;
        break; 

      }
    })

  } )

}

const plusProductInCartBtns = document.querySelectorAll('.product-card__plus');

if ( plusProductInCartBtns.length ){
  plusProductInCartBtns.forEach( btn => {
    let card = btn.closest('.product-card');

    

    
    btn.addEventListener('click', function(){
      if ( this.hasAttribute('disabled') ) return false;
      
      let qtyInCart = Number( card.getAttribute('data-in-cart') );
      let totalQty = Number( card.getAttribute('data-total') );
      let calcMethod =  Number( card.getAttribute('data-calcmethod') );
      let price =  Number( card.getAttribute('data-price') );
      let weight =  Number( card.getAttribute('data-weight') );

      qtyInCart++;

      if ( qtyInCart === totalQty ) this.setAttribute('disabled', 'disabled');
      
      card.setAttribute('data-in-cart', qtyInCart);
      card.querySelector('.product-card__calc-qty').innerHTML = qtyInCart;

      switch ( calcMethod ){
        case 1: 
          card.querySelector('.product-card__calc-summ').innerHTML =  qtyInCart * price; 
          break; 

        case 2: 
            card.querySelector('.product-card__calc-summ').innerHTML =  (qtyInCart * weight * price).toFixed(2); 
            card.querySelector('.product-card__calc-weight').innerHTML = qtyInCart * weight;            
        break; 

      }

    })


  } )
}




const minusProductInCartBtns = document.querySelectorAll('.product-card__minus');

if ( minusProductInCartBtns.length ){
  minusProductInCartBtns.forEach( btn => {
    let card = btn.closest('.product-card');

    

    
    btn.addEventListener('click', function(){
      
      
      let qtyInCart = Number( card.getAttribute('data-in-cart') );
      let calcMethod =  Number( card.getAttribute('data-calcmethod') );
      let price =  Number( card.getAttribute('data-price') );
      let weight =  Number( card.getAttribute('data-weight') );

      qtyInCart--;

      card.querySelector('.product-card__plus').removeAttribute('disabled');

      if ( qtyInCart > 0 ){
        card.setAttribute('data-in-cart', qtyInCart);
        card.querySelector('.product-card__calc-qty').innerHTML = qtyInCart;

        switch ( calcMethod ){
          case 1: 
            card.querySelector('.product-card__calc-summ').innerHTML =  qtyInCart * price; 
          break; 

          case 2: 
            card.querySelector('.product-card__calc-summ').innerHTML =  (qtyInCart * weight * price).toFixed(2); 
            card.querySelector('.product-card__calc-weight').innerHTML = qtyInCart * weight;            
          break; 

        }
      } else{
        card.classList.remove('product-selected');
        card.setAttribute('data-in-cart', '0');
      }
      
      


    } )

  })
}

const addFavProductBtn = document.querySelectorAll('.product-card__add-favorite');

if (  addFavProductBtn.length  ){
  addFavProductBtn.forEach( btn => {
    let card = btn.closest('.product-card');


    btn.addEventListener('click', function(){
      card.classList.toggle('favorite')
    })
    
  } )
}

tippy('.product-card__question', {
  trigger: "mouseenter click",
  arrow: false,  
  placement: 'bottom',
});


/*
КОНЕЦ:
Карточки товаров*/


/*
  Слайдер популярные товары
*/

let popularProductsSlider = new Swiper(".popular-products__swiper", {
    speed: 1000,
    
    slidesPerView: 1,
    spaceBetween: 0,
    
    navigation: {
        nextEl: '.popular-products__next',
        prevEl: '.popular-products__prev',
    },

    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },


    breakpoints: {
      330: {
        slidesPerView: 2,
      },
      680: {
        slidesPerView: 3,
      },
      860: {
        slidesPerView: 4,
      },
      1180: {
        slidesPerView: 5,
      }
    }
})



/*
  Конец: Слайдер популярные товары
*/

/**/


let ideasSlider = new Swiper(".i-ideas-desk__swiper", {
    speed: 1000,
    
    slidesPerView: 4,
    spaceBetween: 20,
    
    
    navigation: {
        nextEl: '.i-ideas-desk__next',
        prevEl: '.i-ideas-desk__prev',
    },
    breakpoints: {
        320: {
          
        },
        1500: {
          slidesPerView: 4,
        }
    }
})

/**/



/*Форма голосования*/


const surveyForm = document.querySelector('.survey-form');
const surveyResults = document.querySelector('.survey-results')

if ( surveyForm ) {
  surveyForm.addEventListener( 'submit', function(event){
    event.preventDefault();


    this.classList.add('hide');  

    surveyResults.classList.remove('hide');


  } )
}


const surveyRadios = document.querySelectorAll('.survey-form input[type="radio"]');
const  surveyResultBlock = document.querySelectorAll('.survey-results__block');
const reSurvey = document.querySelector('.survey-results__resurvey');


if ( surveyRadios.length ){

  surveyRadios.forEach( (radio, index) => {
    radio.addEventListener( 'change', function(){
      surveyResultBlock.forEach( block => {
        block.classList.remove('selected');
      })

      surveyResultBlock[index].classList.add('selected');

    } )


    reSurvey.addEventListener('click', function(){
      surveyForm.classList.remove('hide');
      surveyResults.classList.add('hide');
    })

  })

}

/*
  КОНЕЦ:
  Форма голосования

  
*/

/*Слайдер бренды*/


let brands = new Swiper(".brands__swiper", {
  speed: 1000,
  
  slidesPerView: 2.2,
  spaceBetween: 20,
  
  navigation: {
      nextEl: '.brands__next',
      prevEl: '.brands__prev',
  },

  scrollbar: {
    el: '.swiper-scrollbar-brands',
    draggable: true,
  },


  breakpoints: {
    330: {
      slidesPerView: 2.3,
    },
    680: {
      slidesPerView: 3,
    },
    860: {
      slidesPerView: 4,
    },
    1180: {
      slidesPerView: 5,
    }
  }
})
/*
  Конец: слайдер бренды
*/


/* Карта*/

const iMap = document.querySelector('#i-map');

if ( iMap ){
  ymaps.ready(init);
function init () {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    myMap = new ymaps.Map('i-map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center: [45.062356, 38.983003],
        zoom: 14
    }, {
        searchControlProvider: 'yandex#search'
    });

    // Строка с адресом, который необходимо геокодировать
    var address = 'Россия, Краснодар, улица Шоссе Нефтяников, 18к1';
    
    // Ищем координаты указанного адреса
    // https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/geocode-docpage/
    var geocoder = ymaps.geocode(address);


    geocoder.then(
        function (res) {

            // координаты объекта
            var coordinates = res.geoObjects.get(0).geometry.getCoordinates();

            // Добавление метки (Placemark) на карту

            MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
            );

            var placemark = new ymaps.Placemark(
                coordinates, {
                    'hintContent': address,
                    'balloonContent': 'Агроглобал'
                }, {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#imageWithContent',
                    // Своё изображение иконки метки.
                    iconImageHref: 'assets/img/map/pin.png',
                    // Размеры метки.
                    iconImageSize: [77, 86],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-36, -86],
                    // Смещение слоя с содержимым относительно слоя с картинкой.
                    iconContentOffset: [0, 0],
                    // Макет содержимого.
                    iconContentLayout: MyIconContentLayout
                }
            );

            myMap.geoObjects.add(placemark);

            myMap.setCenter([45.062356, 38.983003], 14, {
                checkZoomRange: true
            });
        }
    );
   
  }
}






/*
Конец: карта
*/


/*Настройки модальных окон*/
let options = {
  zIndex: 1000, 
  
  background: 'rgba(34, 34, 34, 0.5)', 
  displayModalContainer: 'flex', 
  displayModal: 'flex', 

  closeSelectors: ['.modal__close'], 
  closeModalOnFogClick: true, 
  showModalAnimation: 'fadeIn', 
  closeModalAnimation: 'fadeOutTop',  
  showModalDuration: '300ms',
  closeModalDuration: '500ms',

  showFogAnimation: 'fadeIn',
  closeFogAnimation: 'fadeOut',
  showFogDuration: '300ms',
  closeFogDuration: '500ms',
  documentCanScroll: false, 

  // 'modal-first' - сначала скрывается модальное окно - затем туман
  // 'along' - анимации закрытия тумана и окна происходят параллельно
  closeMode: 'modal-first',
  
  
  

}

let  optionsPromoDetail = {
  zIndex: 1000, 
  
  background: 'rgba(34, 34, 34, 0.5)', 
  displayModalContainer: 'flex', 
  displayModal: 'flex', 

  closeSelectors: ['.modal__close', '.modal__close-btn'], 
  closeModalOnFogClick: true, 
  showModalAnimation: 'fadeIn', 
  closeModalAnimation: 'fadeOutTop',  
  showModalDuration: '300ms',
  closeModalDuration: '500ms',

  showFogAnimation: 'fadeIn',
  closeFogAnimation: 'fadeOut',
  showFogDuration: '300ms',
  closeFogDuration: '500ms',
  documentCanScroll: false, 

  // 'modal-first' - сначала скрывается модальное окно - затем туман
  // 'along' - анимации закрытия тумана и окна происходят параллельно
  closeMode: 'modal-first',
  
  
  

}
/*Конец: Настройки модальных окон*/


/*Модальная форма Добро пожаловать */
let singInBtns = document.querySelectorAll('.sing-in-btn');


singInBtns.forEach( btn => {
  btn.addEventListener( 'click', function(event){
    let welcomeModal = new easyModal('.welcome-modal', options);
  } )
} )
  
const welcomeForm = document.querySelector('.welcome-form');

welcomeForm.addEventListener('submit', function(event){
  event.preventDefault();
})


const enterWithPasswordBtn = document.querySelector('.c-form__enter-with-password')
enterWithPasswordBtn.addEventListener('click', function(event){
  event.preventDefault();
})


/* 
  Конец: 
  Модальная форма Добро пожаловать
*/



/*Вызов формы обратной связи*/

const callFeedBackModalBtn = document.querySelector('.f-btn-feedback');

callFeedBackModalBtn.addEventListener('click', function(event){
  let feedbackModal = new easyModal('.feedback-modal', options);
})
  
  const selectFeedbackTypeNode = document.querySelector('.select-feedback-type');
  
  const selectFeedbackType = new Choices(selectFeedbackTypeNode, {
    searchEnabled: false,
    itemSelectText: '',
  });

  const feedbackFile = document.querySelector('.feedback-file');
  const addFeedBackFileBtn = document.querySelector('.c-from__add-file');
  const clearFile = document.querySelector('.c-from__add-file--clear');

  addFeedBackFileBtn.addEventListener('click', function(){
    feedbackFile.click();
  })

  feedbackFile.addEventListener('change', function(){
    let p = addFeedBackFileBtn.querySelector('p');
    p.innerHTML = this.files[0].name;
    clearFile.classList.add('show');
  })


  clearFile.addEventListener('click', function(){
    this.classList.remove('show')
    let p = addFeedBackFileBtn.querySelector('p');
    p.innerHTML = 'Прикрепить файл';
    feedbackFile.value = '';
  })


  selectFeedbackTypeNode.addEventListener('change', function(){
    const formNode = this.closest('form');

    const emailLine = formNode.querySelector('.type-connect-email');
    const phoneLine = formNode.querySelector('.type-connect-phone');

    switch (this.value){
      case '2':
        emailLine.classList.remove('hide');
        phoneLine.classList.add('hide');
      break;

      default: 
        phoneLine.classList.remove('hide');
        emailLine.classList.add('hide');
    }    
  });
/*
КОНЕц
Вызов формы обратной связи*/


/*Подключаем маски */
const phoneMasks = document.querySelectorAll("input[name='phone']");

phoneMasks.forEach( (input) => {
    IMask(
        input, {
          mask: '+7(000)000-00-00'
    });


   

})

/**/


/*
  Страница акции
  */

const showPromoDetailBtns = document.querySelectorAll('button[data-show-detail]');

if ( showPromoDetailBtns.length ){
  showPromoDetailBtns.forEach( btn => {

    btn.addEventListener('click', function(event){
      let targetModal = this.getAttribute('data-show-detail');
      
      new easyModal( ".modal[data-modal-name = '" +targetModal+ "']", optionsPromoDetail );

    })

  } )
}

/*
  КОНЕЦ: Страница акции
*/