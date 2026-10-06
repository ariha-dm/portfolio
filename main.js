/* ARIHA MUSHTAQ PORTFOLIO — main.js */

/* Preloader */
window.addEventListener('load',()=>{
  const pre=document.getElementById('preloader');
  if(!pre)return;
  setTimeout(()=>{pre.classList.add('hidden');setTimeout(()=>pre.style.display='none',700)},2400);
});

/* Navbar */
function toggleMenu(){const m=document.getElementById('mobileMenu');if(m)m.classList.toggle('open')}
window.addEventListener('scroll',()=>{
  const n=document.querySelector('.navbar');
  if(n)n.classList.toggle('scrolled',window.scrollY>30);
});

/* Active link */
(function(){
  const page=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a,.mobile-menu a').forEach(a=>{
    if(a.getAttribute('href')===page)a.classList.add('active');
  });
})();

/* Fade-up on scroll */
(function(){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}});
  },{threshold:0.12});
  document.querySelectorAll('.fade-up').forEach(el=>obs.observe(el));
})();

/* Skill bars */
(function(){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const f=e.target.querySelector('.skill-fill');
        if(f)f.style.width=f.dataset.w;
        obs.unobserve(e.target);
      }
    });
  },{threshold:0.3});
  document.querySelectorAll('.skill-bar-item').forEach(el=>obs.observe(el));
})();

/* Typewriter */
(function(){
  const el=document.getElementById('typewriter');
  if(!el)return;
  const words=['Online Marketer','Sales Representative','Computer Science Student','Fast Learner'];
  let wi=0,ci=0,del=false;
  function type(){
    const w=words[wi];
    el.textContent=del?w.slice(0,ci--):w.slice(0,ci++);
    let d=del?60:100;
    if(!del&&ci>w.length){d=1800;del=true;}
    else if(del&&ci<0){del=false;wi=(wi+1)%words.length;ci=0;d=400;}
    setTimeout(type,d);
  }
  type();
})();

/* Contact form */
(function(){
  const form=document.getElementById('contactForm');
  if(!form)return;
  function showErr(id,msg){const e=document.getElementById(id);if(e){e.textContent=msg;e.classList.add('show');}}
  function clearErr(id){const e=document.getElementById(id);if(e)e.classList.remove('show');}
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    ['nameErr','emailErr','msgErr'].forEach(clearErr);
    let ok=true;
    const name=form.fname.value.trim();
    const email=form.femail.value.trim();
    const msg=form.fmsg.value.trim();
    if(!name){showErr('nameErr','Please enter your name.');ok=false;}
    if(!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){showErr('emailErr','Please enter a valid email.');ok=false;}
    if(!msg){showErr('msgErr','Please write a message.');ok=false;}
    if(!ok)return;
    const btn=form.querySelector('.btn-submit');
    btn.disabled=true;btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Sending...';
    try{
      const res=await fetch('https://formspree.io/f/mjgjopyw',{
        method:'POST',headers:{Accept:'application/json'},body:new FormData(form)
      });
      if(res.ok){
        form.reset();
        document.getElementById('formSuccess').classList.add('show');
        btn.innerHTML='<i class="fas fa-paper-plane"></i> Send Message';btn.disabled=false;
      }else{btn.innerHTML='Error — Try Again';btn.disabled=false;}
    }catch{btn.innerHTML='Error — Try Again';btn.disabled=false;}
  });
})();
