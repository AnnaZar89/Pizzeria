    const menu = document.getElementById('menu');
    const burger = document.querySelector('.burger');
    const iconBurger = document.querySelector('.fa-bars');
    const iconX = document.querySelector('.fa-times');
    const cart = document.querySelector('.cart');
    const orderButton = document.querySelector('.orderButton');
    const form = document.querySelector('.form');
    const modal = document.querySelector('.modal');
    const next = document.querySelector('.fa-angle-right');
    const previous = document.querySelector('.fa-angle-left');
    const buttonX = document.querySelector('.fa-close');
    const formWithPersonalData = document.querySelector('.formWithPersonalData');
    const paymentAndSummary = document.querySelector('.paymentAndSummary');
    const cartItems = document.querySelector('.cartItems');
    const total = document.querySelector('.total');
    const productPriceQuantity = document.createElement('div');
    let payingOption = document.querySelectorAll('.paymentType');
    let arraysPayingOption = Array.from(payingOption);
    const errorPaymentNotchoosing = document.querySelector('.errorPaymentNotchoosing');
    const promise = fetch('https://raw.githubusercontent.com/alexsimkovich/patronage/main/api/data.json')
      .then((response) => response.json())
      .then((data) => {
        data.forEach(displayPizzaSection);
      })

      .then((data) => {
        const allPizzasClass = document.querySelectorAll('.pizzaClass');
        const buttonOrder = document.querySelectorAll('.btnOrder');

        for (let i = 0; i < buttonOrder.length; i++) {
          buttonOrder[i].addEventListener('click', () => addToBasket(i))
        };
      });




    function calculateTotal() {
      const prices = document.querySelectorAll('.priceInBasket .priceOfPizzaClass');
      const quantity = document.querySelectorAll('.quantity');
      let sum = 0;

      for (let i = 0; i < prices.length; i++) {
        sum += parseFloat(prices[i].textContent) * Number(quantity[i].value);
      }
      document.querySelector('.totalToPay').innerHTML = sum.toFixed(2) + ' zł';

      let valueOfPizzasToPay = document.querySelector('.valueOfPizzasToPay');
      if (paymentAndSummary.style.display = 'flex') {
        document.querySelector('.valueOfPizzasToPay').textContent = ` ${sum.toFixed(2)} zł`;
        document.querySelector('.valueOfPizzasWithDeliveryToPay').textContent = ` ${(Number(sum) + 20).toFixed(2)} zł`;

      }





    };

    function calculateItemsInBasket() {
      const quantity = document.querySelectorAll('.quantity');
      let sum = 0;
      for (let i = 0; i < quantity.length; i++) {
        sum += Number(quantity[i].value);
      }
      document.querySelector('.itemsInBasket').innerHTML = sum;
    };

    function displayPizzaSection(element) {
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

    }

    function addToBasket(pizzaIndex) {
      activateOrderButton();
      const pizzaInCart = document.querySelectorAll('.productInBasket .nameOfPizzaClass');
      const pizzaInCartArray = Array.from(pizzaInCart);
      const allPizzasNames = document.querySelectorAll('.nameOfPizzaAndPrice .nameOfPizzaClass');
      const cloneAllPizzasNames = allPizzasNames[pizzaIndex].cloneNode(true);
      const allPizzasPrices = document.querySelectorAll('.nameOfPizzaAndPrice .priceOfPizzaClass');
      const cloneAllPizzasPrices = allPizzasPrices[pizzaIndex].cloneNode(true);
      let found = pizzaInCartArray.find(function (elem) {
        return elem.textContent === allPizzasNames[pizzaIndex].textContent;
      });

      if (found) {
        let input = found.closest('.productPriceQuantity').querySelector('.quantity');
        input.value = Number(input.value) + 1;
      } else {
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
        quantity.addEventListener('input', calculateItemsInBasket);
        quantityAndRemoveBtn.append(quantity);
        const btnRemove = document.createElement('button');
        btnRemove.classList.add('btnRemove');
        btnRemove.appendChild(document.createTextNode('Usuń'));
        quantityAndRemoveBtn.append(btnRemove);
        cartItems.append(productPriceQuantity);
        btnRemove.addEventListener('click', removeFromBasket);


        function removeFromBasket() {
          deactivateOrderButton();
          let input = btnRemove.closest('.quantityAndRemoveBtn').querySelector('.quantity');
          input.value = Number(input.value) - 1;
          calculateTotal()
          calculateItemsInBasket()

          if (input.value === '0') {
            btnRemove.closest('.quantityAndRemoveBtn').closest('.productPriceQuantity').remove();
          };
        };
      };
      calculateItemsInBasket()
      total.style.display = 'block';
      calculateTotal()
    };

    burger.addEventListener("click", function () {
      iconBurger.classList.toggle("show"); //tak
      iconX.classList.toggle("show"); //nie
      cart.classList.toggle("show");
      menu.classList.toggle("cartVisible");
      window.addEventListener('resize', resizing);
    })

    function resizing() {
      if (window.innerHeight < window.innerWidth) {
        menu.classList.remove("cartVisible");


      } else {
        menu.classList.add("cartVisible");

      }
    };


    function activateOrderButton() {
      orderButton.removeAttribute('disabled');
    }

    function deactivateOrderButton() {
      orderButton.setAttribute('disabled', '');
    }

    orderButton.addEventListener('click', function () {
      form.style.display = 'flex';
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      formWithPersonalData.style.display = 'flex';
      paymentAndSummary.style.display = 'none';
      previous.style.visibility = 'hidden';
      next.style.display = 'block';
      document.querySelector('.title').style.display = 'flex';
      burger.style.zIndex = '0';

    })



    let inputFromForm = document.querySelectorAll('.formWithPersonalData input');
    let arrayOfInputsFromForm = Array.from(inputFromForm);

    function isCorrect() {

      document.querySelector('.title').style.display = 'flex';
      let elementNotValid = !!arrayOfInputsFromForm.find((elem) => {
        return !elem.checkValidity();
      });
      console.log(elementNotValid)

      if (!arrayOfInputsFromForm.every(isFill) || elementNotValid) {
        document.querySelector('.emptyValue').style.display = 'block';
        let emptyElem = arrayOfInputsFromForm.every(isFill);
        console.log(emptyElem);
        arrayOfInputsFromForm.forEach(elem => {

          console.log('dodanie listenera', elem);
          elem.addEventListener('change', () => {
            if (!isFill(elem) || !elem.checkValidity()) {
              console.log('onchange', elem)
              document.querySelector('.emptyValue').style.display = 'block';
            } else {
              document.querySelector('.emptyValue').style.display = 'none';
            }
          })
        })
      }

      if (arrayOfInputsFromForm.every(isFill) && !elementNotValid) {
        formWithPersonalData.style.display = 'none';
        paymentAndSummary.style.display = 'flex';
        next.style.display = 'none';
        previous.style.visibility = 'visible';
        document.querySelector('.emptyValue').style.display = 'none';

      }

    }


    next.addEventListener('click', isCorrect)

    function isFill(input) {
      return input.value.length !== 0;
    }



    previous.addEventListener('click', function () {

      formWithPersonalData.style.display = 'flex';
      paymentAndSummary.style.display = 'none';
      next.style.display = 'block';
      previous.style.visibility = 'hidden';
      document.querySelector('.thanx').style.display = 'none';
    })

    buttonX.addEventListener('click', function () {

      form.style.display = 'none';
      modal.style.display = 'none';
      cart.style.position = 'absolute';
      document.body.style.overflow = 'auto';
      document.querySelector('.thanx div').style.display = 'none';
      location.reload();


    })



    paymentAndSummary.addEventListener('change', function (e) {
      let target = e.target;
      errorPaymentNotchoosing.style.display = 'none';
    })



    document.querySelector('.orderAndPay').addEventListener('click', function () {


      for (let i = 0; i < arraysPayingOption.length; i++) {
        if (arraysPayingOption[i].checked) {
          paymentAndSummary.style.display = 'none';
          document.querySelector('.thanx').style.display = 'flex';
          document.querySelector('.title').style.display = 'none';
          previous.style.visibility = 'hidden';
          formWithPersonalData.reset();
        } else {
          errorPaymentNotchoosing.style.display = 'block';


        }
      }

    })
