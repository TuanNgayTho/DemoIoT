pip install -r requirements.txt
celery -A jokes_project beat -l INFO
celery -A jokes_project worker --pool=solo -l info
Python .\manage.py runserver