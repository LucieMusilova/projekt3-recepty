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

//zobrazení receptů
zobrazRecepty(recepty);

//zobrazení receptů
function zobrazRecepty(x) {
  for (let i = 0; i < x.length; i++) {
    let recept = document.createElement("div");
    recept.classList.add("recept");
    recept.setAttribute("data-index", [i])
    recept.setAttribute ("onclick", "detail(this)");

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

function vyhledej() {
  document.getElementById("hledat").addEventListener("keyup", function () {
    let hledej = this.value.toLowerCase();
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

//filtrovani podle kategorie

window.addEventListener("load", vyfiltruj);

function vyfiltruj() {
  document.getElementById("kategorie").addEventListener("change", function () {
    let e = document.getElementById("kategorie");
    let text = e.options[e.selectedIndex].text;
    console.log(text);
    let vyfiltrovane = [];

    if (text == "") {
      vyfiltrovane = recepty;
    } else {
      for (let i = 0; i < recepty.length; i++) {
        if (recepty[i].kategorie == text) {
          vyfiltrovane.push(recepty[i]);
        }
      }
    }
    seznamReceptu.innerHTML = "";
    zobrazRecepty(vyfiltrovane);
  });
}

//řazení podle hodnocení

window.addEventListener("load", serad);

function serad() {
  document.getElementById("razeni").addEventListener("change", function () {
    let e = document.getElementById("razeni");
    let serazeno = [];

    for (let i = 0; i < recepty.length; i++) {
      serazeno.push(recepty[i]);
    };

    if (e.value == 1) {
      serazeno.sort(function (a, b) {
        return b.hodnoceni - a.hodnoceni;
      });
    } else if (e.value == 2) {
      serazeno.sort(function (a, b) {
        return a.hodnoceni - b.hodnoceni;
      });
    }

    seznamReceptu.innerHTML = "";
    zobrazRecepty(serazeno);
  });
}


//přiřazení detailu receptům a uložení posledního zobrazeného do local storage

  function detail(x) {
    let index = x.getAttribute('data-index');
    let posledniZobrazeny = recepty[index]; 
    let hodnota = JSON.stringify(posledniZobrazeny);
    localStorage.setItem('posledniZobrazeny', hodnota);

    document.getElementById('recept-foto').src = recepty[index].img;
    document.getElementById('recept-kategorie').innerHTML = recepty[index].kategorie;
    document.getElementById('recept-hodnoceni').innerHTML = recepty[index].hodnoceni;
    document.getElementById('recept-nazev').innerHTML = recepty[index].nadpis;
    document.getElementById('recept-popis').innerHTML = recepty[index].popis;
  };

  //zobrazení z local storage
  let posledni = JSON.parse(localStorage.posledniZobrazeny);

  document.querySelector('#recept-foto').src = posledni.img;
  document.querySelector('#recept-kategorie').innerHTML = posledni.kategorie;
  document.querySelector('#recept-hodnoceni').innerHTML = posledni.hodnoceni;
  document.querySelector('#recept-nazev').innerHTML = posledni.nadpis;
  document.querySelector('#recept-popis').innerHTML = posledni.popis;
