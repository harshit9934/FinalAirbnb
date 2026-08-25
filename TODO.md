# MySQL setup

Run this once in MySQL after creating/selecting the `airbnb` database:

```sql
CREATE TABLE homes (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  homeName VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  location VARCHAR(255) NOT NULL,
  rating DECIMAL(2, 1) NOT NULL,
  photo VARCHAR(2048),
  description TEXT NOT NULL
);

CREATE TABLE favourites (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  homeId INT UNSIGNED NOT NULL UNIQUE,
  CONSTRAINT favourites_home_fk
    FOREIGN KEY (homeId) REFERENCES homes(id) ON DELETE CASCADE
);
```

# Previous MongoDB notes

1 Install Mongoose packages .

npm install mongoose

2 Import and use mongoose in app.js
jha hmm mongodb.connect krte teh

vha pr mongoose.connect i app.js and give the path of cluster

"mongodb+srv://harshit:root@apnacoding.5onc2nj.mongodb.net/?retryWrites=true&w=majority";
.then ==> agr ye succes ho jaye to .catch ==> for error

const PORT = 3017;
// connect to mongoose
const DB_Path =
"mongodb+srv://harshit:harshit123@apnacoding.5onc2nj.mongodb.net/airbnb?retryWrites=true&w=majority"; // also give the database name in the connection string to avoid using db() method
mongoose
.connect(DB_Path)
.then(() => {
console.log("Connected to MongoDB with Mongoose");
app.listen(PORT, () => {
console.log(`Server is running on  address http://localhost:${PORT}`);
});
})
.catch((err) => {
console.log("Error connecting to MongoDB with Mongoose:", err);
});

3 Delete the database utile file

4 Remove the usage of db-util from everywhere .

---

3 Create Home schema :

step 1 Delete complete Airbnb bd from mongo .

step 2 delete the existing Home Model code .

step 3x

inn home.js

==> require mongoose

==> now making schema homeSchema and mongoose.schema call krna hi

==> usheme object bnna krr pass krenege.. eshe

esheme fileds ko define krna hi

const homeSchema = mongoose.Schema({
homeName: { type: String, required: true },
price: { type: Number, required: true },
location: { type: String, required: true },
rating: { type: Number, required: true },
photo: { type: String, required: true },
description: { type: String, required: true },
id: { type: ObjectId, required: true },
});

=> require hona hi chaiye must hona ..
=> type : data kesha hi

house name :{ type : Number , require : true / false },

==> men e mongoose se kha ek collection bna de { schema bna de } ye hone hi chaiye extra field bhi ho shkte hain .. aur vo bna denga aur then sare ke sare operation aa jayenge ,...

==> esh schema se ek model bna do and export it

model.exports =mongoose.mode; ('home ' , homeSchema)
ab koi bhi esh ko import krke ishe use krr shkta hai .

==> sbse phele eshe hmne add home mai use kiya tha

/hostcontroller postAddhome need to chainge in addition with bracket

every fields contain brackets.

