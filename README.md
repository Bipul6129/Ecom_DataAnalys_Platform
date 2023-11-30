# Ecom_DataAnalys_Platform
A react django web application that simuates ecommerce data and provide admin/analyst secure login for their respective functions and features. This web application uses Django as bacckend server, MySql as data storage system, React for frontEnd services.


## Login Credentials
Use the following credentials for the Login of admin or analyst role
- Admin (username: bipul,password: mypassword)
- Analyst (username: user,password: mypassword)


## Prerequisites

Before you begin, ensure you have the following tools installed on your machine:
- Node.js
- npm (Node Package Manager)
- Python
- Django
- Virtual Environment
- MySql

## Database Setup
- Extract Dump rar
- Import it on MySql Workbench with data and structure


## Frontend Setup

- Navigate to the Frontend Directory (FrontEnd\analyst_platform\)
- Open terminal
- -npm install
- -npm start

## BackEnd Setup
- Navigate to the BackEnd Directory (BackEnd\)
- Create a virtual Environment and activate it
- Install Django and Dependencies ``` pip install -r requirements.txt ```
- Go to BackEnd\analyzePlatform\analyzePlatform\settings.py and change user password and user on DATABASES={} 
- Change database name on DATABASES according to your schema name also port number
- Navigate to BackEnd\analyzePlatform and perform ```python manage.py migrations``` and ```python manage.py migrate```
- ```py manage.py runserver```

## Insights

### Design Decisions

- **Choice of Technology Stack:**
  - This web application uses the django,react framework for backend and frontend processing respectively since both framework goes well together. MySql is used for data storage since it is suitable for large scale data and scalability features.

- **Architectural Decisions:**
  - This system follows the client -> server -> database architecture with the implementation of rest api which makes it loosely coupled system.

### Development Process

- **Challenges Faced:**
  - Applying user login system was quite challenging since it is a three tier system. The challenge was solved with the usage of JWT tokens to keep track of user authority by checking the token validity on server.

- **Key Learnings:**
  - This project help me learn about the react frontend technology sincei was not familiar with the react itself.

### Coding Practices

- **Coding Style:**
  - On this project django follows the OOP apprach whereas the React application follows the functional approach.

- **Testing Approach:**
  - Testing of the api of server was done via PostMan by sending the necessary http request to the server

### Future Enhancements

- **Future Roadmap:**
  - The project could implement the ethnicity of the users and use various algorithms to findout the popular products among the ethnicity of users and recommend the product based on customer ethnicity. The recommendation system of product could also be implemented by checking the frequent item bought together.
