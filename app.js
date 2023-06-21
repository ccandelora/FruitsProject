require('dotenv').config({ path: '.env' })
const mongoose = require('mongoose');
//const express = require('express')
//const app = express()
//const port = process.env.PORT || 3000


mongoose.connect("mongodb://localhost:27017/fruitsDB");

const fruitSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Please check your data entry, no name specified!"]
        },
        rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
    }
);

const Fruit = mongoose.model("Fruit", fruitSchema);


const personSchema = new mongoose.Schema ({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
    }
);

const pineapple = new Fruit ({
    name: "Pineapple",
    rating: 9,
    review: "Great fruit."
});

const pear = new Fruit ({
    name: "Pear",
    rating: 8,
    review: "Great fruit."
});

pear.save();

//pineapple.save();

const Person = mongoose.model("Person", personSchema);
const person = new Person ({
    name: "John",
    age: 37,
    favouriteFruit: pear
});

person.save();

/*
Person.deleteMany({name: 'John'}).then (function(){
    console.log("Succesfully deleted all the documents");
}).catch(function(error){
    console.log(error);
});
*/


Fruit.find({}).then((fruits) => {
    if (fruits) {
        fruits.forEach((fruit) => {
        console.log(fruit.name);
    });
    }
    mongoose.connection.close();       
});





//fruit.save();




// Connect to MongoDB Atlas
/*const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');
    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);
    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);*/
