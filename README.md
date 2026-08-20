# ⚡ Monitor de Empleo Público y Convocatorias Valencia

> **Perfil Destino:** Ingeniero Electrónico Industrial (*Universidad de Valencia*) + Técnico Superior en Automatización y Robótica Industrial (*FP Superior*).
> **Ámbito:** Valencia y Comunidad Valenciana (Generalitat, Ayuntamientos, Empresas Públicas y Estatales).

---

## 🌟 Características de la Solución

1. **Dashboard Web Interactivo (`index.html`):**
   - Visualización de todas las plazas públicas clasificadas por Grupo (**A1, A2, C1, Laboral Fijo**).
   - % Match Score calculado según tu doble titulación.
   - Filtros instantáneos por entidad (**GVA, Ayuntamiento, EMT, FGV, ADIF, REE, Docencia**), nivel e idioma (Valenciano C1/B2, Inglés B1/B2).
   - Calculadora de adecuación y checklist de requisitos de cada plaza.
   - Botón de sincronización directa con la API del Punto de Acceso General del Estado (`administracion.gob.es`).

2. **Motor de Extraer & Filtrar (`scraper.py`):**
   - Conexión con la API REST pública del Gobierno de España.
   - Monitoreo de convocatorias específicas de empresas públicas en Valencia (**EMT, FGV Metrovalencia, Autoridad Portuaria, ADIF, Redeia**).
   - Control de histórico (`vistas.json`) para evitar avisos duplicados.

3. **Notificaciones por Email SMTP y Telegram (`notifier.py`):**
   - Plantilla HTML elegante con diseño cibernético/oscuro.
   - Envíos diarios automáticos con los detalles clave de cada plaza y botón directo a las bases oficiales.

4. **Automatización 24/7 Gratis (GitHub Actions):**
   - Workflow `.github/workflows/alertas_diarias.yml` configurado para ejecutarse a las 07:00 AM UTC sin servidor encendido.

---

## 🚀 Guía de Inicio Rápido

### 1. Probar la Interfaz Web (Dashboard)
Abre el archivo `index.html` directamente en tu navegador web (doble clic sobre él o arrastrándolo a Chrome/Edge/Firefox).

### 2. Ejecutar el Monitoreo Localmente en Python
Asegúrate de tener Python instalado y ejecuta:

```bash
# 1. Instalar dependencias
pip install -r requirements.txt

# 2. Ejecutar el extractor de convocatorias
python scraper.py
```

### 3. Configurar Alertas Diarias en GitHub Actions (Opcional)
Para recibir las alertas en tu correo automáticamente todos los días:

1. Sube este proyecto a tu repositorio privado de GitHub.
2. Ve a **Settings > Secrets and variables > Actions** en tu repositorio de GitHub.
3. Añade los siguientes secretos:
   - `EMAIL_REMITENTE`: Tu correo Gmail (ej. `tu-correo@gmail.com`).
   - `EMAIL_PASSWORD`: Tu contraseña de aplicación de Gmail (creada en la cuenta de Google -> Seguridad -> Contraseñas de aplicación).
   - `EMAIL_DESTINO`: El correo donde quieres recibir las alertas.

¡Y listo! El sistema revisará las ofertas todos los días a las 07:00 AM y te notificará si hay plazas nuevas.
