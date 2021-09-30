import socket, hashlib
from IPy import IP
import psutil

def get_ip(ip):
    # Funtion to get the IP Address of a particular URL.
    try:
        p = IP(ip)    
        return p
    except:
        return socket.gethostbyname(ip)

################################################################

def scan_port_openings(ipaddress,port):
    # Function to scan port openings.
    try:
        s = socket.socket()
        s.settimeout(1)
        s.connect((get_ip(ipaddress), port))
        print("Port {} is open".format(port))
    except:
        print("Port closed")

################################################################

def hashstr(string:str) -> str:
    #funtion to return a hashed string. 
    string = string.encode("utf-8")
    return hashlib.sha384(string).hexdigest()

################################################################

def isOpen(software:str) -> bool:
    #return True if software is open . Else False
    for i in psutil.process_iter():
        if software.lower() in i.name().lower():
            return True
    return False

################################################################