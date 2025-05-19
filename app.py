from flask import Flask, request, jsonify, send_from_directory
import socket
import os

app = Flask(__name__, static_folder=".")

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/api/ip')
def ip_lookup():
    ip = request.args.get('ip')
    if not ip:
        return jsonify({'error': 'No IP provided'}), 400
    try:
        hostname = socket.gethostbyaddr(ip)[0]
        return jsonify({'ip': ip, 'hostname': hostname})
    except Exception as e:
        return jsonify({'ip': ip, 'error': str(e)})

# You can add other routes like /api/dns, /api/whois, etc.

if __name__ == '__main__':
    app.run(debug=True)
