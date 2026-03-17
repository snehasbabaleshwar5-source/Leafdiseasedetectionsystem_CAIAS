#!/bin/bash
python3 -m http.server 5500 --directory frontend &
python3 app.py
