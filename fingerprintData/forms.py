from django import forms
from fingerprintData.models import Customer, Purchase, PurchaseList, Product, Fingerprint, Type


# TODO add Create forms for all models.
# TODO add more general use forms.

# Forms

class CustomerCreateForm(forms.ModelForm):
    class Meta:
        model = Customer
        fields = ['customer_email', 'customer_name', 'customer_surname', 'customer_password']
        widgets = {
            'customer_email': forms.TextInput(attrs={
                'id': 'customer-email',
                'required': True,
                'placeholder': 'Email'
            }),
            'customer_name': forms.TextInput(attrs={
                'id': 'customer-name',
                'required': True,
                'placeholder': 'Name'
            }),
            'customer_surname': forms.TextInput(attrs={
                'id': 'customer-surname',
                'required': True,
                'placeholder': 'Surname'
            }),
            'customer_password': forms.PasswordInput(attrs={
                'id': 'customer-password',
                'required': True,
                'placeholder': 'Password'
            }),
        }
        labels = {
            'customer_email': 'Email',
            'customer_name': 'Name',
            'customer_surname': 'Surname',
            'customer_password': 'Password',
        }

    def clean(self):
        cleaned_data = super(CustomerCreateForm, self).clean()
        customer_email = cleaned_data.get('customer_email')
        customer_name = cleaned_data.get('customer_name')
        customer_surname = cleaned_data.get('customer_surname')
        customer_password = cleaned_data.get('customer_password')
        if not customer_email and not customer_name and not customer_surname and not customer_password:
            raise forms.ValidationError('You have to write something!')


class CustomerAccessForm(forms.ModelForm):
    class Meta:
        model = Customer
        fields = ['customer_email', 'customer_password']
        widgets = {
            'customer_email': forms.TextInput(attrs={
                'id': 'customer-email',
                'required': True,
                'placeholder': 'Email'
            }),
            'customer_password': forms.PasswordInput(attrs={
                'id': 'customer-password',
                'required': True,
                'placeholder': 'Password'
            }),
        }
        labels = {
            'customer_email': 'Email',
            'customer_password': 'Password',
        }

    def clean(self):
        cleaned_data = super(CustomerAccessForm, self).clean()
        customer_email = cleaned_data.get('customer_email')
        customer_password = cleaned_data.get('customer_password')
        if not customer_email and not customer_password:
            raise forms.ValidationError('You have to write something!')
