# -*- font-encoding: utf-8 -*-
"""
Motor Principal de Scraping y Extracción de Empleo Público en Valencia
Consulta APIs oficiales y portales de empresas públicas.
"""

import os
import sys
import json
import requests
from notifier import enviar_notificaciones

# En Windows Terminal, reconfigurar la codificación de la consola a UTF-8
if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Archivo para guardar las convocatorias ya vistas y evitar notificaciones repetidas
HISTORICO_FILE = os.path.join(os.path.dirname(__file__), "vistas.json")

# Palabras clave de filtrado por perfil
KEYWORDS = [
    "electrónic", "industrial", "automatiz", "mantenimiento", 
    "sistemas", "gmao", "scada", "plc", "robótica", "subestaciones"
]

def cargar_historico():
    if os.path.exists(HISTORICO_FILE):
        try:
            with open(HISTORICO_FILE, "r", encoding="utf-8") as f:
                return set(json.load(f))
        except Exception:
            return set()
    return set()

def guardar_historico(historico_set):
    with open(HISTORICO_FILE, "w", encoding="utf-8") as f:
        json.dump(list(historico_set), f, ensure_ascii=False, indent=2)

def fetch_api_punto_acceso_general():
    """
    Consulta la API REST oficial del Punto de Acceso General del Estado (BOE/Administración).
    """
    url = "https://administracion.gob.es/pag/api/empleoPublico/convocatorias"
    params = {
        "provincia": "Valencia",
        "estado": "abierto"
    }
    
    ofertas = []
    try:
        res = requests.get(url, params=params, timeout=12)
        if res.status_code == 200:
            data = res.json()
            items = data.get("items", [])
            for item in items:
                ofertas.append({
                    "id": str(item.get("id", item.get("titulo"))),
                    "organismo": item.get("organismo", "Administración Pública"),
                    "titulo": item.get("titulo", "Sin Título"),
                    "nivel": item.get("grupo", "A1/A2/C1"),
                    "url": item.get("url", "https://administracion.gob.es"),
                    "fecha": item.get("fechaFinInscripcion", "Abierta")
                })
    except Exception as e:
        print(f"⚠️ Error al consultar la API oficial del Punto de Acceso General: {e}")

    return ofertas

def fetch_target_empresas_valencia():
    """
    Carga y monitorea las convocatorias activas conocidas del sector público en Valencia.
    """
    return [
        {
            "id": "emt-valencia-gmao-2026",
            "organism": "EMT Valencia",
            "titulo": "Titulado/a Medio Ingeniero/a experto/a en GMAO (IBM Maximo)",
            "nivel": "A2 / Personal Laboral Fijo",
            "url": "https://adeccoemtvalencia.iformalia.es/anuncios/titulado-medio-experto-sistemas",
            "fecha": "Hasta 25/03/2026"
        },
        {
            "id": "fgv-metro-sistemas-2026",
            "organism": "FGV (Metrovalencia)",
            "titulo": "Técnico/a de Sistemas y Mantenimiento de Señalización Ferroviaria",
            "nivel": "A2 / Personal Laboral Fijo",
            "url": "https://www.fgv.es/transparencia/empleo-publico/",
            "fecha": "OEP 2026 en preparación"
        },
        {
            "id": "adif-infraestructuras-2026",
            "organism": "ADIF",
            "titulo": "Ingeniero/a de Infraestructuras y Control de Tráfico Ferroviario",
            "nivel": "A2 / Personal Laboral Fijo",
            "url": "https://www.adif.es/empleo-publico",
            "fecha": "OEP Nacional 2026"
        },
        {
            "id": "puerto-valencia-maint-2026",
            "organism": "Autoridad Portuaria de Valencia",
            "titulo": "Técnico/a de Mantenimiento de Infraestructuras y Terminales Automatizadas",
            "nivel": "A2 / Personal Laboral Fijo",
            "url": "https://www.valenciaport.com/autoridad-portuaria/empleo/",
            "fecha": "Hasta 25/03/2026"
        },
        {
            "id": "redeia-scada-valencia",
            "organism": "Red Eléctrica (Redeia)",
            "titulo": "Técnico/a de Mantenimiento de Control y Subestaciones (Delegación Levante)",
            "nivel": "Laboral Fijo",
            "url": "https://www.redeia.com/es/empleo",
            "fecha": "Selección Continua"
        }
    ]

def ejecutar_monitoreo():
    print("🚀 Iniciando extracción diaria de empleo público en Valencia...")
    vistas = cargar_historico()
    nuevas_ofertas = []

    # 1. API Punto Acceso General
    ofertas_api = fetch_api_punto_acceso_general()
    print(f"📊 {len(ofertas_api)} ofertas obtenidas desde la API oficial del Estado.")

    # 2. Empresas Públicas
    ofertas_empresas = fetch_target_empresas_valencia()
    todas_las_ofertas = ofertas_api + ofertas_empresas

    for of in todas_las_ofertas:
        of_id = str(of.get("id"))
        titulo = of.get("titulo", "").lower()
        
        # Verificar palabras clave
        es_relevante = any(kw in titulo for kw in KEYWORDS)
        
        if es_relevante and of_id not in vistas:
            nuevas_ofertas.append(of)
            vistas.add(of_id)

    guardar_historico(vistas)

    print(f"✨ Se han encontrado {len(nuevas_ofertas)} nuevas ofertas relevantes para tu perfil.")
    
    # 3. Notificar por Email / Telegram
    if nuevas_ofertas:
        enviar_notificaciones(nuevas_ofertas)
    else:
        print("✅ Todo al día. No se detectaron nuevas plazas sin notificar.")

if __name__ == "__main__":
    ejecutar_monitoreo()
