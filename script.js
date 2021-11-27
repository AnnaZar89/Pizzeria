    const menu = document.getElementById('menu');



    const promise = fetch('https://raw.githubusercontent.com/alexsimkovich/patronage/main/api/data.json')
      .then((response) => response.json())
      .then((data) => {

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
          priceOfPizza.innerHTML = element.price;
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
        let arr = [];
        for (let i = 0; i < wszystkieNazwyPizz.length; i++) {

          let clonePizzaDiv = wszystkieNazwyPizz[i].cloneNode(true);
          const wszystkieCenyPizz = document.querySelectorAll('.priceOfPizzaClass')
          let clonePriceOfPizza = wszystkieCenyPizz[i].cloneNode(true);







          wszystkiePrzyciskiZamow[i].addEventListener('click', function () {
            const cart = document.querySelector('.cart');
            const nameOfPzza = document.querySelector('.nameOfPizzaClass');
            //            console.log(nameOfPzza);



            const prodCenaIloscWKoszyku = document.createElement('div');
            prodCenaIloscWKoszyku.classList.add('prodCenaIloscWKoszyku');



            //            if (clonePizzaDiv.textContent !== nameOfPzza.textContent) {
            //              console.log('noooo');
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





            let a = clonePriceOfPizza.textContent;

            let num = Number(a) * Number(ilosc.value);
            //              console.log(num);
            arr.push(num);
            //              console.log(arr);
            let sum = 0;
            for (let i = 0; i < arr.length; i++) {
              sum += arr[i];

            }

            console.log(sum);

            document.querySelector('.totalToPay').innerHTML = sum;





            const btnUsun = document.createElement('button');
            btnUsun.classList.add('btnUsun');
            btnUsun.appendChild(document.createTextNode('Usuń'));
            iloscIUsun.append(btnUsun);


            cart.append(prodCenaIloscWKoszyku);
            //              } 



            const total = document.querySelector('.total');


            total.style.display = 'block';
            prodCenaIloscWKoszyku.parentNode.insertBefore(total, prodCenaIloscWKoszyku.nextSibling);


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
      })

    sessionStorage.clear();
