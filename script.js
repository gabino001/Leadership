// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    smoothScroll();

    // Sticky header
    handleStickyHeader();

    // Animated counter for global network statistics
    initAnimatedCounter();

    // Dynamic testimonial slider
    initTestimonialSlider();

    // Interactive program explorer
    initProgramExplorer();

    // Form submission handling
    handleFormSubmissions();

    // Dynamic faculty showcase
    initFacultyShowcase();

    // Animated scroll-to-top button
    initScrollToTopButton();

    // Parallax effect for hero section
    initParallaxEffect();

    // Interactive global map
    initGlobalMap();

    // Typewriter effect for hero tagline
    initTypewriterEffect();

    // Research center tabs
    initResearchCenterTabs();
});

function smoothScroll() {
    const navLinks = document.querySelectorAll('#main-nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
}

function handleStickyHeader() {
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > heroSection.offsetHeight - 100) {
            header.classList.add('sticky');
            if (scrollTop > lastScrollTop) {
                header.style.top = '-80px'; // Hide header when scrolling down
            } else {
                header.style.top = '0'; // Show header when scrolling up
            }
        } else {
            header.classList.remove('sticky');
        }
        lastScrollTop = scrollTop;
    });
}

function initAnimatedCounter() {
    const counters = document.querySelectorAll('.stat-number');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, options);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.round(current);
        if (current >= target) {
            clearInterval(timer);
            element.textContent = target;
        }
    }, 20);
}

function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach(t => t.style.display = 'none');
        testimonials[index].style.display = 'block';
        testimonials[index].style.opacity = 0;
        fadeIn(testimonials[index]);
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    function fadeIn(element) {
        let opacity = 0;
        const timer = setInterval(() => {
            if (opacity >= 1) {
                clearInterval(timer);
            }
            element.style.opacity = opacity;
            opacity += 0.1;
        }, 50);
    }

    showTestimonial(currentTestimonial);
    setInterval(nextTestimonial, 10000);
}

function initProgramExplorer() {
    const programCategories = document.querySelectorAll('.program-category');
    programCategories.forEach(category => {
        category.addEventListener('click', function() {
            this.classList.toggle('expanded');
            const content = this.querySelector('ul');
            if (this.classList.contains('expanded')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0';
            }
        });
    });
}

function handleFormSubmissions() {
    const contactForm = document.querySelector('#contact-form');
    const newsletterForm = document.querySelector('#newsletter-form');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        simulateFormSubmission(this, 'Thank you for your message. We will get back to you soon!');
    });

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        simulateFormSubmission(this, 'Thank you for subscribing to our newsletter!');
    });
}

function simulateFormSubmission(form, message) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    setTimeout(() => {
        alert(message);
        form.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

function initFacultyShowcase() {
    const facultyMembers = [
        { name: "Prof. Alex Johnson", expertise: "Strategic Management and Global Business", image: "faculty1.jpg" },
        { name: "Dr. Maria Rodriguez", expertise: "Organizational Behavior and Leadership Psychology", image: "faculty2.jpg" },
        { name: "Prof. Yuki Tanaka", expertise: "Innovation Management and Entrepreneurship", image: "faculty3.jpg" },
        { name: "Dr. Emmanuel Okonkwo", expertise: "Sustainable Business Strategies", image: "faculty4.jpg" },
        { name: "Prof. Sophia Lee", expertise: "Digital Transformation and Technology Leadership", image: "faculty5.jpg" }
    ];

    const facultyContainer = document.querySelector('#faculty .faculty-container');
    let currentIndex = 0;

    function createFacultyElement(faculty) {
        const element = document.createElement('div');
        element.classList.add('faculty-member');
        element.innerHTML = `
            <img src="${faculty.image}" alt="${faculty.name}">
            <h3>${faculty.name}</h3>
            <p>${faculty.expertise}</p>
        `;
        return element;
    }

    function updateFacultyShowcase() {
        facultyContainer.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            const index = (currentIndex + i) % facultyMembers.length;
            facultyContainer.appendChild(createFacultyElement(facultyMembers[index]));
        }
        currentIndex = (currentIndex + 1) % facultyMembers.length;
    }

    updateFacultyShowcase();
    setInterval(updateFacultyShowcase, 5000);
}

function initScrollToTopButton() {
    const scrollTopButton = document.createElement('button');
    scrollTopButton.textContent = '↑';
    scrollTopButton.classList.add('scroll-top-button');
    document.body.appendChild(scrollTopButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });

    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });
}

