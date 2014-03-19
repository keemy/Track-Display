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
#eventOrPerson - Event or Person
#event - Event Pointer Number
#person - Athlete Pointer Number


if form["meetName"].value in meets:
	path="/var/www/Track-Display/meets/"+form["meetName"].value+'/meet.db'
	conn = sqlite3.connect(path)
	c=conn.cursor()
else:
	print "invalid meet name"
	sys.exit("invalid meet name")



if form["eventOrPerson"].value == "p":
	#person
	c.execute("""
	SELECT en.Fin_place,at.First_name,at.Last_name,at.Schl_yr,te.Team_name,en.Fin_time,en.Fin_wind,en.Fin_heat, 
		ev.Event_dist,ev.Event_stroke,ev.event_note,ev.Event_sex
	    
	FROM 
		Entry en
		INNER JOIN Athlete at ON at.Ath_no=en.Ath_no
		INNER JOIN Event ev ON ev.Event_ptr=en.Event_ptr
		INNER JOIN Team te ON at.Team_no=te.Team_no
		INNER JOIN Divisions di on ev.Div_no=di.Div_no
	WHERE 
		at.First_name=? AND at.Last_name=?
	""", (form["firstName"].value,form["lastName"].value ) )


	print json.dumps( c.fetchall() )
elif form["eventOrPerson"].value == "e":
	#event
	c.execute("""
	SELECT en.Fin_place,at.First_name,at.Last_name,at.Schl_yr,te.Team_name,en.Fin_time,en.Fin_wind,en.Fin_heat, 
		ev.Event_dist,ev.Event_stroke,ev.event_note,ev.Event_sex
	    
	FROM 
		Entry en
		INNER JOIN Athlete at ON at.Ath_no=en.Ath_no
		INNER JOIN Event ev ON ev.Event_ptr=en.Event_ptr
		INNER JOIN Team te ON at.Team_no=te.Team_no
		INNER JOIN Divisions di on ev.Div_no=di.Div_no
	WHERE 
		at.First_name=? AND at.Last_name=?
	""", (form["firstName"].value,form["lastName"].value ) )

c.execute("INSERT INTO bets VALUES(?,?,?,?,?,?,?,time('now'))",(better, betreceiver, description,amount,0,fulltext, str(hash(fulltext+str(datetime.datetime.now())))))

conn.commit()
conn.close()
