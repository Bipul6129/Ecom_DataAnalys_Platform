from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class MyUser(AbstractUser):

    Roles=[
        ('admin','Admin'),
        ('user','User'),
        ('analyst','Analyst')
    ]
    role = models.CharField(max_length=20,choices=Roles,db_column='role',default='user')

    def __str__(self):
        return self.username
    
    class Meta:
        db_table='user'

