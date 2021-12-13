    const menu = document.getElementById('menu');

    const promise = fetch('https://raw.githubusercontent.com/alexsimkovich/patronage/main/api/data.json')
      .then((response) => response.json())
      .then((data) => {


        data.forEach((element) => {
          const pizza = document.createElement('div');
          pizza.classList.add('pizzaClass');
          const nameOfPizzaAndPrice = document.createElement('div');
          nameOfPizzaAndPrice.classList.add('nameOfPizzaAndPrice');
          pizza.appendChild(nameOfPizzaAndPrice);
          const nameOfPizza = document.createElement('p');
          nameOfPizza.classList.add('nameOfPizzaClass');
          nameOfPizza.innerHTML = element.title;
          nameOfPizzaAndPrice.appendChild(nameOfPizza);
          const priceOfPizzaNotRounded = element.price;
          const priceOfPizzaRounded = priceOfPizzaNotRounded.toFixed(2);
          const priceOfPizza = document.createElement('p');
          priceOfPizza.classList.add('priceOfPizzaClass');
          priceOfPizza.innerHTML = `${priceOfPizzaRounded} zł`;
          nameOfPizzaAndPrice.appendChild(priceOfPizza);
          const imgOfPizza = document.createElement('img');
          imgOfPizza.src = element.image;
          pizza.appendChild(imgOfPizza);
          const ingredients = document.createElement('div');
          const ingredientsLabel = document.createElement('div');
          const ingredientsTextNode = document.createTextNode('Składniki: ');
          const ingredientsInArray = element.ingredients;
          let ingredientsSeparatedByCommas = ingredientsInArray.join(', ');
          const ingredientsFromFetch = document.createElement('div');
          ingredientsFromFetch.innerHTML = ingredientsSeparatedByCommas;
          ingredientsLabel.appendChild(ingredientsTextNode);
          ingredients.classList.add('ingredientsClass');
          ingredientsLabel.classList.add('ingredientsLabel');
          ingredientsFromFetch.classList.add('ingredientsFromFetch');
          ingredients.appendChild(ingredientsLabel);
          ingredients.appendChild(ingredientsFromFetch);
          pizza.appendChild(ingredients);
          const button = document.createElement('button');
          button.classList.add('btnOrder');
          const btnTextNode = document.createTextNode('ZAMÓW');
          button.appendChild(btnTextNode);
          pizza.appendChild(button);
          menu.append(pizza);
        });


      })

      .then((data) => {
        const buttonOrder = document.querySelectorAll('.btnOrder');
        const allPizzasNames = document.querySelectorAll('.nameOfPizzaClass');
        for (let i = 0; i < allPizzasNames.length; i++) {
          const cloneAllPizzasNames = allPizzasNames[i].cloneNode(true);
          const allPizzasPrices = document.querySelectorAll('.priceOfPizzaClass')
          const cloneAllPizzasPrices = allPizzasPrices[i].cloneNode(true);
          buttonOrder[i].addEventListener('click', function () {
            const pizzaInCart = document.querySelectorAll('.productInBasket .nameOfPizzaClass');
            const pizzaInCartArray = Array.from(pizzaInCart);
            let found = pizzaInCartArray.find(function (elem) {
              return elem.textContent === allPizzasNames[i].textContent;
            });
            if (found) {
              let input = found.closest('.productPriceQuantity').querySelector('.quantity');
              input.value = Number(input.value) + 1;
            } else {
              const cart = document.querySelector('.cart');
              const nameOfPzza = document.querySelector('.nameOfPizzaClass');
              const productPriceQuantity = document.createElement('div');
              productPriceQuantity.classList.add('productPriceQuantity');
              const productInBasket = document.createElement('div');
              productInBasket.classList.add('productInBasket');
              productPriceQuantity.append(productInBasket);
              productInBasket.append(cloneAllPizzasNames);
              const priceInBasket = document.createElement('div');
              priceInBasket.classList.add('priceInBasket');
              priceInBasket.append(cloneAllPizzasPrices);
              productPriceQuantity.append(priceInBasket);
              const quantityAndRemoveBtn = document.createElement('div');
              quantityAndRemoveBtn.classList.add('quantityAndRemoveBtn');
              productPriceQuantity.append(quantityAndRemoveBtn);
              const quantity = document.createElement('input');
              quantity.classList.add('quantity');
              quantity.type = 'number';
              quantity.value = '1';
              quantity.min = '1';
              quantity.addEventListener('input', calculateTotal);
              quantityAndRemoveBtn.append(quantity);
              const btnRemove = document.createElement('button');
              btnRemove.classList.add('btnRemove');
              btnRemove.appendChild(document.createTextNode('Usuń'));
              quantityAndRemoveBtn.append(btnRemove);
              cart.append(productPriceQuantity);
              btnRemove.addEventListener('click', function () {
                let input = btnRemove.closest('.quantityAndRemoveBtn').querySelector('.quantity');
                input.value = Number(input.value) - 1;
                calculateTotal()
                if (input.value === '0') {
                  btnRemove.closest('.quantityAndRemoveBtn').closest('.productPriceQuantity').remove();
                  calculateTotal()
                };
              });
              const total = document.querySelector('.total');
              total.style.display = 'block';
              productPriceQuantity.parentNode.insertBefore(total, productPriceQuantity.nextSibling);
            };

            if (typeof (Storage) !== 'undefined') {
              if (sessionStorage.clickcount) {
                sessionStorage.clickcount = Number(sessionStorage.clickcount) + 1;
              } else {
                sessionStorage.clickcount = 1;
              };
              document.querySelector(".itemsInBasket").innerHTML = sessionStorage.clickcount;
            };
            calculateTotal();
          });
        };
      });

    sessionStorage.clear();


    function calculateTotal() {
      const prices = document.querySelectorAll('.priceInBasket .priceOfPizzaClass');
      const quantity = document.querySelectorAll('.quantity');
      let sum = 0;
      for (let i = 0; i < prices.length; i++) {
        sum += parseFloat(prices[i].textContent) * Number(quantity[i].value);
        console.log(typeof (Number(prices[i].textContent)));
      }
      document.querySelector('.totalToPay').innerHTML = sum.toFixed(2) + ' zł';
    };