function initGlobalMap() {
    const mapContainer = document.getElementById('map');
    // This is a placeholder for an interactive map
    // You would typically use a mapping library like Leaflet or Google Maps API here
    mapContainer.innerHTML = '<div class="placeholder-map">Interactive Global Map</div>';

    // Add some interactivity to the placeholder
    const placeholderMap = mapContainer.querySelector('.placeholder-map');
    placeholderMap.addEventListener('mouseover', () => {
        placeholderMap.textContent = 'Explore Our Global Presence';
    });
    placeholderMap.addEventListener('mouseout', () => {
        placeholderMap.textContent = 'Interactive Global Map';
    });
}

function initTypewriterEffect() {
    const tagline = document.querySelector('.hero p');
    const text = tagline.textContent;
    tagline.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    typeWriter();
}

function initResearchCenterTabs() {
    const researchCenters = document.querySelectorAll('.research-center');
    const tabContainer = document.createElement('div');
    tabContainer.classList.add('research-tabs');

    researchCenters.forEach((center, index) => {
        const tab = document.createElement('button');
        tab.textContent = center.querySelector('h3').textContent;
        tab.classList.add('research-tab');
        if (index === 0) tab.classList.add('active');
        tabContainer.appendChild(tab);

        tab.addEventListener('click', () => {
            researchCenters.forEach(c => c.style.display = 'none');
            document.querySelectorAll('.research-tab').forEach(t => t.classList.remove('active'));
            center.style.display = 'block';
            tab.classList.add('active');
        });
    });

    const researchSection = document.querySelector('#research');
    researchSection.insertBefore(tabContainer, researchSection.firstChild);

    researchCenters.forEach((center, index) => {
        if (index !== 0) center.style.display = 'none';
    });
}

