PROJECT SETUP GUIDE



I. Test Accounts

* You can use the following sample accounts for testing ( or create test account yourself in register page ) :

I.1 Customer

username: Yurizana777 
password: Dat15082005!

username: Goten6969 
password: ImGoten999!

I.2 Vendor

username: Yurizana888 
password: Dragonball777!

username: Vegeta777 
password: Dragonsoul69@

username: Gohanbeast 
password: Nostalgia777!

I.3 Shipper

username: Trunksss 
password: ImTrunks999@

username: Badrockkk 
password: Nostalgia777!

username: Turlesss 
password: ImTurles777!

username: Kakarotttt 
password: Hopel3ss!

username: Cucumberrrr 
password: Ihavelowiq777!


II. Getting Started

* If this is your first time running the project, follow these steps:

II.1 Open a new terminal
   
II.2 Run:

npm install

cd server && npm install

cd ../client && npm install

In general, type "npm install" in every folder that cotains a file called "package.json"

II.3 Ensure you have a stable internet connection.

II.4 Important: Avoid double-clicking or rapidly clicking buttons — just wait for the action to complete.

II.5 To start the program, run ( in root folder, aka FullStack if our memories serve us right ) :

npm run dev

II.6 Super important :

since image files are stored in local folder ( Our MongoDB Atlas only store filename ), if you are testing this program on a second test computer ( or a second repo clone ) and have errors, it might stem from your first test computer has created a new image ( either product image, or avatar ) and since, it's local, your second test computer ( or a second repo clone ) can not keep track of the new image files --> MongoDB can not find the new file --> error, so ... try to copy "assets" folder from "client" folder from first test computer  then overwrite them on the second test computer ( or a second repo clone ), it should works now



III. Frontend

III.1 Frameworks & Libraries

react – Frontend framework for building UI.

react-dom – React DOM bindings.

react-router-dom – Routing for React apps.

axios – HTTP client for API calls.

tailwindcss – Utility-first CSS framework.

@tailwindcss/vite – Tailwind integration with Vite.

lucide-react – Icon library for React.

III.2 Build & Dev Tools

vite – Build tool and development server.

@vitejs/plugin-react – React support for Vite.

eslint (+ plugins) – Linting and code quality checks.



IV. Backend

IV.1 Frameworks & Libraries

express – Web server framework for REST APIs.

mongoose – ODM for MongoDB.

bcrypt – Password hashing.

cookie-parser – Middleware for parsing cookies.

cors – Cross-Origin Resource Sharing.

express-session – Session management middleware.

multer – File upload handling middleware.

IV.2 Dev Tools

nodemon – Auto-restarts server on file changes.





V. Root : concurrently – Run server and client scripts in parallel.







