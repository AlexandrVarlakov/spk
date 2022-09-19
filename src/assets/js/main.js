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





  const feedbackFile = document.querySelectorAll('.feedback-file');
  const addFeedBackFileBtn = document.querySelectorAll('.c-from__add-file');
  const clearFile = document.querySelectorAll('.c-from__add-file--clear');


  addFeedBackFileBtn.forEach( ( btn, index) => {
    btn.addEventListener('click', function(){
      feedbackFile[index].click();
    })
  } )

  feedbackFile.forEach( (f, index) => {
    f.addEventListener('change', function(){
      let p = addFeedBackFileBtn[index].querySelector('p');
      p.innerHTML = this.files[0].name;
      clearFile[index].classList.add('show');
    })
  })

  
  clearFile.forEach( (btn, index) => {
    btn.addEventListener('click', function(){
      this.classList.remove('show')
      let p = addFeedBackFileBtn[index].querySelector('p');
      p.innerHTML = 'Прикрепить файл';
      feedbackFile[index].value = '';
    })
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

const showPromoDetailBtns = document.querySelectorAll('button[target-modal]');

if ( showPromoDetailBtns.length ){
  showPromoDetailBtns.forEach( btn => {

    btn.addEventListener('click', function(event){
      let targetModal = this.getAttribute('target-modal');
      
      new easyModal( ".modal[modal-name = '" +targetModal+ "']", optionsPromoDetail );

    })

  } )
}

/*
  КОНЕЦ: Страница акции
*/


/*
  страница Помощь
*/

const helpTabs = document.querySelectorAll('.help-tabs__tab')
const helpSheets =  document.querySelectorAll('.help-sheets__sheet')

const selectHelpTabsNode = document.querySelector('.select-help-tabs');
let selectHelpTabs;
if ( selectHelpTabsNode ){
  selectHelpTabs = new Choices(selectHelpTabsNode, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
  });


  selectHelpTabsNode.addEventListener( 'change', function(event){

    const activeSheet = document.querySelector('.help-sheets__sheet.current');
    activeSheet.classList.remove('current');

    let activeIndex = Number( this.value );
    helpSheets[activeIndex].classList.add('current');


    const activeTab = document.querySelector('.help-tabs__tab.current');
    activeTab.classList.remove('current');

    helpTabs[activeIndex].classList.add('current')

  } )

}




if ( helpTabs.length ){
  helpTabs.forEach( (tab, index) => {

    tab.addEventListener('click', function(){
      if ( !tab.classList.contains( 'current' ) ){
        const activeTab = document.querySelector('.help-tabs__tab.current');
        const activeIndex = Number( activeTab.getAttribute('data-index') );

        activeTab.classList.remove('current');

        helpSheets[activeIndex].classList.remove('current');
        

        helpSheets[index].classList.add('current');
        this.classList.add('current');
        selectHelpTabs.setChoiceByValue(String( index ));
      } else {
        return null
      }



    })


    let helpInnerSwitcherBtn = document.querySelectorAll('.help-inner-switcher');

    helpInnerSwitcherBtn.forEach( btn => {
      btn.addEventListener('click', function(){


        const activeTab = document.querySelector('.help-tabs__tab.current');
        const activeSheet = document.querySelector('.help-sheets__sheet.current');
        activeTab.classList.remove('current');
        activeSheet.classList.remove('current');


        let targetIndex = Number ( this.getAttribute('data-index') );
        helpTabs[targetIndex].classList.add('current');
        helpSheets[targetIndex].classList.add('current');


        document.querySelector('.select-help-tabs').selectedIndex = targetIndex;
        
        selectHelpTabs.setChoiceByValue(String( targetIndex ));
      })
    })

  } )
}

/*
  Конец:
  страница Помощь

*/


/*
  Каталог категории
*/

const btnShowAllCats = document.querySelectorAll('.catalog-category__show-all');


if (  btnShowAllCats.length  ) {

  btnShowAllCats.forEach( btn => {

    btn.addEventListener('click', function(){

      const parentContainer = this.closest('.catalog-category__links-group');
      const items = parentContainer.querySelectorAll('.cc-list__item');
      
      if ( !this.classList.contains('opened') ){
        this.classList.add('opened');
        this.querySelector('span').innerHTML = 'Скрыть';
        this.setAttribute('disabled', 'disabled');

        function blockBtn(){
            btn.removeAttribute('disabled');
            items[items.length - 1].removeEventListener('animationend', blockBtn);
            console.log('???');
        }

        items[items.length - 1].addEventListener('animationend', blockBtn)

        if ( items.length > 5 ){


          for ( let i = 5; i < items.length; i++){
            setTimeout( ()=>{
              items[i].classList.add('show');
            }, i * 30 )
            
          }

        }


      } else{
        this.querySelector('span').innerHTML = 'Показать еще';
        this.classList.remove('opened');

        if ( items.length > 5 ){
          this.setAttribute('disabled', 'disabled');
          function clearClasses(){
            items.forEach ( item => {
              item.classList.remove('show');
              item.classList.remove('hide');
              btn.removeAttribute('disabled');
              items[5].removeEventListener('animationend', clearClasses);    
              
            } );
          }

          items[5].addEventListener('animationend', clearClasses);

          for ( let i = items.length - 1; i > 4; i--){
            setTimeout( ()=>{
              items[i].classList.add('hide');
            }, i * 30 )
            
          }

        }
      }

    })

  } )

}

/*
  Конец: 
  Каталог категории
*/


/*Страница контакты*/

const selectFeedbackTypeNodePage = document.querySelector('.select-feedback-type-page');
if ( selectFeedbackTypeNodePage ){
  const selectFeedbackTypePage = new Choices(selectFeedbackTypeNodePage, {
    searchEnabled: false,
    itemSelectText: '',
  });



  selectFeedbackTypeNodePage.addEventListener('change', function(){
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
}



/*
Конец:
Страница контакты*/


/*
  Страница Список товаров
*/


let showHideFilterBtn = document.querySelectorAll('.pf-filter__sh');

if ( showHideFilterBtn.length ){

  window.addEventListener('resize', function(){
    
    if ( document.documentElement.clientWidth > 1024){
      let opened = document.querySelectorAll('.pf-filter__sh.open');
      if ( opened.length ){
        opened.forEach( btn => {
          btn.classList.remove('open');
          btn.nextElementSibling.removeAttribute('style');
          
        } )
      }
    } else{
      let closed = document.querySelectorAll('.pf-filter__sh.close');
      if ( closed.length ){
        closed.forEach( btn => {
          btn.classList.remove('close');
          btn.nextElementSibling.removeAttribute('style');
          
        } )
      }
    }
  })




  showHideFilterBtn.forEach( btn => {

    btn.addEventListener('click', function(){

      const parentContainer = this.closest('.pf-filter');
      const paramsContainerInner =  parentContainer.querySelector('.pf-filter__params--inner');
      const paramsContainer =  parentContainer.querySelector('.pf-filter__params');

      let self = this;

      this.setAttribute('disabled', 'disabled');

      if ( document.documentElement.clientWidth > 1024  ){
        if ( !this.classList.contains('close') ){
          
          paramsContainer.addEventListener('transitionend', afterRolled)
          function afterRolled(){
            self.removeAttribute('disabled');
            paramsContainer.removeEventListener('transitionend', afterRolled); 
          }
          
          paramsContainer.style.height = paramsContainerInner.clientHeight + 'px';
          paramsContainer.style.overflow = 'hidden'

          setTimeout(() => {
            paramsContainer.style.height = '0px';
            this.classList.add('close');  
          }, 50);
          

        } else{
          
          function afterDeployed(){
            paramsContainer.style.overflow = 'initial';
            self.removeAttribute('disabled');
            paramsContainer.removeEventListener('transitionend', afterDeployed);  
          }
          
          paramsContainer.addEventListener('transitionend', afterDeployed);
          paramsContainer.style.height = paramsContainerInner.clientHeight + 'px';
          this.classList.remove('close');
          
          
        }

        

      } else {
        if ( !this.classList.contains('open') ){
          
          paramsContainer.addEventListener('transitionend', afterRolled)
          function afterRolled(){
            self.removeAttribute('disabled');
            paramsContainer.removeEventListener('transitionend', afterRolled); 
          }
          
          
          setTimeout(() => {
            paramsContainer.style.height = paramsContainerInner.clientHeight + 'px';
            this.classList.add('open'); 
          }, 50);
        } else{
            
            paramsContainer.addEventListener('transitionend', afterRolled)
            function afterRolled(){
              self.removeAttribute('disabled');
              paramsContainer.removeEventListener('transitionend', afterRolled); 
            }
            
            
            setTimeout(() => {
              paramsContainer.style.height = 0 + 'px';
              this.classList.remove('open');
            }, 50);
        }
      }
    })


  } )
}


let filtersArray = {
  checkboxes: {},
  tagSlides: {},
  count: 0,
  clearAllTag: false,
  clearAllTagNode: null,
  rangeValue: null,
  rangeNode: null,
};


let proxyFilters = new Proxy(filtersArray, {
  set(target, prop, value) {
    const btn = document.querySelector( '.clear-filters' );
    const swiperWrappper = document.querySelector('.tags-swiper > .swiper-wrapper');
    const swiperTag = document.querySelector('.tags-swiper');
    switch (prop){
      case 'count':

        
        if ( value  < 0) value = 0

        if ( value ) {
          btn.removeAttribute('disabled');
          
          if ( proxyFilters.clearAllTag === false){
            proxyFilters.clearAllTagNode = createTag('', 'Очистить все', 'clearAllFilters'); 
            swiperWrappper.append( proxyFilters.clearAllTagNode );
            proxyFilters.clearAllTag = true;
          }
          swiperTag.classList.add('has-tags');
        } else{
          btn.setAttribute('disabled', 'disabled');
    
          proxyFilters.clearAllTag = false;
          if ( proxyFilters.clearAllTagNode ) proxyFilters.clearAllTagNode.remove();
          
          proxyFilters.clearAllTagNode = null;
          swiperTag.classList.remove('has-tags');
        }


        
        
        target[prop] = value;

        
        
      break;
      case 'rangeValue': 
        target[prop] = value;
        
        proxyCheckboxes['range'] = {id: 'range', name: value, type: 'range'};
                
      break;  


      default: 
      target[prop] = value;
      
    }
    
    //console.log('!!!!!!!!!!!!!!!!!!!!', proxyFilters.clearAllTag);
    

    
    

    
    
    return true;
  },
  

}); 


let proxyCheckboxes = new Proxy(proxyFilters.checkboxes, {
  
  set(target, prop, val) {
    proxyFilters.count++;
        
    if ( typeof(val) === "object" ){
      switch (val.type){
        case "checkbox": 
        
        let tag = createTag(val.id, val.name, val.type);
        proxySlides[val.id] = tag;
        
        proxyFilters.clearAllTagNode.before(tag);  
        
        console.log('change!!!');
        break;

        case "range": 
        
          
          
          if ( !proxyFilters.rangeNode ){
            let tag = createTag(val.id, val.name, val.type);
            proxySlides[val.id] = tag;
            proxyFilters.clearAllTagNode.before(tag);  
            proxyFilters.rangeNode = tag;
          } else {
            proxyFilters.count =   Object.keys(proxyCheckboxes).length;
            document.querySelector('[data-id = "range"] .tags-swiper__min-value').innerHTML = val.name[0];
            document.querySelector('[data-id = "range"] .tags-swiper__max-value').innerHTML = val.name[1];
            
          }


        break;
  
      }

      
    }
    
    
    target[prop] = val;
    
    return true;
  },

  deleteProperty( target, prop ){      
    proxyFilters.count--;
    switch (target[prop].type){
      case "checkbox": {
        let checkboxId  = target[prop].id;
        let cb = document.querySelector('#'+checkboxId);
        cb.checked = false;
        
        proxySlides[target[prop].id].remove();
        delete proxySlides[target[prop].id];
        delete target[prop];
      }
      

      break;
      case "range": {
        
        if ( proxyFilters.rangeNode ) proxyFilters.rangeNode.remove();
        
       
        delete proxySlides[target[prop].id];
        proxyFilters.rangeNode = null;
          
        resetComponentRangeSlider()
        


      }
      
      break;

    }
    
    return true;

  }


});

let proxySlides = new Proxy(proxyFilters.tagSlides, {
  set(target, prop, val){
    document.querySelector('.mob-open-filter__filter-count').innerHTML = Object.keys(proxySlides).length + 1;
    target[prop] = val;
    return true;
  },
  deleteProperty( target, prop ){
    document.querySelector('.mob-open-filter__filter-count').innerHTML = Object.keys(proxySlides).length - 1;

    delete target[prop];
    return true;
  }
})




const rangeSlider = document.getElementById('range-slider');
let tagClearAllFilters;


const clearFiltersBtn = document.querySelector('.clear-filters');

if ( clearFiltersBtn ){

  clearFiltersBtn.addEventListener('click', function(){
    let clearAll = document.querySelector('.tags-swiper__tag.clear-all .tags-swiper__close-tag');
    clearAll.click();

    
  })
  
}


if ( rangeSlider ){
  
  const inpStartRangeD = document.querySelector('.prices-inp-ranges__input.start-range-d');   
  const inpEndRangeD = document.querySelector('.prices-inp-ranges__input.end-range-d');  
  
  const minValue = Number( inpStartRangeD.getAttribute('min') );
  const maxValue = Number( inpEndRangeD.getAttribute('max') );
  const stepRange = Number( inpEndRangeD.getAttribute('data-step') );


  IMask(
    inpStartRangeD, {
      mask: Number,
      min: minValue,
      max: maxValue
  });
  
  IMask(
    inpEndRangeD, {
      mask: Number,
      min: minValue,
      max: maxValue
  });
  
  
  noUiSlider.create(rangeSlider, {
      start: [minValue, maxValue],
      connect: true,
      range: {
          'min': minValue,
          'max': maxValue
      },
      step: stepRange,
  
      
  });


  inpStartRangeD.addEventListener('input', function(){
    let numMin = Number( this.value );
    let numMax = Number( inpEndRangeD.value );
    if (numMin > numMax) {
      numMin = numMax

      this.value = numMin;
    }
    rangeSlider.noUiSlider.set([numMin, null])
    //createRangeTag([numMin, numMax]);
  })

  inpStartRangeD.addEventListener('blur', function(){
    
    if (this.value.length === 0){
      this.value = 0;
    }

    
  })

  inpEndRangeD.addEventListener('input', function(){
    let numMin = Number( inpStartRangeD.value );
    let numMax = Number( this.value );
    if (numMax < numMin) {
      numMax = numMin

      
    }
    rangeSlider.noUiSlider.set([null, numMax])
    //createRangeTag([numMin, numMax]);
  })

  inpEndRangeD.addEventListener('blur', function(){
    
    if (this.value.length === 0){
      this.value = maxValue;
      rangeSlider.noUiSlider.set([null, maxValue])
    }
  })

  rangeSlider.noUiSlider.on('slide', function () { 
    let value = [Math.trunc(this.get()[0]), Math.trunc(this.get()[1])];
    inpStartRangeD.value = value[0];
    inpEndRangeD.value = value[1];
    
    

    proxyFilters.rangeValue = value;
    console.log (proxyFilters.rangeValue);
    //createRangeTag(value);

        


  });

}

/*
function createRangeTag(value){
  let rangeTag = document.querySelector('.tags-swiper__tag-name.range');
  let tags = document.querySelectorAll('.swiper-slide.tags-swiper__slide');
  let swiperWrappper = document.querySelector('.tags-swiper > .swiper-wrapper');
  


  
  if ( !rangeTag ) {
    if ( tags.length ){
      console.log(tagClearAllFilters);
      tagClearAllFilters.before(createTag(this.id, value, 'range'));
    } else {
      tagClearAllFilters = createTag('', 'Очистить все', 'clearAllFilters');
      
      swiperWrappper.append(tagClearAllFilters);
      tagClearAllFilters.before(createTag(this.id, value, 'range'));
      
    }
  } else {
    let ragneTagMinValue = document.querySelector('.tags-swiper__min-value');
    let ragneTagMaxValue = document.querySelector('.tags-swiper__max-value');
    ragneTagMinValue.innerHTML = value[0];
    ragneTagMaxValue.innerHTML = value[1];
    
  }
}*/



const filterCheckboxes = document.querySelectorAll('.filter-checkbox');


if ( filterCheckboxes.length ){

  let swiperWrappper = document.querySelector('.tags-swiper > .swiper-wrapper');
  

  filterCheckboxes.forEach( cb => {
    cb.addEventListener('change', function(){



      let tagObj = {}

      tagObj.id = this.getAttribute('data-id');
      tagObj.name = this.value;
      tagObj.type = 'checkbox';

      

      

      if ( this.checked ) {

        proxyCheckboxes[tagObj.id] = tagObj;

      } else{

        delete proxyCheckboxes[this.getAttribute('data-id')];
        
      }
    })
  })

}


function checkboxUncheck(){
  let slide = this.closest('.tags-swiper__slide');
  let slideId = slide.getAttribute('data-id');
  
  delete proxyCheckboxes[slideId];
  
}


function resetComponentRangeSlider(){
  const inpStartRangeD = document.querySelector('.prices-inp-ranges__input.start-range-d');   
  const inpEndRangeD = document.querySelector('.prices-inp-ranges__input.end-range-d');  
  
  const minValue = Number( inpStartRangeD.getAttribute('min') );
  const maxValue = Number( inpEndRangeD.getAttribute('max') );
  inpStartRangeD.value = minValue;
  inpEndRangeD.value = maxValue;
  rangeSlider.noUiSlider.set([minValue, maxValue]);
}


function resetRangeSlider(){
  
  resetComponentRangeSlider();
  delete proxyCheckboxes['range'];
  //proxyFilters.rangeNode.remove();
  
}


function clearAllFilters(){
  for ( item in proxyCheckboxes) {
    delete proxyCheckboxes[item];
  }
}


function createTag(id, value, type){

  let slide = document.createElement('div');
  slide.setAttribute('class', 'swiper-slide tags-swiper__slide');

  slide.setAttribute('data-id', id);
  slide.setAttribute('data-type', type);
  
  let tag = document.createElement('div');
  tag.setAttribute('class', 'tags-swiper__tag');
  
  let tagName;
  if ( type !== 'range' ){
    tagName = document.createElement('p');
    tagName.setAttribute('class', 'tags-swiper__tag-name');
    tagName.innerHTML = value;
  } else {
    tagName = document.createElement('div');
    tagName.setAttribute('class', 'tags-swiper__tag-name range');

    let minRange = document.createElement('p');
    minRange.classList.add('tags-swiper__min-value');
    minRange.innerHTML = value[0];


    let minRangeSpan = document.createElement('span');
    minRangeSpan.innerHTML = 'от ';

    let maxRangeSpan = document.createElement('span');
    maxRangeSpan.innerHTML = ' до ';
    
    let maxRange = document.createElement('p');
    maxRange.classList.add('tags-swiper__max-value');
    maxRange.innerHTML = value[1];

    tagName.append(minRangeSpan);
    tagName.append(minRange);
    tagName.append(maxRangeSpan);
    tagName.append(maxRange);
  }
  
  
  let closeTag = document.createElement('div');
  closeTag.setAttribute('class', 'tags-swiper__close-tag');
  
    
  if (type === 'checkbox'){
    closeTag.addEventListener('click', checkboxUncheck);
  } else if (type === 'clearAllFilters'){
    tag.setAttribute('class', 'tags-swiper__tag clear-all');
    closeTag.addEventListener('click', clearAllFilters);
  } else if (type === 'range'){
    console.log('type^^^^^^^^^^^^^^^', type);
    closeTag.addEventListener('click', resetRangeSlider);
  }

  slide.append(tag);
  tag.append(tagName);
  tag.append(closeTag);

  return slide;
}





let filterTagsSlider = new Swiper(".tags-swiper", {
    speed: 1000,
    
    slidesPerView: 'auto',
    spaceBetween: 4,
    observer: true,
    //observeParents: true,
    //observeSlideChildren: true
})



const plSort = document.querySelector('.pl-sort');
const plSortTitle = document.querySelector('.pl-sort__title');
const plSortItems = document.querySelectorAll('.pl-sort__list-item');  
if ( plSort ) {

  const hideMobFilters = document.querySelectorAll('.hide-mob-filter');

  hideMobFilters.forEach( btn => {
    btn.addEventListener('click', function(){
      document.querySelector('.container-products-list__filters').classList.remove('open');
    })
  } )


  plSortTitle.addEventListener('click', function(event){
    plSort.classList.toggle('open');
  })

  plSortItems.forEach( (item) => {
    item.addEventListener('click', function(event){
      
      if ( this.classList.contains('checked') ) return null;

      const checkedItem = document.querySelector('.pl-sort__list-item.checked');
      checkedItem.classList.remove('checked');
      const text = this.querySelector('span').innerHTML; 
      this.classList.add('checked');
      plSortTitle.querySelector('span').innerHTML = text;


      plSort.classList.remove('open');
    })
  } )

  document.addEventListener('click', function(event){
    if ( !event.target.closest('.pl-sort') ){
      plSort.classList.remove('open');
    } else  {
      
    }
  })
}

let btnOpenMobFilter = document.querySelector('.mob-open-filter');

if ( btnOpenMobFilter ){
  btnOpenMobFilter.addEventListener('click', function(){
    document.querySelector('.container-products-list__filters').classList.add('open')
  })


  
}

/*
Конец:
Страница Список товаров
*/

/*
  Страница продукты
*/
let ptoductThumbsSlider = new Swiper(".pt-thumb-slider", {
  speed: 1000,
  
  slidesPerView: 3,
  spaceBetween: 20,
  direction: 'vertical',
  /*pagination: {
      el: '.pagination',
      clickable: true,
  },*/
  
  navigation: {
    nextEl: '.pt-thumb-slider__next',
    prevEl: '.pt-thumb-slider__prev',
},
})

const ptSlider = new Swiper(".pt-slider", {
  speed: 1000,
  
  slidesPerView: 1,
  spaceBetween: 50,
  
  pagination: {
      el: '.product-pagination',
      clickable: true,
  },
  thumbs: {
    swiper: ptoductThumbsSlider
  },
  breakpoints: {
      320: {
          
      },
      800: {
          
      }
  }
})



/*
  Конец:
  Страница продукты
*/


/*Страница продукт*/



const roundAddFavorite = document.querySelectorAll('.round-add-favorite');

if ( roundAddFavorite.length ){
  roundAddFavorite.forEach( btn => {
    btn.addEventListener( 'click', function(){
      this.classList.toggle('favorite');
    } )
  } )
 
}

tippy('.pt-product-question', {
  trigger: "mouseenter click",
  arrow: false,  
  placement: 'bottom',
});





const addProductToCartBtn = document.querySelector('.product-add-cart');
const  productBuyBlock = document.querySelector('.pt-buy-block');  


if ( addProductToCartBtn ){

  addProductToCartBtn.addEventListener('click', function(){
    
     
    productBuyBlock.classList.add('product-selected');

    productBuyBlock.setAttribute('data-in-cart', '1');
    let totalQty = Number( productBuyBlock.getAttribute('data-total') );
    
    let calcMethod =  Number( productBuyBlock.getAttribute('data-calcmethod') );
    let price =  Number( productBuyBlock.getAttribute('data-price') );
    let weight =  Number( productBuyBlock.getAttribute('data-weight') );
    if ( totalQty === 1 ){
      productBuyBlock.querySelector('.product__plus').setAttribute('disabled', 'disabled');
    }
    productBuyBlock.querySelector('.product__calc-qty').innerHTML = '1';

    switch ( calcMethod ){
      case 1: 
        productBuyBlock.querySelector('.product__calc-summ').innerHTML = price; 

      break; 

      case 2: 
          productBuyBlock.querySelector('.product__calc-summ').innerHTML =  (weight * price).toFixed(2); 
          productBuyBlock.querySelector('.product__calc-weight').innerHTML = weight;
      break; 

    }
  })


  const plusProduct = document.querySelector('.product__plus');

  plusProduct.addEventListener('click', function(){
    
    
      if ( this.hasAttribute('disabled') ) return false;
      
      let qtyInCart = Number( productBuyBlock.getAttribute('data-in-cart') );
      let totalQty = Number( productBuyBlock.getAttribute('data-total') );
      let calcMethod =  Number( productBuyBlock.getAttribute('data-calcmethod') );
      let price =  Number( productBuyBlock.getAttribute('data-price') );
      let weight =  Number( productBuyBlock.getAttribute('data-weight') );

      qtyInCart++;

      if ( qtyInCart === totalQty ) this.setAttribute('disabled', 'disabled');
      
      productBuyBlock.setAttribute('data-in-cart', qtyInCart);
      productBuyBlock.querySelector('.product__calc-qty').innerHTML = qtyInCart;

      switch ( calcMethod ){
        case 1: 
          productBuyBlock.querySelector('.product__calc-summ').innerHTML =  qtyInCart * price; 
          break; 

        case 2: 
            productBuyBlock.querySelector('.product__calc-summ').innerHTML =  (qtyInCart * weight * price).toFixed(2); 
            productBuyBlock.querySelector('.product__calc-weight').innerHTML = qtyInCart * weight;            
        break; 

      }

    
  })

  const minusProduct = document.querySelector('.product__minus');

  minusProduct.addEventListener('click', function(){
    
    let qtyInCart = Number( productBuyBlock.getAttribute('data-in-cart') );
    let calcMethod =  Number( productBuyBlock.getAttribute('data-calcmethod') );
    let price =  Number( productBuyBlock.getAttribute('data-price') );
    let weight =  Number( productBuyBlock.getAttribute('data-weight') );

    qtyInCart--;

    productBuyBlock.querySelector('.product__plus').removeAttribute('disabled');

    if ( qtyInCart > 0 ){
      productBuyBlock.setAttribute('data-in-cart', qtyInCart);
      productBuyBlock.querySelector('.product__calc-qty').innerHTML = qtyInCart;

      switch ( calcMethod ){
        case 1: 
          productBuyBlock.querySelector('.product__calc-summ').innerHTML =  qtyInCart * price; 
        break; 

        case 2: 
          productBuyBlock.querySelector('.product__calc-summ').innerHTML =  (qtyInCart * weight * price).toFixed(2); 
          productBuyBlock.querySelector('.product__calc-weight').innerHTML = qtyInCart * weight;            
        break; 

      }
    } else{
      productBuyBlock.classList.remove('product-selected');
      productBuyBlock.setAttribute('data-in-cart', '0');
    }
      
      
    
  })
}


/*
КОНЕЦ:
Страница продукт*/