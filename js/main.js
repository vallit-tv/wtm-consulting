/**
 * WTM Management Consulting - Corporate JavaScript
 * Clean, professional interactions with subtle animations
 */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // MOBILE NAVIGATION
    // =========================================
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');
    const header = document.querySelector('header');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }

    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // =========================================
    // STICKY HEADER
    // =========================================
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // =========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // =========================================
    // SCROLL REVEAL ANIMATIONS
    // =========================================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // =========================================
    // ANIMATED COUNTERS
    // =========================================
    const counters = document.querySelectorAll('.counter');
    const teamStats = document.querySelector('.team-stats');
    let countersAnimated = false;

    const animateCounters = () => {
        if (countersAnimated) return;
        countersAnimated = true;

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2500; // Slightly slower for more impact
            const startTime = performance.now();

            // Smooth cubic easing
            const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeOutCubic(progress);

                // Ensure we start at 0 if progress is small, avoiding jumps
                const currentValue = Math.floor(target * easedProgress);
                counter.innerText = currentValue;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };

            requestAnimationFrame(updateCounter);
        });
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2, // Trigger when 20% visible
        rootMargin: "0px 0px -50px 0px"
    });

    if (teamStats) {
        counterObserver.observe(teamStats);
    } else if (document.querySelector('#team')) {
        // Fallback to team section if stats container not found
        counterObserver.observe(document.querySelector('#team'));
    }

    // =========================================
    // METHODOLOGY TABS
    // =========================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active to clicked
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // =========================================
    // TRAINING CATEGORY TABS
    // =========================================
    // =========================================
    // DYNAMIC SEMINAR RENDERING
    // =========================================
    const seminarGrid = document.getElementById('seminar-grid');
    const trainingTabs = document.querySelectorAll('.training-tab');

    // Category icon mapping for visual enhancement
    const categoryIcons = {
        leadership: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
        change: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 0 1 9-9"/></svg>`,
        health: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
        communication: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
        management: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`
    };

    // Function to create seminar card HTML
    function createSeminarCard(seminar) {
        // Generate list items for details with icons
        const detailsHtml = seminar.details.map(detail => `
            <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="detail-icon">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                ${detail}
            </li>
        `).join('');

        const categoryIcon = categoryIcons[seminar.category] || categoryIcons.leadership;

        return `
            <article class="training-card reveal" onclick="window.location.href='seminar.html?id=${seminar.id}'">
                <div class="card-header">
                    <span class="training-badge">${seminar.badge}</span>
                    <div class="card-icon">${categoryIcon}</div>
                </div>
                <div class="card-content">
                    <h3>${seminar.title}</h3>
                    <p class="card-description">${seminar.shortDescription}</p>
                </div>
                <div class="card-footer">
                    <ul class="training-details">
                        ${detailsHtml}
                    </ul>
                    <span class="card-cta">
                        Mehr erfahren
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </span>
                </div>
            </article>
        `;
    }

    // Function to render seminars by category
    function renderSeminars(category) {
        if (!seminarGrid || typeof window.seminarsData === 'undefined') return;

        // Clear current content
        seminarGrid.innerHTML = '';

        // Filter data
        const filteredSeminars = Object.values(window.seminarsData).filter(s => s.category === category);

        // Generate HTML
        if (filteredSeminars.length > 0) {
            filteredSeminars.forEach(seminar => {
                seminarGrid.innerHTML += createSeminarCard(seminar);
            });
        } else {
            seminarGrid.innerHTML = '<p class="no-results">Für diese Kategorie sind aktuell keine Seminare gelistet.</p>';
        }

        // Re-observe new elements for animation
        const newCards = seminarGrid.querySelectorAll('.reveal');
        if (typeof revealObserver !== 'undefined') {
            newCards.forEach(el => revealObserver.observe(el));
            // Trigger animation slightly delayed to ensure DOM is ready
            setTimeout(() => {
                newCards.forEach(el => el.classList.add('visible'));
            }, 100);
        }
    }

    // Initial Render (Default to leadership)
    if (seminarGrid) {
        renderSeminars('leadership');
    }

    // Tab Event Listeners
    trainingTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all
            trainingTabs.forEach(t => t.classList.remove('active'));

            // Add active to clicked
            tab.classList.add('active');

            // Render selected category
            const category = tab.getAttribute('data-category');
            renderSeminars(category);
        });
    });

    // =========================================
    // TRAINING CAROUSEL LOGIC
    // =========================================
    const carouselPrev = document.querySelector('.carousel-btn.prev');
    const carouselNext = document.querySelector('.carousel-btn.next');

    if (carouselPrev && carouselNext && seminarGrid) {
        carouselPrev.addEventListener('click', () => {
            seminarGrid.scrollBy({ left: -450, behavior: 'smooth' });
        });

        carouselNext.addEventListener('click', () => {
            seminarGrid.scrollBy({ left: 450, behavior: 'smooth' });
        });
    }

    // =========================================
    // ACCORDION
    // =========================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');

            // Close all items
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // =========================================
    // TESTIMONIAL CAROUSEL
    // =========================================
    const track = document.getElementById('testimonial-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const navContainer = document.getElementById('testimonial-nav');

    if (track && cards.length > 0 && navContainer) {
        let currentIndex = 0;
        let autoplayInterval;

        // Create navigation dots
        cards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');

            dot.addEventListener('click', () => {
                goToSlide(index);
                resetAutoplay();
            });

            navContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        function goToSlide(index) {
            currentIndex = index;
            track.style.transform = `translateX(-${index * 100}%)`;

            dots.forEach(d => d.classList.remove('active'));
            dots[currentIndex].classList.add('active');
        }

        function nextSlide() {
            const nextIndex = (currentIndex + 1) % cards.length;
            goToSlide(nextIndex);
        }

        function startAutoplay() {
            autoplayInterval = setInterval(nextSlide, 5000);
        }

        function resetAutoplay() {
            clearInterval(autoplayInterval);
            startAutoplay();
        }

        startAutoplay();
    }

    // =========================================
    // CONTACT FORM FEEDBACK
    // =========================================
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            // Collect form data
            const formData = {
                name: document.getElementById('name').value,
                company: document.getElementById('company').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            btn.textContent = 'Wird gesendet...';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    btn.textContent = 'Nachricht gesendet ✓';
                    btn.style.backgroundColor = '#3D7A77';
                    btn.style.opacity = '1';
                    contactForm.reset();
                } else {
                    const errorData = await response.json();
                    btn.textContent = 'Fehler aufgetreten';
                    btn.style.backgroundColor = '#ef4444';
                    console.error('Submission error:', errorData);
                    alert('Es gab einen Fehler beim Senden. Bitte versuchen Sie es später erneut.');
                }
            } catch (error) {
                console.error('Network error:', error);
                btn.textContent = 'Netzwerkfehler';
                btn.style.backgroundColor = '#ef4444';
                alert('Es gab einen Fehler beim Senden. Bitte überprüfen Sie Ihre Internetverbindung.');
            }

            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.backgroundColor = '';
                btn.style.opacity = '';
            }, 3000);
        });
    }

    // =========================================
    // TEAM MODAL FUNCTIONALITY
    // =========================================
    const teamModal = document.getElementById('team-modal');
    const teamMemberCards = document.querySelectorAll('.team-member-card');
    const modalClose = document.querySelector('.modal-close');
    const modalBackdrop = document.querySelector('.modal-backdrop');

    // Team Member Data - Complete WTM Team (from original website)
    const teamMembersData = {
        1: {
            name: 'Dr. Till Reichert',
            role: 'Geschäftsführer',
            photo: 'assets/team/till-reichert.jpg',
            tags: ['Führungskräfteentwicklung', 'Coaching', 'Projektmanagement'],
            bio: [
                'Als Business Trainer und Coach sowie als Lehr-Coach und Hochschuldozent hat Till Reichert mehrere Tausend Menschen u.a. zu den Themen Führung und Kommunikation unterstützt.',
                'Als Geschäftsführer und Mitgesellschafter von WTM Management Consulting entwirft er mit Kunden maßgeschneiderte Lösungen im Bereich der Personal- und Organisationsentwicklung.'
            ],
            qualifications: [
                'Dr. rer. oec., Diplom-Ökonom (Ruhr-Universität Bochum)',
                'Zertifizierter Coach (Dr. Migge-Seminare)',
                'Geprüfter Business-Trainer BDVT'
            ]
        },
        2: {
            name: 'Malte Werner',
            role: 'Geschäftsführer',
            photo: 'assets/team/malte-werner.jpg',
            tags: ['Führungskräfteentwicklung', 'Teamentwicklung', 'Digitale Transformation'],
            bio: [
                'Malte Werner hat Philosophie, Politik und Ökonomik sowie Ethik & Organisation an der Universität Witten/Herdecke studiert. Er ist Mitgesellschafter und Teil der Geschäftsleitung von WTM Management Consulting.',
                'Durch eine Balance zwischen humorvollem Elan und der nötigen Seriosität gestaltet er Coachings und Trainings ausgewogen. Eine hohe Beobachtungsgabe für Details ermöglicht ihm, die kleinen Stellschrauben zu identifizieren.'
            ],
            qualifications: [
                'M.A. Ethik & Organisation (Universität Witten/Herdecke)',
                'Coachingausbildung',
                'Organisationsberater'
            ]
        },
        3: {
            name: 'Dr. Olaf Werner',
            role: 'Trainer & Coach',
            // photo: PLACEHOLDER reused from old ID 4 code block logic if needed, but array has photo property.
            // In the HTML it uses a placeholder. We keep photo property null or empty string to trigger placeholder logic in openTeamModal if desired, 
            // OR we point to a placeholder image if one existed. 
            // The logic says: if (member.photo) { ... } else { ...placeholder... }
            // HTML for ID 3 uses a placeholder. So we can leave photo undefined or null.
            photo: '',
            tags: ['Rhetorik', 'Selbstmanagement', 'Systemische Beratung'],
            bio: [
                'Dr. Olaf Werner ist Trainer bei WTM Management Consulting mit Expertise in Selbstmanagement, KVP (Kontinuierlicher Verbesserungsprozess) und Rhetorik.',
                'Sein Ansatz verbindet systemische Beratung mit praktischen Werkzeugen für den beruflichen Alltag.'
            ],
            qualifications: [
                'Promotion',
                'Rhetorik-Trainer',
                'Systemischer Berater'
            ]
        },
        4: {
            name: 'Carmen Werner',
            role: 'Trainerin & Coach',
            photo: 'assets/team/Carmen-Werner-Team_500x500.jpg',
            tags: ['Training', 'Coaching', 'Kommunikation'],
            bio: [
                'Carmen Werner ist Trainerin und Coach bei WTM Management Consulting.',
                'Sie unterstützt Menschen in ihrer Kommunikation und Entwicklung.'
            ],
            qualifications: [
                'Trainerin',
                'Coach',
                'Kommunikationsexpertin'
            ]
        },
        5: {
            name: 'Philipp Besch',
            role: 'Trainer & Coach',
            photo: 'assets/team/Team-Phillip_Besch-500x500-1.jpg',
            tags: ['Training', 'Coaching', 'Entwicklung'],
            bio: [
                'Philipp Besch ist Trainer und Coach bei WTM Management Consulting.',
                'Er begleitet Menschen in ihrer beruflichen Entwicklung.'
            ],
            qualifications: [
                'Trainer',
                'Coach',
                'Entwicklungsbegleiter'
            ]
        },
        6: {
            name: 'Dr. Bettina Brendel',
            role: 'Trainerin & Coach',
            photo: 'assets/team/Team-Dr.-Bettina-Brendel-500x500-1.jpg',
            tags: ['Kommunikation', 'Führung', 'Persönlichkeit'],
            bio: [
                'Dr. Bettina Brendel ist Trainerin und Coach bei WTM Management Consulting.',
                'Sie unterstützt Führungskräfte und Teams in ihrer Entwicklung.'
            ],
            qualifications: [
                'Promotion',
                'Trainerin',
                'Coach'
            ]
        },
        7: {
            name: 'Andreas Cludius',
            role: 'Trainer & Berater',
            photo: 'assets/team/Cludius-Andreas-Team-500x500-1.jpg',
            tags: ['Vertrauen', 'Führung', 'Teamdynamik'],
            bio: [
                'Andreas Cludius ist Trainer und Berater bei WTM Management Consulting.',
                'Er beschäftigt sich intensiv mit den Themen Vertrauen in der Führung und organisationale Freundschaft.'
            ],
            qualifications: [
                'Trainer',
                'Berater',
                'Führungsexperte'
            ]
        },
        8: {
            name: 'Dr. Bettina Hailer',
            role: 'Trainerin & Coach',
            photo: 'assets/team/Team-Dr.-Bettina-Hailer-500x500-1.jpg',
            tags: ['Führung', 'Kommunikation', 'Coaching'],
            bio: [
                'Dr. Bettina Hailer ist Trainerin und Coach bei WTM Management Consulting.',
                'Sie unterstützt Führungskräfte bei ihrer Entwicklung.'
            ],
            qualifications: [
                'Promotion',
                'Trainerin',
                'Coach'
            ]
        },
        9: {
            name: 'Wolfgang Hoffmann',
            role: 'Trainer & Coach',
            photo: 'assets/team/Team-Foto-Wolfgang-Hoffmann.jpg',
            tags: ['Training', 'Coaching', 'Führung'],
            bio: [
                'Wolfgang Hoffmann ist Trainer und Coach bei WTM Management Consulting.',
                'Er unterstützt Führungskräfte und Teams.'
            ],
            qualifications: [
                'Trainer',
                'Coach',
                'Führungsentwickler'
            ]
        },
        10: {
            name: 'Melanie Kubala',
            role: 'Trainerin & Coach',
            photo: 'assets/team/Team-Melanie-Kubala-500x500-1.jpg',
            tags: ['Training', 'Entwicklung', 'Coaching'],
            bio: [
                'Melanie Kubala ist Trainerin und Coach bei WTM Management Consulting.',
                'Sie begleitet Menschen und Organisationen in Veränderungsprozessen mit einem Fokus auf nachhaltige Entwicklung.'
            ],
            qualifications: [
                'Zertifizierte Trainerin',
                'Systemischer Coach',
                'Personalentwicklerin'
            ]
        },
        11: {
            name: 'Hermann Josef Leiders',
            role: 'Trainer & Coach',
            photo: 'assets/team/Harry_Leiders_team_500x500.jpg',
            tags: ['Training', 'Coaching', 'Führung'],
            bio: [
                'Hermann Josef Leiders ist Trainer und Coach bei WTM Management Consulting.',
                'Er unterstützt Führungskräfte bei ihrer Entwicklung.'
            ],
            qualifications: [
                'Trainer',
                'Coach',
                'Führungsentwickler'
            ]
        },
        12: {
            name: 'Heike Neidhart',
            role: 'Trainerin & Coach',
            photo: 'assets/team/Profilbild_Heike_Neidhart_Team_500x500.jpg',
            tags: ['Training', 'Coaching', 'Persönlichkeit'],
            bio: [
                'Heike Neidhart ist Trainerin und Coach bei WTM Management Consulting.',
                'Sie begleitet Menschen bei ihrer persönlichen Entwicklung.'
            ],
            qualifications: [
                'Trainerin',
                'Coach',
                'Persönlichkeitsentwicklerin'
            ]
        },
        13: {
            name: 'Gerold Pohl',
            role: 'Trainer & Coach',
            photo: 'assets/team/Gerold-Pohl-Team-500-x-500.jpg',
            tags: ['Training', 'Coaching', 'Entwicklung'],
            bio: [
                'Gerold Pohl ist Trainer und Coach bei WTM Management Consulting.',
                'Er unterstützt Menschen und Teams bei ihrer Entwicklung.'
            ],
            qualifications: [
                'Trainer',
                'Coach',
                'Entwicklungsbegleiter'
            ]
        },
        14: {
            name: 'Jürgen Reus',
            role: 'Trainer & Coach',
            photo: 'assets/team/Reus-Juergen-Team-Portrait-500x500-1.jpg',
            tags: ['Training', 'Expertise', 'Coaching'],
            bio: [
                'Jürgen Reus ist Trainer und Coach bei WTM Management Consulting.',
                'Er bringt langjährige Expertise in Training und Coaching ein, um Potenziale zu entfalten.'
            ],
            qualifications: [
                'Zertifizierter Trainer',
                'Business Coach',
                'Experte für Kommunikation'
            ]
        },
        15: {
            name: 'Maik Rieß',
            role: 'Trainer & Coach',
            photo: 'assets/team/Team-Maik-Riess-500x500-1.jpg',
            tags: ['Training', 'Coaching', 'Teamentwicklung'],
            bio: [
                'Maik Rieß ist Trainer und Coach bei WTM Management Consulting.',
                'Er begleitet Teams und Einzelpersonen in ihrer Entwicklung.'
            ],
            qualifications: [
                'Trainer',
                'Coach',
                'Teamentwickler'
            ]
        },
        16: {
            name: 'Dr. Sarolf Sauer',
            role: 'Trainer & Coach',
            photo: 'assets/team/Sarolf_Sauer_Team_500x500.jpg',
            tags: ['Führung', 'Kommunikation', 'Persönlichkeit'],
            bio: [
                'Dr. Sarolf Sauer ist Trainer und Coach bei WTM Management Consulting.',
                'Er unterstützt Führungskräfte bei ihrer persönlichen Entwicklung.'
            ],
            qualifications: [
                'Promotion',
                'Trainer',
                'Coach'
            ]
        },
        17: {
            name: 'Marcus Schmidt',
            role: 'Trainer & Berater',
            photo: 'assets/team/Team-Marcus-Schmidt-6-23.jpg',
            tags: ['Führung', 'Haltung', 'Organisation'],
            bio: [
                'Marcus Schmidt ist Trainer und Berater bei WTM Management Consulting.',
                'Er beschäftigt sich intensiv mit dem Thema Haltung und Führung in turbulenten Zeiten.'
            ],
            qualifications: [
                'Trainer',
                'Berater',
                'Führungsexperte'
            ]
        },
        18: {
            name: 'Kirsten Schmiegelt',
            role: 'Trainerin & Coach',
            photo: 'assets/team/Kirsten_Schmiegelt_3-1.jpg',
            tags: ['Training', 'Coaching', 'Kommunikation'],
            bio: [
                'Kirsten Schmiegelt ist Trainerin und Coach bei WTM Management Consulting.',
                'Sie unterstützt Menschen in ihrer Kommunikation und Entwicklung.'
            ],
            qualifications: [
                'Trainerin',
                'Coach',
                'Kommunikationsexpertin'
            ]
        },
        19: {
            name: 'Markus Schramm',
            role: 'Trainer & Coach',
            photo: 'assets/team/Markus-Schramm-Portrait-Team-500-x-500.jpg',
            tags: ['Training', 'Coaching', 'Teamentwicklung'],
            bio: [
                'Markus Schramm ist Trainer und Coach bei WTM Management Consulting.',
                'Er begleitet Teams und Führungskräfte bei ihrer Entwicklung.'
            ],
            qualifications: [
                'Trainer',
                'Coach',
                'Teamentwickler'
            ]
        },
        20: {
            name: 'Heike Stalling',
            role: 'Trainerin & Coach',
            photo: 'assets/team/Stalling-Heike-Team-Portrait-500x500-6-23.jpg',
            tags: ['Training', 'Coaching', 'Kommunikation'],
            bio: [
                'Heike Stalling ist Trainerin und Coach bei WTM Management Consulting.',
                'Sie begleitet Menschen in ihrer beruflichen Entwicklung.'
            ],
            qualifications: [
                'Trainerin',
                'Coach',
                'Kommunikationsexpertin'
            ]
        },
        21: {
            name: 'Dr. Tamara Thomsen',
            role: 'Trainerin & Coach',
            photo: 'assets/team/Tamara-Thomsen-Team_500x500.jpg',
            tags: ['Training', 'Coaching', 'Entwicklung'],
            bio: [
                'Dr. Tamara Thomsen ist Trainerin und Coach bei WTM Management Consulting.',
                'Sie begleitet Menschen in ihrer beruflichen und persönlichen Entwicklung.'
            ],
            qualifications: [
                'Promotion',
                'Trainerin',
                'Coach'
            ]
        },
        22: {
            name: 'Uta-Barbara Vogel',
            role: 'Trainerin & Coach',
            photo: 'assets/team/Team-Vogel-Barbara-500x500-1.jpg',
            tags: ['Training', 'Coaching', 'Persönlichkeit'],
            bio: [
                'Uta-Barbara Vogel ist Trainerin und Coach bei WTM Management Consulting.',
                'Sie begleitet Menschen bei ihrer persönlichen Entwicklung.'
            ],
            qualifications: [
                'Trainerin',
                'Coach',
                'Persönlichkeitsentwicklerin'
            ]
        },
        23: {
            name: 'Frank Titzer',
            role: 'Coach & Supervisor',
            photo: '', // Placeholder will be used
            tags: ['Klärungshilfe', 'Coaching', 'Supervision'],
            bio: [
                'Frank Titzer ist Coach, Supervisor und Experte für Klärungshilfe bei WTM Management Consulting.',
                'Er unterstützt Menschen und Organisationen in den Bereichen Kommunikation und Führung.'
            ],
            qualifications: [
                'Klärungshelfer',
                'Coach',
                'Supervisor'
            ]
        }
    };

    function openTeamModal(memberId) {
        const member = teamMembersData[memberId];
        if (!member || !teamModal) return;

        // Populate modal with member data
        const modalName = teamModal.querySelector('.modal-name');
        const modalRole = teamModal.querySelector('.modal-role');
        const modalTags = teamModal.querySelector('.modal-tags');
        const modalBio = teamModal.querySelector('.modal-bio');
        const modalQualifications = teamModal.querySelector('.modal-qualifications ul');
        const modalPhotoContainer = document.getElementById('modal-photo-container');

        if (modalName) modalName.textContent = member.name;
        if (modalRole) modalRole.textContent = member.role;

        // Update photo
        if (modalPhotoContainer) {
            if (member.photo) {
                modalPhotoContainer.innerHTML = `<img src="${member.photo}" alt="${member.name}" loading="lazy">`;
            } else {
                modalPhotoContainer.innerHTML = `
                    <div class="photo-placeholder large">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                            <circle cx="12" cy="8" r="4" />
                            <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                        </svg>
                    </div>
                `;
            }
        }

        // Update tags
        if (modalTags) {
            modalTags.innerHTML = member.tags.map(tag =>
                `<span class="member-tag">${tag}</span>`
            ).join('');
        }

        // Update bio
        if (modalBio) {
            modalBio.innerHTML = member.bio.map(p => `<p>${p}</p>`).join('');
        }

        // Update qualifications
        if (modalQualifications) {
            modalQualifications.innerHTML = member.qualifications.map(q =>
                `<li>${q}</li>`
            ).join('');
        }

        // Show modal
        teamModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeTeamModal() {
        if (!teamModal) return;
        teamModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners for team cards
    teamMemberCards.forEach(card => {
        card.addEventListener('click', () => {
            const memberId = card.getAttribute('data-member');
            openTeamModal(memberId);
        });
    });

    // Close modal events
    if (modalClose) {
        modalClose.addEventListener('click', closeTeamModal);
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeTeamModal);
    }

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && teamModal && teamModal.classList.contains('active')) {
            closeTeamModal();
        }
    });

    // Close modal when clicking contact button inside
    const modalCta = teamModal ? teamModal.querySelector('.modal-cta') : null;
    if (modalCta) {
        modalCta.addEventListener('click', closeTeamModal);
    }

    // =========================================
    // COOKIE CONSENT BANNER
    // =========================================
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const essentialCookiesBtn = document.getElementById('essential-cookies');
    const cookieSettingsLink = document.getElementById('cookie-settings-link');

    function setCookieConsent(type) {
        const consent = {
            essential: true,
            analytics: type === 'all',
            marketing: type === 'all',
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('wtm-cookie-consent', JSON.stringify(consent));
    }

    function getCookieConsent() {
        const consent = localStorage.getItem('wtm-cookie-consent');
        return consent ? JSON.parse(consent) : null;
    }

    function showCookieBanner() {
        if (cookieBanner) {
            // Small delay for animation
            setTimeout(() => {
                cookieBanner.classList.add('visible');
            }, 500);
        }
    }

    function hideCookieBanner() {
        if (cookieBanner) {
            cookieBanner.classList.remove('visible');
        }
    }

    // Initialize cookie banner
    if (cookieBanner) {
        const existingConsent = getCookieConsent();

        if (!existingConsent) {
            showCookieBanner();
        }

        // Accept all cookies
        if (acceptCookiesBtn) {
            acceptCookiesBtn.addEventListener('click', () => {
                setCookieConsent('all');
                hideCookieBanner();
            });
        }

        // Essential only
        if (essentialCookiesBtn) {
            essentialCookiesBtn.addEventListener('click', () => {
                setCookieConsent('essential');
                hideCookieBanner();
            });
        }

        // Cookie settings link - re-show banner
        if (cookieSettingsLink) {
            cookieSettingsLink.addEventListener('click', (e) => {
                e.preventDefault();
                showCookieBanner();
            });
        }
    }

    console.log('WTM Corporate Website Loaded');
});
