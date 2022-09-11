'use strict';

/** Описание опций
 * (number) zIndex - z-index основного контейнера (modal-fog). Значение по умолчанию z-index: 999 (Описано в css);
 * (string) background - цвет тумана. Любое добустимое css значение цвета. Значение по умолчанию background: rgba(7, 12, 19, 0.5) (Описано в css);
 * (string) displayModalContainer - значение css свойства display контейнера, в котором находятся модальные окна. Значение по умолчанию display: flex (задается скриптом).  Можно указать любое допустимое css значение: flex, grid, block и т.д.
 * (string) displayModal - значение css свойства display модального окна.  Значение по умолчанию display: block(задается скриптом). Можно указать любое допустимое css значение: flex, grid, block и т.д.
 * (array['string', 'string']) closeSelectors - список селекторов, по клику на котором, закрывается модальное окно 
 * (boolean) closeModalOnFogClick - опция определяет будет ли закрываться модальное окно по клику на пустой области. По-умолчанию - true (задается скриптом). 
 * (string) showModalAnimation - анимация с которой появляется модальное окно. Значения по умолчанию нет. Полный список анимаций ниже.
 * (string) showModalDuration - продолжительность анимации при открытии модального окна. Значение по умолчанию 500ms (Описано в css); Можно указать любое допустимое css значние: 700ms, 1.5s и т.д. 
 * (string) closeModalAnimation - анимация с которой скрывается модальное окно. Значения по умолчанию fadeOut (задается скриптом). Полный список анимаций ниже.
 * (string) closeModalDuration - продолжительность анимации скрытия модального окна. Значение по умолчанию 500ms (Описано в css); Можно указать любое допустимое css значние: 700ms, 1.5s и т.д. 
 * (string) showFogAnimation - анимация с которой появляется главный контейнер модального окна  - modal-fog. Значения по умолчанию нет. Полный список анимаций ниже.
 * (string) showFogDuration - продолжительность анимации при открытии главного контейнера модального окна  - modal-fog. Значение по умолчанию 500ms (Описано в css); Можно указать любое допустимое css значние: 700ms, 1.5s и т.д. 
 * (string) closeFogAnimation - анимация закрытия главного контейнера модального окна  - modal-fog. Значения по умолчанию fadeOut (задается скриптом). Полный список анимаций ниже.
 * (string) closeModalDuration - продолжительность анимации скрытия главного контейнера модального окна  - modal-fog. Значение по умолчанию 500ms (Описано в css); Можно указать любое допустимое css значние: 700ms, 1.5s и т.д. 
 * (boolean) documentCanScroll - может ли прокручиваться основная страница при открытом модальном окне. Значнеие по умолчанию false
 * (string) closeMode : modal-first | along - опция  порядка закрытия компонентов модального окна. modal-first - Сначала закрывается модальное окно, затем туман. along - закрываются параллельно. Значение по умолчанию along
 * Хук beforeAppendModal - вызывается до добавления модального окна в туман
 * Хук afterShow - вызывается после показа модального окна
 * Хук beforeClose - вызывается до закрытия модального окна
 * Хук afterClose - вызывается после закрытия модального окна и тумана
 * 
 * 
 * Список анимаций:
 * - fadeIn 
 * - fadeInLeft
 * - fadeInRight
 * - fadeInBottom
 * - fadeInTop
 * - showInLeft
 * - showInRight
 * - showInTop
 * - showInBottom
 * 
 *  - fadeOut
 *  - fadeOutTop
 *  - fadeOutBottom
 *  - fadeOutLeft
 *  - fadeOutRight
 *  - hideToLeft
 *  - hideToRight
 *  - hideToTop
 *  - hideToBottom
 */

