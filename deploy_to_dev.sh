#!/bin/bash

cd ~/project/homsa-v2
rsync -avr --exclude 'node_modules' * amir@172.25.1.40:/var/www/html/homsa-v2/.
ssh amir@172.25.1.40 "cd /home/amir | ./deploy_homsa_front.sh"

