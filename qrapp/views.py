import os
import base64
import json
import uuid
import qrcode
from io import BytesIO
from datetime import timedelta
from PIL import Image

from django.shortcuts import render, redirect, get_object_or_404
from django.conf import settings
from django.template.loader import get_template
from django.http import HttpResponse, JsonResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.core.files.base import ContentFile

from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages

from .forms import DriverInfoForm
from .models import DriverInfo, DriverQueue


# ---------------------------
# Authentication
# ---------------------------
def user_login(request):
    if request.user.is_authenticated:
        return redirect("qrapp:dashboard")  # already logged in → dashboard

    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect("qrapp:dashboard")  # go to dashboard after login
        else:
            messages.error(request, "Invalid username or password")

    return render(request, "qrapp/login.html")


@login_required(login_url="qrapp:login")
def user_logout(request):
    logout(request)
    messages.success(request, "You have been logged out successfully.")
    return redirect("qrapp:login")  # ✅ always go to login page


# ---------------------------
# Dashboard
# ---------------------------
@login_required(login_url="qrapp:login")
def dashboard(request):
    return render(request, "qrapp/dashboard.html", {"active_page": "overview"})


# ---------------------------
# Admin Accounts Management
# ---------------------------
@login_required(login_url="qrapp:login")
def accounts(request):
    admins = User.objects.filter(is_staff=True)
    return render(request, "qrapp/accounts.html", {
        "admins": admins,
        "active_page": "accounts",
    })


@login_required(login_url="qrapp:login")
def delete_account(request, account_id):
    admin = get_object_or_404(User, id=account_id, is_staff=True)
    admin.delete()
    messages.success(request, "Admin account deleted successfully.")
    return redirect("qrapp:accounts")


@login_required(login_url="qrapp:login")
def change_password(request, account_id):
    admin = get_object_or_404(User, id=account_id, is_staff=True)
    if request.method == "POST":
        new_password = request.POST.get("new_password")
        if new_password:
            admin.set_password(new_password)
            admin.save()
            messages.success(request, f"Password for {admin.username} updated.")
            return redirect("qrapp:accounts")
        else:
            messages.error(request, "Password cannot be empty.")
    return render(request, "qrapp/change_password.html", {"admin": admin})


