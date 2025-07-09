(function() {
  var __sections__ = {};
  (function() {
    for(var i = 0, s = document.getElementById('sections-script').getAttribute('data-sections').split(','); i < s.length; i++)
      __sections__[s[i]] = true;
      })();
      (function() {
  if (!__sections__["Lookbook-page"] && !window.DesignMode) return;
  try {
    
  var mobileSwiper = new Swiper('.mobile-section', {
    direction: "vertical",
    spaceBetween: 20,
    slidesPerView: 1,
    edgeSwipeDetection: true,
    // height: document.documentElement.clientHeight + " px",
    keyboard: {
      enabled: true
    },
    mousewheel: {
      invert: false
    }
  });


  //++++++++++++++++++++++++++++++++++++++++++++

  const mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    watchSlidesProgress: true,
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    speed: 300,
    mousewheel: true,
    coverflowEffect: {
      rotate: 30,
      slideShadows: true,
    },
  });
  var swiper = new Swiper('.product-swiper', {
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 3000,
    },
    speed: 300,
    spaceBetween: 10,
    grabCursor: true,
    mousewheel: true,
    freeMode: true,
  });

  document.addEventListener(
    'mouseenter',
    (event) => {
      const el = event.target;
      if (el && el.matches && el.matches('.swiper-container')) {
        // console.log('mouseenter');
        // console.log('autoplay running', swiper.autoplay.running);
        el.swiper.autoplay.stop();
        el.classList.add('swiper-paused');

        const activeNavItem = el.querySelector('.swiper-pagination-bullet-active');
        activeNavItem.style.animationPlayState = 'paused';
      }
    },
    true
  );

  document.addEventListener(
    'mouseleave',
    (event) => {
      // console.log('mouseleave', swiper.activeIndex, swiper.slides[swiper.activeIndex].progress);
      // console.log('autoplay running', swiper.autoplay.running);
      const el = event.target;
      if (el && el.matches && el.matches('.swiper-container')) {
        el.swiper.autoplay.start();
        el.classList.remove('swiper-paused');

        const activeNavItem = el.querySelector('.swiper-pagination-bullet-active');

        activeNavItem.classList.remove('swiper-pagination-bullet-active');
        // activeNavItem.style.animation = 'none';

        setTimeout(() => {
          activeNavItem.classList.add('swiper-pagination-bullet-active');
          // activeNavItem.style.animation = '';
        }, 10);
      }
    },
    true
  );

  } catch(e) { console.error(e); }
})();

(function() {
  if (!__sections__["mobile-fixed-bottom-nav"] && !window.DesignMode) return;
  try {
    
  var navItems = document.querySelectorAll('.mobile-bottom-nav__item');
  navItems.forEach(function (e, i) {
    e.addEventListener('click', function (e) {
      navItems.forEach(function (e2, i2) {
        e2.classList.remove('mobile-bottom-nav__item--active');
      });
      this.classList.add('mobile-bottom-nav__item--active');
    });
  });

  } catch(e) { console.error(e); }
})();

(function() {
  if (!__sections__["store-locator"] && !window.DesignMode) return;
  try {
    
  
  
  
  
  
  
  
  $(document).ready(function () {
    // Function to show the target div and hide the rest
    function showTargetDiv(target) {
      $('.targetDiv').fadeOut('fast');
      $(`.targetDiv[data-target="${target}"]`).fadeIn('fast');
    }

    // Click event for each link with class "showSingle"
    $('.showSingle').on('click', function () {
      var target = $(this).attr('target');
      showTargetDiv(target);

      // Add active class to the clicked link and remove active class from others
      $('.showSingle').removeClass('active');
      $(this).addClass('active');
    });

    // Click event for the "Show All" link
    $('#showall').on('click', function () {
      $('.targetDiv').fadeIn('fast');

      // Add active class to the "Show All" link and remove active class from others
      $('.showSingle').removeClass('active');
      $(this).addClass('active');
    });

    // Get the number of unique data-target values and count for all
    var uniqueTargets = {};
    var allCount = 0;

    $('.targetDiv').each(function () {
      var targetValue = $(this).attr('data-target');
      if (!uniqueTargets[targetValue]) {
        uniqueTargets[targetValue] = 1;
      } else {
        uniqueTargets[targetValue]++;
      }
      allCount++;
      
    });

    // Add the count below the menu texts using separate span tags
    Object.keys(uniqueTargets).forEach(function (target) {
      var targetCount = uniqueTargets[target];
      $(`.showSingle[target="${target}"]>.store-name-count`).append(`<p class="count">${targetCount}</p>`);
    });

    // Add the count for all targetDiv elements
    $('#showall').append(`<p class="all-count">${allCount}</p>`);
    console.log(allCount);
  });










  } catch(e) { console.error(e); }
})();
      })();
