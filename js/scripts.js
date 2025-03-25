emailjs.init('tSDvu2_rm4WBRcirO');


//function to validate user email address
function criteria() { // Replace with your EmailJS public key
    const form = document.getElementById('form');
    if (!form) return; // Guard clause for pages without the form

    const validChars = ['.', '@', '_','-'];
    let email = document.getElementById('email').value;    
    let msg = document.getElementById('msg');
    let firstAt = email.indexOf('@');
    let lastAt = email.lastIndexOf('@');
    let lastDot = email.lastIndexOf('.');
    let firstChar = email.charAt(0);
    let message = document.getElementById('messageToSend').value;
    
    let state = true;
    
    email = email.trim().toLowerCase();
    msg.innerHTML = '';

    if(firstChar=='@' || firstChar=='.' ||firstChar=='_' || firstChar=='-' ||  !isNaN(firstChar)){
        msg.innerHTML = "invalid fisrt character for Email address";
        state = false;
    }
    else if(email.length<8){
        msg.innerHTML = "your email is too short!";
        state = false;
    }
    else if((firstAt<2) || (firstAt!=lastAt)){
        msg.innerHTML = "Error in @";
        state = false;
    }
    else if(lastDot-lastAt<3){
        msg.innerHTML = "Error in domain name";
        state = false;
    }
    else if(email.length-lastDot<3){
        msg.innerHTML = "Error in .com";
        state = false;
    }
    else {
        for(var i=0; i<email.length && state == true; i++){
       
            if((email.charCodeAt(i)>=97 && email.charCodeAt(i)<=122)){
                continue;
            }
            else if ((email.charCodeAt(i)>=48 && email.charCodeAt(i)<=57)) {
                continue;
            }
            else if (validChars.indexOf(email.charAt(i))!=-1){
                continue;
            }
            else {
                msg.innerHTML = "Please use valid email characters";
                state = false;
            }
         }
    }

    if (state == true) {
        sendEmail();
        document.getElementById('email').classList.remove("invalid");
    }
    else {
        document.getElementById('email').classList.add("invalid")
    }   
}


function sendEmail() {
    const email = document.getElementById('email').value;
    const message = document.getElementById('messageToSend').value;
    const name = document.getElementById('NameToSend')

    emailjs.send('service_whgxsdv', 'template_4h57fmz', {
        to_email: 'manish.singh.mails@gmail.com', // Hardcoded recipient
        // from_email: 'mgkunwar999@gmail.com',
        message: 'You have recieved a message from email : ' + email + ' ' + message + ' ' + ' And the name of client is : ' + name
    })
    .then((response) => {
        // console.log('Email sent successfully!', response);
        // alert('Email sent successfully!');
        msg.innerHTML = 'Thank You :) Your Message has been submitted successfully. <br> You shall here form us very soon!';
    }, (error) => {
        // console.error('Failed to send email:', error);
        // alert('Failed to send email.');
        msg.innerHTML = 'Sorry :( Service is not availabe right now. <br> You should try again soon';
    });
}

// Form submission handler
const form = document.getElementById('form');
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        criteria();
    });
}

//SEARCH
// const search = document.getElementById('search');
// const searchBar = document.getElementById('searchBar');
// //click on the Magnifier icon to toggle the search bar
// search.addEventListener('click', function (){
//     searchBar.classList.toggle('show')
//     searchBar.classList.toggle('hide')
// })
// //press escape to close the search bar
//  document.addEventListener('keydown', (event) => {
//      var keyName = event.key;
//      console.log("keyName");
//      if ((keyName == 'Escape' && searchBar.classList.contains('show') == true)) {
//             searchBar.classList.toggle('show')
//             searchBar.classList.toggle('hide')    
//          }
//  } )

// Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.slider-container');
    if (!sliderContainer) return; // Guard clause for pages without slider

    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const currentSlideNum = document.querySelector('.current');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        if (!slides.length) return; // Guard against empty slides
        
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');

        // Update slide counter if it exists
        if (currentSlideNum) {
            currentSlideNum.textContent = index + 1;
        }
    }

    function nextSlide() {
        if (!slides.length) return;
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        if (!slides.length) return;
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Initialize slider controls if they exist
    if (dots.length) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
                resetSlideInterval();
            });
        });
    }

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            prevSlide();
            resetSlideInterval();
        });
        
        nextButton.addEventListener('click', () => {
            nextSlide();
            resetSlideInterval();
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!sliderContainer) return;
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetSlideInterval();
        }
        if (e.key === 'ArrowRight') {
            nextSlide();
            resetSlideInterval();
        }
    });

    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 4000);
    }

    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }

    // Initialize auto-advance
    startSlideInterval();

    // Pause auto-advance on hover
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        sliderContainer.addEventListener('mouseleave', () => {
            startSlideInterval();
        });
    }
});

// Collapse button text toggle
document.addEventListener('DOMContentLoaded', function() {
    const collapseButtons = document.querySelectorAll('[data-bs-toggle="collapse"]');
    
    collapseButtons.forEach(button => {
        if (!button) return;
        
        button.addEventListener('click', function() {
            const showText = this.querySelector('.collapse-text-show');
            const hideText = this.querySelector('.collapse-text-hide');
            
            if (showText && hideText) {
                showText.classList.toggle('d-none');
                hideText.classList.toggle('d-none');
            }
        });
    });

    // Update the total number display
    document.querySelector('.total').textContent = '3';
});

// Mobile menu handling
const menuCheckbox = document.getElementById('menu');
if (menuCheckbox) {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuCheckbox.checked = false;
        });
    });
}

