import json
from flask import Flask, jsonify, request
from flask_cors import CORS
import ssl
import autopep8

# allow this flask app to run over HTTPS
context = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)
context.load_cert_chain('credentials/cert.crt', 'credentials/server_secret.key')

app = Flask(__name__)
CORS(app)


def read_options(path='options.json'):
  with open(path) as f:
    return json.load(f)


@app.route("/format")
def format_code():
  old_code = request.args.get('code')

  # TODO: add an option which allows users to select autoformat provider (yapf or autopep8)
  new_code = autopep8.fix_code(old_code, options=read_options())
  new_code = new_code.strip()
  return jsonify(code=new_code)


if __name__ == '__main__':
  app.run(debug=True, host='127.0.0.1', port=8080, ssl_context=context)
