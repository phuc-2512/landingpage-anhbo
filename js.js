// Smooth scrolling function
function smoothScroll(target, duration) {
    var targetElement = document.querySelector(target);
    var targetPosition = targetElement.getBoundingClientRect().top;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;
    
    

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Add event listeners to navigation links
document.addEventListener('DOMContentLoaded', function() {
    var navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var target = this.getAttribute('href');
            smoothScroll(target, 1000);
        });
    });
});

// Add event listeners to images
document.addEventListener('DOMContentLoaded', function() {
    var images = document.querySelectorAll('.feature-images img');
    images.forEach(function(img) {
        img.addEventListener('click', function() {
            var featureItem = this.closest('.feature-item');
            if (featureItem) {
                var featureItemId = featureItem.id;
                smoothScroll('#' + featureItemId, 1000);
            }
        });
    });
});


// Thêm event listener cho nút Messenger nổi
document.addEventListener('DOMContentLoaded', function() {
    var floatingMessengerBtn = document.getElementById('floating-messenger-btn');
    if (floatingMessengerBtn) {
        floatingMessengerBtn.addEventListener('click', function() {
            // Kiểm tra xem FB object có tồn tại không
            if (typeof FB !== 'undefined' && FB !== null) {
                FB.CustomerChat.showDialog();
            } else {
                console.error('Facebook SDK is not loaded or initialized properly.');
                // Fallback: Mở Messenger trong tab mới nếu FB SDK không khả dụng
                window.open('https://m.me/your-facebook-page-id', '_blank');
            }
        });
    }
});
