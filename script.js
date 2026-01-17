// Переключение темы (ползунок)
document.addEventListener('DOMContentLoaded', function() {
    const themeToggleCheckbox = document.getElementById('theme-toggle-checkbox');
    const body = document.body;

    // Проверяем сохраненную тему в localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'white') {
        body.classList.add('white-hacker-theme');
        themeToggleCheckbox.checked = false; // Белый хакер - выключен (влево)
    } else {
        themeToggleCheckbox.checked = true; // Черный хакер - включен (вправо)
    }

    // Обработчик для переключения темы
    themeToggleCheckbox.addEventListener('change', function() {
        if (this.checked) {
            // Черный хакер (темная тема) - включено
            body.classList.remove('white-hacker-theme');
            localStorage.setItem('theme', 'black');
        } else {
            // Белый хакер (светлая тема) - выключено
            body.classList.add('white-hacker-theme');
            localStorage.setItem('theme', 'white');
        }
    });

    // Анимация при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Дополнительные анимации для разных типов элементов
                if (entry.target.classList.contains('course-card')) {
                    entry.target.style.animation = 'slideInUp 0.8s ease-out';
                } else if (entry.target.classList.contains('stat-item')) {
                    entry.target.style.animation = 'pulse 1s ease-in-out';
                } else if (entry.target.classList.contains('contact-form')) {
                    entry.target.style.animation = 'fadeIn 1s ease-out';
                }
            }
        });
    }, observerOptions);

    // Наблюдаем за элементами, которые нужно анимировать при прокрутке
    const scrollElements = document.querySelectorAll('.course-card, .stat-item, .contact-form, .about-text, .social-links, .footer p');
    scrollElements.forEach(el => {
        el.classList.add('scroll-animation');
        observer.observe(el);
    });


    // Мобильное меню
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Анимация кнопки CTA и функциональность
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('mouseenter', () => {
        ctaButton.style.boxShadow = '0 0 30px #00ff41';
    });

    ctaButton.addEventListener('mouseleave', () => {
        ctaButton.style.boxShadow = '0 0 20px #00ff41';
    });

    // Перенаправление на секцию курсов при клике
    ctaButton.addEventListener('click', (e) => {
        e.preventDefault();
        const coursesSection = document.getElementById('courses');
        coursesSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Анимация заголовков при загрузке
    const title = document.querySelector('.main-title');
    title.style.animation = 'titleGlow 2s infinite alternate';

    // Анимация неоновых текстов
    const neonElements = document.querySelectorAll('.neon-text');
    neonElements.forEach(el => {
        el.style.animation = 'neon-flicker 1.5s infinite alternate';
    });
});

// Добавляем эффект "глюка" для неоновых элементов время от времени
setInterval(() => {
    const glitchElements = document.querySelectorAll('.neon-text, .nav-brand');
    glitchElements.forEach(el => {
        if (Math.random() > 0.7) { // 30% шанс на глюк каждые 5 секунд
            // Создаем клон элемента для эффекта глюка
            const originalTransform = el.style.transform;
            const originalColor = el.style.color;
            const originalTextShadow = el.style.textShadow;

            // Применяем эффект глюка
            el.style.position = 'relative';
            el.style.left = (Math.random() - 0.5) * 5 + 'px';
            el.style.textShadow = `0 0 5px ${Math.random() > 0.5 ? '#ff00ff' : '#00ffff'}, 0 0 10px ${Math.random() > 0.5 ? '#ff00ff' : '#00ffff'}`;

            setTimeout(() => {
                el.style.left = '0px';
                el.style.textShadow = originalTextShadow;
            }, 100);
        }
    });
}, 5000);

