from pins.models import pin
from rest_framework import viewsets, permissions
from .serializers import PinSerializer
from django.contrib.auth.models import User
# catalog viewset


class PinViewSet(viewsets.ModelViewSet):
    queryset = pin.objects.all()
    permission_classes = [
        permissions.AllowAny
        # permissions.IsAuthenticated,
    ]
    serializer_class = PinSerializer


"""     def get_queryset(self):
        return self.request.user.pins.all()

    def perform_create(self, serializer):  # saves user id
        serializer.save(owner=self.request.user) """
