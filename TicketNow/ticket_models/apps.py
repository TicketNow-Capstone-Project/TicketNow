from django.apps import AppConfig


class TicketModelsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'ticket_models'
    
    def ready(self):
        import ticket_models.signals