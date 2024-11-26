***Instructions for usage:***
1. Clone down github repository
    ```
    git clone [repo]
    ```
2. Install all dependencies needed to for this repo
    ```
    npm install 
    ```
3. Install nodemon package dependency globally (if have not yet) for conveniency sake -- later will not have to constantly run npm to test
    ```
    npm i --save-dev nodemon
    ```
4. Navigate to "package.json" ...
   * Change "main" value to server's name if not automatically done
    ```
    "main": "server.mjs",
    ```
   * Add a new script command for running nodemon
    ```
    "start": "nodemon server.mjs"
    ```
5. Create .env file to hold environmental variables:
    ```
    PORT=3000 (default or your choosing)
    mongoURI=[Your own Mongo URI]
    ```
   > _Access your mongoURI from MongoDB Compass or MongoDB website_

5. Download Thunder-Client, Postman, or any other API testing tool
6. Try out listed path URL's below for Create (post), Read (get), Update (patch, put), Delete (delete) in Thunder-Client

**<u>Note</u>**: *Fork if want to add own changes & push to Github later*

- - -

# Project Name
### Capstone Full Stack (MERN) Web Application --- <em> MongoDB Database (BACKEND) </em>

## LINK TO FRONT-END:
> https://github.com/yangbri1/fullstack_mern_crud_capstone_frontend

- - - 

## $\color{green}{Project \: Description}$
### Create a Node, Express, and MongoDB backend server. Topic and content for the web application is totally up for grasp. Creative freedom is a go and main objectives as follows (True to be told, changed the schema awfully too many times)

#### 1. Create a server application with Node.js, Express.js, and MongoDB (Document-oriented NoSQL).
#### 2. Create a CRUD API using Express and MongoDB.
#### 3. Create MongoDB indexes.
#### 4. Use MongoDB indexing (improve read performance while slow write performance) to make efficient queries.
#### 5. Create MongoDB validation rules.
#### 6. Use MongoDB validation to ensure data consistency.

- - -

## $\color{lightblue}{Technologies \: Used}$
### JavaScript runtime environment:
#### Thunder-Client extension on VSCode

### NPM package manager on CLI to install dependencies:
#### Express (Node.js library): 
```
npm i express
``` 
#### Zero-dependency module: 
```
npm i dotenv
``` 
##### For use of .env (environmental variables)
#### Mongoose (JS library): 
```
npm i mongoose
```

### MongoDB queries
#### logcal operators: $and
#### comparison operators: $gt, $ne, $eq, $lte

### Requirements in building a CRUD API
#### Setting up:
```
git init                   (to `git add ." & "git commit -m "[msg]"`)
npm init -y                (package.json)
npm i nodemon --save-dev   (global install once ever)
npm i express mongodb dotenv
```
#### '.env' file: PORT=3000 (standard), mongoURI = (connection string from personal cluster in MongoDB Compass)
#### 'db' directory > 'conn.mjs' -- creates a Mongoose connection to MongoDB database
#### 'routes' directory > 3 separate routes .mjs file each with GET, POST, PATCH/PUT, DELETE HTTP routes enclosed to access database

### Modular JavaScript file type
#### .mjs extension tells Node there will be some modular files to be import aka "await" which requires "async" functions

### MongoDB Compass
#### To receive a connection string to our personal cluster for the .env "mongoURI"
#### See our custom database being created and populated on the side under the cluster section

### Mongoose
#### mongoose.Schema(), schema fields, schema properties, mongoose.model()

### Mongoose schema validation rules/properties/validators
#### type, required, default, unique, lowercase, uppercase, min, message, enum (value, message)

### Schema indexing 
### Schema.index({Schema: 1 (or -1)}) -- sort database by either ascending (1) or descending (-1) order -- fast read, slow write

### Schema methods
#### static methods: Schema.statics.attribute -- every document now has that particular "attribute"

### Mongoose (Object Data Modeling) Model 
#### mongoose.model() -- create and read documents (instance of model) from MongoDB database

### Express Router():
#### methods: POST (router.post), GET (router.get), PATCH (router.patch), PUT (router.put), DELETE (router.delete), express.router()

### Express request parameters:
#### req.params & req.params.id (for :id)

### Body-Parser (no need to install separate dependencies as it's built-in Node.js Express)
#### import JavaScript middleware to parse out data
#### bodyParser.urlenencoded(), bodyParser.json()

### Express Middleware Handler 
#### app.use()
##### Critical in using middleware & connecting the routes, schemas and such back to the central hub: server.mjs

### Third-Party Express Middleware - Morgan
#### Morgan middleware to log out HTTP request, latency, and if backend is connected or when front-end attempts to connect to backend
```
npm i morgan
```

### Cross-Origin Resource Sharing (CORS)
#### Necessary in order to connect THIS backend server to the front-end (React) -- allows fetching from front-end, CRUD functionalities from FE to BE and vice-versa
#### app.use(cors())
```
npm i cors
```

### Seeding Function
#### *IMPORTANT: Comment out or remove after use!! Do NOT want other to mess with database*
### HTTP request / response object properties
#### req.params, res.send(), res.status(), res.json()

### JavaScript containers
#### arrays [], objects {}

### Git Bash: Linux commands on command line

### Git version control


* Others: Github add, commits; JS package, Express.js, MongoDB, Mongoose librares,  VSCode IDE, Thunder-Client extension, NPM JavaScript package manager, nodemon, dotenv

