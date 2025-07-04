from django.urls import path
from . import views

urlpatterns = [
    path('', views.generate_qr, name='generate_qr'),                     # Driver registration + QR generation
    path('scanner/', views.qr_scanner, name='qr_scanner'),              # QR code scanner page
    path('id/<int:driver_id>/', views.printable_id, name='printable_id'),  # Printable ID view
    path('download-pdf/<int:driver_id>/', views.download_pdf, name='download_pdf'),  # ✅ Add this route
]
