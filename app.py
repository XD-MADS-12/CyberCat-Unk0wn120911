from flask import Flask, request, jsonify
from flask_cors import CORS
import socket, subprocess, base64, hashlib, requests

app = Flask(__name__)
CORS(app)

@app.route('/tool/<name>', methods=['POST'])
def tool(name):
    data = request.json
    value = data.get('value', '')

    try:
        match name:
            case 'ip':
                ip = requests.get('https://api64.ipify.org').text
                return jsonify({"ip": ip})

            case 'whois':
                result = subprocess.check_output(['whois', value], text=True, timeout=10)
                return jsonify({"result": result})

            case 'dns':
                result = socket.gethostbyname_ex(value)
                return jsonify({"result": result})

            case 'reverse':
                host = socket.gethostbyaddr(value)
                return jsonify({"hostname": host[0]})

            case 'trace':
                result = subprocess.check_output(['traceroute', value], text=True, timeout=15)
                return jsonify({"result": result})

            case 'port':
                ip, port = value.split(':')
                s = socket.socket()
                s.settimeout(2)
                result = s.connect_ex((ip, int(port)))
                status = "open" if result == 0 else "closed"
                return jsonify({"port": port, "status": status})

            case 'bin':
                r = requests.get(f"https://lookup.binlist.net/{value}")
                return jsonify(r.json())

            case 'base64':
                if data.get('mode') == 'decode':
                    decoded = base64.b64decode(value.encode()).decode()
                    return jsonify({"result": decoded})
                else:
                    encoded = base64.b64encode(value.encode()).decode()
                    return jsonify({"result": encoded})

            case 'hash':
                result = hashlib.sha256(value.encode()).hexdigest()
                return jsonify({"sha256": result})

            case 'ua':
                return jsonify({"user_agent": request.headers.get('User-Agent')})

            case 'headers':
                return jsonify(dict(request.headers))

            case 'geo':
                geo = requests.get(f"https://ipapi.co/{value}/json").json()
                return jsonify(geo)

            case 'sqlilab':
                payloads = [
                    "' OR '1'='1",
                    "'; DROP TABLE users;--",
                    "' OR 1=1--",
                    "' OR '1'='1' --"
                ]
                return jsonify({"payloads": payloads})

        return jsonify({"error": "Tool not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
