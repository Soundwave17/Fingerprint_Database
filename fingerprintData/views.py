import json
from django.http import HttpResponse, JsonResponse, Http404
from django.template import loader
from django.shortcuts import render, get_object_or_404
from django.views import View

from fingerprintData import globalfunctions
from fingerprintData.models import Customer, Purchase, Product, PurchaseList, Fingerprint, Type
from fingerprintData.forms import CustomerCreateForm, CustomerAccessForm

"""
def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    template = loader.get_template('polls/index.html')
    context = {
        'latest_question_list': latest_question_list,
    }
    return HttpResponse(template.render(context, request))
"""


# TODO add contexts where required.
# TODO learn FORMS, and GET/POST methods.
# TODO learn Bootstrap4 html tags.
# TODO Integrate Chart.js in overview.html

class access(View):
    def get(self, request):
        template = 'fingerprintData/access.html'
        form = CustomerAccessForm()
        return render(request, template, {'form': form})


class register(View):
    def get(self, request):
        template = 'fingerprintData/register.html'
        form = CustomerCreateForm()
        return render(request, template, {'form': form})

class purchase(View):
    def get(self, request, customer_email):
        customer = get_object_or_404(Customer, pk=customer_email, customer_admin=False)
        template = 'fingerprintData/purchase.html'
        return render(request, template, {'customer': customer})

class checkout(View):
    def get(self, request, customer_email):
        customer = get_object_or_404(Customer, pk=customer_email)
        template = 'fingerprintData/checkout.html'
        return render(request, template, {'customer': customer})


class overview(View):
    def get(self, request, customer_email):
        customer = get_object_or_404(Customer, pk=customer_email)
        if (customer.customer_admin):
            template = 'fingerprintData/overview.html'
            return render(request, template, {'customer': customer})
        raise Http404("How did you get in here???")


class fingerprint_access(View):
    def get(self, request, customer_email):
        customer = get_object_or_404(Customer, pk=customer_email)
        template = 'fingerprintData/fingerprint_access.html'
        return render(request, template, {'customer': customer})



class prova(View):
    def get(self, request):
        template = 'fingerprintData/prova.html'
        return render(request, template)


# TODO instead of password checking, use fingerprint checking.

def customer_login(request):
    data = {'msg': '', 'success': False, 'admin': False}
    if request.method == 'GET':
        email = request.GET.get('customer_email')
        password = request.GET.get('customer_password')
        exists = Customer.objects.filter(customer_email=email, customer_password=password).exists()
        if exists:
            data['msg'] = 'Welcome ' + Customer.objects.get(customer_email=email).customer_name
            data['success'] = True
            if (Customer.objects.get(pk=email).customer_admin):
                data['admin'] = True
        else:
            data['msg'] = 'Your email/password is not valid. Please try again'

    return JsonResponse(data)


def customer_exists(request, customer_email):
    data = {'msg': '', 'success': False}
    if request.method == 'GET':
        email = request.GET.get('customer_email')
        exists = Customer.objects.filter(customer_email=email).exists()
        if exists:
            data['msg'] = 'This email exists.'
            data['admin'] = Customer.objects.get(pk=email).customer_admin
            data['success']=True;
        else:
            data['msg'] = 'The email is not valid.'
            data['success'] = False

    return JsonResponse(data)


def create_customer(request):
    data = dict()
    if request.method == 'POST':
        email = request.POST.get('customer_email')
        password = request.POST.get('customer_password')
        name = request.POST.get('customer_name')
        surname = request.POST.get('customer_surname')
        fingerprint_id = request.POST.get('fingerprint_id')
        exists = Customer.objects.filter(customer_email=email).exists()

        if exists:
            data['msg'] = 'Email already registered! You fool!'

        else:
            fingerprint = Fingerprint(fingerprint_id=fingerprint_id)
            fingerprint.save()
            customer = Customer(customer_email=email, customer_password=password, customer_name=name,
                                customer_surname=surname, customer_fingerprint=fingerprint_id)

            customer.save()
            data['msg'] = 'Registered!'

        return JsonResponse(data)


def get_revenue_by_year(request, customer_email):
    customer = get_object_or_404(Customer, pk=customer_email)
    if request.method == 'GET':
        data = {'Jan': 0, 'Feb': 0, 'Mar': 0, 'Apr': 0, 'May': 0, 'Jun': 0,
                'Jul': 0, 'Aug': 0, 'Sep': 0, 'Oct': 0, 'Nov': 0, 'Dec': 0}
        dataArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        year = request.GET.get('year')
        tot_list = Purchase.objects.filter(purchase_date__year=year)
        for m in tot_list:
            p_code = m.purchase_code
            purchase_list = PurchaseList.objects.filter(purchaseList_code=p_code)
            for p in purchase_list:
                product = Product.objects.get(product_code=p.purchaseList_product.product_code)
                dataArray[m.purchase_date.month - 1] += (product.product_price) * (p.purchaseList_qty)
        data['Jan'] = dataArray[0]
        data['Feb'] = dataArray[1]
        data['Mar'] = dataArray[2]
        data['Apr'] = dataArray[3]
        data['May'] = dataArray[4]
        data['Jun'] = dataArray[5]
        data['Jul'] = dataArray[6]
        data['Aug'] = dataArray[7]
        data['Sep'] = dataArray[8]
        data['Oct'] = dataArray[9]
        data['Nov'] = dataArray[10]
        data['Dec'] = dataArray[11]

        return JsonResponse(data)


"""
def create_purchase(request):
    data = dict()
    if request.method == 'POST':
        # Get the form data
        form = customer_form(request.POST)

        if form.is_valid():
            form.save()  # insert new row

            # Return some json response back to the user
            msg = ' Your data has been inserted successfully, thank you!'
            data = globalfunctions.dict_alert_msg('True', 'Awesome!', msg, 'success')

        else:

            # Extract form.errors
            msg = None
            msg = [(k, v[0]) for k, v in form.errors.items()]
            data = globalfunctions.dict_alert_msg('False', 'Oops, Error', msg, 'error')

        return JsonResponse(data)

def create_purchase_list(request):
    data = dict()
    if request.method == 'POST':
        # Get the form data
        form = customer_form(request.POST)

        if form.is_valid():
            form.save()  # insert new row

            # Return some json response back to the user
            msg = ' Your data has been inserted successfully, thank you!'
            data = globalfunctions.dict_alert_msg('True', 'Awesome!', msg, 'success')

        else:

            # Extract form.errors
            msg = None
            msg = [(k, v[0]) for k, v in form.errors.items()]
            data = globalfunctions.dict_alert_msg('False', 'Oops, Error', msg, 'error')

        return JsonResponse(data)

def create_fingerprint(request):
    data = dict()
    if request.method == 'POST':
        # Get the form data
        form = customer_form(request.POST)

        if form.is_valid():
            form.save()  # insert new row

            # Return some json response back to the user
            msg = ' Your data has been inserted successfully, thank you!'
            data = globalfunctions.dict_alert_msg('True', 'Awesome!', msg, 'success')

        else:

            # Extract form.errors
            msg = None
            msg = [(k, v[0]) for k, v in form.errors.items()]
            data = globalfunctions.dict_alert_msg('False', 'Oops, Error', msg, 'error')

        return JsonResponse(data)
"""
