from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.contrib.auth import get_user_model

User = get_user_model()

class MySocialAccountAdapter(DefaultSocialAccountAdapter):
    def pre_social_login(self, request, sociallogin):
        # Check if user already exists
        if sociallogin.is_existing:
            return

        # Extract information from the social account
        user_data = sociallogin.account.extra_data
        email = user_data.get('email', '')
        first_name = user_data.get('given_name', '')
        last_name = user_data.get('family_name', '')

        # Save the user in the database
        if not User.objects.filter(email=email).exists():
            user = User(
                email=email,
                first_name=first_name,
                last_name=last_name,
                username=email.split('@')[0]
            )
            user.set_unusable_password()  # User won't log in with password
            user.save()
