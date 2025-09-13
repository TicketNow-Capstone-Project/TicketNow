from django.shortcuts import render

def ticket_page(request):
    return render(request, "ticket_models/base.html")  # app_name/template.html
