from rest_framework import serializers
from .models import *

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields=['product_id','product_name','product_price','product_category']
        extra_kwargs = {'product_id': {'required': False}}


class TransactionSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user_id.username', read_only=True)
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Transaction
        fields = ['id', 'username','products', 'timestamp']

