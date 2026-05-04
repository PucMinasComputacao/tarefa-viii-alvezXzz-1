const catalogo = [
    { id:1, titulo:"Vingadores", tipo:"filme", ano:2019, generos:["ação"], nota:9.2, assistido:true },
    { id:2, titulo:"Breaking Bad", tipo:"serie", ano:2008, generos:["drama"], nota:9.5, assistido:true },
    { id:3, titulo:"Interestelar", tipo:"filme", ano:2014, generos:["ficção"], nota:8.8, assistido:false },
    { id:4, titulo:"Stranger Things", tipo:"serie", ano:2016, generos:["terror"], nota:8.7, assistido:true },
    { id:5, titulo:"Poderoso Chefão", tipo:"filme", ano:1972, generos:["drama"], nota:9.7, assistido:false },
    { id:6, titulo:"The Boys", tipo:"serie", ano:2019, generos:["ação"], nota:8.5, assistido:false }
];

// ================= console (atividade) =================
catalogo.forEach(i => console.log(`- [${i.tipo}] ${i.titulo} (${i.ano})`));

const media = catalogo.reduce((a,b)=>a+b.nota,0)/catalogo.length;
console.log("Média:", media.toFixed(2));

console.log("Tem antigo?", catalogo.some(i=>i.ano<2000));
console.log("Todos tem genero?", catalogo.every(i=>i.generos.length>0));

// ================= UI =================
const lista = document.getElementById("lista");
const filtro = document.getElementById("filtro");

function render(dados){
    lista.innerHTML = dados.map(item => `
        <div class="card">
            <h3>${item.titulo}</h3>
            <p>${item.tipo.toUpperCase()} • ${item.ano}</p>
            <p>Gênero: ${item.generos.join(", ")}</p>
            <p class="nota">⭐ ${item.nota}</p>
            <p class="${item.assistido ? "" : "nao"}">
                ${item.assistido ? "Assistido" : "Não assistido"}
            </p>
        </div>
    `).join("");
}

render(catalogo);

// filtro
filtro.addEventListener("change", () => {
    const valor = filtro.value;
    if(valor === "todos"){
        render(catalogo);
    } else {
        render(catalogo.filter(i => i.tipo === valor));
    }
});

// ================= resumo =================
const naoAssistidos = catalogo.filter(i=>!i.assistido);

const ranking = [...catalogo]
    .sort((a,b)=>b.nota-a.nota)
    .slice(0,3);

document.getElementById("output").innerHTML = `
<h2>Resumo</h2>
<p>Total: ${catalogo.length}</p>
<p>Não assistidos: ${naoAssistidos.length}</p>
<p>Média: ${media.toFixed(2)}</p>

<h3>Top 3</h3>
<ul>
${ranking.map(i=>`<li>${i.titulo} (${i.nota})</li>`).join("")}
</ul>
`;