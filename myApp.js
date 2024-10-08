require('dotenv').config();

const { MongoClient } = require('mongodb');


let mongoose = require('mongoose');

let mongoClient = mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (personData, done) => {

  personToSave = new Person(personData)

  personToSave.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
  
};

const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople, (err, people) => {
    if(err) return console.log(err);
    done(null, people);
  })

  
};

const findPeopleByName = (personName, done) => {

  Person.find({name: personName}, (err, personFound) => {
    if(err) return console.log(err);

    const people = personFound.map(p => new Person(p))

    done(null, people);
  })

};

const findOneByFood = (food, done) => {
  
  Person.findOne({favoriteFoods: food}, (err, found) => {
    if(err) return console.log(err);
    done(null, found)
  });

};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, f) => {
    if(err) return console.log(err);
    done(null, f);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  findPersonById(personId, (err, personFound) => {
    if(err) return console.log(err);

    personFound.favoriteFoods.push(foodToAdd);

    personFound.save((err, dataSaved) => {
      if(err) return console.log(err);

      done(null, dataSaved);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    {name: personName}, 
    {age: ageToSet}, 
    {new: true}, 
    (err, updatedDoc) => {
      if(err) { done(err); return; }
      console.log(updatedDoc)
      done(null, updatedDoc);
  });
};



const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};


// createAndSavePerson({name: "Gina Chery", age: 54, favoriteFoods: ["Pomme", "Ananas"]}, (err, f) => {
//   if(err)
//     console.log(err);
//   else
//     console.log(f);
// })


// findOneByFood(["Pomme", "Ananas"], (err, found) => {
//   if(err)
//     console.log(err);
//   else
//     console.log(found);
// });


// findPersonById("6704b5749cc3c54278469275", (err, f) => {
//   if(err)
//     console.log(err);
//   else
//     console.log(f);
// })

// findEditThenSave("6704b5749cc3c54278469275", (err, newData) => {
//   if(err)
//     console.log(err)
//   else
//     console.log("Nouvelle donnee : "+ newData);
// })

findAndUpdate('Schneider Chery', (err, newData) => {
  if(err)
    console.log(err);
  else
    console.log(newData);
});


/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
