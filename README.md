## Installation and Startup

Download the project files, fire up a terminal window and navigate to the project folder

Run `npm install` in the terminal to set up all the dependencies.
Open up a couple new terminal tabs in the project folder.
In one tab, fire up the mongo daemon by running `mongod`
If you just want to use the app: fire it up with `node app.js`
If you plan on tinkering with it: try `nodemon` instead.

When the app starts ups, it should set up its databases and collections if they're not already present.

With the app running, point your browser to `localhost:3000` and you should arrive at the splash page

## Usage

-Start by clicking the 'Sign Up' link and creating a user account.


![splashscreen](/PreviewImgs/Register.png)


-Once signed up and logged in, you can create your first deck!

Click on "Create a Deck" in the navbar up top to get going.
Name the deck, then add a few cards to it. Once you're happy, hit the 'Save the Deck' button.

**Note:**  *Currently, the deck builder does not update to view to reflect that state of the deck in progress. for the time being, the deck object is logged to the developer console each time you add to it. You can check its status there before saving it. Updates to view and edit the state from the interface are forthcoming.*


![deckbuilder](/PreviewImgs/DeckBuilder.png)


-Now that you have a deck saved to the DB, click the 'Your Decks' link in the navbar to view a list of your decks. From there, you can click the deck you want to study in order to view it.


![user's deck](/PreviewImgs/UserDecks.png)


-Now that you're viewing your deck, you can cycle through the cards using the 'Next' and 'Previous' buttons and view the definitions by clicking the 'Flip Card' button.


![front of card](/PreviewImgs/CardFront.png)

![back of card](/PreviewImgs/CardBack.png)
