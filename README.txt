Flashcards is an app designed to allow users to create their own profiles, build
and customize decks of flashcards and then study the decks they've created.

The backend is built around Express and MongoDB. Views are rendered with pug.
Check package.json for full list of dependencies.

Primarily this is a learning exercise for me. Up to this point, I've not really
written any backend apps from the ground up. So, I'm doing this to better learn
and build confidence working with Node, Express, Mongo, etc. and building an app
with sessions, user authentication/authorization etc.

I'm not really concerned with the front end on this project. I'm using pug and
bootstrap so I can get to a minimum functional frontend in a hurry. I may come
back and actually try to make the front end nice in the future. TBD.

To spin up server-side --> spin up the mongo db daemon w/ "mongod" in a terminal window, spin up the app w/ "nodemon" for active development or just "node app.js" if you just need it to run.

Issue Log:
    --Bootstrap Navbar toggle button not working in collapsed state. All JS/CSS resources are loading. Unsure of root cause.
        Renders navbar unusable on small/medium screen widths.
