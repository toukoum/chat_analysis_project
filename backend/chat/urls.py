from django.urls import path
from chat.views import ChatAnalysisView

urlpatterns = [
	path('analyse/', ChatAnalysisView.as_view(), name='index'),
]

