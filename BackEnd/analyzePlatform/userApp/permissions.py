
from rest_framework import permissions

class IsAdminUser(permissions.BasePermission):


    def has_permission(self, request, view):
        # Check if the user has the "admin" role
        return request.user.role == 'admin'


class IsAnalyst(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user.role=='analyst'