# -*- font-encoding: utf-8 -*-
"""
Módulo de Notificaciones por Email SMTP y Telegram
Diseñado para enviar resúmenes automáticos de convocatorias en Valencia.
"""

import os
import sys
import smtplib
import requests
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# En Windows Terminal, reconfigurar la codificación de la consola a UTF-8
if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

def generar_html_email(nuevas_ofertas):
    """
    Genera una plantilla HTML moderna para el informe por correo electrónico.
    """
    filas_html = ""
    for oferta in nuevas_ofertas:
        organismo = oferta.get('organismo', oferta.get('organism', 'Organismo Público'))
        titulo = oferta.get('titulo', 'Sin título')
        nivel = oferta.get('nivel', 'A1/A2/C1')
        url = oferta.get('url', '#')
        fecha = oferta.get('fecha', 'Plazo Abierto')

        filas_html += f"""
        <div style="background-color: #0f172a; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; margin-bottom: 16px; color: #f8fafc;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <span style="background-color: rgba(0,242,254,0.15); color: #00f2fe; border: 1px solid rgba(0,242,254,0.3); padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: bold; text-transform: uppercase;">
                    {organismo}
                </span>
                <span style="color: #94a3b8; font-size: 13px;">📅 {fecha}</span>
            </div>
            <h3 style="margin: 0 0 10px 0; font-size: 18px; color: #ffffff;">{titulo}</h3>
            <p style="margin: 0 0 14px 0; color: #94a3b8; font-size: 14px;"><strong>Nivel/Grupo:</strong> {nivel} | 📍 Valencia</p>
            <a href="{url}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%); color: #040d1a; padding: 8px 16px; border-radius: 8px; font-weight: bold; text-decoration: none; font-size: 14px;">
                Ver Convocatoria Oficial 🔗
            </a>
        </div>
        """

    plantilla = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #080c14; color: #f8fafc; padding: 30px; margin: 0;">
        <div style="max-width: 650px; margin: 0 auto; background-color: #0f172a; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08); overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            
            <div style="background: linear-gradient(135deg, #00f2fe 0%, #6366f1 100%); padding: 30px; text-align: center; color: #ffffff;">
                <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">⚡ Valencia Tech Ops</h1>
                <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.9;">Alerta Diaria de Nuevas Convocatorias y Empleo Público</p>
            </div>
            
            <div style="padding: 24px;">
                <p style="font-size: 15px; color: #cbd5e1; margin-bottom: 20px;">
                    Se han detectado <strong>{len(nuevas_ofertas)} nuevas oportunidades</strong> para tu perfil de <strong>Ingeniería Electrónica Industrial y FP Automatización</strong>:
                </p>

                {filas_html}

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center; color: #64748b; font-size: 12px;">
                    <p>Este correo ha sido generado automáticamente por tu sistema de monitoreo diario.</p>
                    <p>Configuración de perfiles: Valencia | A1 / A2 / C1 / Laboral Fijo</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    """
    return plantilla

def enviar_telegram(nuevas_ofertas):
    """
    Envía una alerta estructurada por Telegram mediante la API de Bot.
    """
    bot_token = os.environ.get("TELEGRAM_BOT_TOKEN", "8875701698:AAFrQE2akmicChOEmhWoA6qzrcEk4mIXy0Q")
    chat_id = os.environ.get("TELEGRAM_CHAT_ID", "190425566")

    if not bot_token or not chat_id:
        return False

    texto = f"⚡ *VALENCIA TECH OPS - NUEVAS PLAZAS ({len(nuevas_ofertas)})*\n\n"
    for of in nuevas_ofertas:
        org = of.get('organismo', of.get('organism', 'Organismo'))
        tit = of.get('titulo', 'Plaza')
        url = of.get('url', '#')
        texto += f"🏛️ *{org}*\n📋 {tit}\n🔗 [Ver Bases Oficiales]({url})\n\n"

    try:
        url_api = f"https://api.telegram.org/bot{bot_token}/sendMessage"
        resp = requests.post(url_api, json={
            "chat_id": chat_id,
            "text": texto,
            "parse_mode": "Markdown",
            "disable_web_page_preview": False
        }, timeout=10)
        
        if resp.status_code == 200:
            print("📱 Notificación enviada con éxito a Telegram.")
            return True
        else:
            print(f"⚠️ Error enviando a Telegram: {resp.text}")
            return False
    except Exception as e:
        print(f"❌ Error al conectar con Telegram API: {e}")
        return False

def enviar_notificaciones(nuevas_ofertas):
    """
    Envía notificaciones por email vía SMTP y por Telegram.
    """
    if not nuevas_ofertas:
        print("ℹ️ No hay nuevas ofertas para notificar hoy.")
        return

    # 1. Telegram
    enviar_telegram(nuevas_ofertas)

    # 2. Email SMTP
    remitente = os.environ.get("EMAIL_REMITENTE")
    password = os.environ.get("EMAIL_PASSWORD")
    destinatario = os.environ.get("EMAIL_DESTINO", remitente or "luisangel994@gmail.com")

    if not remitente or not password:
        print("\n-------------------------------------------------------------")
        print("⚠️ NOTA SOBRE EL ENVÍO DE EMAIL DESDE LA CONSOLA:")
        print("Para enviar un correo real a tu cuenta (luisangel994@gmail.com):")
        print("1. Necesitas una 'Contraseña de Aplicación' de Gmail.")
        print("2. Ejecuta 'python test_send.py' para probarlo de forma interactiva en 10 segundos.")
        print("-------------------------------------------------------------\n")
        return

    try:
        msg = MIMEMultipart()
        msg["Subject"] = f"⚡ Alerta Empleo Público Valencia ({len(nuevas_ofertas)} nuevas plazas)"
        msg["From"] = remitente
        msg["To"] = destinatario

        html_content = generar_html_email(nuevas_ofertas)
        msg.attach(MIMEText(html_content, "html", "utf-8"))

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(remitente, password)
            server.sendmail(remitente, destinatario, msg.as_string())

        print(f"📧 Correo enviado con éxito a {destinatario}.")

    except Exception as e:
        print(f"❌ Error al enviar el correo SMTP: {e}")

if __name__ == "__main__":
    test_ofertas = [{
        'organism': 'EMT Valencia',
        'titulo': 'Titulado Medio Ingeniero experto en GMAO',
        'nivel': 'A2 / Laboral Fijo',
        'url': 'https://adeccoemtvalencia.iformalia.es/anuncios/titulado-medio-experto-sistemas',
        'fecha': 'Hasta 25/03/2026'
    }]
    print("Probando envío...")
    enviar_notificaciones(test_ofertas)