//post req for addhome
exports.postAddHome = (req, res, next) => {
const { homeName, price, location, rating, photo, description } = req.body;
const home = new Home({ homeName, price, location, rating, photo, description }); // inside in bracket already we have object so we can pass it directly to the constructor

## ==> fetchall() ko find se replace

4 Saving Homes using Mongoose

5 Fetching Homes

mai fetch ke jgha find se replace .

Home.find()

6 fetching one homes

## also done ...

7 Editing one home

host contreoller

hme phle ghrr ko find krn hia postEdithome

// post edit home
exports.postEditHome = (req, res, next) => {
const { homeId, homeName, price, location, rating, photo, description } =
req.body;
Home.findById(homeId).then((home) => {
home.homeName = homeName;
home.price = price;
home.location = location;
home.rating = rating;
home.photo = photo;
home.description = description;
});

---

8 deleting a home
postDeletehome walle function mai method use krenge FindndByIdAndDelete (homwId)
==> mtlb find kro and delete kro

xports.postDeleteHome = (req, res, next) => {
const homeId = req.params.homeId;
console.log("came to delet", homeId);
Home.findByIdAndDelete(homeId) <==================
.then(() => {
res.redirect("/host/host-home-list");
})
.catch((error) => {
console.log("Error while deleting ", error);
next(error);
});
};

---

9 c

1 Delete the existing Favourite Model code .

2 Create the new Favourite schema on the favourite Model File .

3 Fix the following Functionalities .

A getting all favourite

b Adding a Favourite
c Deleting a favourite

4 Removing Favorite while removing Home .

step 1
==> require mongoose and making favhomeSchema

const mongoose = require("mongoose");
const favouriteSchema = mongoose.Schema({
homeId: { type: mongoose.Schema.type.ObjectId , ref : 'home' , required: true , unique : true }, // dushri table ka collection id hai eshliye so related rkhega {special type

                                                    kish model ke table ka name home

});

==> module.export = mongoose.model("Favourite", favouriteSchema);

step 2

now fix export .getFav list in store controller

exports.getFavouriteList = (req, res, next) => {
Favourite.find()
.then((favourites) => {
const favouriteIds = favourites.map((fav) => fav.homeId.toString()); <=== object type ka hi houseId
return Home.find().then((registerHome) => {
const favouriteHomes = registerHome.filter((home) =>
favouriteIds.includes(home.id.toString()),
);
res.render("store/favourite-list", {
registerHome: favouriteHomes,
PageTitle: " My Favourites",
currentPage: "Favourites",
});
});
})
.catch((error) => {
console.log("Error while fetching favourites", error);
next(error);
});
};

step 3

add to favourite fix it agrr koi existing home fav hi to redirect krdena and new fav ko add krr do in podt addhome
==> findOne() method ka use krenege koi bhi matching parameter pss krr shkte hain'

exports.postAddFavourites = (req, res, next) => {
const homeId = req.body.id;
Favourite.findOne({ houseId: homeId })
.then((fav) => {
if (fav) { //agrr findOne main nhi milta hi
console.log( "fav already exists", fav);
} else {
fav = new Favourite({ homeId: homeId });
fav.save().then((result) => {
console.log("fav added", result);
});
}
res.redirect("/favourites");
})
.catch((error) => {
console.log("Error while adding favourite", error);
next(error);
});

step 4 Deleting Home
exports.postRemoveFavourites = (req, res, next) => {
const homeId = req.params.homeId;
Favourite.FindOneAndDelete({ houseId: homeId }) < ==
.then((result) => {
console.log("fav removed", result);
res.redirect("/favourites");
})
.catch((error) => {
console.log("Error while removing favourite", error);
next(error);
});
};

step 5 agr home delete ho jaye to fav me she bhi delete ho jaye => home .js making pre hook

==> jbb bhi koi findOneandUpdate cal krta hi to hmm 1 asyn dunction call krge and fhir Jha tumne findone and update ka use kiya ushki id nikal lo delete krme se phele

homeSchema.pre("/FindOneAndDelete", async function (next) {
const homeId = this.getquery()["_id"];
await favourite.deleteMany({ homeId: homeId });
next();
});

---

20m fetching Relation

abhi hme sare fav ki list nikali fhir sbhi ghrr ki list

agr jbhi mujehe koi bhi user ko 1 fav dikhana hi to vo sare home ko ki list nikale ga then filter krega jo fav hi ushe ui mai dikhata // in terminal

==> to jo bhi fav rhega ushe map krr lo database mai shirf suhi ghrr ki id ko call kr loo..

=> 1 function use kr lo . populate ()

fav ko find kr lo and populate kro homeId

populate => means hmmene db ko bta diya ye homeid fav hi to db se vo fetch kr lega .

store controller getfav list
