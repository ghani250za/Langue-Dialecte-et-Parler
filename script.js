// 1. شاشة التحميل
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        document.body.classList.remove('no-scroll');
        typeWriterEffect();
    }, 1500); 
});

// 2. الآلة الكاتبة
const textToType = "Une analyse sociolinguistique au cœur de l'identité";
const typeElement = document.getElementById('typewriter-text');
let typeIndex = 0;
function typeWriterEffect() {
    if (typeIndex < textToType.length) {
        typeElement.innerHTML += textToType.charAt(typeIndex);
        typeIndex++;
        setTimeout(typeWriterEffect, 40); 
    }
}

// 3. الماوس الذكي والخلفية التفاعلية
const root = document.documentElement;
document.addEventListener('mousemove', (e) => {
    if(document.body.classList.contains('focus-mode')) return;
    
    window.requestAnimationFrame(() => {
        root.style.setProperty('--mouse-x', e.clientX);
        root.style.setProperty('--mouse-y', e.clientY);
        
        const blob1 = document.getElementById('blob-1');
        const blob2 = document.getElementById('blob-2');
        const blob3 = document.getElementById('blob-3');
        
        if(blob1) { blob1.style.setProperty('--blob-x', e.clientX + 'px'); blob1.style.setProperty('--blob-y', e.clientY + 'px'); }
        if(blob2) { blob2.style.setProperty('--blob-x', (e.clientX + 150) + 'px'); blob2.style.setProperty('--blob-y', (e.clientY + 100) + 'px'); }
        if(blob3) { blob3.style.setProperty('--blob-x', (e.clientX - 150) + 'px'); blob3.style.setProperty('--blob-y', (e.clientY - 100) + 'px'); }
    });
});

document.addEventListener('mousedown', () => root.style.setProperty('--cursor-scale', '1.5'));
document.addEventListener('mouseup', () => root.style.setProperty('--cursor-scale', '1'));

// 4. أحداث التمرير (شريط التقدم وزر العودة)
const backToTopBtn = document.getElementById('back-to-top');
const parallaxImages = document.querySelectorAll('.parallax-img');
const progressBar = document.getElementById('progress-bar');
let isScrolling = false;

window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            let scrollTop = window.scrollY;
            let docHeight = document.body.offsetHeight - window.innerHeight;
            
            progressBar.style.width = ((scrollTop / docHeight) * 100) + '%';
            
            if (scrollTop > 300) backToTopBtn.classList.add('visible');
            else backToTopBtn.classList.remove('visible');

            if(!document.body.classList.contains('focus-mode') && window.innerWidth > 850) {
                parallaxImages.forEach(img => {
                    img.style.transform = `translateZ(50px) translateY(${-(scrollTop * 0.1)}px)`;
                });
            }
            isScrolling = false;
        });
        isScrolling = true;
    }
});

backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// 5. الظهور السينمائي للبطاقات (Scroll Reveal)
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

// للمقدمة
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('show'), index * 100);
            cardObserver.unobserve(entry.target); 
        }
    });
}, observerOptions);
document.querySelectorAll('.glass-card').forEach(card => cardObserver.observe(card));

// للوحة الخلاصة (Dashboard)
const dashCards = document.querySelectorAll('.dash-card');
const dashObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 150); 
            dashObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

dashCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px) scale(0.9)';
    dashObserver.observe(card);
});

// 6. تأثير 3D Tilt للبطاقات
const tiltElements = document.querySelectorAll('.tilt-effect');
tiltElements.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 850 || document.body.classList.contains('focus-mode')) return;
        window.requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left, y = e.clientY - rect.top;  
            const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -5; // مخفف ليتناسب مع النصوص الطويلة
            const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 5;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
        });
    });
    card.addEventListener('mouseleave', () => {
        if (window.innerWidth < 850 || document.body.classList.contains('focus-mode')) return;
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        card.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    card.addEventListener('mouseenter', () => {
        if(!document.body.classList.contains('focus-mode')) card.style.transition = 'none';
    });
});

// 7. التأثير المغناطيسي للأزرار
const magnetics = document.querySelectorAll('.magnetic');
magnetics.forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        if(window.innerWidth < 850 || document.body.classList.contains('focus-mode')) return;
        window.requestAnimationFrame(() => {
            const position = btn.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            btn.style.transition = 'none';
        });
    });
    btn.addEventListener('mouseleave', function() {
        if(document.body.classList.contains('focus-mode')) return;
        btn.style.transform = 'translate(0px, 0px)';
        btn.style.transition = 'transform 0.4s ease-out';
    });
});

// 8. وضع القراءة (Focus Mode)
const focusBtn = document.getElementById('focus-btn');
focusBtn.addEventListener('click', () => {
    document.body.classList.toggle('focus-mode');
    if(document.body.classList.contains('focus-mode')) {
        focusBtn.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
        focusBtn.title = "Désactiver le mode lecture";
        parallaxImages.forEach(img => img.style.transform = 'none');
    } else {
        focusBtn.innerHTML = '<i class="fa-solid fa-eye"></i>';
        focusBtn.title = "Mode Lecture (Focus)";
    }
});