document.addEventListener("DOMContentLoaded", function() {
    if ('loading' in HTMLImageElement.prototype) {
        console.log('Browser supports lazy-loading');
    } else {
        console.log('Browser does not support lazy-loading');
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('loading');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            img.dataset.src = img.src;
            img.src = '';
            observer.observe(img);
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    var faqItems = document.querySelectorAll(".faq-question");

    faqItems.forEach(function(item) {
        item.addEventListener("click", function() {
            // Close any open answers
            faqItems.forEach(function(otherItem) {
                var otherAnswer = otherItem.nextElementSibling;
                if (otherAnswer.style.display === "block" && otherItem !== item) {
                    otherAnswer.style.display = "none";
                }
            });

            // Toggle the current answer
            var answer = this.nextElementSibling;
            if (answer.style.display === "block") {
                answer.style.display = "none";
            } else {
                answer.style.display = "block";
            }
        });
    });
});

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Hide the form
    document.getElementById('signup-form').style.display = 'none';

    // Show the success message
    document.getElementById('success-message').style.display = 'block';
});

