#!/usr/bin/env python3
"""
DriveSync Local Agent
─────────────────────
PC에서 백그라운드로 실행되는 에이전트.
Vercel 웹앱의 명령을 폴링하고, 구글 드라이브/포토 → 로컬 하드에 저장.

설치:
  pip install google-auth google-auth-oauthlib google-api-python-client requests

실행:
  python agent.py
"""

import os
import sys
import json
import time
import hashlib
import logging
import argparse
import threading
from pathlib import Path
from datetime import datetime

import requests
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload
import io