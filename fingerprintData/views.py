import json
import datetime
from django.http import JsonResponse, Http404
from django.shortcuts import render, get_object_or_404
from django.views import View

from fingerprintData.models import Customer, Purchase, Product, PurchaseList, Fingerprint, Type
from fingerprintData.forms import CustomerCreateForm, CustomerAccessForm
import ast


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
        type_list = Type.objects.all()
        product_list = Product.objects.all()
        template = 'fingerprintData/purchase.html'
        return render(request, template, {'customer': customer,
                                          'types': type_list,
                                          'products': product_list})
class overview(View):
    def get(self, request, customer_email):
        customer = get_object_or_404(Customer, pk=customer_email)
        if (customer.customer_admin):
            type_list = Type.objects.all()
            customer_list = Customer.objects.all()
            year_list=[]
            temp= 1920
            while(temp <= datetime.datetime.now().year):
                if(Purchase.objects.filter(purchase_date__year=temp).exists()):
                    year_list.append(temp)
                temp=temp+1
            template = 'fingerprintData/overview.html'
            return render(request, template, {'customer': customer,
                                              'types': type_list,
                                              'customers': customer_list,
                                              'years' : year_list,
                                              })
        raise Http404("How did you get in here???")


class fingerprint_access(View):
    def get(self, request, customer_email):
        customer = get_object_or_404(Customer, pk=customer_email)
        template = 'fingerprintData/fingerprint_access.html'
        return render(request, template, {'customer': customer})


class register_success(View):
    def get(self, request):
        template = 'fingerprintData/register_success.html'
        return render(request, template)

class purchase_success(View):
    def get(self,request, customer_email):
        customer=get_object_or_404(Customer, pk=customer_email)
        template='fingerprintData/purchase_success.html'
        return render(request,template,{'customer':customer})

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
            data['success'] = True
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
                                customer_surname=surname,
                                customer_fingerprint=Fingerprint.objects.get(pk=fingerprint_id))

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
        type = request.GET.get('type')
        productName = request.GET.get('product')
        customer = request.GET.get('customer')


        if (customer != 'Nothing'):
            cust = Customer.objects.get(customer_email=customer)
            tot_list = Purchase.objects.filter(purchase_date__year=year, purchase_customer=cust)
        else:
            tot_list = Purchase.objects.filter(purchase_date__year=year)

        for m in tot_list:
            p_code = m.purchase_code
            purchase_list = PurchaseList.objects.filter(purchaseList_code=p_code)

            for p in purchase_list:
                if (type != 'Nothing'):
                    t = Type.objects.get(type_description=type)
                    if (productName != 'Nothing' and p.purchaseList_product.product_name == productName ):
                        product = Product.objects.get(product_name=productName, product_code=p.purchaseList_product.product_code)
                        dataArray[m.purchase_date.month - 1] += (product.product_price) * (p.purchaseList_qty)
                    elif (p.purchaseList_product.product_type == t  and productName == 'Nothing'):

                        product = Product.objects.get(product_code=p.purchaseList_product.product_code)
                        dataArray[m.purchase_date.month - 1] += (product.product_price) * (p.purchaseList_qty)
                else:
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


def get_revenue_by_type(request, customer_email):
    customer = get_object_or_404(Customer, pk=customer_email)
    if request.method == 'GET':
        dataTot = {}
        labels = {}
        data = []
        year = request.GET.get('year')
        customer = request.GET.get('customer')
        types = Type.objects.filter()
        i = 0
        for type in types:
            data.append(0)
            labels[type.type_description] = i
            i = i+1
        if customer == 'Nothing':
            if year == 'None':
                tot_list = Purchase.objects.filter()
            else:
                tot_list = Purchase.objects.filter(purchase_date__year=year)
        else:
            if year == 'None':
                tot_list = Purchase.objects.filter(purchase_customer=customer)
            else:
                tot_list = Purchase.objects.filter(purchase_date__year=year, purchase_customer=customer)

        for purchase in tot_list:
            purchaseCode = purchase.purchase_code
            purchase_list = PurchaseList.objects.filter(purchaseList_code=purchaseCode)
            for prod in purchase_list:
                product = Product.objects.get(product_code=prod.purchaseList_product.product_code)
                data[labels[product.product_type.type_description]] += (product.product_price) * (prod.purchaseList_qty)

        dataTot['types'] = labels
        dataTot['data'] = data

        return JsonResponse(dataTot)



def get_free_id(request):
    id = 1
    check = False
    while (id <= 127 and check == False):
        if (Fingerprint.objects.filter(pk=id).exists()):
            id = id + 1
        else:
            check = True
    if (check):
        data = {'id': id}
    else:
        data = {'id': 0}
    return JsonResponse(data)


def get_customer_id(request, customer_email):
    data = {'msg': '', 'success': False}
    if request.method == 'GET':
        email = request.GET.get('customer_email')
        exists = Customer.objects.filter(customer_email=email).exists()
        if exists:
            data['msg'] = 'This email exists.'
            data['id'] = Customer.objects.get(customer_email=email).customer_fingerprint.fingerprint_id
            data['success'] = True;
        else:
            data['msg'] = 'The email is not valid.'
            data['success'] = False

    return JsonResponse(data)


def delete_customer(request, customer_email):
    data = {'msg': ''}
    if request.method == 'POST':
        email = request.POST.get('customer_email')
        customer = Customer.objects.get(customer_email=email)
        fingerprint = Fingerprint.objects.get(fingerprint_id=customer.customer_fingerprint.fingerprint_id)
        customer.delete()
        fingerprint.delete()

        data['msg'] = 'Il cliente è stato cancellato.'
    return JsonResponse(data)


def get_product_by_type(request, customer_email):
    data = {'products': []}
    if (request.method == 'GET'):
        type = request.GET.get("type")
        products = Product.objects.filter(product_type=Type.objects.get(type_description=type))
        for product in products:
            data['products'].append(product.product_name)
        return JsonResponse(data)

def checkout(request, customer_email):
        customer = get_object_or_404(Customer, pk=customer_email)
        if request.method == 'POST':
            dict={}
            p=[]
            q=[]
            dict=ast.literal_eval(request.POST.get('json'))
            lenght= int(dict['lenght'])
            p=dict['name']
            q=dict['quantity']

            purchase= Purchase(purchase_customer=customer)
            purchase.save()
            i = 0
            while i<lenght :
                product = p[i]
                quantity = q[i]

                list_item = PurchaseList(purchaseList_code=purchase,
                                         purchaseList_product=Product.objects.get(product_name=product),
                                         purchaseList_qty=quantity)
                list_item.save()
                i=i+1

            data={}
            data['msg']="Success!"
            data['success']=True

            return JsonResponse(data)