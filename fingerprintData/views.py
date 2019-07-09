from django.http import HttpResponse


def index(request):
    response="Hello, world. You're at the index."
    return HttpResponse(response)

def access(request, question_id):
    response="You're looking at the access page"
    return HttpResponse(response)

def purchase(request, question_id):
    response = "You're looking at the purchase page"
    return HttpResponse(response)

def checkout(request, question_id):
    response ="You're looking at the checkout page"
    return HttpResponse(response)