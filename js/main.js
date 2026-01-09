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
    const trainingTabs = document.querySelectorAll('.training-tab');
    const trainingCategories = document.querySelectorAll('.training-category');

    trainingTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all
            trainingTabs.forEach(t => t.classList.remove('active'));
            trainingCategories.forEach(c => c.classList.remove('active'));

            // Add active to clicked
            tab.classList.add('active');
            const categoryId = tab.getAttribute('data-category');
            const targetCategory = document.getElementById(categoryId);
            if (targetCategory) {
                targetCategory.classList.add('active');
            }
        });
    });

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
            name: 'Frank Titzer',
            role: 'Gründer & Mitgeschäftsführer',
            tags: ['Führungscoaching', 'Klärungshilfe', 'Teamentwicklung'],
            bio: [
                'Frank Titzer berät und begleitet seit 27 Jahren Menschen in Führungs- und Veränderungssituationen. Er ist Gründer und Mitgeschäftsführer von WTM Management Consulting.',
                'Von seinen Kunden wird er als präsent, zugewandt, bodenständig und klar beschrieben – stets geerdet in einer wertschätzenden Grundhaltung.'
            ],
            qualifications: [
                'M.A. Sprach- & Literaturwissenschaft/Pädagogik',
                'Supervisor (DGSv)',
                'Konfliktklärungshelfer nach Christoph Thomann'
            ]
        },
        4: {
            name: 'Dr. Olaf Werner',
            role: 'Trainer & Coach',
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
        5: {
            name: 'Hans-Jürgen Butz',
            role: 'Trainer & Coach',
            tags: ['Führung', 'Kommunikation', 'Teamentwicklung'],
            bio: [
                'Hans-Jürgen Butz ist erfahrener Trainer und Coach bei WTM Management Consulting.',
                'Er begleitet Führungskräfte und Teams in ihrer Entwicklung.'
            ],
            qualifications: [
                'Erfahrener Trainer',
                'Systemischer Coach',
                'Teamentwickler'
            ]
        },
        6: {
            name: 'Dr. Thomas von Sehlen',
            role: 'Trainer & Berater',
            tags: ['Strategie', 'Organisation', 'Führung'],
            bio: [
                'Dr. Thomas von Sehlen ist Trainer und Berater bei WTM Management Consulting.',
                'Er unterstützt Unternehmen bei strategischen Herausforderungen.'
            ],
            qualifications: [
                'Promotion',
                'Strategieberater',
                'Organisationsentwickler'
            ]
        },
        7: {
            name: 'Oliver Muhler',
            role: 'Trainer & Coach',
            tags: ['Training', 'Coaching', 'Entwicklung'],
            bio: [
                'Oliver Muhler ist Trainer und Coach bei WTM Management Consulting.',
                'Er begleitet Menschen und Teams in ihrer beruflichen Entwicklung.'
            ],
            qualifications: [
                'Trainer',
                'Coach',
                'Entwicklungsbegleiter'
            ]
        },
        8: {
            name: 'Dr. Sarolf Sauer',
            role: 'Trainer & Coach',
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
        9: {
            name: 'Dr. Tamara Thomsen',
            role: 'Trainerin & Coach',
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
        10: {
            name: 'Dr. Bettina Brendel',
            role: 'Trainerin & Coach',
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
        11: {
            name: 'Markus Schramm',
            role: 'Trainer & Coach',
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
        12: {
            name: 'Marcus Schmidt',
            role: 'Trainer & Berater',
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
        13: {
            name: 'Andrea Hohlweck',
            role: 'Trainerin & Coach',
            tags: ['Training', 'Coaching', 'Entwicklung'],
            bio: [
                'Andrea Hohlweck ist Trainerin und Coach bei WTM Management Consulting.',
                'Sie begleitet Menschen in ihrer beruflichen Entwicklung.'
            ],
            qualifications: [
                'Trainerin',
                'Coach',
                'Entwicklungsbegleiterin'
            ]
        },
        14: {
            name: 'Carmen Werner',
            role: 'Trainerin & Coach',
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
        15: {
            name: 'Uta Barbara Vogel',
            role: 'Trainerin & Coach',
            tags: ['Training', 'Coaching', 'Persönlichkeit'],
            bio: [
                'Uta Barbara Vogel ist Trainerin und Coach bei WTM Management Consulting.',
                'Sie begleitet Menschen bei ihrer persönlichen Entwicklung.'
            ],
            qualifications: [
                'Trainerin',
                'Coach',
                'Persönlichkeitsentwicklerin'
            ]
        },
        16: {
            name: 'Dr. Bettina Hailer',
            role: 'Trainerin & Coach',
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
        17: {
            name: 'Maik Riess',
            role: 'Trainer & Coach',
            tags: ['Training', 'Coaching', 'Teamentwicklung'],
            bio: [
                'Maik Riess ist Trainer und Coach bei WTM Management Consulting.',
                'Er begleitet Teams und Einzelpersonen in ihrer Entwicklung.'
            ],
            qualifications: [
                'Trainer',
                'Coach',
                'Teamentwickler'
            ]
        },
        18: {
            name: 'Andreas Cludius',
            role: 'Trainer & Berater',
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
        19: {
            name: 'Hermann-Josef Leiders',
            role: 'Trainer & Coach',
            tags: ['Training', 'Coaching', 'Führung'],
            bio: [
                'Hermann-Josef Leiders ist Trainer und Coach bei WTM Management Consulting.',
                'Er unterstützt Führungskräfte bei ihrer Entwicklung.'
            ],
            qualifications: [
                'Trainer',
                'Coach',
                'Führungsentwickler'
            ]
        },
        20: {
            name: 'Heike Stalling',
            role: 'Trainerin & Coach',
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
            name: 'Gerold Pohl',
            role: 'Trainer & Coach',
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
        22: {
            name: 'Heike Neidhart',
            role: 'Trainerin & Coach',
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
        23: {
            name: 'Wolfgang Hoffmann',
            role: 'Trainer & Coach',
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
        24: {
            name: 'Philipp Besch',
            role: 'Trainer & Coach',
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
        25: {
            name: 'Kirsten Schmiegelt',
            role: 'Trainerin & Coach',
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
