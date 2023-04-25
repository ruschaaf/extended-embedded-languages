# This is a basic python file
from os import path

def test():
    if path.exists(__name__):
        print("I'm a real file")
