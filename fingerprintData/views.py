import json

from django.http import HttpResponse,JsonResponse, Http404
from django.template import loader
from django.shortcuts import render,get_object_or_404
from django.views import View

from fingerprintData import globalfunctions
from fingerprintData.models import Customer,Purchase,Product,PurchaseList,Fingerprint,Type
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

#TODO add contexts where required.
#TODO learn FORMS, and GET/POST methods.
#TODO learn Bootstrap4 html tags.
#TODO Integrate Chart.js in overview.html

class access(View):
    def get(self,request):
        template ='fingerprintData/access.html'
        form = CustomerAccessForm()
        return render (request, template, {'form': form})

class register(View):
    def get(self,request):
        template ='fingerprintData/register.html'
        form = CustomerCreateForm()
        return render (request, template, {'form': form})

class purchase(View):
    def get(self,request,customer_email):
        customer= get_object_or_404(Customer, pk=customer_email)
        template ='fingerprintData/purchase.html'
        return render (request, template)

class checkout(View):
    def get(self, request, customer_email):
        customer = get_object_or_404(Customer, pk=customer_email)
        template ='fingerprintData/checkout.html'
        return render (request, template)

class overview(View):
    def get(self, request, customer_email):
        customer = get_object_or_404(Customer, pk=customer_email)
        if(customer.customer_admin):
            template ='fingerprintData/overview.html'
            return render (request, template)
        raise Http404("How did you get in here???")

class prova(View):
    def get(self, request):
        template='fingerprintData/prova.html'
        return render (request, template)

"""
class Basic_CRUD_Create_Form(ModelForm):
        "
    Render the basic crud create form
        "
    full_name = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'form-control',
                                      'placeholder': 'Enter your full name',
                                      'maxlength': '75'}))

    email = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'form-control',
                                      'placeholder': 'Enter your working email',
                                      'maxlength': '254'}))

    subject = forms.CharField(
        widget=forms.TextInput(attrs={
            'class': 'form-control', 'placeholder': 'Enter your subject',
            'maxlength': '75'}))

    message = forms.CharField(
        widget=forms.Textarea(attrs={'class': 'form-control textarea',
                                     'placeholder': 'Enter your message'}))

    class Meta:
        model = ContactUs
        fields = ('full_name', 'email', 'subject', 'message')

def basic_crud_create_view(request):
    "Renders the basic crud create operation."
    if request.method == 'GET':

        # Get contact us form to display
        form = Basic_CRUD_Create_Form()
        return render(request, 'myroot/basic_crud_create.html',
                      {'form': form,
                       'title': "Django Basic CRUD: CREATE New Row with Actual Example",
                       'meta_desc': ""Learn Django basic CRUD to create a new rows and store it on dev_contact_us database table - "" + settings.SITE_FULL_NAME})

    data = dict()
    if request.method == 'POST':
        # Get the form data
        form = Basic_CRUD_Create_Form(request.POST)

        if form.is_valid():
            form.save()  # insert new row

            # Return some json response back to the user
            msg = "" Your data has been inserted successfully, thank you! ""
            data = dict_alert_msg('True', 'Awesome!', msg, 'success')

        else:

            # Extract form.errors
            msg = None
            msg = [(k, v[0]) for k, v in form.errors.items()]
            data = dict_alert_msg('False', 'Oops, Error', msg, 'error')

        return JsonResponse(data)
"""

"""
def username_exists(request):
    data = {'msg':''}   
    if request.method == 'GET':
        username = request.GET.get('username').lower()
        exists = Usernames.objects.filter(name=username).exists()
        if exists:
            data['msg'] = username + ' already exists.'
        else:
            data['msg'] = username + ' does not exists.'
    return JsonResponse(data)
"""

"""
def create_post(request):
    if request.method == 'POST':
        post_text = request.POST.get('the_post')
        response_data = {}

        post = Post(text=post_text, author=request.user)
        post.save()

        response_data['result'] = 'Create post successful!'
        response_data['postpk'] = post.pk
        response_data['text'] = post.text
        response_data['created'] = post.created.strftime('%B %d, %Y %I:%M %p')
        response_data['author'] = post.author.username

        return HttpResponse(
            json.dumps(response_data),
            content_type="application/json"
        )
    else:
        return HttpResponse(
            json.dumps({"nothing to see": "this isn't happening"}),
            content_type="application/json"
        )
"""


#TODO instead of password checking, use fingerprint checking.

def customer_login(request):
    data = {'msg':'', 'success' : False}
    if request.method == 'GET':
        email= request.GET.get('customer_email')
        password = request.GET.get('customer_password')
        exists =Customer.objects.filter(customer_email=email, customer_password=password).exists()
        if exists:
            data['msg'] = 'Welcome ' + Customer.objects.get(customer_email=email).customer_name
            data['success'] = True
        else:
            data['msg'] = 'Your email/password is not valid. Please try again'
    return JsonResponse(data)

def customer_exists(request):
    data = {'msg':'', 'success' : False}
    if request.method == 'GET':
        email= request.GET.get('customer_email')
        exists = Customer.objects.filter(customer_email=email).exists()
        if exists:
            data['msg'] = 'This email already exists.'
        else:
            data['msg'] = 'The email is valid.'
            data['success'] = True
    return JsonResponse(data)




def create_customer(request):
    data = dict()
    if request.method == 'POST':
        email = request.POST.get('customer_email')
        password = request.POST.get('customer_password')
        name = request.POST.get('customer_name')
        surname = request.POST.get('customer_surname')
        exists = Customer.objects.filter(customer_email=email).exists()

        if exists:
            data['msg'] = 'Email already registered! You fool!'

        else:
            customer = Customer(customer_email=email, customer_password=password, customer_name=name, customer_surname=surname)
            customer.save()
            data['msg'] = 'Registered!'

        return JsonResponse(data)

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