- - - 
## $\color{lightgreen}{How \: To \: Get \: Started}$
### **IMPORTANT**: 
### Meet the base minimum requirements (MVP) first before any creativity is involved. Although here in order to retrieve data from a mock database we need to think of a topic and gather from some in construction of our data datasets. Wireframe a little and refresh on some of the concepts from the lecture beneficial in fulfilling the the requirements. In addition test constantly using Thunder-Client, console log out errors to check, and commit early and frequently.

- - - 
## $\color{orange}{Acknowledgements}$
### All used source materals are stored in the "reference" folder of this repo.

### Mongoose concepts
#### https://mongoosejs.com/docs/schematypes.html
#### https://mongoosejs.com/docs/models.html
#### https://mongoosejs.com/docs/validation.html#the-unique-option-is-not-a-validator

### MongoDB $regex operator
#### https://www.mongodb.com/docs/manual/reference/operator/query/regex/?msockid=0196e6e3201a6f5504d5f2d421086e50

### MongoDB db.collection.find() method
#### https://www.mongodb.com/docs/manual/reference/method/db.collection.find/?msockid=0196e6e3201a6f5504d5f2d421086e50

### MongoDB unique index
#### https://www.mongodb.com/docs/manual/core/index-unique/

### Express() function
#### https://expressjs.com/en/api.html

### Query parameter valdation (thought about querying for limit or skip -- later)
#### https://apidog.com/blog/nodejs-express-get-query-params/#advanced-query-parameter-handling-with-middleware

### Pagination  (thought about pagination to show only certain # of documents (in JSON) at a time on browser -- later)
#### https://stackoverflow.com/questions/47169227/conditionally-using-request-parameters-for-skip-and-limit

### Database Source Material/Reference
#### https://myanimelist.net/
#### https://jikan.moe/showcase
#### https://www.themoviedb.org/

### Lecture Notes
#### https://www.canva.com/design/DAFris9rfJ4/view
#### https://www.canva.com/design/DAFriu37FW4/view
#### https://www.canva.com/design/DAFriv14g-4/view
#### https://www.canva.com/design/DAFrigYKLP4/view
#### https://www.canva.com/design/DAFriluIZFQ/view

### Lecture Videos (will time out but on Canvas)

### LaTeX code on Markdown styling
#### https://stackoverflow.com/questions/11509830/how-to-add-color-to-githubs-readme-md-file
#### https://tex.stackexchange.com/questions/74353/what-commands-are-there-for-horizontal-spacing

### Markdown Table Github Template from Dylan 
#### https://github.com/comeaudc/AnniesHardRockLife
- - -

## $\color{purple}{Setup}$


### API Reference
   VERB 		 | 		  PATH 		 |  	 DESCRIPTION
------------ | ------------- | -------------------
`GET` | `/forums` | Show all community forum posts |
`POST` | `/forums` | Create a new post to be added to the forums database |
`GET` | `/forums/forum/:id` | Retrieve a specific forum by their unique "_id" |
`GET` | `/forums/priority/high` | Display only high priority forum posts |
`GET` | `/forums/priority/low` | Showcase listed posts of low priority  |
`GET` | `/forums/verified` | Present only forums that are verified by real people |
`GET` | `/forums/unverified` | Present only forums that aren't quite yet verified |
`PATCH` | `/forums/:id` | Access an existing forum post by their "_id" and update their info as pleased |
`DELETE` | `/forums/:id` | Access a forum post by their "_id" and delete it (admin, original user) |
`GET` | `/animations` | Lay out all of the animations listed in the database |
`GET` | `/animations/animation/:id` | Pick out one animation by their unique "_id" |
`POST` | `/animations` | Make a new animation to be saved into the animations database (only if it passes the set validation rules) |
`GET` | `/animations/scores` | Retrieve all animations with a score |
`GET` | `/animations/label/original` | Set forth original animations (no source materials) |
`GET` | `/animations/label/unoriginal` | Portray the unoriginal animations (based off of prior source materials) |
`GET` | `/animations/status/tbd` | Accumulate ALL of the animations with TBD status (upcoming, unknown) |
`GET` | `/animations/status/ongoing` | Show all currently ongoing animations series, flick, etc. |
`GET` | `/animations/status/completed` | Reveal all completed animations series, flick, etc. |
`PATCH` | `/animations/:id` | Access an existing animation by its request parameter ":id" and update its info |
`DELETE` | `/animations/:id` | Select an animation by its ":id" to be expelled from the database |
`GET` | `/literary_works` | Give away all of the literary_works in the database |
`GET` | `/literary_works/literary_work/:id` | Filter out one literary_work by its unique "_id" |
`POST` | `/literary_works` | Add a literary work to the literary_works database |
`GET` | `/literary_works/category/manga` | Show all literary_works categorized as "manga" (JP) |
`GET` | `/literary_works/category/manhwa` | Display all literary_works categorized as "manhwa" (KR) |
`GET` | `/literary_works/category/manhua` | Display all literary_works categorized as "manhua" (KR) |
`GET` | `/literary_works/status` | Reveal all literary_works with a defined status: "ONGOING", "ON HIATUS", "COMPLETED", or "DISCONTINUED"  --- NOT "TBD" |
`GET` | `/literary_works/serialized` | Point out literary_works that had been picked up by a publisher or a studio. |
`GET` | `/literary_works/unserialized` | Point out literary_works that had NOT been picked up by a publisher or a studio. |
`PUT` | `/literary_works/:id` | Revise a literary_work's info |
`DELETE` | `/literary_works/:id` | Erase a literary_work when prompted by the studio |
