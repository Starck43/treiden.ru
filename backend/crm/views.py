from django.shortcuts import render, redirect

""" Main page """
def index(request):
	context = {
	}
	return render(request, 'index.html', context)

