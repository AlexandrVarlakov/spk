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
  } 
  
});

hCatalogBtn.addEventListener('click', function(event){
  const windowWidth = document.documentElement.clientWidth;
  

  if ( windowWidth <= 1024 ){
    document.body.classList.add('hide-scroll');
    mobileCatalog.classList.add('open');
    
    event.preventDefault();
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
  cardProductSliders.forEach(itemSlider => {
    const slider = new Swiper(itemSlider.querySelector('.pc-slider__swiper'), {
      
      spaceBetween: 10,
  
      pagination: {
        el: itemSlider.querySelector('.pc-slider__pagination'),
        clickable: true,
      },
    });
    itemSlider.addEventListener('mousemove', function(event){
      
        if (this.classList.contains('moved')) return false;
        
        
        const xPosition = event.offsetX==undefined?event.layerX:event.offsetX

        const current = slider.activeIndex;
        const count = slider.slides.length;
        const step =  100 / count;
        
        
        const position  = (xPosition / this.offsetWidth) * 100;
        
        const movePosition = Math.trunc(position / step);
        
        if ( movePosition > count ) return false;
        if ( movePosition < 0 ) return false;

        if ( movePosition === current ) return false
        
        slider.slideTo(movePosition, 0, function(){})
        this.classList.add('moved');
        setTimeout(()=>{
          this.classList.remove('moved');
        }, 50)
      

    }, {capture: true})
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
        center: [55.046410, 82.877388],
        zoom: 12
    }, {
        searchControlProvider: 'yandex#search'
    }),

    // Создаём макет содержимого.
    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
      '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
  ),

    myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
        hintContent: 'г. Новосибирск, улица Дуси Ковальчук, 1В',
        balloonContent: 'Сибирская продовольственная компания <br />г. Новосибирск, улица Дуси Ковальчук, 1В '
    }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: 'assets/img/icons/map-pin.svg',
        // Размеры метки.
        iconImageSize: [44, 44],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-22, -22]
    }),

  myMap.geoObjects.add(myPlacemark)
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
    
  });

}

const filterCheckboxes = document.querySelectorAll('.filter-checkbox');


