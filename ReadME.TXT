pip install -r requirements.txt
celery -A Led_project beat -l INFO
celery -A Led_project worker --pool=solo -l info
Python .\manage.py runserver