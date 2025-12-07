// Particle + performance-optimized main script
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

// DPR cap for performance/canvas pixel ratio
const DPR = Math.min(window.devicePixelRatio || 1, 1.5);
let width = Math.floor(window.innerWidth * DPR);
let height = Math.floor(window.innerHeight * DPR);
canvas.width = width;
canvas.height = height;
canvas.style.width = window.innerWidth + 'px';
canvas.style.height = window.innerHeight + 'px';
ctx.scale(DPR, DPR);

// determine particle count based on screen size & hardware
function calcParticleCount(){
    const base = Math.max(30, Math.min(120, Math.floor(window.innerWidth / 14)));
    const hc = navigator.hardwareConcurrency || 4;
    // reduce for low-core devices
    const factor = hc <= 2 ? 0.45 : (hc <= 4 ? 0.75 : 1);
    return Math.max(20, Math.floor(base * factor));
}
let PARTICLE_COUNT = calcParticleCount();
window.PARTICLE_RGB = window.PARTICLE_RGB || '160,108,213';

// adaptive connection checks frequency
function calcConnectionFrameSkip(){
    const hc = navigator.hardwareConcurrency || 4;
    if(hc <= 2) return 3; // check connections every 3 frames on weak devices
    if(hc <= 4) return 2;
    return 1;
}
let connectionFrameSkip = calcConnectionFrameSkip();

// particle settings
let connectionDistance = 100; // px

// Reduce work on small screens
if(window.innerWidth < 768){
    connectionDistance = 80;
}

// Debounced resize to avoid layout thrash
let resizeTimeout = null;
function handleResize(){
    if(resizeTimeout) clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(()=>{
        const newDPR = Math.min(window.devicePixelRatio || 1, 1.5);
        width = Math.floor(window.innerWidth * newDPR);
        height = Math.floor(window.innerHeight * newDPR);
        canvas.width = width; canvas.height = height;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        ctx.setTransform(newDPR, 0, 0, newDPR, 0, 0);
        // recalc particle count and data
        PARTICLE_COUNT = calcParticleCount();
        connectionFrameSkip = calcConnectionFrameSkip();
        // if particles array smaller/larger, regenerate
        while(particles.length < PARTICLE_COUNT) particles.push(new Particle());
        while(particles.length > PARTICLE_COUNT) particles.pop();
    }, 150);
}
window.addEventListener('resize', handleResize, {passive:true});

// simple Particle
class Particle{
    constructor(){
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.x > window.innerWidth) this.x = 0;
        if(this.x < 0) this.x = window.innerWidth;
        if(this.y > window.innerHeight) this.y = 0;
        if(this.y < 0) this.y = window.innerHeight;
    }

    draw(){
        ctx.fillStyle = `rgba(${window.PARTICLE_RGB}, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// create particles adaptively
const particles = [];
for(let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

let frameCounter = 0;
function animateParticles(){
    // clear using a single rect in canvas coordinate (CSS scaled)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < particles.length; i++){
        particles[i].update();
        particles[i].draw();
    }

    // Compute connections less frequently on weak devices
    if(frameCounter % connectionFrameSkip === 0){
        for(let i = 0; i < particles.length; i++){
            for(let j = i + 1; j < particles.length; j++){
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if(distance < connectionDistance){
                    const alpha = 0.08 * (1 - distance / connectionDistance);
                    ctx.strokeStyle = `rgba(${window.PARTICLE_RGB}, ${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    frameCounter++;
    requestAnimationFrame(animateParticles);
}

requestAnimationFrame(animateParticles);

// Intersection observer remains - it's efficient; keep it
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries)=>{ entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add('animated'); }); }, observerOptions);
document.querySelectorAll('.animate-on-scroll').forEach(el=> observer.observe(el));

