from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render
"""
def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    template = loader.get_template('polls/index.html')
    context = {
        'latest_question_list': latest_question_list,
    }
    return HttpResponse(template.render(context, request))
"""

#TODO add contexts where required.
#TODO learn FORMS, and GET/POST methods.
#TODO learn Bootstrap4 html tags.
#TODO Integrate Chart.js in overview.html, along with DJANGO REST Framework.

def access(request):
    template ='fingerprintData/access.html'
    return render (request, template)

def purchase(request):
    template ='fingerprintData/purchase.html'
    return render (request, template)

def checkout(request):
    template ='fingerprintData/checkout.html'
    return render (request, template)

def overview(request):
    template ='fingerprintData/overview.html'
    return render (request, template)

def prova(request):
    template='fingerprintData/prova.html'
    return render (request, template)