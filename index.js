const wrapper = document.querySelector('.wrapper');

const pageSliderOptions = {
   wrapperClass: "page__wrapper",
   slideClass: "page__screen",
   direction: 'vertical',
   slidesPerView: 'auto',
   parallax: true,

   pagination: {
      el: '.page__pagination',
      type: 'bullets',
      clickable: true,
      bulletClass: "page__bullet",
      bulletActiveClass: "page__bullet_active"
   },

   scrollbar: {
      el: '.page__scroll',
      dragClass: 'page__drag-scroll'
   },

   keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true
   },

   mousewheel:{
      sensitivity: 1
   },
   init: false,

   //отключение функционала, если слайдов меньше, чем нужно
   watchOverflow: true,

   speed: 800,

   //обновить слайдер,
   //при изменени элементов слайдера
   observer: true,

   //обновить слайдер,
   //при изменени родительских элементов слайдера
   observeParents: true,

   //обновить слайдер,
   //при изменени дочерних элементов слайдера
   observeSlideChildren: true,

   on: {
      init: function(){
         menuSlider()
         setScrollType()
         wrapper.classList.add('_loaded')
      },
      slideChange: function(){
         removeActiveClassMenuLink();
         menuLinks[pageSlider.realIndex].classList.add('_active');

      },
      resize: function(){
         console.log(pageSlider.params)

         setScrollType()

         
      }
   },

      
   observer: true,
   observeParents: true,
   observeSlideChildren: true,


}

let pageSlider = new Swiper('.page', pageSliderOptions)


// Создадим массив ссылок
const menuLinks = document.querySelectorAll('.menu__link')

function menuSlider(){
   if(!!menuLinks.length){
      menuLinks[pageSlider.realIndex].classList.add('_active')


      menuLinks.forEach((link, idx) => {
         
         link.addEventListener('click', function(e){
            removeActiveClassMenuLink()

            pageSlider.slideTo(idx, 800)

            this.classList.add('_active')

            e.preventDefault()


         })
      })
   }
}


function removeActiveClassMenuLink() {
   const menuLinkActive = document.querySelector('.menu__link._active');
   if(menuLinkActive){
      menuLinkActive.classList.remove('_active')
   }
}

// Проверяем количества контента в экранах
function setScrollType(){

   if(wrapper.classList.contains('_free')){

      wrapper.classList.remove('_free');

      pageSlider.params.freeMode.enabled = false

   }


   for (let idx = 0; idx < pageSlider.slides.length; idx++) {
      const element = pageSlider.slides[idx];

      const pageSlideContent = element.querySelector('.screen__content');

      if(pageSlideContent){
         const pageSlideContentHeight = pageSlideContent.offsetHeight;
         if(pageSlideContentHeight > window.innerHeight){
            wrapper.classList.add('_free');
            
            // isMoreContentVieport = false
            pageSlider.params.freeMode.enabled = true

            break;
         }
      }
      
   }
}




document.addEventListener('DOMContentLoaded', () => pageSlider.init())