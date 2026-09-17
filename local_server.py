from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import os, webbrowser, threading, time

PORT = 8341
os.chdir(os.path.dirname(os.path.abspath(__file__)))

def open_browser():
    time.sleep(0.8)
    webbrowser.open(f'http://127.0.0.1:{PORT}/')

threading.Thread(target=open_browser, daemon=True).start()
print(f'Gia Khang Racing: http://127.0.0.1:{PORT}/')
ThreadingHTTPServer(('127.0.0.1', PORT), SimpleHTTPRequestHandler).serve_forever()