// Only attach hover/3D mousemove effects on devices with pointer fine
const supportsFinePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if(supportsFinePointer){
    document.querySelectorAll('.card-3d').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px) scale(1.02)`;
        }, {passive:true});

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        }, {passive:true});
    });
}

// Debounced scroll handler for parallax that uses rAF (passive)
let scrollTicking = false;
window.addEventListener('scroll', ()=>{ if(!scrollTicking){ window.requestAnimationFrame(()=>{
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.float-animate:not(.profile-image-container)');
    parallaxElements.forEach(el=>{
        const speed = parseFloat(el.dataset.parallaxSpeed) || 0.3;
        const max = 40;
        const y = Math.max(Math.min(scrolled * speed, max), -max);
        el.style.transform = `translateY(${y}px)`;
    });
    const profile = document.querySelector('.profile-image-container.float-animate');
    if(profile){ const speed = 0.08; const y = Math.max(Math.min(scrolled * speed, 10), -10); profile.style.transform = `translateY(${y}px)`; }
    scrollTicking = false;
    }); scrollTicking = true; } }, {passive:true});

// Adjust spacer height on load/resize (debounced)
function adjustBodyForFixedHeader(){
    const nav = document.querySelector('nav');
    const spacer = document.getElementById('nav-spacer');
    if(nav && spacer){
        const navHeight = nav.getBoundingClientRect().height;
        spacer.style.height = navHeight + 'px';
        spacer.style.width = '100%';
    }
}
window.addEventListener('load', ()=>{ adjustBodyForFixedHeader(); const loadingBar = document.getElementById('loading-bar'); if(loadingBar){ setTimeout(()=>{ loadingBar.style.opacity = '0'; }, 1200); } });
window.addEventListener('resize', ()=>{ adjustBodyForFixedHeader(); handleResize(); }, {passive:true});

// Keep typewriter + small animations
const title = document.querySelector('h1'); if(title){ const text = title.textContent; title.textContent = ''; let i = 0; const typeWriter = ()=>{ if(i < text.length){ title.textContent += text.charAt(i); i++; setTimeout(typeWriter, 60); } else { title.classList.remove('typing-effect'); } }; setTimeout(()=>{ title.classList.add('typing-effect'); typeWriter(); }, 400); }

// enforce nav top (safe fallback)
(function(){ try{ const nav = document.querySelector('nav'); const spacer = document.getElementById('nav-spacer'); if(nav){ nav.style.position='fixed'; nav.style.top='0px'; nav.style.left='0px'; nav.style.right='0px'; nav.style.zIndex='10000'; } if(nav && spacer){ const h = nav.getBoundingClientRect().height; spacer.style.height = h + 'px'; spacer.style.width = '100%'; } document.documentElement.style.margin='0'; document.body.style.margin='0'; } catch(e){} })();

// Theme handling (robust) + Smooth scroll enhancement
(function(){
    const THEME_KEY = 'site-theme';

    function getPreferredTheme(){
        try{
            const saved = localStorage.getItem(THEME_KEY);
            if(saved) return saved;
        } catch(e){}
        if(window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
        return 'dark';
    }

    function applyTheme(theme){
        const body = document.body;
        const icon = document.getElementById('theme-icon');
        if(theme === 'light'){
            body.classList.add('theme-light');
            if(icon) icon.textContent = '☀️';
            window.PARTICLE_RGB = '92,64,150';
        } else {
            body.classList.remove('theme-light');
            if(icon) icon.textContent = '🌙';
            window.PARTICLE_RGB = '160,108,213';
        }
    }

    function toggleTheme(){
        const current = document.body.classList.contains('theme-light') ? 'light' : 'dark';
        const next = current === 'light' ? 'dark' : 'light';
        applyTheme(next);
        try{ localStorage.setItem(THEME_KEY, next); } catch(e){}
    }

    // init theme after DOM ready to guarantee elements exist
    function initThemeBinding(){
        try{
            applyTheme(getPreferredTheme());
            const btn = document.getElementById('theme-toggle');
            if(btn){
                btn.addEventListener('click', (e)=>{ e.preventDefault(); toggleTheme(); });
                btn.addEventListener('keydown', (e)=>{ if(e.key==='Enter' || e.key===' ') { e.preventDefault(); toggleTheme(); } });
            }
        } catch(e){ console.warn('theme init failed', e); }
    }

    if(document.readyState === 'loading'){
        document.addEventListener('DOMContentLoaded', initThemeBinding);
    } else {
        initThemeBinding();
    }

    // --- Smooth scroll (simple) ---
    // We no longer intercept wheel/keyboard events to avoid any delay between user action and page movement.
    // Keep a simple anchor click handler that uses native smooth scrolling when available.
    if(supportsFinePointer && window.innerWidth > 480){
        function onAnchorClickSimple(e){
            const el = e.target.closest('a[href^="#"]');
            if(!el) return;
            const href = el.getAttribute('href');
            if(!href || href === '#') return;
            const id = href.slice(1);
            const target = document.getElementById(id);
            if(target){
                // allow native smooth behavior via scrollTo with behavior:'smooth'
                e.preventDefault();
                const nav = document.querySelector('nav');
                const navH = nav ? nav.getBoundingClientRect().height : 0;
                const rect = target.getBoundingClientRect();
                const absoluteY = window.scrollY + rect.top - navH - 8;
                if('scrollBehavior' in document.documentElement.style){
                    window.scrollTo({ top: Math.max(0, Math.round(absoluteY)), behavior: 'smooth' });
                } else {
                    window.scrollTo(0, Math.max(0, Math.round(absoluteY)));
                }
                // update hash without jump
                history.pushState(null, '', '#' + id);
            }
        }

        try{
            document.addEventListener('click', onAnchorClickSimple, {passive:false});
        } catch(e){
            document.addEventListener('click', onAnchorClickSimple);
        }
    }

})();

// Robust binding for "Voir plus" CTF button
(function(){
    function initCtfShowMore(){
        const btn = document.getElementById('ctf-show-more');
        const extras = document.querySelectorAll('[data-extra-card]');
        if(!btn || !extras || extras.length === 0) return;

        let expanded = false;
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-controls', 'ctf-grid');
        btn.addEventListener('click', (e) => {
            expanded = !expanded;
            extras.forEach(card => {
                if(expanded) card.classList.remove('hidden');
                else card.classList.add('hidden');
            });
            const textSpan = btn.querySelector('[data-i18n="ctf.showMore"]') || btn.querySelector('span');
            const iconSpan = btn.querySelector('span:last-child');
            if(expanded){
                if(textSpan) { textSpan.setAttribute('data-i18n','ctf.showLess'); textSpan.textContent = 'Voir moins'; }
                if(iconSpan) iconSpan.textContent = '▲';
                btn.setAttribute('aria-expanded', 'true');
            } else {
                if(textSpan) { textSpan.setAttribute('data-i18n','ctf.showMore'); textSpan.textContent = 'Voir plus'; }
                if(iconSpan) iconSpan.textContent = '▼';
                btn.setAttribute('aria-expanded', 'false');
            }
        });

        btn.addEventListener('keydown', (e) => {
            if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); btn.click(); }
        });
    }

    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initCtfShowMore);
    else initCtfShowMore();
})();
