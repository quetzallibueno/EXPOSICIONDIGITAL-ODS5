const people=[
["Artemisia Gentileschi","1593 — 1656","arte","🎨","#e66d91","Arte · Pintura barroca","Una de las grandes pintoras del Barroco italiano.","Pintora barroca italiana reconocida por sus composiciones de gran fuerza narrativa.","La presencia de las mujeres también forma parte de la historia del arte.","Susana y los viejos"],
["Ada Lovelace","1815 — 1852","ciencia","⌘","#83a8cf","Ciencia · Matemáticas · Computación","Pionera en la historia de la programación.","Matemática inglesa que escribió un algoritmo para la máquina analítica.","Las máquinas podían trabajar con símbolos y abrir nuevas posibilidades.","Ada Lovelace"],
["Camille Claudel","1864 — 1943","arte","🗿","#dfae59","Arte · Escultura","Exploró emoción, cuerpo y movimiento.","Escultora francesa cuya obra destacó por su expresividad y movimiento.","La materia puede convertirse en movimiento, memoria y emoción.","La edad madura"],
["Marie Curie","1867 — 1934","ciencia","⚗","#91b58e","Ciencia · Física · Química","Pionera de la investigación sobre la radiactividad.","Física y química que investigó la radiactividad y recibió dos premios Nobel.","La investigación puede abrir caminos donde antes existían barreras.","Marie Curie"],
["Georgia O'Keeffe","1887 — 1986","arte","🌸","#d99b72","Arte · Pintura · Modernismo","Amplió las posibilidades de la pintura moderna.","Artista estadounidense conocida por sus flores, paisajes y abstracciones.","Una forma puede convertirse en un universo visual.","Jimson Weed"],
["Frida Kahlo","1907 — 1954","arte","🌺","#d66d73","Arte · Pintura · Identidad","Convirtió la experiencia personal en lenguaje visual.","Artista mexicana cuya pintura desarrolló un lenguaje autobiográfico sobre identidad y memoria.","El autorretrato puede convertirse en una forma de construir identidad.","Las dos Fridas"],
["Hedy Lamarr","1914 — 2000","ciencia","📡","#9bb58d","Ciencia · Tecnología · Inventos","También fue inventora en el campo de las comunicaciones.","Su trabajo en telecomunicaciones contribuyó al desarrollo de sistemas de salto de frecuencia.","La creatividad puede existir en más de un campo.","Frequency Hopping System"],
["Katherine Johnson","1918 — 2020","ciencia","🚀","#83a8cf","Ciencia · Matemáticas · Espacio","Sus cálculos ayudaron a llevar personas al espacio.","Matemática estadounidense cuyos cálculos fueron fundamentales para misiones espaciales.","El conocimiento puede abrir caminos incluso cuando las instituciones parecen cerrarlos.","Katherine Johnson"],
["Rosalind Franklin","1920 — 1958","ciencia","🧬","#91b58e","Ciencia · Química · Biología","Su investigación fue fundamental para comprender el ADN.","Química y cristalógrafa cuyo trabajo de rayos X aportó evidencia fundamental sobre el ADN.","La historia del conocimiento también pregunta quién recibe reconocimiento.","Fotografía 51"],
["Yayoi Kusama","1929 — presente","arte","●","#e66d91","Arte · Instalación · Contemporáneo","Transformó la repetición y el espacio.","Artista japonesa reconocida por sus instalaciones y ambientes inmersivos.","La repetición puede transformar un elemento mínimo en una experiencia inmersiva.","Infinity Mirror Room"],
["Maya Lin","1959 — presente","arte","🏛","#b88ca9","Arte · Arquitectura · Instalación","Integra memoria, espacio y paisaje.","Artista y arquitecta conocida por trabajar con memoria y espacio.","El espacio también puede contar historias.","Vietnam Veterans Memorial"],
["Lise Meitner","1878 — 1968","ciencia","☢","#8fa9c2","Ciencia · Física · Nuclear","Contribuyó a explicar la fisión nuclear.","Física austríaca-sueca cuyo trabajo fue fundamental para comprender la fisión nuclear.","La ciencia también necesita reconocer las voces que hicieron posible cada descubrimiento.","Lise Meitner"]
];

const timeline=document.getElementById("timeline"),events=[],seen=new Set();
let selected=null,size=12,drawing=false,n=0;

people.forEach((p,i)=>{let e=document.createElement("article");e.className="event";e.dataset.category=p[2];e.dataset.index=i;
e.innerHTML=`<div class="year">${p[1].split(" ")[0]}</div><div class="card"><div class="icon">${p[3]}</div><h3>${p[0]}</h3><div class="field">${p[5]}</div><p>${p[6]}</p><small>TOCA PARA EXPLORAR</small></div>`;
e.onclick=()=>select(i,true);timeline.appendChild(e);events.push(e)});

