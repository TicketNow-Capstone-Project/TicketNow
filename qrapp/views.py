import qrcode
import os
import base64
from io import BytesIO
from django.shortcuts import render, redirect, get_object_or_404
from django.conf import settings
from django.template.loader import get_template
from django.http import HttpResponse
#from weasyprint import HTML
import tempfile
from .forms import DriverInfoForm
from .models import DriverInfo


def generate_qr(request):
    if request.method == 'POST':
        form = DriverInfoForm(request.POST)
        if form.is_valid():
            instance = form.save()

            # Prepare data for QR
            data = f"{instance.first_name} {instance.middle_name} {instance.last_name}\n{instance.address}\n{instance.vehicle_type}\n{instance.plate_number}\n{instance.route_taken}"

            # Generate QR code
            qr = qrcode.make(data)

            # Ensure save directory exists
            qr_folder = os.path.join(settings.BASE_DIR, 'static', 'qrapp')
            os.makedirs(qr_folder, exist_ok=True)

            # Save QR image
            filename = f"qr_{instance.plate_number}.png"
            file_path = os.path.join(qr_folder, filename)
            qr.save(file_path)

            # Base64 encode for inline preview
            buffered = BytesIO()
            qr.save(buffered, format="PNG")
            img_str = base64.b64encode(buffered.getvalue()).decode()

            # Render the printable ID page
            return render(request, 'qrapp/driver_id.html', {
                'driver': instance,
                'qr_code': img_str
            })

        # If form is invalid
        return render(request, 'qrapp/home.html', {'form': form})

    # GET request
    form = DriverInfoForm()
    return render(request, 'qrapp/home.html', {'form': form})


def qr_scanner(request):
    return render(request, 'qrapp/scanner.html')


# ✅ Printable ID Page (static version)
def printable_id(request, driver_id):
    driver = get_object_or_404(DriverInfo, id=driver_id)
    qr_path = f"/static/qrapp/qr_{driver.plate_number}.png"
    return render(request, 'qrapp/printable_id.html', {
        'driver': driver,
        'qr_path': qr_path,
    })


# ✅ Downloadable PDF View using WeasyPrint
def download_pdf(request, driver_id):
    driver = get_object_or_404(DriverInfo, id=driver_id)

    # Load HTML template
    template = get_template('qrapp/driver_id_pdf.html')

    # Path to saved QR image (used for PDF)
    qr_path = os.path.join(settings.BASE_DIR, 'static', 'qrapp', f'qr_{driver.plate_number}.png')

    with open(qr_path, "rb") as qr_file:
        qr_base64 = base64.b64encode(qr_file.read()).decode()

    html_content = template.render({
        'driver': driver,
        'qr_code': qr_base64
    })

    with tempfile.NamedTemporaryFile(delete=True, suffix=".pdf") as output:
        HTML(string=html_content).write_pdf(output.name)
        output.seek(0)
        response = HttpResponse(output.read(), content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename=driver_{driver.id}_id_card.pdf'
        return response
