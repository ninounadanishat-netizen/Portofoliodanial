// Tema Management
const html = document.documentElement;
const themeIcon = document.getElementById('theme-icon');
const themeIconMobile = document.getElementById('theme-icon-mobile');

// Cek preferensi tersimpan
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
    updateThemeIcons(true);
} else {
    html.classList.remove('dark');
    updateThemeIcons(false);
}

function toggleDarkMode() {
    const isDark = html.classList.toggle('dark');
    localStorage.theme = isDark ? 'dark' : 'light';
    updateThemeIcons(isDark);
}

function updateThemeIcons(isDark) {
    const iconClass = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    if (themeIcon) themeIcon.className = iconClass;
    if (themeIconMobile) themeIconMobile.className = iconClass;
}

// Initialize Animations
AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-out-quad'
});

// Navigation Active State Highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });

    // Sticky Navbar visual change
    const nav = document.querySelector('nav');
    if(window.scrollY > 50) {
        nav.classList.add('shadow-md');
    } else {
        nav.classList.remove('shadow-md');
    }
});

function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');
    menu.classList.toggle('hidden');
    if(menu.classList.contains('hidden')) {
        icon.className = 'fa-solid fa-bars';
    } else {
        icon.className = 'fa-solid fa-xmark';
    }
}

function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fa-solid fa-circle-notch animate-spin"></i> Mengirim...';
    btn.disabled = true;

    setTimeout(() => {
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-10 right-10 bg-blue-600 text-white px-8 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3 transform translate-y-20 transition-all duration-500';
        notification.innerHTML = '<i class="fa-solid fa-check-circle text-xl"></i> <div><p class="font-bold">Berhasil!</p><p class="text-sm opacity-90">Pesan Anda telah terkirim.</p></div>';
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.style.transform = 'translateY(0)', 100);

        btn.innerHTML = originalText;
        btn.disabled = false;
        e.target.reset();

        setTimeout(() => {
            notification.style.transform = 'translateY(20px)';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 500);
        }, 4000);
    }, 1500);
}