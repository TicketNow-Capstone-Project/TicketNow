from django.urls import path
from . import views

urlpatterns = [
    path('', views.generate_qr, name='generate_qr'),                     # Driver registration + QR generation
    path('scanner/', views.qr_scanner, name='qr_scanner'),              # QR code scanner page
    path('id/<int:driver_id>/', views.printable_id, name='printable_id'),
    path('download-pdf/<int:driver_id>/', views.download_pdf, name='download_pdf'), # Download PDF of driver ID
    path('scan-qr/', views.scan_qr_and_queue, name='scan_qr'),          # Process scanned QR code and queue driver
    path('queue/done/<int:queue_id>/', views.mark_done, name='mark_done'), # Mark driver as done in queue
    path('queue-monitor/', views.queue_monitor, name='queue_monitor'), # Monitor the queue of drivers
    path('ajax/scan/', views.ajax_scan_driver, name='ajax_scan_driver'), # AJAX handler for scanning driver QR codes

]
