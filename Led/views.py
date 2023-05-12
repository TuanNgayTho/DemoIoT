from django.shortcuts import render, redirect
from django.contrib import messages
from django.views.generic import View
from django.contrib.auth.views import LoginView
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse
from ClassMqtt import ClassMqtt
import json
from random import randint

# Create your views here.
def index(request):
    return render(request, 'login.html')


class homepage(View):
    def get(self, request):
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            number = randint(1, 10)
            return JsonResponse({'number': number})
        return render(request, "home.html")

    def post(seft, request):
        data = json.loads(request.body)
        float_number = float(data['number'])
        print(float_number)
        return JsonResponse({'float': f'you got: {float_number}'})


@login_required(login_url="/login")
def home(request):
    if request.method == "POST":
        data = json.loads(request.body)
        # abc = data['number']
        sendMqtt = ClassMqtt()
        sendMqtt.publishmqtt('Test', data)
        print(data)
        return JsonResponse(data)
    if request.method == "GET":
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            number = randint(1, 10)
            return JsonResponse({'number': number})
        return render(request, "home.html")
    # return render(request, "home.html")


def loginpage(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('/home')
        else:
            messages.error(request, '!Tên đăng nhập hoặc mật khẩu không chính xác')
    context = {}
    return render(request, "login.html", context)


def logoutpage(request):
    logout(request)
    return redirect('/login')
