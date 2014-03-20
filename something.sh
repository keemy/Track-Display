#!/bin/bash
TIME_OUT=$1
FILE_URL=$2
MEET_NAME=$3




mkdir /var/www/Track-Display/meets/${MEET_NAME}
cd /var/www/Track-Display/meets/${MEET_NAME}



END_TIME=`date -d +${TIME_OUT}hours +%s`
while [ `date +%s` -lt $END_TIME ]
do
wget ${FILE_URL} -O meet.mdb
python /var/www/Track-Display/mdbToSql.py meet.mdb | sqlite3 temp.db
mv temp.db meet.db

sleep 30
done
