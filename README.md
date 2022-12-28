# Hospital Api
* Server-side API for a hospital. API where doctors can create and find report of patients.
* This is implemented with Tech Stack: Node.js & Mongo DB.

# List of the routes: 
- **/doctors/register** → Doctor can register by specifying name, username, email and password. (request: POST)
- **/doctors/login** → By specifying the username and password the registered doctor can login,  JWT to be used will be returned.( request: POST)
- **/patients/register** → Authenticated doctor can register a patient by specifying name, mobile number of the patient.( request: POST)
- **/patients/:id/create_report** → Authentiacted doctor can create report of a registered patient.( request: POST)
- **/patients/:id/all_reports** → List of reports of a patient oldest to latest. ( request: GET)
- **/reports/:status** → List of all the reports of all the patients filtered by a specific status. ( request: GET)

# Features
1. Doctors can register and login.
2. Doctor can Register a patient, create report of a patient.
3. Can view reports of patients by status which Can be either of: [Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit].

# Setup Project in local Server
**Ensure that npm ,node, mongodb are installed in your system**. Follow the steps below to setup this project in your local: 

1. Copy the git repository link.
2. Open Git bash and clone the project using **git clone** command. Clone the code from **master** branch.
3. Run **npm install** to install the dependencies.
4. Create a .env file in the root of the project.
5. Paste the following in your .env file

>PORT = PortToLaunch

>JWT_SECRET = TextOfYourChoice

>DATABASE_URL = YourDatabaseURL

6. Run **npm start** to start the server.

This will run on Port: 8000 (if nothing is specified in env port). 
7. Install **POSTMAN** and test the API's.

# <a href="https://hospital-api-data.herokuapp.com/" target="_blank">Click here</a> to check the server side hospital API.
