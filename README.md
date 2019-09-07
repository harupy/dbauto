# DBAuto

A Chrome extension to auto-format code on Databricks

![demo](https://user-images.githubusercontent.com/17039389/64061674-01ebf380-cc19-11e9-96e3-80ab8093fcfc.gif)

## Warning

This extension currently uses public REST API ([pyformatter.com](https://pyformatter.com)) to format code. **Be careful** if your code contains confidential information. I'm working on an option which allows users to select public REST API or local Flask server.

## Setup

```console
cd server
./setup.sh
pipenv run python app.py
```
