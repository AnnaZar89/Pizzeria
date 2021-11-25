    const menu = document.getElementById('menu');



    const promise = fetch('https://raw.githubusercontent.com/alexsimkovich/patronage/main/api/data.json')
      .then((response) => response.json())
      .then((data) => {
        //        console.log(data);
        data.forEach((element) => {
          const pizza = document.createElement('div');
          pizza.classList.add('pizzaClass');
          const nameOfPizzaAndPrice = document.createElement('div');
          nameOfPizzaAndPrice.classList.add('nameOfPizzaAndPrice')
          pizza.appendChild(nameOfPizzaAndPrice);
          const nameOfPizza = document.createElement('p');
          nameOfPizza.classList.add('nameOfPizzaClass');
          nameOfPizza.innerHTML = element.title;
          nameOfPizzaAndPrice.appendChild(nameOfPizza);
          const priceOfPizza = document.createElement('p');
          priceOfPizza.classList.add('priceOfPizzaClass');
          priceOfPizza.innerHTML = element.price + ' zł';
          nameOfPizzaAndPrice.appendChild(priceOfPizza);
          const imgOfPizza = document.createElement('img');
          imgOfPizza.src = element.image;
          pizza.appendChild(imgOfPizza);
          const ingredients = document.createElement('div');
          const ingredientsLabel = document.createElement('div');
          const ingredientsTextNode = document.createTextNode('Składniki: ');
          const ingredientsFromFetch = document.createElement('div')
          ingredientsFromFetch.innerHTML = element.ingredients;
          ingredientsLabel.appendChild(ingredientsTextNode);
          ingredients.classList.add('ingredientsClass');
          ingredientsLabel.classList.add('ingredientsLabel');
          ingredientsFromFetch.classList.add('ingredientsFromFetch');
          ingredients.appendChild(ingredientsLabel);
          ingredients.appendChild(ingredientsFromFetch);
          pizza.appendChild(ingredients);
          const button = document.createElement('button');
          button.classList.add('btnZamow');
          const btnTextNode = document.createTextNode('ZAMÓW');
          button.appendChild(btnTextNode);
          pizza.appendChild(button);

          menu.append(pizza);
        })


      })

      .then((data) => {
        const wszystkiePrzyciskiZamow = document.querySelectorAll('.btnZamow');
        //        const wszystkieDivvyPizzaClass = document.querySelectorAll('.pizzaClass');
        const wszystkieNazwyPizz = document.querySelectorAll('.nameOfPizzaClass');
        for (let i = 0; i < wszystkieNazwyPizz.length; i++) {

          let clonePizzaDiv = wszystkieNazwyPizz[i].cloneNode(true);
          const wszystkieCenyPizz = document.querySelectorAll('.priceOfPizzaClass')
          let clonePriceOfPizza = wszystkieCenyPizz[i].cloneNode(true);
          clonePriceOfPizza.classList.add('clonePriceOfPizza');









          wszystkiePrzyciskiZamow[i].addEventListener('click', function () {
            const prodCenaIloscWKoszyku = document.createElement('div');
            prodCenaIloscWKoszyku.classList.add('prodCenaIloscWKoszyku');


            const prodWKoszyku = document.createElement('div');
            prodWKoszyku.classList.add('prodWKoszyku');
            prodCenaIloscWKoszyku.append(prodWKoszyku);
            prodWKoszyku.append(clonePizzaDiv);

            const cenaZaProdWKoszyku = document.createElement('div');
            cenaZaProdWKoszyku.classList.add('cenaZaProdWKoszyku');
            cenaZaProdWKoszyku.append(clonePriceOfPizza);
            prodCenaIloscWKoszyku.append(cenaZaProdWKoszyku);


            const iloscIUsun = document.createElement('div');
            iloscIUsun.classList.add('iloscIUsun');
            prodCenaIloscWKoszyku.append(iloscIUsun);

            const ilosc = document.createElement('input');
            ilosc.classList.add('ilosc');
            ilosc.type = 'number';
            ilosc.value = '1';
            iloscIUsun.append(ilosc);

            const btnUsun = document.createElement('button');
            btnUsun.classList.add('btnUsun');
            btnUsun.appendChild(document.createTextNode('Usuń'));
            iloscIUsun.append(btnUsun);


            document.querySelector('.cart').append(prodCenaIloscWKoszyku);

            if (wszystkiePrzyciskiZamow[i] === wszystkiePrzyciskiZamow[i]) {
              console.log('same');
            }

            //            document.querySelector('.produktWKoszyku').append(clonePizzaDiv);
            //            document.querySelector('.cenaWKoszyku').append(clonePriceOfPizza);
            if (typeof (Storage) !== "undefined") {
              if (sessionStorage.clickcount) {
                sessionStorage.clickcount = Number(sessionStorage.clickcount) + 1;
              } else {
                sessionStorage.clickcount = 1;
              }
              document.querySelector(".itemsInBasket").innerHTML = sessionStorage.clickcount;
            }
          })
        }

        sessionStorage.clear();

      });
