const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://0.0.0.0:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connnection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //Your Author ID/ USER ID
            author: '63ee1c707790592a156e6d31', 
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem repellendus quae porro, nulla iure eum pariatur architecto corrupti dolorem molestias ipsa ab quasi quibusdam eaque natus fuga suscipit qui laboriosam',
            price,
            geometry:{
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images:  [
                {
                  url: 'https://res.cloudinary.com/df2g89hk8/image/upload/v1676964596/YelpCamp/hc8kmkxgobtmigzcui6t.jpg',
                  filename: 'YelpCamp/hc8kmkxgobtmigzcui6t',
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})