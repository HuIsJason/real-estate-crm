# Deployed Application
Our web application is deployed using Heroku. You can access it [here](https://agent-service.herokuapp.com/) or by copying and pasting the following url in your browser https://agent-service.herokuapp.com/.

# User Flow and Functionalities
## Agent User

### Login Page
- The user starts by entering their login information and clicking “LOGIN” to enter the application. You can use the following credentials: username: user, password: user. This will take you to the Client List page, which is a list of the clients that this agent has.
- Alternatively, if the user does not have an account, they click the link under “sign up here” to start creating a new account. This takes the user to the signup page.

### Signup Page
- The user will be required to enter personal and account information in a form. 
- They navigate through pages by clicking the arrow button. They can also return to the Login Page by clicking "OR RETURN TO LOGIN" link. If the user does not fill in the required fields, a validation warning appears. The user will also be required to enter valid email and a 10 numeric character phone number.
- Once the user clicks “CREATE ACCOUNT”, the user is notified that their sign up request has been received and an admin will verify the request. The user will have to wait for the admin to confirm their request before they can login to their account. From here, the user can return to the login page. 

### Client list page
- This is the first page once the user is logged in. This page displays a list of all their current clients, with basic information (i.e. their name and custom tags).  
- To add a new client, the user clicks the add client button. This opens a modal where the agent can enter information for a new client. After hitting “ADD” the new client will be inserted into the clients list.
- To delete a client in the list, the user clicks the delete icon in the corresponding row.
- The user can search for clients by name using the search bar at the top of the table. This filters the list by the text entered in the search bar. The list can also be limited to 4 rows per page, or 8 using the pagination feature at the bottom of the table. 
- The user clicks on the profile icon to navigate to the corresponding client’s profile page.


### Client profile page
- This page consists of two tabs that the user can navigate.
- Under the profile tab, it displays contact information for this client. The agent user can click on the edit button to edit this information.
- Under the projects tab, the user can see a list of all projects that the user has started for this client, as well as the tags added to each project. Projects can be active or closed, and the user can switch between viewing the two lists by clicking the buttons “ACTIVE” or “CLOSED”.
  - The agent user can add a new project by clicking the “+ NEW PROJECT” button, which opens a modal prompting the user to enter a project name. The user can only add a new project after entering a name in the text field. By default, the project is added as an active project. 
  - The user clicks on a project in the list, which takes them to the project details page for that particular project.

### Project details page
- Here, the user can see and add information about a specific project. There are two tabs. In addition, the user can click the BACK button at the top right to return to the list of projects under the Client Profile Page. 
- Under the overview tab, it displays a general description of the project, various criteria tags that apply to the property and whether the project is currently active or closed.
- The agent user can edit the description by clicking “EDIT DESCRIPTION”. They can add more tags by clicking “+ ADD TAG”, entering a tag name, and clicking “ADD”. The user can also change the status of the property clicking the button beside the status label. This toggles the status, from active to closed or closed to active.
- Under the history tab, the user can see the list of properties that were added to the project. The user can select a property from the list on the left, and more information will be displayed in the detailed property view on the right.
- Within the detailed view, the user can view a list of activities added to this property and the date it occurred under the Activity tab. The user can click on any item in this list to open up a further description of the activity. The user can also add a new activity by clicking the “+ADD” button at the bottom of the table. The user is required to enter the activity title (there is a validation check). The date is selected by default to today, but the user can modify this. After clicking "ADD", the activity will be added to the list. If the list becomes long enough, pagination options will appear (e.g. NEXT and PREVIOUS buttons). 
- Under the notes tab, users can add some general notes that they would like to remember. This can be freely edited by typing in the field.
- The button at the top right of this view is used to mark properties as favourited. The user can toggle this by clicking the button, going from favourited to favourite, or favourite to favourited. 
- Under the properties list, there are several action options that the user has. The first is to add a new property. Clicking the corresponding button opens a form where the user enters information about the property to be added. All fields are required, and form validation is exercised. By default, newly added properties are initially unfavourited.
- If a property is selected from the list, the user can delete the property by clicking the corresponding button. This will open a prompt to receive the user’s confirmation. 
- The user can filter the list to only show favourited properties by clicking “SHOW FAVOURITES”. They can unfilter the list by clicking “SHOW ALL”. 

### Agent profile page
- This page consists of information regarding the agent.
- The agent user can click on the edit button to edit any of this information.

### Sidebar 
- On every page, the user can click on the menu icon on the bar at the top left to pop open the sidebar. 
- Here, the user can navigate to their own profile page by clicking “Profile” or the client list page by clicking “Clients”. 
- They can also logout by clicking “Logout”, which takes the user back to the login page.

## Admin User
### Login page
- Starting at the login page, the admin user enters their login information and clicks “LOGIN” to enter the application. The admin credentials are as follows: username: admin, password: admin. This takes the user to the admin dashboard page. 

### Admin Dashboard page
- This page displays two large buttons. Clicking on ACCOUNT MANAGER takes the user to the account manager page. Clicking on AUTHORIZATION REQUESTS takes the user to the authorization requests page. 

### Account Manager page 
- Here, the user can see a list of all active agent accounts.
- The table displays the account email and the last login date. The user can search for accounts by email by entering text in the search bar, which filters the list.
- Click on any of the table entries, this will open up account details for the selected account. This will display information such as the agent's brokerage and license number. From here, the user can delete the account by clicking DELETE ACCOUNT, which will prompt the user to confirm the action. You can see the account is deleted from the list. 
- The user can also reset the account’s password by clicking RESET PASSWORD. Upon confirmation, a random temporary password is generated, which the account holder can log in with.
- The user can return to the list of accounts by clicking the RETURN button. 
- The user can return to the admin dashboard by clicking the DASHBOARD button on the bar at the top of the screen.

### Authorization Requests page
- Here, the user can see a list of active/pending requests. These are requests to authorize an agent’s account when the account holder first signs up. The table displays the username, the account email, and the date when the request was made.
- Using the search bar above the table, the user can search for requests by account email. When text is entered, you can see the list is filtered. 
- Click on any of the table entries, this will open up account details for the selected request. The admin user would review the information, and upon confirmation of the information’s validity, either deny the request or activate the account by clicking the corresponding buttons. In either case, the request will be deleted. 
- If the account is activated, the account holder will now be able to login, and the admin user can view the account in the Account Manager page. 
- If no action is selected, the user can return the list of requests by clicking the RETURN button. 
- The user can return to the admin dashboard by clicking the DASHBOARD button on the bar at the top of the screen. 
- The user can also click LOGOUT button on the bar at the top of the screen to log out of the application. This takes them to the login page. 


# API Endpoints
Note: fields with `?` are optional.

If a response body is not defined, there will not be a response body.
### Admin
#### POST `/api/admin`
Creating a new admin account.

Request body:
```
{
    username: string
    password: string
}
```
Response body: document of created Admin account

Unique status code(s): `400` for missing fields

### Authorization
#### POST `/api/authentication/signup`
Creating a new Agent account.

Request body:
```
{
    username: string
    password: string
    firstName: string
    lastName: string
    email: string
    phone: string
    yearStarted: integer
    licenseId: string
    brokerage: string
    brokerageAddress: string
    brokerageNumber: string
    accountType: "agent"
}
```
Response: document of the created Agent account

Unique status code(s): `400` for missing fields

#### POST `/api/authentication/login`
Logging in a user (either admin or agent account).

Request body:
```
{
   username: string
   password: string
}
```
Response:
```
{
    username: string
    MongoId: string
    loggedInAs: string
    accountType: "agent" | "admin"
}
```
Unique status code(s): `401` for invalid credentials

#### GET `/api/authentication/logout`
Logging out a user (either Admin or Agent).

Response body: none
#### GET `/api/authentication/checkSession`
Checking the session cookie for an active session.

Response body:
```
{
    loggedInAs: string
    MongoId: string
    username: string
    accountType: "agent" | "admin"
}
```
Unique status code(s): `401` for an invalid session
#### PATCH `/api/authentication/request/:agent_id`
Activating an agent account. Must be logged in as an Admin to send this request.

Request body:
```
{
    op: "set",
    field: "activated",
    value: boolean
}
```
Response body: document of changed Agent account

Unique status code(s): `401` if the current user logged in is not an Admin

### Agent
#### GET `/api/agent?inactivated=true`
Returns a list of all Agent accounts that are inactivated.

Response body: list of Agent account documents. Notice that for each such account object, we have the attribute `activated: false`.

#### GET `/api/agent?inactivated=false`
Returns a list of all Agent accounts that are not inactivated.

Response body: list of Agent account documents. Notice that for each such account object, we have the attribute `activated: true`.

#### PUT `/api/agent/:username`
Updates an Agent account with the given username, with the attributes defined in the request body.

Request body:
```
{
    firstName: string
    lastName: string
    email: string
    phone: string
    yearStarted: integer
    licenseId: string
    brokerage: string
    brokerageAddress: string
    brokerageNumber: string
}
```
Response body: document of the updated Agent account. 

Unique status codes: 
- `200` on success
- `400` if invalid fields are specified, 
- `404` if username does not belon to an existing account
- `401` if user making the request is not signed in as `username`

#### GET `/api/agent/:agent_id`
Gets an Agent account.

Response body: Mongo document of Agent account

Status code(s): `201` - retrieved, `404` - DNE
### Clients
#### POST `/api/clients/:agent_id`
Creates a new Client account, under a specific Agent.

Request body:
```
{
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    address: string
    city: string
    description: string
    tags: string
}
```
Response body: document of created Client
#### GET `/api/clients/:agent_id`
Gets a list of all Clients under an Agent.

Response body: 
```
{
    clients : [ Client Objects ]
}
```
#### GET `/api/clients/:agent_id/:client_id`
Gets a single specific Client under an Agent.

Response body: document of client object
#### PUT ` /api/clients/:agent_id/:client_id`
Updates a Client account thats under a specific Agent.

Request body:

```
{
    firstName: string
    lastName: string
    phoneNumber?: string
    email?: string
    address?: string
    city?: string
    description?: string
    profileImg?: image
    tags?: [ string ] 
}
```
Response body: document of updated Client
#### DELETE `/api/clients/:agent_id/:client_id`
Deletes a Client account thats under a specific Agent

Request body:
```
{
    firstName: string
    lastName: string
    phoneNumber?: string
    email?: string
    address?: string
    city?: string
    description?: string
    profileImg?: image
    tags?: [ string ] 
}
```
Response body: none
### Projects
#### POST `/api/projects/:client_id`
Creates a new Project for a Client.

Request body:
```
{
    title: string
    description: string
}
```
Response body: document of Project object

Status Codes: `200` on success or `404` if Client does not exist.
#### GET ` /api/projects/:client_id`
Gets all projects for a specific Client.

Request body:
```
{
    title: string
    description: string
}
```
Response body:
```
{
    projects : [ Property ]
} 
```
#### GET `/api/projects/:client_id/:project_id`
Gets the specified Project with `_id: project_id` under the specified Client.

Response body: Project object document

Status Codes: `200` on success or `404` if project does not exist.
#### DELETE `/api/projects/:client_id/:project_id`
Deletes a specfied Project with `_id: project_id` under the specified Client.

Response body: none

Status codes: `204` on success or `404` if project does not exist.
#### PATCH `/api/projects/:client_id/:project_id`
Updates specific fields of the Project with `project_id`.

Request body: 
```
[ 
    { op: “update”, field: “tags”, value: [ strings ] }, 
    { op: “update”, field: “title” | “description” , value: string },
    { op: "update“, field: "status”, value: "active" | "closed" }
]
```
Note that you can specify any attributes that you wish to modify out of `tags, title, description, status`. `tags` require a list of strings as the value, and `status` only takes a value of `active` or `closed`.

Response body: Updated project document.

Status codes: `200` on success, `404` if project does not exist, or `400` if invalid `field` types are specified. 
## Properties
#### POST `/api/property/:project_id`
Add a new Property to a Project.

Request body:
```
{
    address: string
    city: string
    province: string
    postalCode: string
}
```
Response body: document of Property object
#### DELETE `/api/property/:project_id/:property_id`
Delete a Property from a Project.

Response body: none
#### GET `/api/property/:project_id/:property_id`
Get all Properties for a Project.

Response body:
```
{
    properties: [ Property Objects ]
}
```
#### GET `/api/property/:project_id/:property_id`
Get a specific Property of a Project.

Response: Property object document
### PATCH `/api/property/:project_id/:property_id`
Update the notes field of a Property.

Request body:
```
{
    op: "set",
    field: "notes",
    value: string
}
```
#### POST `/api/property/:project_id/:property_id`
Add new Activity to a Property.

Request body:
```
{
    title: string
    date: Date
    description?: string
}
```
Response body:
```
{
    activity: Activity object
    property: Property Object
}
```
#### GET `/api/property/:project_id/:property_id/:activity_id`
Get an Activity.

Response body: Activity object
#### PUT `/api/property/:project_id/:property_id`
Update an Activity.

Request body:
```
{
    title: string
    date: Date
    description?: string
}
```
Response body:
```
{
    activity: Activity object
    property: parent Property object
}
```
# Libraries/Frameworks used
* React
* React Router
* React-datepicker
* TypeScript
* Material-UI 
* Material-UI icons
* Material-UI-search-bar
* UUID
* date-and-time
* Joi
