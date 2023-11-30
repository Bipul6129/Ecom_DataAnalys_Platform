# Ecom_DataAnalys_Platform
A react django web application that simuates ecommerce data and provide admin/analyst secure login for their respective functions and features

## Prerequisites

Before you begin, ensure you have the following tools installed on your machine:
- Node.js
- npm (Node Package Manager)
- Python
- Django
- Virtual Environment

## Frontend Setup

### 1. Navigate to the Frontend Directory (FrontEnd\analyst_platform\)
### 2. Open terminal
### 3.-npm install
### 4.-npm start

## BackEnd Setup

### 1. Navigate to the BackEnd Directory (BackEnd\)
### 2. Create a virtual Environment and activate it
### 3. Install Django and Dependencies ``` pip install -r requirements.txt ```
### 4. Go to BackEnd\analyzePlatform\analyzePlatform\settings.py and change user password and user on DATABASES={} 
### 5. Change database name on DATABASES according to your schema name
### 6. Navigate to BackEnd\analyzePlatform and perform ```python manage.py migrations``` and ```python manage.py migrate```
### 7. ```py manage.py runserver```