// Данные о курсах с подробной информацией
const coursesData = [
    {
        id: 0,
        title: "Ввод в программирование",
        price: "399 ₽",
        icon: '<img src="icons/intro-programming.png" alt="Ввод в программирование" class="course-icon-img">',
        description: "Основы программирования для новичков. Изучите базовые концепции, синтаксис и логику программирования.",
        detailedInfo: `
            <h3>Курс: Ввод в программирование</h3>
            <p><strong>Цена:</strong> 399 ₽</p>
            <p><strong>Продолжительность:</strong> 4 недели</p>
            <p><strong>Формат:</strong> Онлайн-видеоуроки, практические задания</p>
            <p><strong>Уровень:</strong> Новичок</p>
            <h4>Что вы узнаете:</h4>
            <ul>
                <li>Что такое алгоритмы и как их строить</li>
                <li>Базовые структуры данных</li>
                <li>Переменные, типы данных и операторы</li>
                <li>Условные конструкции и циклы</li>
                <li>Основы отладки кода</li>
            </ul>
            <h4>Для кого этот курс:</h4>
            <p>Для абсолютных новичков, которые хотят начать путь в программировании и понять основные принципы написания кода.</p>
        `
    },
    {
        id: 1,
        title: "Основы Python",
        price: "799 ₽",
        icon: '<img src="icons/python-basics.png" alt="Основы Python" class="course-icon-img">',
        description: "Изучите один из самых популярных языков программирования. Освойте основы синтаксиса, структур данных и объектно-ориентированного программирования.",
        detailedInfo: `
            <h3>Курс: Основы Python</h3>
            <p><strong>Цена:</strong> 799 ₽</p>
            <p><strong>Продолжительность:</strong> 6 недель</p>
            <p><strong>Формат:</strong> Онлайн-видеоуроки, практические задания, проекты</p>
            <p><strong>Уровень:</strong> Новичок</p>
            <h4>Что вы узнаете:</h4>
            <ul>
                <li>Синтаксис Python и основные конструкции</li>
                <li>Работа с коллекциями данных</li>
                <li>Функции и области видимости</li>
                <li>Объектно-ориентированное программирование</li>
                <li>Работа с файлами и исключениями</li>
            </ul>
            <h4>Для кого этот курс:</h4>
            <p>Для новичков, которые хотят освоить один из самых популярных языков программирования и начать создавать свои первые программы.</p>
        `
    },
    {
        id: 2,
        title: "JavaScript с нуля",
        price: "899 ₽",
        icon: '<img src="icons/javascript-zero.png" alt="JavaScript с нуля" class="course-icon-img">',
        description: "Освойте язык программирования для веб-разработки. Изучите основы JS, DOM-манипуляции и асинхронное программирование.",
        detailedInfo: `
            <h3>Курс: JavaScript с нуля</h3>
            <p><strong>Цена:</strong> 899 ₽</p>
            <p><strong>Продолжительность:</strong> 6 недель</p>
            <p><strong>Формат:</strong> Онлайн-видеоуроки, практические задания, интерактивные упражнения</p>
            <p><strong>Уровень:</strong> Новичок</p>
            <h4>Что вы узнаете:</h4>
            <ul>
                <li>Синтаксис JavaScript и основные концепции</li>
                <li>Работа с DOM и событиями</li>
                <li>Функции и замыкания</li>
                <li>Асинхронное программирование (Promise, async/await)</li>
                <li>Основы ES6+ стандартов</li>
            </ul>
            <h4>Для кого этот курс:</h4>
            <p>Для тех, кто хочет начать создавать интерактивные веб-страницы и изучить один из ключевых языков веб-разработки.</p>
        `
    },
    {
        id: 3,
        title: "Веб-разработка: HTML+CSS+JS",
        price: "1 199 ₽",
        icon: '<img src="icons/web-development.png" alt="Веб-разработка" class="course-icon-img">',
        description: "Полный курс по веб-разработке. Создавайте современные, адаптивные веб-сайты с использованием HTML, CSS и JavaScript.",
        detailedInfo: `
            <h3>Курс: Веб-разработка: HTML+CSS+JS</h3>
            <p><strong>Цена:</strong> 1 199 ₽</p>
            <p><strong>Продолжительность:</strong> 8 недель</p>
            <p><strong>Формат:</strong> Онлайн-видеоуроки, практические проекты, обратная связь от менторов</p>
            <p><strong>Уровень:</strong> Новичок</p>
            <h4>Что вы узнаете:</h4>
            <ul>
                <li>Семантическая верстка HTML</li>
                <li>Стилизация с помощью CSS</li>
                <li>Адаптивный дизайн и медиа-запросы</li>
                <li>Верстка по макету</li>
                <li>Интерактивность с помощью JavaScript</li>
            </ul>
            <h4>Для кого этот курс:</h4>
            <p>Для тех, кто хочет стать фронтенд-разработчиком и научиться создавать современные веб-сайты.</p>
        `
    },
    {
        id: 4,
        title: "Продвинутый Python",
        price: "1 799 ₽",
        icon: '<img src="icons/advanced-python.png" alt="Продвинутый Python" class="course-icon-img">',
        description: "Глубокое погружение в Python. Изучите продвинутые концепции, фреймворки и библиотеки для создания сложных приложений.",
        detailedInfo: `
            <h3>Курс: Продвинутый Python</h3>
            <p><strong>Цена:</strong> 1 799 ₽</p>
            <p><strong>Продолжительность:</strong> 10 недель</p>
            <p><strong>Формат:</strong> Онлайн-видеоуроки, проекты, код-ревью</p>
            <p><strong>Уровень:</strong> Продвинутый</p>
            <h4>Что вы узнаете:</h4>
            <ul>
                <li>Продвинутые паттерны программирования</li>
                <li>Работа с асинхронностью (asyncio)</li>
                <li>Метапрограммирование и дескрипторы</li>
                <li>Тестирование и отладка</li>
                <li>Использование популярных фреймворков</li>
            </ul>
            <h4>Для кого этот курс:</h4>
            <p>Для разработчиков, которые уже имеют базовые знания Python и хотят углубить свои навыки.</p>
        `
    },
    {
        id: 5,
        title: "Full-Stack разработчик",
        price: "2 800 ₽",
        icon: '<img src="icons/fullstack-dev.png" alt="Full-Stack разработчик" class="course-icon-img">',
        description: "Станьте универсальным разработчиком. Изучите как фронтенд, так и бэкенд технологии для создания полноценных веб-приложений.",
        detailedInfo: `
            <h3>Курс: Full-Stack разработчик</h3>
            <p><strong>Цена:</strong> 2 800 ₽</p>
            <p><strong>Продолжительность:</strong> 16 недель</p>
            <p><strong>Формат:</strong> Онлайн-видеоуроки, командные проекты, менторство</p>
            <p><strong>Уровень:</strong> Средний</p>
            <h4>Что вы узнаете:</h4>
            <ul>
                <li>Фронтенд: React, Vue или Angular</li>
                <li>Бэкенд: Node.js, Django или Flask</li>
                <li>Базы данных: SQL и NoSQL</li>
                <li>Развертывание и DevOps основы</li>
                <li>Архитектура веб-приложений</li>
            </ul>
            <h4>Для кого этот курс:</h4>
            <p>Для тех, кто хочет стать универсальным разработчиком и создавать полноценные веб-приложения "с нуля до развёртывания".</p>
        `
    },
    {
        id: 6,
        title: "Профи: Реальные проекты",
        price: "3 000 ₽",
        icon: '<img src="icons/pro-projects.png" alt="Профи: Реальные проекты" class="course-icon-img">',
        description: "Работа над реальными проектами под руководством опытных менторов. Получите ценный опыт и портфолио для трудоустройства.",
        detailedInfo: `
            <h3>Курс: Профи: Реальные проекты</h3>
            <p><strong>Цена:</strong> 3 000 ₽</p>
            <p><strong>Продолжительность:</strong> 12 недель</p>
            <p><strong>Формат:</strong> Реальные проекты, код-ревью, подготовка к собеседованиям</p>
            <p><strong>Уровень:</strong> Продвинутый</p>
            <h4>Что вы узнаете:</h4>
            <ul>
                <li>Работа в команде по Agile-методологиям</li>
                <li>Рефакторинг и оптимизация кода</li>
                <li>Архитектурные паттерны</li>
                <li>Тестирование и CI/CD</li>
                <li>Подготовка к трудоустройству</li>
            </ul>
            <h4>Для кого этот курс:</h4>
            <p>Для разработчиков, которые хотят получить опыт работы над реальными проектами и улучшить свои шансы на трудоустройстве.</p>
        `
    }
];

