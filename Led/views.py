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
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import data
from .serializers import getAllData
import csv


list_Data = ''
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

class getAllDataAPIVIEW(APIView):
    def get(self, request):
        list_Data = data.objects.all()
        mydata = getAllData(list_Data, many=True)
        return Response(data= mydata.data, status=status.HTTP_200_OK)

    def post(self, request):
        # date = json.loads(request.data)
        date = request.data
        startDate = date['StartDate']
        endDate = date['EndDate']
        list_Data = data.objects.raw('SELECT * FROM led_data WHERE joindate BETWEEN "'+startDate+'" AND "'+endDate+'" ;')
        mydata = getAllData(list_Data, many=True)
        return Response(data= mydata.data, status=status.HTTP_200_OK)

def ExPortCSV(request):
    if request.method == "POST":
        startDate = request.POST.get('startdate')
        endDate = request.POST.get('enddate')
        list_Data = data.objects.raw('SELECT * FROM led_data WHERE joindate BETWEEN "' + startDate + '" AND "' + endDate + '" ;')
        mydata = getAllData(list_Data, many=True)

        responce = HttpResponse(content_type='text/csv')
        writer = csv.writer(responce)
        writer.writerow(['Value','Date'])
        for value in list_Data:
            writer.writerow([value.price, value.joindate])
        responce['Content-Disposition'] = 'attachment; filename = "ExPortData.csv"'
        return responce

    if request.method == "GET":
        responce = HttpResponse(content_type='text/csv')
        writer = csv.writer(responce)
        writer.writerow(['Value', 'Date'])
        for value in data.objects.all().values_list('price','joindate'):
            writer.writerow(value)
        responce['Content-Disposition'] = 'attachment; filename = "ExPortData.csv"'
        return responce