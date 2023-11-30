
from rest_framework.views import APIView
from rest_framework.generics import DestroyAPIView,UpdateAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *
from userApp.permissions import *
from rest_framework import status
from django.db.models import Count
from django.http import JsonResponse
from django.db.models.functions import ExtractDay,ExtractYear,ExtractMonth
from datetime import datetime



class ProductListView(APIView):
    permission_classes = [IsAuthenticated,IsAdminUser]

    def get(self, request, format=None):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    
    def post(self,request,*args,**kwargs):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class GetPopularProductView(APIView):
    permission_classes=[IsAuthenticated,IsAnalyst]

    def get(self,request):
        default_month = 11
        default_year = datetime.now().year

        # Validate and get providedMonth
        provided_month_str = request.GET.get('providedMonth', str(default_month))
        try:
            provided_month = int(provided_month_str)
        except ValueError:
            provided_month = default_month

        # Validate and get providedYear
        provided_year_str = request.GET.get('providedYear', str(default_year))
        try:
            provided_year = int(provided_year_str)
        except ValueError:
            provided_year = default_year
        popularProductInTransaction = TransactionProduct.objects.filter(
            transaction__timestamp__month=provided_month,
            transaction__timestamp__year=provided_year
        ).values('product__product_name').annotate(total_quantity=Count('quantity')).order_by('-total_quantity')
        
        return JsonResponse({'popular_products':list(popularProductInTransaction)})
    
class GetUniqueUsersPerDayView(APIView):
    permission_classes=[IsAuthenticated,IsAnalyst]

    def get(self,request):
        requested_month=int(request.GET.get('requestedMonth',datetime.now().month))
        requested_year = int(request.GET.get('requestedYear',datetime.now().year))

        start_date=datetime(requested_year,requested_month,1)
        end_date=datetime(requested_year,requested_month+1,1) if requested_month < 12 else datetime(requested_year + 1, 1, 1)

        uniqueUsersPerDay = PageView.objects.filter(
            timestamp__gte=start_date,
            timestamp__lt=end_date
        ).annotate(
            day=ExtractDay('timestamp')
        ).values('day').annotate(
            unique_users=Count('user',distinct=True)
        ).order_by('day')

        result_list=list(uniqueUsersPerDay)

        return JsonResponse({'unique_users_per_day':result_list})


class GetUniqueUsersPerYear(APIView):
    # permission_classes=[IsAuthenticated,IsAnalyst]

    def get(self,request):
        requested_year=int(request.GET.get('requestedYear',datetime.now().year))

        start_date=datetime(requested_year,1,1)
        end_date=datetime(requested_year+1,1,1)

        uniqueUsersPerMonth=PageView.objects.filter(
            timestamp__gte=start_date,
            timestamp__lt=end_date,
        ).annotate(
            year=ExtractYear('timestamp'),
            month=ExtractMonth('timestamp')
        ).values('year','month').annotate(
            unique_users=Count('user',distinct=True)
        ).order_by('year','month')

        result_list = list(uniqueUsersPerMonth)

        return JsonResponse({'unique_users':result_list})
    
class DeleteProductView(DestroyAPIView):
    queryset=Product.objects.all()
    serializer_class=ProductSerializer
    permission_classes=[IsAuthenticated,IsAdminUser]

    def destroy(self,request,*args,**kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response({"message":"Deleted"})
        except Exception as e:
            return Response({"error":str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class UpdateProductView(UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class=ProductSerializer
    permission_classes=[IsAuthenticated,IsAdminUser]

    def update(self,request,*args,**kwargs):
        partial = kwargs.pop('partial',False)
        instance = self.get_object()
        serializer = self.get_serializer(instance,data=request.data,partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
    
    def perform_update(self,serializer):
        serializer.save()

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request,*args,**kwargs)
    
class AllTransactionsView(APIView):
    # permission_classes = [IsAdminUser]

    def get(self, request, *args, **kwargs):
        transactions = Transaction.objects.all().order_by('-timestamp') 
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)