//overlay menu


  
    const imgWrapper = document.querySelector(".img-wrapper");
    const allImages = [...imgWrapper.querySelectorAll("img")];
    
    let imgNum = 0;
    // setting threshold to make a gab between images
    const threshold = 125;
    
    let lastPosX, lastPosY, curPosX, curPosY;
    let isCounting = true;
    let startFromX, startFromY;
    
    // document.body.addEventListener("mousemove", function(e) {
    //   const [x, y] = [e.x, e.y];
    
    //   const hasCrossedThresHold = // Boolean value wheather the mouse has crossed the theshold or not
    //     x > startFromX + threshold ||
    //     x < startFromX - threshold ||
    //     y > startFromY + threshold ||
    //     y < startFromY - threshold;
    
    //   if (hasCrossedThresHold) {
    //     // if it has calling showNextImage
    //     showNextImage(e);
    //     isCounting = true; // changing the isCounting to true
    //   }
    
    //   if (isCounting) {
    //     // So that we can record the another point here again !!
    //     startFromX = x;
    //     startFromY = y;
    //   }
    
    //   isCounting = false; // Changing the isCounting to false to not let recording the startFromX and
    //   //startFromY points on every mouse-move
    // });
    // document.body.addEventListener("click", function(e) {
    //   const [x, y] = [e.x, e.y];
    
    //   const hasCrossedThresHold = // Boolean value wheather the mouse has crossed the theshold or not
    //     x > startFromX + threshold ||
    //     x < startFromX - threshold ||
    //     y > startFromY + threshold ||
    //     y < startFromY - threshold;
    
    //   if (hasCrossedThresHold) {
    //     // if it has calling showNextImage
    //     showNextImage(e);
    //     isCounting = true; // changing the isCounting to true
    //   }
    
    //   if (isCounting) {
    //     // So that we can record the another point here again !!
    //     startFromX = x;
    //     startFromY = y;
    //   }
    
    //   isCounting = false; // Changing the isCounting to false to not let recording the startFromX and
    //   //startFromY points on every mouse-move
    // });

    


      var w = window.innerWidth / 20;
      var h = window.innerHeight / 20;
      
      let wid = window.innerWidth;
      let hei = window.innerHeight;

      if(wid < 800){
        wid = wid - (w*6);
   
      }
      

      var startWidth = 0;
      var startHeight = 0;

      var isFixedWidth = false;
      var isFixedHeight = false;
      var isHeightReverse =  false;

      var prevConfig = 1;
    
      const interval = setInterval(function() {
            startWidth = !isFixedWidth ? startWidth + w : startWidth;
            startHeight = !isFixedHeight ? (isHeightReverse ? startHeight - h : startHeight + h) : startHeight;
            if(startWidth >= (wid-(w*4)) || startHeight >= (hei-(h*3))){
            //  clearInterval(interval);
    
              if(prevConfig == 1){
                startWidth = 0;
                startHeight = window.innerHeight - (h*5);
                isFixedWidth = false;
                isFixedHeight = true;
                isHeightReverse = false;
                prevConfig = 2;
              }
               else if(prevConfig == 2){
                startWidth = 0;
                startHeight = window.innerHeight - (h*3);
                isFixedWidth = false;
                isFixedHeight = false;
                isHeightReverse = true;
                prevConfig = 3

              }else if(prevConfig == 3){
                startWidth = 0;
                startHeight = 0;
                isFixedWidth = false;
                isFixedHeight = false;
                isHeightReverse = false;
                prevConfig = 4;

              }else if(prevConfig == 4){
                startWidth = 0;
                startHeight = window.innerHeight - (h*3);
                isFixedWidth = false;
                isFixedHeight = false;
                isHeightReverse = true;
                prevConfig = 1;
              }
            }else{
              showNextImage(startWidth, startHeight);
            }
        }, 500);

    
    function showNextImage(x, y) {
      const movingImage = allImages[imgNum];
      [curPosX, curPosY] = [x, y];
    
      movingImage.removeAttribute = "style";
    
      // Setting the position of image
      movingImage.style.left = `${curPosX}px`;
      movingImage.style.top = `${curPosY}px`;
    
      // making the image visibile here
      movingImage.classList.add("visible");
    
      // calculating a moving distance
      const movingDistanceX = ((curPosX - lastPosX || 0) * 80) / 100;
      const movingDistanceY = ((curPosY - lastPosY || 0) * 80) / 100;
    
      setTimeout(function() {
        // animating image towards the current position of mouse
        movingImage.style.left = `${lastPosX + movingDistanceX}px`;
        movingImage.style.top = `${lastPosY + movingDistanceY}px`;
    
        setTimeout(function() {
          movingImage.classList.add("grow-scale"); // hiding image after 800ms
    
          setTimeout(function() {
            movingImage.classList.remove("visible", "grow-scale");
            movingImage.style = "";
          }, 600);
        }, 800);
      }, 10);
    
      imgNum++; // incresing num to show different image  each time
    
      if (imgNum === allImages.length - 1) {
        imgNum = 0;
      }
    
      // Setting the last position values of image
      lastPosX = curPosX;
      lastPosY = curPosY;
    }
    

    const section = document.querySelector("img");
