#!/bin/bash
LTIME=$(stat -c %Z out.txt)
while true
do
  ATIME=$(stat -c %Z out.txt)
  if [[ "$ATIME" != "$LTIME" ]]; then
        ./send.sh
        LTIME=$ATIME
  fi
  sleep 3
done
