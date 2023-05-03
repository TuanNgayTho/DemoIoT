from django.shortcuts import render, redirect
from django.contrib import messages
from django.views.generic import TemplateView
from django.contrib.auth.views import LoginView
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
# Create your views here.
def index(request):
    return render(request, 'login.html')


class homepage(LoginView):
    template_name = 'home.html'


@login_required(login_url="/login")
def home(request):
    return render(request, "home.html")


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
