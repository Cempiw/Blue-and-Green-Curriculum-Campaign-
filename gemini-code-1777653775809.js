document.addEventListener('DOMContentLoaded', () => {
    /* CURSOR LOGIC */
    const cur = document.getElementById('cur');
    const curR = document.getElementById('curR');
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        cur.style.left = mx + 'px';
        cur.style.top = my + 'px';
    });

    setInterval(() => {
        rx += (mx - rx) * 0.13;
        ry += (my - ry) * 0.13;
        curR.style.left = rx + 'px';
        curR.style.top = ry + 'px';
    }, 16);

    // Hover effect for interactive elements
    const hoverEls = 'a, button, .why-card, .case-card, .curr-card, .data-card, .sdg-card';
    document.querySelectorAll(hoverEls).forEach(el => {
        el.addEventListener('mouseenter', () => {
            cur.classList.add('hov');
            curR.classList.add('hov');
        });
        el.addEventListener('mouseleave', () => {
            cur.classList.remove('hov');
            curR.classList.remove('hov');
        });
    });

    /* SPARKLES GENERATION */
    const sparkleSymbols = ['✦', '✧', '⭐', '✨'];
    const sc = document.getElementById('sparkleContainer');
    if (sc) {
        for (let i = 0; i < 15; i++) {
            const s = document.createElement('span');
            s.className = 'sparkle';
            s.textContent = sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)];
            s.style.cssText = `
                left:${Math.random() * 100}%;
                font-size:${0.7 + Math.random() * 1.3}rem;
                animation-duration:${7 + Math.random() * 9}s;
                animation-delay:${Math.random() * 5}s;
            `;
            sc.appendChild(s);
        }
    }

    /* PROGRESS BAR & BACK TO TOP */
    const prog = document.getElementById('prog');
    const backTop = document.getElementById('backTop');
    window.addEventListener('scroll', () => {
        const st = window.scrollY;
        const h = document.body.scrollHeight - window.innerHeight;
        if (prog) prog.style.width = (st / h * 100) + '%';
        if (backTop) backTop.classList.toggle('show', st > 500);
    });

    /* SCROLL REVEAL */
    const revEls = document.querySelectorAll('.rev, .rev-l, .rev-r');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add('on');
        });
    }, { threshold: 0.1 });
    revEls.forEach(el => observer.observe(el));

    /* COUNTER ANIMATION */
    function runCounter(el) {
        if (el.dataset.done) return;
        el.dataset.done = '1';
        const target = parseFloat(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const inc = target / 60;
        const timer = setInterval(() => {
            current += inc;
            if (current >= target) {
                el.textContent = target + suffix;
                clearInterval(timer);
            } else {
                el.textContent = (Number.isInteger(target) ? Math.round(current) : current.toFixed(1)) + suffix;
            }
        }, 30);
    }

    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const cnt = e.target.querySelector('.counter');
                if (cnt) runCounter(cnt);
            }
        });
    }, { threshold: 0.3 });
    document.querySelectorAll('.data-card').forEach(c => counterObserver.observe(c));
});

/* TAB SWITCHER */
function switchCase(type, btn) {
    document.querySelectorAll('.case-grid').forEach(g => g.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active-blue', 'active-green'));
    
    document.getElementById('grid-' + type).classList.add('active');
    btn.classList.add(type === 'blue' ? 'active-blue' : 'active-green');
}