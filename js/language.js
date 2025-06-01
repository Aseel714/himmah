// Language state management
function initializeLanguage() {
    // Get language from localStorage or default to Arabic
    let currentLang = localStorage.getItem('language') || 'ar';
    
    // Set initial language
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
    
    // Set page title based on current page
    const pageTitles = {
        'index.html': {
            ar: 'منصة همة للتعليم',
            en: 'Himmah Educational Platform'
        },
        'pro.html': {
            ar: 'مكتبة الموارد',
            en: 'Resource Library'
        },
        'about.html': {
            ar: 'عن منصة همة',
            en: 'About Himmah'
        },
        'login.html': {
            ar: 'تسجيل الدخول',
            en: 'Login'
        },
        'signup.html': {
            ar: 'إنشاء حساب',
            en: 'Sign Up'
        }
    };

    // Get current page name
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const titles = pageTitles[currentPage] || pageTitles['index.html'];
    document.title = titles[currentLang];

    // Set up language toggle
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'ar' ? 'en' : 'ar';
            document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
            document.documentElement.lang = currentLang;
            document.title = titles[currentLang];
            localStorage.setItem('language', currentLang);
            updateLanguage();
            
            // Call page-specific update functions if they exist
            if (typeof generateResourceCards === 'function') {
                generateResourceCards();
            }
        });
    }

    // Update all translatable elements
    function updateLanguage() {
        document.querySelectorAll('[data-en][data-ar]').forEach(element => {
            element.textContent = element.getAttribute(`data-${currentLang}`);
        });
    }

    // Initialize language on page load
    document.addEventListener('DOMContentLoaded', updateLanguage);
}

// Initialize language when script loads
initializeLanguage(); 