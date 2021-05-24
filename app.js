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
let seznamReceptu = document.getElementById("recepty");
let recept = document.getElementsByClassName("recept");
//pokud v local store není ještě nic(host je nový), zobrazí se detail prvního receptu
if (localStorage.getItem('posledniZobrazeny') === null || localStorage.getItem('posledniZobrazeny') === undefined){
localStorage.setItem('posledniZobrazeny', JSON.stringify(recepty[0]));
}


//prvotní zobrazení všech receptů
zobrazRecepty(recepty);

//zobrazení receptů
function zobrazRecepty(x) {
  for (let i = 0; i < x.length; i++) {
    let recept = document.createElement("div");
    recept.classList.add("recept");
    recept.setAttribute("data-index", [i])
    recept.addEventListener("click", function () {

      //zobrazení detailu receptu
      let index = this.getAttribute('data-index');
      let posledniZobrazeny = x[index]; 
      let hodnota = JSON.stringify(posledniZobrazeny);
      localStorage.setItem('posledniZobrazeny', hodnota);
  
      document.getElementById('recept-foto').src = x[index].img;
      document.getElementById('recept-kategorie').innerHTML = x[index].kategorie;
      document.getElementById('recept-hodnoceni').innerHTML = x[index].hodnoceni;
      document.getElementById('recept-nazev').innerHTML = x[index].nadpis;
      document.getElementById('recept-popis').innerHTML = x[index].popis;
    });

    let obrazek = document.createElement("div");
    obrazek.classList.add("recept-obrazek");

    let foto = document.createElement("img");

    let info = document.createElement("div");
    info.classList.add("recept-info");

    let nazev = document.createElement("h3");

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
let hledej = "";

function vyhledej() {
  document.getElementById("hledat").addEventListener("keyup", function () {
    hledej = this.value.toLowerCase();
    let txtValue;
    for (let i = 0; i < recept.length; i++) {
      let a = recept[i].getElementsByTagName("h3")[0];
      txtValue = a.textContent || a.innerText;
      let item = txtValue.toLowerCase();
      if (item.indexOf(hledej) > -1) {
        recept[i].style.display = "";
      } else {
        recept[i].style.display = "none";
      }
    }
  });
}

//filtrovani a serazeni

window.addEventListener("load", filtr);

function filtr() {
  document.getElementById("kategorie").addEventListener("change", function () {

    let e = document.getElementById("kategorie");
    let text = e.options[e.selectedIndex].text;

    let f = document.getElementById("razeni");

    filtrujSerad(text,f);
  });
}

window.addEventListener("load", razeni);

function razeni() {
   document.getElementById("razeni").addEventListener("change", function () {
  
      let e = document.getElementById("kategorie");
      let text = e.options[e.selectedIndex].text;
  
      let f = document.getElementById("razeni");
  
      filtrujSerad(text,f);
    });
}

function filtrujSerad(x,y) {
    let vyfiltrovane = [];

    if (x == "") {
      vyfiltrovane = recepty;
    } else {
      for (let i = 0; i < recepty.length; i++) {
        if (recepty[i].kategorie == x) {
          vyfiltrovane.push(recepty[i]);
        }
      }
    }

    if (y.value == 1) {
      vyfiltrovane.sort(function (a, b) {
        return b.hodnoceni - a.hodnoceni;
      });
    } else if (y.value == 2) {
      vyfiltrovane.sort(function (a, b) {
        return a.hodnoceni - b.hodnoceni;
      });
    }

    seznamReceptu.innerHTML = "";
    zobrazRecepty(vyfiltrovane);

    //opakujeme hledání, aby fungovalo i při řazení a filtrování
    let txtValue;
    for (let i = 0; i < recept.length; i++) {
      let a = recept[i].getElementsByTagName("h3")[0];
      txtValue = a.textContent || a.innerText;
      let item = txtValue.toLowerCase();
      if (item.indexOf(hledej) > -1) {
        recept[i].style.display = "";
      } else {
        recept[i].style.display = "none";
      }
    }
  
}

  //zobrazení posledního otevřeného receptu z local storage
  let posledni = JSON.parse(localStorage.posledniZobrazeny);

  document.querySelector('#recept-foto').src = posledni.img;
  document.querySelector('#recept-kategorie').innerHTML = posledni.kategorie;
  document.querySelector('#recept-hodnoceni').innerHTML = posledni.hodnoceni;
  document.querySelector('#recept-nazev').innerHTML = posledni.nadpis;
  document.querySelector('#recept-popis').innerHTML = posledni.popis;