function progress(){count.textContent=seen.size+" / "+people.length;visited.textContent=seen.size;fill.style.width=(seen.size/people.length*100)+"%"}
function select(i,show=true){let p=people[i];selected=p;events.forEach(e=>e.querySelector(".card").classList.remove("selected"));events[i].querySelector(".card").classList.add("selected");events[i].classList.add("visited");seen.add(p[0]);
selectedYear.textContent=p[1];selectedName.textContent=p[0];selectedInfo.textContent=p[7];quote.textContent="“"+p[8]+"”";
artworkCaption.textContent="Obra de referencia: "+p[9]+" · Ahora puedes intervenirla.";
artworkImg.src="https://commons.wikimedia.org/wiki/Special:FilePath/"+encodeURIComponent(p[9])+".jpg";
artworkImg.onerror=()=>{artworkImg.src="https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1000&q=75"};
progress();reset();
if(show){myear.textContent=p[1];mname.textContent=p[0];minfo.textContent=p[7];mquote.textContent="“"+p[8]+"”";modal.classList.add("show")}}
document.querySelectorAll("#filters .btn").forEach(b=>b.onclick=()=>{document.querySelectorAll("#filters .btn").forEach(x=>x.classList.remove("active"));b.classList.add("active");events.forEach(e=>e.style.display=(b.dataset.filter==="all"||e.dataset.category===b.dataset.filter)?"":"none")});
close.onclick=()=>modal.classList.remove("show");modal.onclick=e=>{if(e.target===modal)modal.classList.remove("show")};
draw.onclick=()=>{modal.classList.remove("show");canvas.scrollIntoView({behavior:"smooth",block:"center"})};
random.onclick=()=>{let a=events.filter(e=>e.style.display!=="none");select(+a[Math.floor(Math.random()*a.length)].dataset.index,false);canvas.scrollIntoView({behavior:"smooth",block:"center"})};

const canvas=document.getElementById("canvas"),ctx=canvas.getContext("2d");
function resize(){let r=canvas.getBoundingClientRect(),d=devicePixelRatio||1;canvas.width=r.width*d;canvas.height=r.height*d;ctx.setTransform(d,0,0,d,0,0);reset()}
function reset(){let r=canvas.getBoundingClientRect(),c=selected?selected[4]:"#e66d91";ctx.fillStyle="#09080b";ctx.fillRect(0,0,r.width,r.height);let g=ctx.createRadialGradient(r.width/2,r.height/2,5,r.width/2,r.height/2,r.width*.7);g.addColorStop(0,c+"55");g.addColorStop(1,"#09080b");ctx.fillStyle=g;ctx.fillRect(0,0,r.width,r.height);ctx.fillStyle="#fff8";ctx.font="12px Arial";ctx.fillText(selected?"INTERVENCIÓN · "+selected[0].toUpperCase():"SELECCIONA UNA OBRA",18,25)}
function point(e){let r=canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}}
function paint(x,y){let c=selected?selected[4]:"#e66d91";ctx.beginPath();ctx.arc(x,y,size,0,Math.PI*2);ctx.fillStyle=c;ctx.fill();n++;strokes.textContent=n;status.textContent="● CREANDO · "+n+" TRAZOS"}
canvas.onpointerdown=e=>{drawing=true;canvas.setPointerCapture?.(e.pointerId);let q=point(e);paint(q.x,q.y)}
canvas.onpointermove=e=>{if(drawing){let q=point(e);paint(q.x,q.y)}}
["pointerup","pointercancel","pointerleave"].forEach(x=>canvas.addEventListener(x,()=>drawing=false));
document.querySelectorAll(".brush").forEach(b=>b.onclick=()=>{document.querySelectorAll(".brush").forEach(x=>x.classList.remove("active"));b.classList.add("active");size=+b.dataset.size});
clear.onclick=()=>{n=0;strokes.textContent=0;status.textContent="● MODO DIBUJO LISTO";reset()};addEventListener("resize",resize);

let q=null,score=0;start.onclick=()=>{score=0;opts.classList.remove("hidden");next()};function next(){q=people[Math.floor(Math.random()*people.length)];qname.textContent=q[0];result.textContent=""}
document.querySelectorAll(".option").forEach(b=>b.onclick=()=>{if(!q)return;if(b.dataset.a===q[2]){score++;result.textContent="✓ Correcto · Puntuación: "+score}else result.textContent="✦ Era "+(q[2]==="arte"?"Arte":"Ciencia")+" · Puntuación: "+score;setTimeout(next,700)});
progress();resize();