let currentPixel = window.pageYOffset;

const looper = function () {
  
  const newPixel = window.pageYOffset;
  const diff = newPixel - currentPixel;
  
  const top = 13;
  const intensity = 0.13;
  
  const speed = top * ((2 / (1 + Math.exp(-1 * intensity * diff))) - 1);

  
//  section.style.transform = "skewY(" + speed + "deg)";
  //TweenMax.to("img", 1, {skewY: speed, ease: Expo.easeOut });
  
  
  currentPixel = newPixel;
  
  requestAnimationFrame(looper);
  
}

looper()


//accordion icons
  /* $(function () {
	function toggleOpen(e) {
		$(e.target)
			.prev('.panel-heading')
			.find(".more-less")
			.text("fas fa-plus-circle");
	}
	function toggleClose(e) {
		$(e.target)
			.prev('.panel-heading')
			.find(".more-less")
			.text("fas fa-minus-circle");
	}
	$('.panel-group').on('hidden.bs.collapse', toggleClose);
	$('.panel-group').on('shown.bs.collapse', toggleOpen);
});
*/

gsap.registerPlugin(ScrollTrigger);

let revealContainers = document.querySelectorAll(".reveal");

ScrollTrigger.matchMedia({
  "(min-width:800px)":function(){
    revealContainers.forEach((container) => {
      let image = container.querySelector("img");
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start:"+=150 center",
          end:"+=50",
          toggleActions: "play none none reverse",
        }
      });
    
      tl.set(container, { autoAlpha: 1 });
      tl.from(container, .5, {
        xPercent: -100,
        ease: Power2.out
      });
      tl.from(image, 1.5, {
        xPercent: 100,
        scale: 1.3,
        delay: 4,
        ease: Power2.out
      });
     
    });
  }
})

/*let viewHeight = window.innerHeight;
let viewWidth = window.innerWidth;

let textContainers = document.querySelectorAll('.heading-container');

textContainers.forEach((element, index) => {
  let top = element.getBoundingClientRect().top;
  let start = viewHeight - top;

  let firstText = element.querySelector('.heading-container h1');
 

  gsap.from(firstText, {
    scrollTrigger: {
      trigger: element,
   
pin:true,
pinSpacing: false,
    scrub: 1,
   

    },
    x: '-50vw',
    transformOrigin: "center center", 
    ease: "none"
  });
 
});

gsap.from(".reveal-text", {
  yPercent: 100,
  top:200,
  ease: "none",

  scrollTrigger: {
    trigger: ".features div",
    end: "bottom center",
    scrub: 1,
    pin:".features div"
  }, 
});*/

