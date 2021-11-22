const menu = document.getElementById('menu');



const promise = fetch('https://raw.githubusercontent.com/alexsimkovich/patronage/main/api/data.json')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
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
      const btnTextNode = document.createTextNode('ZAMÓW');
      button.appendChild(btnTextNode);
      pizza.appendChild(button);
      menu.append(pizza);
    });
  });
