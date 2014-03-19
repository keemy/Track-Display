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

meets=[i[1:] for i in os.listdir("/var/www/Track-Display/meets") where i[0]=="#"]



form=cgi.FieldStorage()
#meetName - Name of Meet


if form["meetName"].value in meets:
	path="/var/www/Track-Display/meets/"+form["meetName"].value+'/meet.db'
	conn = sqlite3.connect(path)
	c=conn.cursor()
else:
	print "invalid meet name"
	sys.exit("invalid meet name")





c.execute("""
	SELECT 
		 ev.Event_ptr,ev.Event_no, ev.Event_dist,ev.Event_stroke,ev.event_note,ev.Event_sex,ev.Div_no,di.Div_name
	FROM 
		Event ev
		INNER JOIN Divisions di ON di.Div_no=ev.Div_no
""")

print json.dumps( c.fetchall() )

conn.close()