// Функциональность модального окна публичной оферты
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('offerModal');
    const offerLink = document.getElementById('offer-link');
    const closeBtn = document.querySelector('.close');

    // Открытие модального окна при клике на ссылку
    offerLink.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'block';
    });

    // Закрытие модального окна при клике на крестик
    closeBtn.addEventListener('click', function() {
        closeModal(modal);
    });

    // Закрытие модального окна при клике вне содержимого
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal);
        }
    });

    // Функциональность модального окна курсов
    const courseModal = document.getElementById('courseModal');
    const closeCourseBtn = document.querySelector('.close-course');
    const prevCourseBtn = document.getElementById('prevCourse');
    const nextCourseBtn = document.getElementById('nextCourse');
    const courseTitle = document.getElementById('courseTitle');
    const courseIcon = document.getElementById('courseIcon');
    const coursePrice = document.getElementById('coursePrice');
    const courseDetails = document.getElementById('courseDetails');

    let currentCourseIndex = 0;

    // Функция для отображения курса
    function showCourse(index) {
        const course = coursesData[index];
        courseTitle.textContent = course.title;
        courseIcon.innerHTML = course.icon; // Используем innerHTML для отображения изображения
        coursePrice.textContent = course.price;
        courseDetails.innerHTML = course.detailedInfo;
        currentCourseIndex = index;
    }

    // Обработчики для кнопок навигации курсов (для десктопа)
    prevCourseBtn.addEventListener('click', function() {
        currentCourseIndex = (currentCourseIndex - 1 + coursesData.length) % coursesData.length;
        showCourse(currentCourseIndex);
    });

    nextCourseBtn.addEventListener('click', function() {
        currentCourseIndex = (currentCourseIndex + 1) % coursesData.length;
        showCourse(currentCourseIndex);
    });

    // Обработчики для кнопок навигации курсов (для мобильных устройств)
    const prevCourseBtnMobile = document.getElementById('prevCourseMobile');
    const nextCourseBtnMobile = document.getElementById('nextCourseMobile');

    prevCourseBtnMobile.addEventListener('click', function() {
        currentCourseIndex = (currentCourseIndex - 1 + coursesData.length) % coursesData.length;
        showCourse(currentCourseIndex);
    });

    nextCourseBtnMobile.addEventListener('click', function() {
        currentCourseIndex = (currentCourseIndex + 1) % coursesData.length;
        showCourse(currentCourseIndex);
    });

    // Закрытие модального окна курсов
    closeCourseBtn.addEventListener('click', function() {
        closeModal(courseModal);
    });

    window.addEventListener('click', function(e) {
        if (e.target === courseModal) {
            closeModal(courseModal);
        }
    });

    // Функция для плавного закрытия модального окна
    function closeModal(modalElement) {
        const modalContent = modalElement.querySelector('.modal-content');
        modalContent.style.animation = 'fadeOutScale 0.3s forwards';

        setTimeout(() => {
            modalElement.style.display = 'none';
            // Восстанавливаем анимацию появления для следующего открытия
            modalContent.style.animation = 'fadeInScale 0.3s ease-out forwards';
        }, 300);
    }

    // Обработчики для кнопок "Подробнее" на курсах
    const detailButtons = document.querySelectorAll('.btn-details');
    detailButtons.forEach(function(button, index) {
        // Добавим data-атрибут с индексом курса к каждой кнопке
        const card = button.closest('.course-card');
        let courseIndex;

        if (card.classList.contains('wide-card')) {
            courseIndex = 0;
        } else {
            // Для остальных карточек определим индекс на основе их позиции среди обычных карточек
            const regularCards = Array.from(document.querySelectorAll('.course-card:not(.wide-card)'));
            courseIndex = regularCards.indexOf(card);
            // Увеличиваем индекс на 1, потому что первый курс (широкая карточка) имеет индекс 0
            courseIndex += 1;
        }

        // Сохраняем индекс в data-атрибуте кнопки
        button.setAttribute('data-course-index', courseIndex);

        button.addEventListener('click', function() {
            const clickedCourseIndex = parseInt(this.getAttribute('data-course-index'));
            showCourse(clickedCourseIndex);
            courseModal.style.display = 'block';
        });
    });
});