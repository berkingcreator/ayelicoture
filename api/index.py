from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.json
        girilen_sifre = data.get('sifre')
        
        # 🛡️ GÜVENLİK: Şifreyi buraya yazıyoruz. 
        # Kimse bu dosyayı dışarıdan okuyamaz.
        GERCEK_ADMIN_SIFRE = "ayşe1453" 

        if girilen_sifre == GERCEK_ADMIN_SIFRE:
            return jsonify({
                "auth": True, 
                "message": "Erişim Onaylandı",
                "token": "ayeli_vanguard_v1"
            }), 200
        else:
            return jsonify({"auth": False, "message": "Hatalı Şifre!"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def handler(request):
    return app(request)