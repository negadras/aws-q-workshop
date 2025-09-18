from flask import Flask
import os
from Qwords import create_app

app = create_app()

if __name__ == '__main__':
    print(app.config) 
    print("BEHIND_PROXY: ", app.config['BEHIND_PROXY'])

    app.run(host='0.0.0.0', port=app.config['PORT'], debug=app.config['DEBUG'])
