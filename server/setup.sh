#!/usr/bin/env bash

mkdir -p credentials
cd credentials

openssl genrsa -aes128 2048 > server_secret.key
openssl req -new -key server_secret.key > server_pub.csr
openssl x509 -in server_pub.csr -days 365000 -req -signkey server_secret.key > cert.crt
rm server_pub.csr
cd ..

PIPENV_IGNORE_VIRTUALENVS=1
pipenv install