class easyModal extends EventTarget{
    constructor (modalSelector, _options = {}){
        super();

        
        this.closeNow = false;

        let self = this;
        this.modalSelector = modalSelector;

        this.documentYPosition = window.pageYOffset;

        this.options = _options;

        //Проверяем стоит ли запрет на скролл колесиком
        if  ( this.options.documentCanScroll == false ) {
            document.body.classList.add('hide-scroll');           
        }
        this.modalFog =  this.createFog();
        this.modal = this.getModal(modalSelector);


        this.modalFlag = this.createFlag();
        this.modalContainer  = this.createModalContainer();



        this.modal.before( this.modalFlag );

        this.closeSelectors = [];
        
        
        
        if ( this.options.closeModalOnFogClick !== false){
            this.modalContainer.setAttribute('data-closing', "");
        }
        //Проверяем указаны ли селекторы, при клике на которые будет закрываться модальное окно
        if ( this.options.closeSelectors && this.options.closeSelectors.length ){
            
            this.options.closeSelectors.forEach( (closeSelector) => {

                let closingNodes = this.modal.querySelectorAll(closeSelector);

                if ( closingNodes ){
                    closingNodes.forEach( closingNode => {
                        closingNode.onclick = () => {
                            this.closeModal();
                        }

                        
                    } )
                }

            })  
        }

        if ( 'showFogDuration' in this.options ){
            this.modalFog.style.animationDuration = this.options.showFogDuration;
        }

        if ( 'showFogAnimation' in this.options ){
            this.modalFog.classList.add(this.options.showFogAnimation);
        } else {
            this.modalFog.classList.add('fadeIn');
        }


        
        if ( 'beforeClose' in this.options ){
            this.beforeClose = this.options.beforeClose;
        } else {
            this.beforeClose  = null;
        }

        if ( 'afterClose' in this.options ){
            this.afterClose = this.options.afterClose;
        } else {
            this.afterClose  = null;
        }
        
        

        
        if ('beforeAppendModal' in this.options){
            this.options.beforeAppendModal();
        }
        
        
        
        this.testYOverflow();
        this.testXOverflow();
       


        this.modalContainer.append(this.modal);

        this.modalFog.append(this.modalContainer);

        
        
    

        document.body.append(this.modalFog);

        
        if ('afterShow' in this.options){
            this.options.afterShow();
        } else{
            
        }

        //Добавляем обработчик на изменения ширины окна, который будет контроллировать переполнение области модальных окон

        this.spyWindowResize = () => {
            
            
            this.testXOverflow();
            this.testYOverflow();
        }


        window.addEventListener('resize', this.spyWindowResize);

        

        this.modalFog.onclick = function(event){

            if (  self.targetCanClose( event.target ) ){

                self.closeModal();
              
            }

            
        }
        

    }

    //Создаем контейнер для модального окна
    createFog(){
        let modalFog = document.createElement('modal-fog');
        
        
        if ( 'background' in this.options ) {
            modalFog.style.background = this.options.background;
        } 

        if ( 'zIndex' in this.options ) {
            modalFog.style.zIndex = this.options.zIndex;
        } 

        modalFog.style.display = 'block';
        return modalFog;
    }

    createModalContainer(){
        let modalContainer = document.createElement('modal-container');

        if ( 'displayModalContainer' in this.options ) {
            modalContainer.style.display = this.options.displayModalContainer;
        } else{
            modalContainer.style.display = 'flex';
        }

        return modalContainer;
    }

    //Находит модальное окно добавляет опции , возращает ссылку
    getModal(modalSelector){
        let modal = document.querySelector(modalSelector);

        if ( 'displayModal' in this.options ) {
            modal.style.display = this.options.displayModal;
        } else {
            modal.style.display = 'block';
        }

        if ( 'showModalAnimation' in this.options ) {
            modal.classList.add(this.options.showModalAnimation);
        }


        if ( 'showModalDuration' in this.options ) {
            modal.style.animationDuration = this.options.showModalDuration;
        }
        return modal;
    }

    //Создаем флаг для пометки места где стояло всплывающее модальное окно в документе
    createFlag(){
        return document.createElement('modal-flag');
    }
    //Закрывает модальное окно
    closeModal(){

        if ( !this.closeNow) {
            if ( this.beforeClose ) {
                this.beforeClose();
            }
            this.closeNow = true;
            switch ( this.options.closeMode ){
                case 'modal-first':
                    this.closeModalFirst();
                break;

                case 'along': 
                    this.closeAlong();
                break;

                default: this.closeAlong();
            }

            let fogs = document.querySelectorAll('modal-fog');

            if (fogs.length < 2){
                document.body.classList.remove('hide-scroll');
            }
            

        }
    }
    /**
     * Ряд операций при закрытиии:
     * 1. Удаляем modal-fog
     * 2. Очищаем style модального окна
     * 3. Удаляем классы добавленные модальному окну
     * 4. Возращаем модальное окно на прежнее место
     * 5. удаляем флаг
    */ 
    closeOperations(){
        this.modalFog.remove();
        this.modal.removeAttribute('style');
        this.clearModalClasses(this.options);
        window.removeEventListener('resize', this.spyWindowResize);
        this.modalFlag.after(this.modal);
        this.modalFlag.remove();

        if (this.afterClose){
            this.afterClose();
        }
    }
    //Провереят есть ли в цели клика класс из options.closeClasses
    targetCanClose( eTarget ){
        if (eTarget.hasAttribute('data-closing')){
            return true
        }

        return false;
    }
    //Очищает модальное окно от ранее добавленных классов
    clearModalClasses(){
        if ( 'showModalAnimation' in this.options ) {
            this.modal.classList.remove(this.options.showModalAnimation);
        }

        if ( 'closeModalAnimation' in this.options ) {
            this.modal.classList.remove(this.options.closeModalAnimation);
        }
    }

