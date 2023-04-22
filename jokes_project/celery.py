import os
from celery import Celery


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'jokes_project.settings')

BROKER_URL = 'redis://localhost:6379/0'
app= Celery('jokes_project', broker=BROKER_URL)
app.config_from_object('django.conf:settings', namespace='CElERY')
app.conf.beat_schedule = {
    'get_joke_3s': {
        'task': 'jokes.tasks.get_joke',
        'schedule': 3.0
    }
}
app.autodiscover_tasks()