@login_required(login_url="qrapp:login")
def create_account(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already exists.")
        else:
            user = User.objects.create_user(username=username, password=password)
            user.is_staff = True
            user.save()
            messages.success(request, f"Admin account {username} created successfully.")
            return redirect("qrapp:accounts")

    return render(request, "qrapp/create_account.html")


# ---------------------------
# Driver QR Code Generation
# ---------------------------
@login_required(login_url="qrapp:login")
def generate_qr(request):
    if request.method == 'POST':
        form = DriverInfoForm(request.POST, request.FILES)
        if form.is_valid():
            instance = form.save()

            # Handle uploaded or webcam-captured image
            uploaded_image = request.FILES.get('driver_image')
            base64_image_data = request.POST.get('driver_image')

            if uploaded_image:
                instance.driver_image = uploaded_image
            elif base64_image_data and base64_image_data.startswith("data:image"):
                format, imgstr = base64_image_data.split(';base64,')
                ext = format.split('/')[-1]
                image_data = ContentFile(
                    base64.b64decode(imgstr),
                    name=f"{uuid.uuid4()}.{ext}"
                )
                instance.driver_image = image_data

            instance.save()

            # Generate QR code
            qr_data = (
                f"{instance.first_name} {instance.middle_name} {instance.last_name}\n"
                f"{instance.address}\n"
                f"{instance.vehicle_type}\n"
                f"{instance.plate_number}\n"
                f"{instance.route_taken}"
            )
            qr_img = qrcode.make(qr_data)
            qr_folder = os.path.join(settings.BASE_DIR, 'static', 'qrapp')
            os.makedirs(qr_folder, exist_ok=True)
            filename = f"qr_{instance.plate_number}.png"
            file_path = os.path.join(qr_folder, filename)
            qr_img.save(file_path)

            return redirect('qrapp:printable_id', driver_id=instance.id)

        return render(request, 'qrapp/home.html', {'form': form})

    form = DriverInfoForm()
    return render(request, 'qrapp/home.html', {'form': form})


# ---------------------------
# Printable Driver ID
# ---------------------------
@login_required(login_url="qrapp:login")
def printable_id(request, driver_id):
    driver = get_object_or_404(DriverInfo, id=driver_id)
    qr_path = os.path.join(settings.BASE_DIR, 'static', 'qrapp', f'qr_{driver.plate_number}.png')
    with open(qr_path, "rb") as qr_file:
        qr_code_base64 = base64.b64encode(qr_file.read()).decode()

    return render(request, 'qrapp/printable_id.html', {
        'driver': driver,
        'qr_code': qr_code_base64
    })


# ---------------------------
# QR Scanner + Queue System
# ---------------------------
@login_required(login_url="qrapp:login")
def qr_scanner(request):
    return render(request, 'qrapp/scanner.html')


@login_required(login_url="qrapp:login")
def queue_monitor(request):
    queue = DriverQueue.objects.filter(is_done=False).order_by('departure_time')
    return render(request, 'qrapp/queue_monitor.html', {
        "queue": queue,
        "active_page": "trip_queue",
    })


@login_required(login_url="qrapp:login")
def mark_done(request, queue_id):
    queue_item = get_object_or_404(DriverQueue, id=queue_id)
    queue_item.is_done = True
    queue_item.save()
    return redirect('qrapp:queue_monitor')


def handle_scan_logic(plate_number):
    try:
        driver = DriverInfo.objects.get(plate_number=plate_number)
        scan_time = timezone.now()
        departure_time = scan_time + timedelta(minutes=30)

        if not DriverQueue.objects.filter(driver=driver, is_done=False).exists():
            DriverQueue.objects.create(driver=driver, departure_time=departure_time)

        return True, {
            "route": driver.route_taken,
            "departure_time": departure_time.strftime('%I:%M %p'),
            "plate_number": driver.plate_number,
        }
    except DriverInfo.DoesNotExist:
        return False, "Driver not found."


@csrf_exempt
@login_required(login_url="qrapp:login")
def ajax_scan_driver(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            plate_number = data.get("plate_number")
            success, result = handle_scan_logic(plate_number)

            if not success:
                return JsonResponse({"success": False, "message": result})

            return JsonResponse({"success": True, "message": "Driver added to queue.", **result})

        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)})

    return JsonResponse({"success": False, "message": "Invalid request."})


@csrf_exempt
@login_required(login_url="qrapp:login")
def scan_qr_and_queue(request):
    if request.method == 'POST':
        qr_data = request.POST.get('qr_data', '').strip()
        try:
            lines = qr_data.split('\n')
            plate_number = lines[3].strip()
            success, result = handle_scan_logic(plate_number)

            if not success:
                return JsonResponse({"status": "error", "message": result})

            return JsonResponse({"status": "success", "message": "Driver added to queue", **result})

        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)})

    return JsonResponse({"status": "error", "message": "Invalid request."})


# ---------------------------
# PDF Download (Stub)
# ---------------------------
@login_required(login_url="qrapp:login")
def download_pdf(request, driver_id):
    driver = get_object_or_404(DriverInfo, id=driver_id)
    template = get_template('qrapp/driver_id_pdf.html')
    qr_path = os.path.join(settings.BASE_DIR, 'static', 'qrapp', f'qr_{driver.plate_number}.png')

    with open(qr_path, "rb") as qr_file:
        qr_base64 = base64.b64encode(qr_file.read()).decode()

    html_content = template.render({
        'driver': driver,
        'qr_code': qr_base64
    })

    return HttpResponse("PDF download feature is not yet enabled. (WeasyPrint needed)")