    //Устанавливаем настройки анимации закрытия модального окна
    setCloseOptionsAnimation(){
        this.modal.style.animationPlayState = 'paused';
        if ('closeModalDuration' in this.options ){
            this.modal.style.animationDuration  = this.options.closeModalDuration;
        } else{
            this.modal.style.animationDuration = '300ms';
        }   

        if ('closeModalAnimation' in this.options ){
            this.modal.classList.add(this.options.closeModalAnimation);    
        } else{
            this.modal.classList.add('fadeOut');
        }

        this.modalFog.style.animationPlayState = 'paused';
        if ('closeFogDuration' in this.options ){
            this.modalFog.style.animationDuration = this.options.closeFogDuration;
        } else{
            this.modalFog.style.animationDuration = '300ms';
        }   

        if ('closeFogAnimation' in this.options ){
            this.modalFog.classList.add(this.options.closeFogAnimation);    
        } else{
            this.modalFog.classList.add('fadeOut');
        }
    }
    //Запуск анимации
    startAnimation( node ){
        node.style.animationPlayState = 'running';
    }

    //Режим закрытия модального окна, при котором сначала исчезает окно, затем туман
    closeModalFirst(){
        //Устанавливаем опции анимации закрытия модального окна и тумана
        this.setCloseOptionsAnimation();
        this.startAnimation( this.modal );

        const onModalHide = (event) =>{
            event.stopPropagation();
            this.startAnimation( this.modalFog );
            this.modal.removeEventListener('animationend', onModalHide);
        }


        this.modal.addEventListener('animationend', onModalHide);

        const onFogHide = (event) => {
            event.stopPropagation();
            this.modalFog.removeEventListener('animationend', onFogHide);
            this.closeOperations();
        }

        this.modalFog.addEventListener('animationend', onFogHide);
    }
    //Режим закрытия модального окна, при туман и окно закрываеются одновременно
    closeAlong(){
        let closedObject = 0;
        this.setCloseOptionsAnimation();
        
        this.startAnimation( this.modal );
        this.startAnimation( this.modalFog );

        const onHideModal = (event) =>{
            event.stopPropagation();
            this.modal.removeEventListener('animationend', onHideModal);
            closedObject++;

            if ( closedObject >= 2 ){ 
                this.closeOperations();
            }
        }

        const onHideFog = (event) => {    
            event.stopPropagation();
            this.modalFog.removeEventListener('animationend', onHideFog);
            closedObject++;

            if ( closedObject >= 2 ){ 
                this.closeOperations();
            }
        }         
        this.modal.addEventListener('animationend', onHideModal)
        this.modalFog.addEventListener('animationend', onHideFog)
    }

    testXOverflow(){
        
        if ( this.modal.offsetWidth >= document.documentElement.clientWidth ){
            this.modalContainer.style.width = (this.modal.offsetWidth + 0) + 'px'; 
        } else{
            this.modalContainer.style.width = ''; 
            
        }

        if ( (this.modal.offsetHeight >= document.documentElement.clientHeight ) || ( this.modal.offsetWidth >= document.documentElement.clientWidth ) ){
            this.modalFog.style.overflowX = 'none';
            
            
        } else {
            
            this.modalFog.style.overflowX = '';
            this.modalFog.style.overflowX = 'clip';
        }
    }

    testYOverflow(){
        if ( this.modal.offsetHeight >= document.documentElement.clientHeight ){
            this.modalContainer.style.height = (this.modal.offsetHeight + 0) + 'px'; 

            
            this.modalContainer.classList.add('container-flex-start')    ;        
        } else{
            this.modalContainer.style.height = ''; 
            
        }

        if ( (this.modal.offsetHeight >= document.documentElement.clientHeight ) || ( this.modal.offsetWidth >= document.documentElement.clientWidth ) ){
            this.modalFog.style.overflowY = 'auto';
            this.modalFog.style.overflowX = 'clip';
        } else {
            this.modalFog.style.overflowY = '';
            this.modalFog.style.overflowX = '';
        }

        
    }

    
    
}