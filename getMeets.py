#!/usr/bin/python
print "Content-Type: text/html"
print


import cgi
import cgitb
import sqlite3
import json
import datetime
import time
import random
import os
import sys
cgitb.enable()

meets= os.listdir("/var/www/Track-Display/meets")

print json.dumps( meets )


