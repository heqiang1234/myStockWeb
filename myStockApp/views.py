from django.shortcuts import render, redirect


def index(request):
    return render(request, 'index.html')


def login(request):
    return render(request, 'login.html')


def register(request):
    return render(request, 'register.html')


def logout(request):
    return redirect('/index/')