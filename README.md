# Ecom_DataAnalys_Platform
A react django web application that simuates ecommerce data and provide admin/analyst secure login for their respective functions and features


## Login Credentials
Use the following credentials for the Login of admin or analyst role
- Admin (username:bipul,password:mypassword)
- Analyst (username:user,password:mypassword)


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
- Import it on MySql Workbench


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
