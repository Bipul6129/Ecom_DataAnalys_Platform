# urls.py

from django.urls import path
from .views import *

urlpatterns = [
    path('crud_products/', ProductListView.as_view(), name='product-list'),
    path('popularProduct/',GetPopularProductView.as_view(),name='popular-list'),
    path('uniqueUsersDay/',GetUniqueUsersPerDayView.as_view(),name='unique-user-day'),
    path('uniqueUsersMonth/',GetUniqueUsersPerYear.as_view(),name='unique-user-month'),
    path('del_products/<int:pk>/delete/',DeleteProductView.as_view(),name='delete-product'),
    path('update_products/<int:pk>/update/',UpdateProductView.as_view(),name='update-product'),
    path('allTransaction/',AllTransactionsView.as_view(),name='tran-view')
]
