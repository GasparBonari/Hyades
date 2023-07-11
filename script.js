'use strict';

const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal'); //querySelectorAll because we have two buttons returning same thing
const btnScrollTo = document.querySelector(".btn--scroll-to");
const btnNextStep = document.querySelector(".nextStep");

const fName = document.querySelector("#fName");
const lName = document.querySelector("#lName");
const email = document.querySelector("#email");
const section1 = document.querySelector("#section--1");
const header = document.querySelector(".header");
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');



// MODAL

let openModal = function () 
{
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

let closeModal = function () 
{
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// loop over both buttons, returning the one we clicked

for(let i of btnsOpenModal)
{
  i.addEventListener("click", openModal);
}

document.addEventListener('keydown', function (e) 
{
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) 
  {
    closeModal();
  }
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);



// CREATING COOKIE MESSAGE

let cookieMessage = document.createElement("div");

setTimeout(function()
{
  cookieMessage.classList.add("cookie-message");
  cookieMessage.innerHTML = `We collect cookies to analyze our website traffic 
  and performance; we never collect any personal data. <button class="btn btn--close--cookies">Got it!</button>`;
  
  // header.prepend(cookieMessage); // top page
  header.append(cookieMessage); // bottom page

  cookieMessage.classList.add("sticky-cookie");
  
  // styles
  
  cookieMessage.style.backgroundColor = "#ADD8E6";
  cookieMessage.style.width = "104%";
  cookieMessage.style.height = Number.parseFloat(getComputedStyle(cookieMessage).height, 10) + 30 + "px";

  // remove cookie message

  const btnCookies = document.querySelector(".btn--close--cookies");

  btnCookies.addEventListener("click", function()
  {
    cookieMessage.remove();
  })

}, 800)



// LEARN MORE BUTTON

btnScrollTo.addEventListener("click", function()
{
  section1.scrollIntoView({behavior: "smooth"});
})



// PAGE NAVEGATION

document.querySelector(".nav__links").addEventListener("click", function(e) // select the parent element to get the child
{
  e.preventDefault();

  if(e.target.classList.contains("nav__link"))
  {
    let id = e.target.getAttribute("href");

    if(id == "#") return;

    document.querySelector(id).scrollIntoView({behavior: "smooth"});
  }
})



// TAB COMPONENTS

const tabConteiner = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");

tabConteiner.addEventListener("click", function(e)
{
  e.preventDefault();

  let clicked = e.target.closest(".operations__tab");

  // guard clause
  if(!clicked) return;

  // removing classes
  for(let i of tabs)
  {
    i.classList.remove("operations__tab--active");
  }
  for(let i of tabsContent)
  {
    i.classList.remove("operations__content--active");
  }

  // active tab
  clicked.classList.add("operations__tab--active");

  //active content
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active");
})



// MENU ANIMATION

const nav  = document.querySelector(".nav");

function menuAnimation(e)
{
  if(e.target.classList.contains("nav__link"))
  {
    let link = e.target;
    let siblings = link.closest(".nav").querySelectorAll(".nav__link");
    let logo = link.closest(".nav").querySelector("img");

    for(let i of siblings)
    {
      if(i != link)
      {
        i.style.opacity = this;
        logo.style.opacity = this;
      }
    }
  }
}

// this keyborad points out to bind()
nav.addEventListener("mouseover", menuAnimation.bind(0.5));
nav.addEventListener("mouseout", menuAnimation.bind(1));



// SCROLL BAR STICKY

let navHeight = nav.getBoundingClientRect().height;

function stickyNav(entries)
{
  let entry = entries[0];

  if(!entry.isIntersecting)
  {
    nav.classList.add("sticky");
  }
  else
  {
    nav.classList.remove("sticky");
  }
}

let headerObserver = new IntersectionObserver(stickyNav, 
{
  root: null,
  rootMargin: `-${navHeight}px`
});

headerObserver.observe(header);



// SECTIONS POP UP

let sections = document.querySelectorAll(".section");

function pagePopUp(entries)
{
  let [entry] = entries;

  if(!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");

  sectionObserver.unobserve(entry.target)
}

let sectionObserver = new IntersectionObserver(pagePopUp,
{
  root: null,
  threshold: 0.15
})

sections.forEach(function(e)
{
  e.classList.add("section--hidden");

  sectionObserver.observe(e);
});



// LOADING IMAGES

let images = document.querySelectorAll("img[data-src]");

function imageLoading(entries)
{
  let [entry] = entries;

  if(!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function()
  {
    entry.target.classList.remove("lazy-img");
  })

  imagesObserver.unobserve(entry.target)

}

let imagesObserver = new IntersectionObserver(imageLoading,
{
  root: null,
  threshold: 0,
  rootMargin: "-200px"
})

images.forEach(e => imagesObserver.observe(e));



// CREATING DOTS

let slides = document.querySelectorAll(".slide");
let btnSlideLeft = document.querySelector(".slider__btn--left");
let btnSlideRight = document.querySelector(".slider__btn--right");


let dotContainer = document.querySelector(".dots");

let createDots = function()
{
  slides.forEach(function(_, i)
  {
    dotContainer.insertAdjacentHTML("beforeend", `<button class="dots__dot" data-slide="${i}"></button>`);
  })
}
createDots();


// Implementing dots

dotContainer.addEventListener("click", function(e)
{
  if(e.target.classList.contains("dots__dot"))
  {
    let slide = e.target.dataset.slide;

    goToSlide(slide);
    activeDot(slide);
  }
})


// active dots

function activeDot(slide)
{
  document.querySelectorAll(".dots__dot").forEach(e => e.classList.remove("dots__dot--active"));

  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active");
}

activeDot(0);



// SLIDES REVIEWS

let currentSlide = 0;
let maxSlide = slides.length;

function goToSlide(slide)
{
  slides.forEach(function(e, i)
  {
    e.style.transform = `translateX(${100 * (i - slide)}%)`
  })
}

goToSlide(0);

function slideToRight()
{
  if(maxSlide - 1 == currentSlide)
  {
    currentSlide = 0; // goes back to the first one
  }
  else
  {
    currentSlide++;
  }

  goToSlide(currentSlide);
  activeDot(currentSlide);
}

function slideToLeft()
{
  if(currentSlide == 0)
  {
    currentSlide = maxSlide - 1; // goes to the last one
  }
  else
  {
    currentSlide--;
  }

  goToSlide(currentSlide);
  activeDot(currentSlide);
}

btnSlideRight.addEventListener("click", slideToRight);
btnSlideLeft.addEventListener("click", slideToLeft);

document.addEventListener("keydown", function(e)
{
  if(e.key == "ArrowRight")
  {
    slideToRight();
  }
})

document.addEventListener("keydown", function(e)
{
  if(e.key == "ArrowLeft")
  {
    slideToLeft();
  }
})



// FORMULARY CREATE ACCOUNT

btnNextStep.addEventListener("click", function(e)
{
  e.preventDefault();

  if(fName.value == "" || lName.value == "" || email.value == "")
  {
    btnNextStep.classList.add("error");

    setTimeout(function()
    {
      btnNextStep.classList.remove("error");
    }, 300)
  }
  else
  {
    window.location.href = "https://astonishing-belekoy-a5592a.netlify.app/";
  }
})