$("#login-button").click(function(event){
  event.preventDefault();

$('form').fadeOut(500);
$('.wrapper').addClass('form-success');
});
//******************************************************************************* */
//form 
window.addEventListener("DOMContentLoaded", function() {

  // get the form elements defined in your form HTML above
  
  var form = document.getElementById("my-form");
  //var button = document.getElementById("my-form-button");
  var status = document.getElementById("status");

  // Success and Error functions for after the form is submitted
  
  function success() {
    form.reset();
  //  button.style = "display: none ";
    $('#my-form').fadeOut(500);
    $('#status').addClass('display-status');
  }

  function error() {
    status.innerHTML = "Oops! There was a problem.";
  }

  // handle the form submission event

  form.addEventListener("submit", function(ev) {
    ev.preventDefault();
    var data = new FormData(form);
    ajax(form.method, form.action, data, success, error);
  });
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}

//slide in**************************************//
//slide in**************************************//
let viewHeight = window.innerHeight;
let viewWidth = window.innerWidth;

let textContainers = document.querySelectorAll('.heading-container');

textContainers.forEach((element, index) => {
  let top = element.getBoundingClientRect().top;
  let start = viewHeight - top;

  let firstText = element.querySelector('.heading-container h1');
  
  gsap.from(firstText, {
    scrollTrigger: {
      trigger: element,
      scrub: true,
      start: "+=300 bottom",
      end: "+=500",
      toggleActions: "play none none reverse",
      pin:"heading-container",
      ease: "circ",
    },
    x: '-100vw',
    transformOrigin: "center center", 
    ease: "none"
  });
  
});

ScrollTrigger.matchMedia({
  "(max-width:799px)":function(){
    const headings = gsap.utils.toArray('.heading-container h1');

headings.forEach((heading, i) => {
  const anim = gsap.fromTo(heading, {autoAlpha: 0, x: 200}, {duration: 1, autoAlpha: 1, x: 0});
  ScrollTrigger.create({
    trigger: heading,

    animation: anim,
    toggleActions: 'play none none none',
    once: true,
  });
});
  }
})


ScrollTrigger.matchMedia({
  "(max-width:799px)":function(){
    const headings = gsap.utils.toArray('.reveal');

headings.forEach((heading, i) => {
  const anim = gsap.fromTo(heading, {autoAlpha: 0, x: 200}, {duration: 1, autoAlpha: 1, x: 0});
  ScrollTrigger.create({
    trigger: heading,

    animation: anim,
    toggleActions: 'play none none none',
    once: true,
  });
});
  }
})




ScrollTrigger.matchMedia({
  "(max-width:799px)":function(){
    gsap.to(".grid-item", 2, {
      scale: 1,
    
      opacity: 0,
      yoyo: true,
      ease: "power1.inOut",
      delay: 1.5,
      stagger: {
        amount: 2,
        grid: "auto",
        from: "center"
      }
    });
  }
})








// // for presentation
// let tl = gsap.timeline({
//   repeat: -1
// });

// tl.set({}, {}, 0.6);
// tl.to(window, {
//   duration: 4,
//   scrollTo: {
//     y:"max"
//   },
//   ease: Power2.easeInOut
// });
// tl.to(window, {
//   delay: 0.6,
//   duration: 4,
//   scrollTo: 0,
//   ease: Power2.easeInOut
// });




 /*gsap.from('.features p', {
  
  scrollTrigger: {
    trigger: '.features article',
    start: 'top top',
    scrub: true,
  },
  yPercent:20,
  transformOrigin: "center center", 
  ease: "none"
  

})

*/



// window.addEventListener('DOMContentLoaded', () => {

// 	const circle = document.querySelector('.circle-id');
// 	const buttons = document.querySelectorAll('.store-wrapper a');


// 	document.addEventListener('mousemove', (e) => {
	
// 		circle.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
// 	});
// buttons.forEach(function(button){
//   button.addEventListener('mouseenter', () => {
// 		circle.style.opacity = 1;
// 	});

// 	button.addEventListener('mouseleave', () => {
// 		circle.style.opacity = 0;
// 	});
// })
// });



gsap.registerPlugin(ScrollTrigger);

let first_count = 20,
  first_offset = 200;

  ScrollTrigger.matchMedia({

"(min-width:800px)":function(){

  gsap.to(".app-img", {
    backgroundPosition: -first_offset * first_count * 2 + "px 100%",
    ease: "steps(" + first_count + ")",
    scrollTrigger: {
      trigger: ".app-intro",
      start: "center center",
      end:"+=250",
      pin: true,
      scrub: true,
      markers: false
    },
    yPercent: -90,
    
  });


} //end

  })
///////////////////////mobile animation///////////////////////////




function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

var slider = document.getElementById("demo");
var onScroll = debounce(function(direction) {
  //console.log(direction);
  if (direction == false) {
  	$('.carousel-control-next').click();
  } else {
  	$('.carousel-control-prev').click();
  }
}, 100, true);

slider.addEventListener("wheel", function(e) {
  e.preventDefault();
  var delta;
  if (event.wheelDelta) {
    delta = event.wheelDelta;
  } else {
    delta = -1 * event.deltaY;
  }

  onScroll(delta >= 0);
});


//counter{
  
  (function ($) {
    $.fn.countTo = function (options) {
      options = options || {};
      
      return $(this).each(function () {
        // set options for current element
        var settings = $.extend({}, $.fn.countTo.defaults, {
          from:            $(this).data('from'),
          to:              $(this).data('to'),
          speed:           $(this).data('speed'),
          refreshInterval: $(this).data('refresh-interval'),
          decimals:        $(this).data('decimals')
        }, options);
        
        // how many times to update the value, and how much to increment the value on each update
        var loops = Math.ceil(settings.speed / settings.refreshInterval),
          increment = (settings.to - settings.from) / loops;
        
        // references & variables that will change with each update
        var self = this,
          $self = $(this),
          loopCount = 0,
          value = settings.from,
          data = $self.data('countTo') || {};
        
        $self.data('countTo', data);
        
        // if an existing interval can be found, clear it first
        if (data.interval) {
          clearInterval(data.interval);
        }
        data.interval = setInterval(updateTimer, settings.refreshInterval);
        
        // initialize the element with the starting value
        render(value);
        
        function updateTimer() {
          value += increment;
          loopCount++;
          
          render(value);
          
          if (typeof(settings.onUpdate) == 'function') {
            settings.onUpdate.call(self, value);
          }
          
          if (loopCount >= loops) {
            // remove the interval
            $self.removeData('countTo');
            clearInterval(data.interval);
            value = settings.to;
            
            if (typeof(settings.onComplete) == 'function') {
              settings.onComplete.call(self, value);
            }
          }
        }
        
        function render(value) {
          var formattedValue = settings.formatter.call(self, value, settings);
          $self.html(formattedValue);
        }
      });
    };
    
    $.fn.countTo.defaults = {
      from: 0,               // the number the element should start at
      to: 0,                 // the number the element should end at
      speed: 1000,           // how long it should take to count between the target numbers
      refreshInterval: 100,  // how often the element should be updated
      decimals: 0,           // the number of decimal places to show
      formatter: formatter,  // handler for formatting the value before rendering
      onUpdate: null,        // callback method for every time the element is updated
      onComplete: null       // callback method for when the element finishes updating
    };
    
    function formatter(value, settings) {
      return value.toFixed(settings.decimals);
    }
  }(jQuery));
  
 





  $(window).scroll(function() {
    var hT = $('.stats').offset().top,
        hH = $('.stats').outerHeight(),
        wH = $(window).height(),
        wS = $(this).scrollTop();
    if (wS > (hT > wS)
  ){
      jQuery(function ($) {
        // custom formatting example
        $('.count-number').data('countToOptions', {
        formatter: function (value, options) {
          return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }
        });
        
        // start all the timers
        $('.timer').each(count);  
        
        function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
        }
      });
    } 
 });


 $(document).ready(function(){
  $(".collapse.show").each(function(){
    $(this).prev(".panel-heading").find(".more-less").addClass("fa-minus").removeClass("fa-plus");
  });
  $(".collapse").on('.show.bs.collapse', function(){
    $(this).prev(".panel-heading").find(".more-less").removeClass("fa-plus").addClass("fa-minus");
  }).on('hide.bs.collapse', function(){
    $(this).prev(".panel-heading").find(".more-less").removeClass("fa-minus").addClass("fa-plus");
  });
});