from django.http import HttpResponse
from django.template import loader

"""
def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    template = loader.get_template('polls/index.html')
    context = {
        'latest_question_list': latest_question_list,
    }
    return HttpResponse(template.render(context, request))
"""

def access(request):
    template = loader.get_template('fingerprintData/access.html')
    context = [

    ]
    return HttpResponse(template.render(context, request))

def purchase(request):
    template = loader.get_template('fingerprintData/purchase.html')
    context = [

    ]
    return HttpResponse(template.render(context, request))

def checkout(request):
    template = loader.get_template('fingerprintData/checkout.html')
    context = [

    ]
    return HttpResponse(template.render(context, request))

def overview(request):
    template = loader.get_template('fingerprintData/overview.html')
    context=[

    ]
    return HttpResponse(template.render(context, request))