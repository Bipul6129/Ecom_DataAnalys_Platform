from django.db import models
from userApp.models import MyUser
# Create your models here.

class Product(models.Model):
    product_id = models.AutoField(primary_key=True,db_column='id')
    product_name = models.CharField(max_length=255,db_column='name')
    product_price = models.DecimalField(max_digits=10, decimal_places=2,db_column='price')
    product_category = models.CharField(max_length=255,db_column='category')

    def __str__(self):
        return self.product_name
    
    class Meta:
        managed=True
        db_table = 'product'

from django.db import models

class Transaction(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    products = models.ManyToManyField('Product', through='TransactionProduct')
    
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = True
        db_table = 'transaction'

class TransactionProduct(models.Model):
    transaction = models.ForeignKey('Transaction', on_delete=models.CASCADE,db_column='transaction_id')
    product = models.ForeignKey('Product', on_delete=models.CASCADE,db_column='product_id')
    quantity = models.IntegerField(default=0)
    class Meta:
        managed = True
        db_table = 'transaction_product'


class PageView(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed=True
        db_table = 'pageview'
