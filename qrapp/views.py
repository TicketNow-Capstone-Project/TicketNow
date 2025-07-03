import qrcode
import os
from io import BytesIO
from django.shortcuts import render
from django.conf import settings
from .forms import DriverInfoForm
from .models import DriverInfo
import base64

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

            return render(request, 'qrapp/home.html', {
                'form': DriverInfoForm(),
                'qr_code': img_str,
                'qr_filename': f"qrapp/{filename}",  # for static use
            })
        else:
            return render(request, 'qrapp/home.html', {'form': form})
    
    # For GET request
    form = DriverInfoForm()
    return render(request, 'qrapp/home.html', {'form': form})
