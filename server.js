const express = require('express')

const app = express()

app.get('/', (req, res) => res.send('Express Lab Home'))

// requirements 
// attempt all 4 exercises
// only 3/4 are required to work properly

// excerise 1
app.get('/greetings/:username/', (req,res) => {
    res.send(`What a delight it is to see you once more, ${req.params.username}`);
});

// exercise 2
app.get('/roll/:number', (req, res) => {
    const randomNum = Math.floor(Math.random() * 20 + 1);
    const number = req.params.number;

    // Check if the `number` parameter is provided and is a valid number
    if (number) {
        res.send(`Congratulations on rolling a ${randomNum}`);
    } else {
        res.send("You must specify a number.");
    }
});


// exercise 3

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];
  

app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < collectibles.length) {
      const item = collectibles[index];
      res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
    } else {
      res.send('This item is not yet in stock. Check back soon!');
    }
});


// exercise 4

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];


app.get('/shoes', (req, res) => {
  let filteredShoes = shoes;

  const { min_price, max_price, type } = req.query;

  if(min_price) {
    filteredShoes = filteredShoes.filter(shoe => shoe.price >= parseFloat(min_price));
  }
  if(max_price) {
    filteredShoes = filteredShoes.filter(shoe => shoe.price <= parseFloat(max_price));
  }
  if(type) {
    filteredShoes = filteredShoes.filter(shoe => shoe.type.toLowerCase() === type.toLowerCase());
  }

  res.json(filteredShoes);
});


app.listen(3000, ()=> console.log('Server is Running'))