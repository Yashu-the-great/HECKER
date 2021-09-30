"""
    This Program scans and saves the screenshot if a browser is open.
"""

import psutil
from time import sleep
from pyautogui import screenshot


def check_and_save():
    p = psutil.process_iter()
    for i in p:
            if "safari" or "chrome" or "firefox" in (i.name()).lower():
                s = screenshot()
                s.save(r"file name.png")
                break
if __name__ == "__main__":
    while True:
        check_and_save()
        sleep(5)

