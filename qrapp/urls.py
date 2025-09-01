from django.urls import path
from . import views

app_name = "qrapp"

urlpatterns = [

    # Authentication
    path('', views.user_login, name="login"),
    path("logout/", views.user_logout, name="logout"),
    path("dashboard/", views.dashboard, name="dashboard"),

    # Dashboard as default homepage
    #path('', views.dashboard, name='dashboard'),

    # Driver registration + QR generation
    path('generate-qr/', views.generate_qr, name='generate_qr'),

    # Printable ID + PDF
    path('id/<int:driver_id>/', views.printable_id, name='printable_id'),
    path('download-pdf/<int:driver_id>/', views.download_pdf, name='download_pdf'),

    # Scanner + Queue management
    path('scanner/', views.qr_scanner, name='qr_scanner'),
    path('scan-qr/', views.scan_qr_and_queue, name='scan_qr'),
    path('ajax/scan/', views.ajax_scan_driver, name='ajax_scan_driver'),
    path('queue-monitor/', views.queue_monitor, name='queue_monitor'),
    path('queue/done/<int:queue_id>/', views.mark_done, name='mark_done'),
]