if ( filterCheckboxes.length ){

  let swiperWrappper = document.querySelector('.tags-swiper > .swiper-wrapper');
  

  filterCheckboxes.forEach( cb => {
    cb.addEventListener('change', function(){



      let tagObj = {}
      
      tagObj.id = this.id;
      tagObj.name = this.value;
      tagObj.type = 'checkbox';

      

      

      if ( this.checked ) {

        proxyCheckboxes[tagObj.id] = tagObj;

      } else{
        
        delete proxyCheckboxes[this.id];
        
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



/*Кабинет*/

const codeCopyBtns = document.querySelectorAll('.c-bonus__get-code');

codeCopyBtns.forEach( btn => {
  btn.addEventListener('click', function(){
    let success = this.nextElementSibling;
    success.addEventListener('animationend', function(){
      this.style.display = 'none';
    })
    success.style.display = 'inline-block';
    navigator.clipboard.writeText(this.getAttribute('data-code'));
  })
} )


$(function(){

	$("#datepicker").datepicker();
  $('#datepicker').focus(function(){
    let width = this.offsetWidth;
    $('.ui-datepicker').css('width', width + 'px');
  })
});

$.datepicker.regional['ru'] = {
	closeText: 'Закрыть',
	prevText: 'Предыдущий',
	nextText: 'Следующий',
	currentText: 'Сегодня',
	monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
	monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
	dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
	dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
	dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
	weekHeader: 'Не',
	dateFormat: 'dd.mm.yy',
	firstDay: 1,
	isRTL: false,
	showMonthAfterYear: false,
	yearSuffix: ''
};
$.datepicker.setDefaults($.datepicker.regional['ru']);

const calendarIcons = document.querySelectorAll('.c-form__calendar-icon');

if ( calendarIcons.length ) {
  calendarIcons.forEach( icon => {
    icon.addEventListener('click', function(){
      const container = this.closest('.c-form__inp-wrap');
      container.querySelector('input').focus();
    })
  } )  
  
}

const changePasswordBtn = document.querySelector('.change-password');
if ( changePasswordBtn ){
  changePasswordBtn.addEventListener('click', function(event){
    event.preventDefault();

    const changePasswordModal = new easyModal('.change-password-modal', options)

    
  })
}

const cancelPDSaveBtn = document.querySelector('.personal-data-cancel-save');
if ( cancelPDSaveBtn ){
  cancelPDSaveBtn.addEventListener('click', function(event){
    event.preventDefault();
  })
}

const savePersonalData = document.querySelector('.personal-data-save');

if ( savePersonalData ){
  savePersonalData.addEventListener('click', function(event){
    event.preventDefault();
  })
}


const personalDataForm = document.querySelector('.personal-data-form');

if ( personalDataForm ){
  
}


const showHidePasswordBtns = document.querySelectorAll('.c-form__show-hide-password');

if ( showHidePasswordBtns.length ){

  showHidePasswordBtns.forEach( btn => {


    btn.addEventListener('click', function(event){
      event.preventDefault();
      const container =  this.closest( '.c-form__inp-wrap' );
      const inputText = container.querySelector('input[placeholder]');
      if ( !this.classList.contains('show') ){
        this.classList.add('show');
        
        inputText.type = 'text';
      }else{
        this.classList.remove('show');        
        inputText.type = 'password';
      }

    })

  } )

}

const newPassword = document.querySelector('input[name="new-password"]');

if (  newPassword  ){
  const container = newPassword.closest('.c-form__inp-wrap');
  const errorMsg = container.querySelector('.miss-password');

  newPassword.addEventListener( 'input', function(){
            
            
            let str = this.value;
            if (str.match(/[a-z]/g) && str.match(/[A-Z]/g) && str.match(/[0-9]/g) && str.match(/[^a-zA-Z\d]/g) && str.length >= 8){
              errorMsg.classList.remove('show');
            } else{
              errorMsg.classList.add('show');
            }

  })
}



const retypePassword = document.querySelector('input[name="retype-password"]');

if (  retypePassword  ){
  const container = retypePassword.closest('.c-form__inp-wrap');
  const errorMsg = container.querySelector('.miss-password');



  retypePassword.addEventListener( 'input', function(){
            if ( this.value !== newPassword.value ){
              
              errorMsg.classList.add('show');
            } else{
              errorMsg.classList.remove('show')
            }

  })
}

const radioAddresses = document.querySelectorAll('.cal-grid__radio');

if ( radioAddresses.length ){

  radioAddresses.forEach( radio => {
    radio.addEventListener('click', function(){
      if ( this.classList.contains('checked') ) return false; 
      else{
        document.querySelector('.cal-grid__radio.checked').classList.remove('checked');
        this.classList.add('checked');
      }

    })
  } )

}

/*
КОНЕЦ
Кабинет*/


const inputPlaceholders = document.querySelectorAll('.c-form__placeholder');

if ( inputPlaceholders.length ){
  inputPlaceholders.forEach( placeholder => {
    placeholder.addEventListener('click', function(){
      const container =  placeholder.closest( '.c-form__inp-wrap' );

      let inputText = container.querySelector('input[placeholder]');

      if ( inputText ){
        inputText.focus();
        
      } else {
        inputText = container.querySelector('textarea');
        
        if ( inputText ){
          
          inputText.focus();
        }
      }

    })
  } )
}


const selectTimeDeliveryNode = document.querySelector('.select-time');

if ( selectTimeDeliveryNode )  {
  const selectTimeDelivery = new Choices(selectTimeDeliveryNode, {
    searchEnabled: false,
    itemSelectText: '',
  });
}




  
  const selectCityNode = document.querySelector('.select-city');

  
  if ( selectCityNode ){
    const selectCity = new Choices(selectCityNode, {
      searchEnabled: false,
      itemSelectText: '',
    });
  }

  const selectStreetNode = document.querySelector('.select-street'); 

  if (selectStreetNode){
    const selectStreet = new Choices(selectStreetNode, {
      searchEnabled: false,
      itemSelectText: '',
    });
  }



const cabinetMobNavigation = document.querySelector('.cabinet-mob-navigation');
const cabinetNav = document.querySelector('.cabinet__nav');
const hideMobNavigation = document.querySelector('.cn-header__close');

if ( cabinetMobNavigation ) {
  cabinetMobNavigation.addEventListener('click', function(){
    cabinetNav.classList.add('show')
  })  
  hideMobNavigation.addEventListener('click', function(){
    cabinetNav.classList.remove('show')
  })  
}



const promoFormInput = document.querySelector('.form-promo__input');

if ( promoFormInput ){

  const cartBuyPanel = document.querySelector('.cart-buy-panel');
  const promoFormPlaceholder = document.querySelector('.form-promo__placeholder');
  const promoFormApllyBtn = document.querySelector('.form-promo__apply');
  const promoFormResetBtn = document.querySelector('.form-promo__reset');
      

  function promoFormFocused(){
    cartBuyPanel.classList.add('focused');
    promoFormInput.focus();
  }

  function  promoFormBlur(){
    cartBuyPanel.classList.remove('focused');
  }

  promoFormPlaceholder.addEventListener('click', promoFormFocused);

  promoFormInput.addEventListener('input', function(){
    if ( this.value.length ){
      cartBuyPanel.classList.add('no-empty');
    } else{
      cartBuyPanel.classList.remove('no-empty');
    }
  })

  promoFormApllyBtn.addEventListener('click', function(event){
    event.preventDefault();
    cartBuyPanel.classList.add('promo-apply');
    cartBuyPanel.classList.remove('no-empty');
  })


  promoFormResetBtn.addEventListener('click', function(event){
    event.preventDefault();
    promoFormInput.value = '';
    cartBuyPanel.classList.remove('promo-apply');
  })

  promoFormInput.addEventListener('focus', promoFormFocused);

  promoFormInput.addEventListener('blur', promoFormBlur);

}

const removeProductOfCartBtns = document.querySelectorAll('.round-remove-product');
if( removeProductOfCartBtns.length ){
  removeProductOfCartBtns.forEach( btn => {
    btn.addEventListener('click', function(){
      const mainContainer = this.closest('.product-list-group');
      this.closest('.cpl-product').remove();

      

      let products = mainContainer.querySelectorAll('.cpl-product');

      if ( !products.length ){
        mainContainer.remove();
      }

      if ( !document.querySelectorAll('.cpl-product').length ){
        document.querySelector('.main-cart-content').remove();
      }


      
    })
  } )
}


const cartProducts = document.querySelectorAll('.cpl-product');

if ( cartProducts.length ){


  const plusProductBtns = document.querySelectorAll('.cpl-product-count__btn.plus'); 
  const  minusProductBtns = document.querySelectorAll('.cpl-product-count__btn.minus'); 


 
  plusProductBtns.forEach( btn => {
    
    btn.addEventListener( 'click', function(){
      
      calcProductInCart( this, '.cpl-product', '.cpl-product-count__btn.plus', '.cpl-product-count__btn.minus',  '.cpl-product-count__qty', '.cpl-product-price__price', '.cpl-product-count__weight-group .cpl-product-count__qty', '+');
    });
    
  } ) 

  minusProductBtns.forEach( btn => {
    
    btn.addEventListener( 'click', function(){
      
      calcProductInCart( this, '.cpl-product', '.cpl-product-count__btn.plus', '.cpl-product-count__btn.minus',  '.cpl-product-count__qty', '.cpl-product-price__price', '.cpl-product-count__weight-group .cpl-product-count__qty', '-');
    });
    
  } ) 
}


function calcProductInCart(self, mainNodeSelector, incBtnSelector, decBtnSelector,  qtySelector, summPriceSelector, weightSelector, operation){
  
  if (self.hasAttribute('disabled')) return null;
  
  const product =  self.closest(mainNodeSelector);

  let qtyInCart = Number( product.getAttribute('data-in-cart') );
  let totalQty = Number( product.getAttribute('data-total') );
  let calcMethod =  Number( product.getAttribute('data-calcmethod') );
  let price =  Number( product.getAttribute('data-price') );
  let weight =  Number( product.getAttribute('data-weight') );

  const incBtn = product.querySelector(incBtnSelector);
  const decBtn =  product.querySelector(decBtnSelector);


  switch ( operation ){
    case '+':
      qtyInCart++;
      
      break;
    case '-': qtyInCart--;

  }

  if (qtyInCart > 1) {
    decBtn.removeAttribute('disabled');
  } else{
    decBtn.setAttribute('disabled', 'disabled');
  }

  if ( qtyInCart === totalQty ) incBtn.setAttribute('disabled', 'disabled');

  product.setAttribute('data-in-cart', qtyInCart);
  product.querySelector(qtySelector).innerHTML = qtyInCart;

  switch ( calcMethod ){
    case 1: 
      product.querySelector('.cpl-product-price__price').innerHTML =   (qtyInCart * price).toFixed(2); 
      break; 

    case 2: 
      product.querySelector(summPriceSelector).innerHTML =  (qtyInCart * weight * price).toFixed(2); 
      product.querySelector(weightSelector).innerHTML = (qtyInCart * weight).toFixed(2);            
    break; 

  }
}





/*Модальная форма Добро пожаловать */
let singInBtns = document.querySelectorAll('.sing-in-btn');
let optionsWelcomeModal = {
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
  
  afterClose: function(){

    const ewp = document.querySelector('.modal.enter-wp');

    if ( ewp ){
      document.querySelector('.modal.enter-wp').classList.remove('enter-wp');
    }

    
  }
  

}

const enterWithPassword = document.querySelector('.c-form__enter-with-password');
let welcomeModal;

enterWithPassword.addEventListener('click', function(){
  let modal = this.closest('.modal');
  modal.classList.add('enter-wp')  ;
})


singInBtns.forEach( btn => {
  btn.addEventListener( 'click', function(event){
    welcomeModal = new easyModal('.welcome-modal', optionsWelcomeModal);
  } )
} )
  
const welcomeForm = document.querySelector('.welcome-form');

welcomeForm.addEventListener('submit', function(event){
  event.preventDefault();

  
  let phoneInput = this.querySelector('input[name="phone"]');
  let data_body = 'phone=' +  phoneInput.value; 

  fetch("script-name.php", {
      method: "POST",
      body: data_body,
      headers:{"content-type": "application/x-www-form-urlencoded"} 
  })
  .then( (response) => {
      if (response.status !== 200) {
          return Promise.reject();
      }

      /*  
        Раскомментировать из catch удалить
        phoneInput.value = '';
        welcomeModal.closeModal();
      */
      return response.text()
  })
  .catch(() => {
    console.log('ошибка');


    phoneInput.value = '';
    welcomeModal.closeModal();

  });

})

const welcomeFormPassword = document.querySelector('.welcome-form-password');

welcomeFormPassword.addEventListener('submit', function(event){
  event.preventDefault();

  let loginInput = this.querySelector('input[name="login"]');
  let passwordInput = this.querySelector('input[name="password"]');
  let data_body = 'login=' +  loginInput.value + '&password=' +  passwordInput.value;

  fetch("script-name.php", {
      method: "POST",
      body: data_body,
      headers:{"content-type": "application/x-www-form-urlencoded"} 
  })
  .then( (response) => {
      if (response.status !== 200) {
          return Promise.reject();
      }

      /*  
        Раскомментировать из catch удалить
        loginInput.value = '';
        passwordInput.value = '';
        welcomeModal.closeModal();
      */
      return response.text()
  })
  .catch(() => {
    console.log('ошибка');


    loginInput.value = '';
    passwordInput.value = '';
    welcomeModal.closeModal();

  });

});



const enterWithPasswordBtn = document.querySelector('.c-form__enter-with-password')
enterWithPasswordBtn.addEventListener('click', function(event){
  event.preventDefault();
})
/* 
  Конец: 
  Модальная форма Добро пожаловать
*/



/*Форма голосования*/


const surveyForm = document.querySelector('.survey-form');
const surveyResults = document.querySelector('.survey-results')

if ( surveyForm ) {
  surveyForm.addEventListener( 'submit', function(event){
    event.preventDefault();

    let voice = this.querySelector('input[name="variants"]:checked');
    
    let data_body = "voice=" + voice.value; 
    fetch("script-name.php", {
        method: "POST",
        body: data_body,
        headers:{"content-type": "application/x-www-form-urlencoded"} 
    })
    .then( (response) => {
        if (response.status !== 200) {
            return Promise.reject();
        }
        /*
        this.classList.add('hide');  
        surveyResults.classList.remove('hide');*/
        return response.text()
    })
    .then(i => console.log(i))
    .catch(() => {
      
      console.log('ошибка');

      this.classList.add('hide');  
      surveyResults.classList.remove('hide');
    });
    

    
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


/*Вызов формы обратной связи*/


const feedbackForm = document.querySelector('.feedback-form');
let feedbackModal;



feedbackForm.addEventListener('submit', function(event){
  event.preventDefault();
  
  const feedbackType = this.querySelector('.select-feedback-type').value;
  const email = this.querySelector('input[name="email"]').value;
  const phone = this.querySelector('input[name="phone"]').value;
  const comment = this.querySelector('textarea').value;
  
  const contact = ( email ) ? email : phone;  

  const file = this.querySelector('input[type=file]').files[0];

  let fd = new FormData();
  fd.append('feedbacktype', feedbackType);
  fd.append('contact', contact);
  fd.append('comment', comment);
  fd.append('file', file);


  fetch("script-name.php", {
    method: "POST",
    body: fd,
    headers:{"content-type": "application/x-www-form-urlencoded"} 
})
.then( (response) => {
    if (response.status !== 200) {
        return Promise.reject();
    }
    /*
    this.querySelector('.select-feedback-type').value = '';
    this.querySelector('input[name="email"]').value = '';
    this.querySelector('input[name="phone"]').value = '';
    this.querySelector('textarea').value = '';
    this.querySelector('input[type=file]').value = '';
    feedbackModal.closeModal();
    */
    return response.text()
})

.catch(() => {console.log('ошибка')
    this.querySelector('.select-feedback-type').value = '';
    this.querySelector('input[name="email"]').value = '';
    this.querySelector('input[name="phone"]').value = '';
    this.querySelector('textarea').value = '';
    this.querySelector('input[type=file]').value = '';
    feedbackModal.closeModal();
});


})



const callFeedBackModalBtn = document.querySelector('.f-btn-feedback');

callFeedBackModalBtn.addEventListener('click', function(event){
  feedbackModal = new easyModal('.feedback-modal', options);
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




/*КЛИК по якорной ссылки*/ 

const anchorsLinks = document.querySelectorAll('.anc-link');

if ( anchorsLinks.length ){
  anchorsLinks.forEach( (link) => {
    link.onclick = function(e){
        e.preventDefault();
        let headerHeight = document.querySelector('.header').offsetHeight;
        
  
        
        
        let href = this.getAttribute('href').substring(1);
        
        const scrollTarget = document.getElementById(href);
        
        const topOffset = headerHeight;
        // const topOffset = 0; // если не нужен отступ сверху 
        const elementPosition = scrollTarget.getBoundingClientRect().top;
        const offsetPosition = elementPosition - topOffset;
  
        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
  })
}

let upBtn = document.querySelector('.to-up');

if (upBtn){
  document.addEventListener('scroll', function(){
    if ( window.pageYOffset > document.documentElement.clientHeight) {
      upBtn.classList.add('show')
      
    } else{
      upBtn.classList.remove('show')
      
    }
  })
  

  upBtn.onclick = function(){
    window.scrollTo(0, 0);
  }
}


