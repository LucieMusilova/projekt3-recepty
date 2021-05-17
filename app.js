/*
Co je za úkol v tomto projektu:

1) Do prvku s id="recepty" vygeneruj z dat seznam všech receptů z naší "databáze".
HTML vzor, jak vygenerovaný recept vypadá, je zakomentovaný v index.html.

2) Doplň hledání - v hlavičce odkomentuj pole pro hledání. Pri kliknutí na tlačítko Hledat
by se měl seznam receptů vyfiltrovat podle hledaného slova.

3) Doplň filtrovanání receptů podle kategorie.

4) Doplň řazení receptů podle hodnocení.

5) Na recepty v seznamu by mělo jít kliknout a na pravé polovině, se objeví detail receptu.
Doplň patričné údaje receptu do HTML prvků s ID recept-foto, recept-kategorie,
recept-hodnoceni, recept-nazev, recept-popis.

6) Poslední vybraný recept ulož do Local Storage, aby se při novém otevření aplikace načetl.
*/

//proměnné
let seznamReceptu = document.getElementById('recepty');
let recept = document.getElementsByClassName('recept');

//zobrazení receptů
zobrazRecepty(recepty);

//zobrazení receptů
function zobrazRecepty(x) {
  for (let i = 0; i < x.length; i++) {
    let recept = document.createElement('div');
    recept.classList.add('recept');

    let obrazek = document.createElement('div');
    obrazek.classList.add('recept-obrazek');

    let foto = document.createElement('img');

    let info = document.createElement('div');
    info.classList.add('recept-info');

    let nazev = document.createElement('h3');

    obrazek.appendChild(foto);
    info.appendChild(nazev);
    recept.appendChild(obrazek);
    recept.appendChild(info);
    seznamReceptu.appendChild(recept);

    foto.src = x[i].img;
    nazev.innerText = x[i].nadpis;
   } 
}

//hledání

window.addEventListener("load", vyhledej);

function vyhledej () {
  document.getElementById("hledat").addEventListener("keyup", function(){
    let hledej = this.value.toLowerCase();
    let txtValue;
    for (let i = 0; i < recept.length; i++)  {
      let a = recept[i].getElementsByTagName("h3")[0];
      txtValue = a.textContent || a.innerText;
      let item = txtValue.toLowerCase();
      if (item.indexOf(hledej) > -1) {recept[i].style.display = "";}
      else {recept[i].style.display = "none"};
    };
  });
};


//filtrovani podle kategorie

window.addEventListener("load", vyfiltruj);

function vyfiltruj () {
  document.getElementById("kategorie").addEventListener("change", function(){
    let e = document.getElementById("kategorie");
    let text = e.options[e.selectedIndex].text;
    console.log(text);
    let vyfiltrovane = [];

    for (let i = 0; i < recepty.length; i++)  {
      if (recepty[i].kategorie == text) {vyfiltrovane.push(recepty[i])}
      //else {recept[i].style.display = "none"};
    };
    seznamReceptu.innerHTML = "";
    zobrazRecepty(vyfiltrovane);
  });
};