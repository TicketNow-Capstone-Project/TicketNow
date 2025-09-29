from django.contrib import messages
from django.shortcuts import redirect, render
from .models import Trip_Table, Ticket_Table, Driver_Table, Vehicle_Table
from .forms import TripForm, TicketForm, DriverForm, VehicleForm

def operations_page(request):
    return render(request, "ticket_models/operations.html")  # app_name/template.html
def resources_page(request):
    return render(request, "ticket_models/resources.html")  # app_name/template.html

def resources_page_view(request, page_name):  
    if page_name == "menu":   
        return render(request, "ticket_models/resources_menu.html")
    
    elif page_name == "drivers":   
        drivers = Driver_Table.objects.all()
        if request.method == "POST":
                form = DriverForm(request.POST)
                if form.is_valid():
                    form.save()
                    messages.success(request, "Ticket created successfully!")
                    form = DriverForm()  # reset form
                else:
                    messages.error(request, "Please correct the errors below.")
        else:
            form = DriverForm()
        return render(request, "ticket_models/all_drivers.html", {"drivers": drivers, "form": form})

    elif page_name == "vehicles":
        vehicles = Vehicle_Table.objects.all()
        if request.method == "POST":
                form = VehicleForm(request.POST)
                if form.is_valid():
                    form.save()
                    messages.success(request, "Ticket created successfully!")
                    form = VehicleForm()  # reset form
                else:
                    messages.error(request, "Please correct the errors below.")
        else:
            form = VehicleForm()
        return render(request, "ticket_models/all_vehicles.html", {"vehicles": vehicles, "form": form})

    else:
        return render(request, "ticket_models/resources_menu.html")
    

def operations_page_view(request, page_name):  
    if page_name == "menu":   
        return render(request, "ticket_models/operation_menu.html")
    
    elif page_name == "bookings":
        return render(request, "ticket_models/bookings.html")
    
    elif page_name == "tickets":   
                tickets = Ticket_Table.objects.all()
                if request.method == "POST":
                        form = TicketForm(request.POST)
                        if form.is_valid():
                            form.save()
                            messages.success(request, "Ticket created successfully!")
                            form = TicketForm()  # reset form
                        else:
                            messages.error(request, "Please correct the errors below.")
                else:
                    form = TicketForm()
                return render(request, "ticket_models/all_tickets.html", {"tickets": tickets, "form": form})

    elif page_name == "trips":
                trips = Trip_Table.objects.all()
                if request.method == "POST":
                    form = TripForm(request.POST)
                    if form.is_valid():
                        form.save()
                        messages.success(request, "Trip created successfully!")   # built-in message
                        form = TripForm()  # reset form
                    else:
                        messages.error(request, "Please correct the errors below.")  # error case
                else:
                    form = TripForm()
                return render(request, "ticket_models/all_trips.html", {"trips": trips, "form": form})
        
    else:
            return render(request, "ticket_models/menu.html")
            