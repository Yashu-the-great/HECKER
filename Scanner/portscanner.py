import socket
import IPy


def get_ip(ip):
    try:
        p = IPy.IP(ip)    
        return p
    except:
        return socket.gethostbyname(ip)

def scan_port_openings(ipaddress,port):
    try:
        s = socket.socket()
        s.settimeout(1)
        s.connect((ipaddress, port))
        print("Port {} is open".format(port))
    except:
        print("Port closed")
        
# ipaddr = input("Enter the IP Address: ")

if __name__ == "__main__":
    #scanning the ports
    # for i in range(0,100):
    #     scan_port_openings(ipaddress = ipaddr, port= i)

    ip = input("Enter the IP Address: ")
    print(get_ip(ip))