USE dinning_playlist_DB,

INSERT INTO Measurement (name) VALUES 
("cup"), ("Tbsp"), ("tsp"),
("l"), ("ml"),
("kg"), ("g"),
("unit");

INSERT INTO Type (name) VALUES
("SEAFOOD"),("BUTCHER"), ("DAIRY&EGGS"), ("FRUIT"), ("VEGETABLES"), ("HERBS"), ("BAKERY"), ("PANTRY");

INSERT INTO Category (name) VALUES
("Breakfast"), ("Brunch"), ("Lunch"), ("Dinner"), ("Snacks"), ("Appetisers"),("Soups"), ("Salads"),
("Sides"), ("Pizza"), ("Rice"), ("Noodles"), ("Pasta"), ("Pies"), ("Burgers"), ("Mince"), ("Sausages"),
("Chicken"),("Turkey"),("Duck"),("Poulty"), ("Pork"), ("Lamb"), ("Beef"), ("Meat"), ("Seafood"),
("Stir Fry"), ("Sauces"), ("Vegetarian"), ("Vegan"), ("Desserts"), ("Baking"), ("Drinks");

INSERT INTO Ingredient (name, createdAt, updatedAt, TypeId) VALUES
("Butter","2020-11-24 10:13:32","2020-11-24 10:13:32",3),
("Eggs","2020-11-24 10:13:40","2020-11-24 10:13:40",3),
("Milk","2020-11-24 10:13:46","2020-11-24 10:13:46",3),
("Salt","2020-11-24 10:13:55","2020-11-24 10:13:55",8),
("Sugar","2020-11-24 10:14:03","2020-11-24 10:14:03",8),
("Chicken","2020-11-24 10:14:13","2020-11-24 10:14:13",2),
("Pork","2020-11-24 10:14:19","2020-11-24 10:14:19",2),
("Beef","2020-11-24 10:14:28","2020-11-24 10:14:28",2),
("Bread","2020-11-24 10:14:40","2020-11-24 10:14:40",7),
("Tomato","2020-11-24 10:14:51","2020-11-24 10:14:51",5),
("Potato","2020-11-24 10:14:59","2020-11-24 10:14:59",5),
("Carrot","2020-11-24 10:15:08","2020-11-24 10:15:08",5),
("Apple","2020-11-24 10:15:15","2020-11-24 10:15:15",4),
("Banana","2020-11-24 10:15:28","2020-11-24 10:15:28",4);