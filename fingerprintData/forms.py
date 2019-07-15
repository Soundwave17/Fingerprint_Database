from django import forms
from fingerprintData.models import Customer,Purchase,PurchaseList,Product,Fingerprint,Type

#TODO add Create forms for all models.
#TODO add more general use forms.

#Forms

class CustomerCreateForm(forms.ModelForm):
    class Meta:
        model = Customer
        fields=['customer_email','customer_name', 'customer_surname', 'customer_password']
        widgets = {
            'customer_email' : forms.TextInput(attrs={
                'id':'customer_email',
                'required': True,
                'placeholder':'Email'
            }),
            'customer_name': forms.TextInput(attrs={
                'id': 'customer_name',
                'required': True,
                'placeholder': 'Name'
            }),
            'customer_surname': forms.TextInput(attrs={
                'id' : 'customer_surname',
                'required' : True,
                'placeholder': 'Surname'
            }),
            'customer_password': forms.PasswordInput(attrs={
               'id' : 'customer_code',
               'required' : True,
               'placeholder' : 'Password'
            }),
        }

class CustomerAccessForm(forms.ModelForm):
    class Meta:
        model = Customer
        fields = ['customer_email','customer_password']
        widgets = {
            'customer_email': forms.TextInput(attrs={
                'id': 'customer_email',
                'required': True,
                'placeholder': 'Email'
            }),
            'customer_password': forms.PasswordInput(attrs={
                'id': 'customer_code',
                'required': True,
                'placeholder': 'Password'
            }),
        }

