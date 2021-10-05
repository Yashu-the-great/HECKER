# this program will delete all the files except itself and files passed as system arguments.

import os, sys

for i in os.listdir(os.getcwd()):
    # remove / comment this break statement. This break statement is for safety only.
    break 
    if sys.argv:
        if i in sys.argv:
            pass
        else:
            os.remove(i)