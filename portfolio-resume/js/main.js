// main.js - 포트폴리오 웹사이트 JavaScript 기능

// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    
    // 모바일 메뉴 토글
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('show');
        });
        
        // 모바일 메뉴 링크 클릭 시 메뉴 닫기
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('show');
            });
        });
    }
    
    // 스무스 스크롤 네비게이션
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // 헤더 높이 고려
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 스크롤 시 네비게이션 활성 상태 업데이트
    function updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-accent-orange', 'font-bold');
            link.classList.add('text-gray-300');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.remove('text-gray-300');
                link.classList.add('text-accent-orange', 'font-bold');
            }
        });
    }
    
    // 타이핑 효과
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        let index = 0;
        
        function type() {
            if (index < text.length) {
                typingElement.textContent += text.charAt(index);
                index++;
                setTimeout(type, 100);
            }
        }
        
        // 약간의 딜레이 후 타이핑 시작
        setTimeout(type, 500);
    }
    
    // 스킬 프로그레스 바 애니메이션
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        
        skillBars.forEach(bar => {
            const targetWidth = bar.style.width;
            bar.style.width = '0';
            
            // Intersection Observer로 뷰포트에 들어올 때 애니메이션
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            bar.style.width = targetWidth;
                            bar.style.transition = 'width 1.5s ease-out';
                        }, 200);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(bar);
        });
    }
    
    // 프로젝트 필터링
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 활성 버튼 스타일 업데이트
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-gradient-to-r', 'from-accent-orange', 'to-accent-coral', 'text-white');
                b.classList.add('bg-dark-bg', 'border', 'border-dark-border', 'text-gray-300');
            });
            this.classList.remove('bg-dark-bg', 'border', 'border-dark-border', 'text-gray-300');
            this.classList.add('active', 'bg-gradient-to-r', 'from-accent-orange', 'to-accent-coral', 'text-white');
            
            // 프로젝트 필터링
            const filter = this.dataset.filter;
            
            projectItems.forEach((item, index) => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100); // 순차적 애니메이션
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // 스크롤 애니메이션 (Fade In)
    function initScrollAnimations() {
        const fadeElements = document.querySelectorAll('section > div');
        
        fadeElements.forEach(element => {
            element.classList.add('fade-in');
        });
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { threshold: 0.1 });
        
        fadeElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // 스크롤 투 탑 버튼
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('show');
                scrollToTopBtn.classList.remove('opacity-0', 'invisible');
            } else {
                scrollToTopBtn.classList.remove('show');
                scrollToTopBtn.classList.add('opacity-0', 'invisible');
            }
            
            // 네비게이션 활성 상태 업데이트
            updateActiveNav();
        });
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 연락처 폼 처리
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 폼 데이터 가져오기
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // 여기서 실제로는 서버로 데이터를 전송하거나 이메일 서비스를 사용
            console.log('폼 데이터:', data);
            
            // 성공 메시지 표시
            alert('메시지가 성공적으로 전송되었습니다!');
            this.reset();
        });
    }
    
    // 이미지 레이지 로딩
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // 마우스 호버 효과 (SNS 링크)
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // 페이지 로드 시 초기화
    function init() {
        animateSkillBars();
        initScrollAnimations();
        lazyLoadImages();
        updateActiveNav();
    }
    
    // 초기화 실행
    init();
    
    // 윈도우 리사이즈 시 모바일 메뉴 숨기기
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('show');
            }
        }
    });
    
    // 프린트 시 처리
    window.addEventListener('beforeprint', function() {
        // 프린트 전 모든 섹션 표시
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(el => el.classList.add('show'));
    });
    
    // 키보드 네비게이션 개선
    document.addEventListener('keydown', function(e) {
        // ESC 키로 모바일 메뉴 닫기
        if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('show');
        }
    });
    
    // 성능 최적화: 스크롤 이벤트 디바운싱
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(function() {
            updateActiveNav();
        });
    });
    
    // 페이지 가시성 API 활용
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // 페이지가 백그라운드로 갈 때
            console.log('페이지가 백그라운드로 전환됨');
        } else {
            // 페이지가 다시 활성화될 때
            console.log('페이지가 활성화됨');
        }
    });
    
    // 에러 처리
    window.addEventListener('error', function(e) {
        console.error('에러 발생:', e.error);
    });
    
    // 마우스 추적 그라디언트 효과 (Hero 섹션)
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;
        
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
            mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
        });
        
        function animateGradient() {
            currentX += (mouseX - currentX) * 0.1;
            currentY += (mouseY - currentY) * 0.1;
            
            const gradient1 = heroSection.querySelector('.absolute.top-20');
            const gradient2 = heroSection.querySelector('.absolute.bottom-20');
            
            if (gradient1) {
                gradient1.style.transform = `translate(${currentX}px, ${currentY}px)`;
            }
            if (gradient2) {
                gradient2.style.transform = `translate(${-currentX}px, ${-currentY}px)`;
            }
            
            requestAnimationFrame(animateGradient);
        }
        animateGradient();
    }
    
    // 파티클 효과
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.width = particle.style.height = Math.random() * 5 + 2 + 'px';
        particle.style.background = `rgba(255, 107, 107, ${Math.random() * 0.5})`;
        particle.style.borderRadius = '50%';
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 10000);
    }
    
    // 5초마다 파티클 생성
    setInterval(createParticle, 5000);
    
    // 타이핑 효과 개선
    const typingElements = document.querySelectorAll('[data-typing]');
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        
        let index = 0;
        function typeChar() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(typeChar, 100);
            }
        }
        
        // Intersection Observer로 보일 때 시작
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeChar();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
    
    // 콘솔 메시지
    console.log('%c포트폴리오 웹사이트에 오신 것을 환영합니다!', 
                'color: #FF6B6B; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px rgba(255,107,107,0.5);');
    console.log('%c개발자: Jensen Omega', 'color: #999; font-size: 14px;');
    console.log('%c연락처: example@email.com', 'color: #999; font-size: 14px;');
});

// 외부 스크립트 로드 완료 시
window.addEventListener('load', function() {
    console.log('모든 리소스 로드 완료');
    
    // 로딩 화면이 있다면 숨기기
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
});