// Add this CSS to your styles.css file for new elements and effects
/*
.scroll-top-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: var(--secondary-color);
    color: var(--white);
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1000;
}

.scroll-top-button.visible {
    opacity: 1;
}

.placeholder-map {
    width: 100%;
    height: 300px;
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    color: var(--primary-color);
    border: 2px dashed var(--secondary-color);
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.placeholder-map:hover {
    background-color: #e0e0e0;
}

.research-tabs {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
}

.research-tab {
    background-color: var(--light-bg);
    border: none;
    padding: 0.5rem 1rem;
    margin: 0 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.research-tab.active {
    background-color: var(--secondary-color);
    color: var(--white);
}

.program-category {
    cursor: pointer;
}

.program-category ul {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
}

.program-category.expanded ul {
    max-height: 1000px;
}
    // Continuing script.js

// Language switcher
initLanguageSwitcher();

// Dynamic course finder
initCourseFinder();

// Interactive timeline for institute history
initInstituteTimeline();

// Live chat feature
initLiveChat();

// Virtual tour
initVirtualTour();

// Dynamic FAQ section
initFAQSection();

// Social media feed
initSocialMediaFeed();

// Event calendar
initEventCalendar();

function initLanguageSwitcher() {
    const languages = ['English', 'Español', 'Français', '中文', '日本語'];
    const switcher = document.createElement('div');
    switcher.classList.add('language-switcher');
    
    const currentLang = document.createElement('span');
    currentLang.textContent = 'English';
    switcher.appendChild(currentLang);
    
    const langList = document.createElement('ul');
    languages.forEach(lang => {
        const li = document.createElement('li');
        li.textContent = lang;
        li.addEventListener('click', () => {
            currentLang.textContent = lang;
            // Here you would typically implement actual language switching logic
            alert(`Site language switched to ${lang}`);
        });
        langList.appendChild(li);
    });
    
    switcher.appendChild(langList);
    document.querySelector('header').appendChild(switcher);
}

function initCourseFinder() {
    const courseFinder = document.createElement('div');
    courseFinder.classList.add('course-finder');
    courseFinder.innerHTML = `
        <h3>Find Your Course</h3>
        <select id="program-type">
            <option value="">Select Program Type</option>
            <option value="executive">Executive Education</option>
            <option value="degree">Degree Programs</option>
            <option value="online">Online Learning</option>
        </select>
        <select id="subject-area">
            <option value="">Select Subject Area</option>
            <option value="leadership">Leadership</option>
            <option value="strategy">Strategy</option>
            <option value="innovation">Innovation</option>
            <option value="finance">Finance</option>
        </select>
        <button id="find-courses">Find Courses</button>
    `;
    
    document.querySelector('#programs').appendChild(courseFinder);
    
    document.getElementById('find-courses').addEventListener('click', () => {
        const programType = document.getElementById('program-type').value;
        const subjectArea = document.getElementById('subject-area').value;
        if (programType && subjectArea) {
            alert(`Searching for ${subjectArea} courses in ${programType} programs...`);
            // Here you would typically implement a search function or redirect to a search results page
        } else {
            alert('Please select both a program type and a subject area.');
        }
    });
}

function initInstituteTimeline() {
    const timelineEvents = [
        { year: 2024, event: 'IISLPD founded' },
        { year: 2025, event: 'Launch of first Executive MBA program' },
        { year: 2026, event: 'Opening of Global Innovation Hub' },
        { year: 2027, event: 'Establishment of Sustainability and Corporate Responsibility Center' },
        { year: 2028, event: 'Launch of Online Learning Platform' }
    ];
    
    const timeline = document.createElement('div');
    timeline.classList.add('institute-timeline');
    
    timelineEvents.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.classList.add('timeline-event');
        eventElement.innerHTML = `
            <span class="event-year">${event.year}</span>
            <span class="event-description">${event.event}</span>
        `;
        timeline.appendChild(eventElement);
    });
    
    document.querySelector('#about').appendChild(timeline);
}

function initLiveChat() {
    const chatButton = document.createElement('button');
    chatButton.classList.add('live-chat-button');
    chatButton.textContent = 'Chat with Us';
    
    const chatWindow = document.createElement('div');
    chatWindow.classList.add('live-chat-window');
    chatWindow.innerHTML = `
        <div class="chat-header">
            <h3>Live Chat</h3>
            <button class="close-chat">×</button>
        </div>
        <div class="chat-messages"></div>
        <input type="text" class="chat-input" placeholder="Type your message...">
    `;
    
    document.body.appendChild(chatButton);
    document.body.appendChild(chatWindow);
    
    chatButton.addEventListener('click', () => chatWindow.classList.add('open'));
    chatWindow.querySelector('.close-chat').addEventListener('click', () => chatWindow.classList.remove('open'));
    
    const chatInput = chatWindow.querySelector('.chat-input');
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && chatInput.value.trim() !== '') {
            const messageElement = document.createElement('p');
            messageElement.textContent = chatInput.value;
            chatWindow.querySelector('.chat-messages').appendChild(messageElement);
            chatInput.value = '';
            // Here you would typically send the message to a backend service
        }
    });
}

function initVirtualTour() {
    const tourButton = document.createElement('button');
    tourButton.classList.add('virtual-tour-button');
    tourButton.textContent = 'Take a Virtual Tour';
    
    const tourModal = document.createElement('div');
    tourModal.classList.add('virtual-tour-modal');
    tourModal.innerHTML = `
        <div class="tour-content">
            <h3>Virtual Campus Tour</h3>
            <div class="tour-navigation">
                <button class="tour-prev">Previous</button>
                <button class="tour-next">Next</button>
            </div>
            <div class="tour-image"></div>
            <p class="tour-description"></p>
            <button class="close-tour">Close Tour</button>
        </div>
    `;
    
    document.querySelector('#about').appendChild(tourButton);
    document.body.appendChild(tourModal);
    
    const tourLocations = [
        { image: 'campus-entrance.jpg', description: 'Welcome to our state-of-the-art campus.' },
        { image: 'lecture-hall.jpg', description: 'Our modern lecture halls are equipped with the latest technology.' },
        { image: 'library.jpg', description: 'Our extensive library houses over 100,000 volumes.' },
        { image: 'innovation-lab.jpg', description: 'The Innovation Lab is where ideas come to life.' }
    ];
    
    let currentLocation = 0;
    
    function updateTourContent() {
        const location = tourLocations[currentLocation];
        tourModal.querySelector('.tour-image').style.backgroundImage = `url(${location.image})`;
        tourModal.querySelector('.tour-description').textContent = location.description;
    }
    
    tourButton.addEventListener('click', () => {
        tourModal.classList.add('open');
        updateTourContent();
    });
    
    tourModal.querySelector('.close-tour').addEventListener('click', () => tourModal.classList.remove('open'));
    
    tourModal.querySelector('.tour-prev').addEventListener('click', () => {
        currentLocation = (currentLocation - 1 + tourLocations.length) % tourLocations.length;
        updateTourContent();
    });
    
    tourModal.querySelector('.tour-next').addEventListener('click', () => {
        currentLocation = (currentLocation + 1) % tourLocations.length;
        updateTourContent();
    });
}

function initFAQSection() {
    const faqs = [
        { question: 'What makes IISLPD unique?', answer: 'Our global perspective, cutting-edge research, and focus on practical leadership skills set us apart.' },
        { question: 'How long are the programs?', answer: 'Program lengths vary from short executive courses to multi-year degree programs.' },
        { question: 'Are scholarships available?', answer: 'Yes, we offer various scholarships based on merit and need. Contact our admissions office for details.' },
        { question: 'Can I study online?', answer: 'We offer several online and hybrid programs to accommodate diverse learning needs.' }
    ];
    
    const faqSection = document.createElement('section');
    faqSection.id = 'faq';
    faqSection.innerHTML = '<h2>Frequently Asked Questions</h2>';
    
    faqs.forEach(faq => {
        const faqElement = document.createElement('div');
        faqElement.classList.add('faq-item');
        faqElement.innerHTML = `
            <h3>${faq.question}</h3>
            <p>${faq.answer}</p>
        `;
        faqSection.appendChild(faqElement);
    });
    
    document.querySelector('main').appendChild(faqSection);
    
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('open');
        });
    });
}

function initSocialMediaFeed() {
    const socialFeed = document.createElement('div');
    socialFeed.classList.add('social-media-feed');
    socialFeed.innerHTML = '<h3>Follow Us on Social Media</h3>';
    
    const platforms = ['Twitter', 'LinkedIn', 'Instagram'];
    platforms.forEach(platform => {
        const feedItem = document.createElement('div');
        feedItem.classList.add('social-feed-item');
        feedItem.innerHTML = `<h4>${platform}</h4><p>Loading latest posts...</p>`;
        socialFeed.appendChild(feedItem);
    });
    
    document.querySelector('footer').insertBefore(socialFeed, document.querySelector('.footer-bottom'));
    
    // Here you would typically integrate with social media APIs to fetch real content
}

function initEventCalendar() {
    const calendarContainer = document.createElement('div');
    calendarContainer.classList.add('event-calendar');
    calendarContainer.innerHTML = '<h3>Upcoming Events</h3>';
    
    const events = [
        { date: '2024-09-15', title: 'Fall Semester Begins' },
        { date: '2024-10-20', title: 'Leadership Symposium' },
        { date: '2024-11-05', title: 'Alumni Networking Event' },
        { date: '2024-12-10', title: 'End of Year Gala' }
    ];
    
    const eventList = document.createElement('ul');
    events.forEach(event => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${event.date}</strong>: ${event.title}`;
        eventList.appendChild(listItem);
    });
    
    calendarContainer.appendChild(eventList);
    document.querySelector('main').appendChild(calendarContainer);
}

// Add corresponding CSS for new elements in your styles.css file
*/