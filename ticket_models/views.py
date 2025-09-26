from django.contrib import messages
from django.shortcuts import redirect, render
from .models import Trip_Table, Ticket_Table
from .forms import TripForm, TicketForm

def ticket_page(request):
    return render(request, "ticket_models/base.html")  # app_name/template.html

def page_view(request, page_name):
    if page_name == "trips":
        trips = Trip_Table.objects.all()
        if request.method == "POST":
            form = TripForm(request.POST)
            if form.is_valid():
                form.save()
                messages.success(request, "✅ Trip created successfully!")   # built-in message
                form = TripForm()  # reset form
            else:
                messages.error(request, "❌ Please correct the errors below.")  # error case
        else:
            form = TripForm()
        return render(request, "ticket_models/all_trips.html", {"trips": trips, "form": form})
    
    elif page_name == "menu":   
        return render(request, "ticket_models/menu.html")
    elif page_name == "tickets":   
        tickets = Ticket_Table.objects.all()
        if request.method == "POST":
                form = TicketForm(request.POST)
                if form.is_valid():
                    form.save()
                    messages.success(request, "🎟️ Ticket created successfully!")
                    form = TicketForm()  # reset form
                else:
                    messages.error(request, "❌ Please correct the errors below.")
        else:
            form = TicketForm()
        return render(request, "ticket_models/all_tickets.html", {"tickets": tickets, "form": form})
   


    else:
        return render(request, "ticket_models/menu.html")