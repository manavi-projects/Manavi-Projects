emailjs.init('tSDvu2_rm4WBRcirO');


//function to validate user email address
function criteria() { // Replace with your EmailJS public key
    const form = document.getElementById('form');
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

form.addEventListener("submit", (e) => {
    e.preventDefault();
    criteria();
});

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

// Toggle button text between "Learn More" and "Show Less"
document.addEventListener('DOMContentLoaded', function() {
    const collapseButtons = document.querySelectorAll('[data-bs-toggle="collapse"]');
    
    collapseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const showText = this.querySelector('.collapse-text-show');
            const hideText = this.querySelector('.collapse-text-hide');
            
            showText.classList.toggle('d-none');
            hideText.classList.toggle('d-none');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const currentSlideNum = document.querySelector('.current');
    let currentSlide = 0;

    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        email
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');

        // Update slide counter
        currentSlideNum.textContent = index + 1;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Add click handlers to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Add click handlers to arrows
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Auto advance slides every 2 seconds
    let slideInterval = setInterval(nextSlide, 4000);

    // Pause auto-advance on hover
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 4000);
    });

    // Update the total number display
    document.querySelector('.total').textContent = '3';
});

