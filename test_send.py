# -*- font-encoding: utf-8 -*-
"""
Script Interactivo de Prueba de Notificaciones Reales (Email & Telegram)
"""

import sys
import smtplib
import requests
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from notifier import generar_html_email

if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

def probar_telegram():
    print("\n--- 💬 PRUEBA DE BOT DE TELEGRAM ---")
    print("1. En Telegram abre un chat con @BotFather y envía /newbot para obtener tu Bot Token.")
    print("2. Abre un chat con @userinfobot para obtener tu Chat ID.")
    token = input("\nIngresa tu Telegram Bot Token: ").strip()
    chat_id = input("Ingresa tu Telegram Chat ID: ").strip()

    if not token or not chat_id:
        print("❌ Se requieren Token y Chat ID para enviar el mensaje.")
        return

    print("📡 Enviando mensaje a Telegram...")
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = {
        "chat_id": chat_id,
        "text": "⚡ *VALENCIA TECH OPS - PRUEBA RECORRIDO EXITO*\n\n¡Felicidades! Tu bot de Telegram está correctamente configurado para recibir alertas de empleo público en Valencia.",
        "parse_mode": "Markdown"
    }
    
    try:
        r = requests.post(url, json=payload, timeout=10)
        data = r.json()
        if data.ok:
            print("🎉 ¡ÉXITO! Notificación recibida en tu app de Telegram.")
        else:
            print(f"❌ Error de Telegram: {data.get('description')}")
    except Exception as e:
        print(f"❌ Error al conectar con Telegram: {e}")

def probar_email():
    print("\n--- 📧 PRUEBA DE ENVÍO DE EMAIL CON GMAIL ---")
    print("Para que Gmail permita a Python enviar correos automáticos:")
    print("1. Ve a tu cuenta de Google -> Seguridad -> Verificación en 2 pasos (debe estar activada).")
    print("2. En el buscador de tu cuenta busca 'Contraseñas de aplicación' y crea una para 'Python'.")
    
    remitente = input("\nTu correo de Gmail remitente: ").strip()
    password = input("Tu Contraseña de Aplicación de 16 letras (ej. abcd efgh ijkl mnop): ").strip().replace(" ", "")
    destinatario = input("Correo destino [Por defecto: luisangel994@gmail.com]: ").strip() or "luisangel994@gmail.com"

    if not remitente or not password:
        print("❌ Se requiere correo y contraseña de aplicación.")
        return

    print(f"📡 Enviando correo de prueba a {destinatario}...")

    test_ofertas = [{
        'organism': 'EMT Valencia',
        'titulo': 'Titulado/a Medio Ingeniero/a experto/a en GMAO (IBM Maximo)',
        'nivel': 'A2 / Personal Laboral Fijo',
        'url': 'https://adeccoemtvalencia.iformalia.es/anuncios/titulado-medio-experto-sistemas',
        'fecha': 'Hasta 25/03/2026'
    }]

    try:
        msg = MIMEMultipart()
        msg["Subject"] = "⚡ PRUEBA DE ALERTA: Valencia Tech Ops (Empleo Público)"
        msg["From"] = remitente
        msg["To"] = destinatario

        html_content = generar_html_email(test_ofertas)
        msg.attach(MIMEText(html_content, "html", "utf-8"))

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(remitente, password)
            server.sendmail(remitente, destinatario, msg.as_string())

        print(f"🎉 ¡ÉXITO! Correo de prueba enviado a {destinatario}. Revisa tu bandeja de entrada o Spam.")
    except Exception as e:
        print(f"❌ Error al enviar el correo: {e}")

def main():
    print("=====================================================")
    print("⚡ PRUEBA DE NOTIFICACIONES REALES (VALENCIA TECH OPS)")
    print("=====================================================")
    print("1. Probar Bot de Telegram (Mensaje a tu móvil)")
    print("2. Probar Envío de Correo (Email a luisangel994@gmail.com)")
    print("3. Salir")
    
    opcion = input("\nElige una opción (1, 2 o 3): ").strip()
    
    if opcion == "1":
        probar_telegram()
    elif opcion == "2":
        probar_email()
    else:
        print("Hasta luego.")

if __name__ == "__main__":
    main()
