#!/bin/bash

GROUP_ID=<GROUP/CHAT ID HERE>
BOT_TOKEN=<BOT TOKEN HERE>

#Get Contents of last Alarm
daten=$( tail -n 1 out.txt )
location=$( tail -n 2 out.txt | head -n 1 )

#Send to Telegram

#Location
curl -s --data "$location" 'https://api.telegram.org/bot'$BOT_TOKEN'/sendLocation?chat_id='$GROUP_ID''
#Message
curl -s --data "text=$daten" 'https://api.telegram.org/bot'$BOT_TOKEN'/sendMessage?chat_id='$GROUP_ID'' > /dev/null
