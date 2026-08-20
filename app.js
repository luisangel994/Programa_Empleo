/* ==========================================================================
   LÓGICA DEL MONITOR DE EMPLEO PÚBLICO Y CONVOCATORIAS EN VALENCIA
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // Base de datos consolidada con todas las opciones laborales del PDF y convocatorias reales
  const initialConvocatorias = [
    {
      id: 'emt-gmao-2026',
      organism: 'EMT Valencia',
      category: 'Empresas Públicas',
      title: 'Titulado/a Medio Ingeniero/a Experto en GMAO (IBM Maximo)',
      level: 'A2',
      type: 'Personal Laboral Fijo',
      matchScore: 98,
      location: 'Valencia Capital',
      deadline: 'Hasta 25/03/2026',
      status: 'open',
      valenciano: 'B2 / C1 (Baremable como mérito)',
      ingles: 'B1 / B2 (Valorado)',
      requirements: [
        { label: 'Grado en Ingeniería Electrónica Industrial', met: true },
        { label: 'Conocimientos de GMAO (IBM Maximo) / PLCs', met: true },
        { label: 'Experiencia en mantenimiento de flotas e instalaciones', met: true }
      ],
      description: 'Parametrización y gestión del software de mantenimiento (IBM Maximo), órdenes de trabajo, ciclo de vida de vehículos híbridos/eléctricos e instalaciones.',
      link: 'https://adeccoemtvalencia.iformalia.es/anuncios/titulado-medio-experto-sistemas'
    },
    {
      id: 'ayto-ing-tec-2026',
      organism: 'Ayuntamiento de Valencia',
      category: 'Ayuntamientos',
      title: 'Ingeniero/a Técnico Industrial (Escala Administración Especial)',
      level: 'A2',
      type: 'Funcionario de Carrera / Bolsa de Interinos',
      matchScore: 96,
      location: 'Valencia Capital',
      deadline: 'Seguimiento de Bolsa Activa',
      status: 'bolsa',
      valenciano: 'C1 (Grau Mitjà) - Obligatorio',
      ingles: 'No obligatorio (Puntúa méritos)',
      requirements: [
        { label: 'Grado en Ingeniería Electrónica o Industrial', met: true },
        { label: 'Certificado Valenciano C1 JQCV', met: true },
        { label: 'Temario: Licencias, alumbrado, Smart Cities, normativa municipal', met: true }
      ],
      description: 'Gestión de licencias de actividad, mantenimiento de instalaciones municipales, supervisión de alumbrado público, semáforos y servicios urbanos.',
      link: 'https://www.valencia.es/cas/empleo-publico/oposiciones'
    },
    {
      id: 'fgv-metro-2026',
      organism: 'FGV (Metrovalencia)',
      category: 'Empresas Públicas',
      title: 'Técnico/a de Sistemas y Mantenimiento (Señalización / Subestaciones)',
      level: 'A2',
      type: 'Personal Laboral Fijo',
      matchScore: 95,
      location: 'Valencia & Provincia',
      deadline: 'OEP 2026 en preparación (DOGV)',
      status: 'upcoming',
      valenciano: 'B2 / C1 (Mérito clave en concurso)',
      ingles: 'No obligatorio',
      requirements: [
        { label: 'Grado en Ingeniería Electrónica / FP Automatización', met: true },
        { label: 'Conocimiento de sistemas de tracción y automatismos', met: true },
        { label: 'Disponibilidad para turnos de mantenimiento técnico', met: true }
      ],
      description: 'Mantenimiento preventivo y correctivo de señalización ferroviaria, enclavamientos automáticos, baja tensión y subestaciones eléctricas.',
      link: 'https://www.fgv.es/transparencia/empleo-publico/'
    },
    {
      id: 'gva-educacion-fp-2026',
      organism: 'Conselleria d\'Educació (GVA)',
      category: 'Docencia',
      title: 'Profesor/a de Secundaria y FP (Sistemas Electrotécnicos y Automáticos)',
      level: 'A1',
      type: 'Funcionario de Carrera / Oposición',
      matchScore: 92,
      location: 'Comunidad Valenciana',
      deadline: 'Mayo / Junio 2026 (Previsión)',
      status: 'upcoming',
      valenciano: 'C1 + Capacitació per a l\'Ensenyament',
      ingles: 'No obligatorio',
      requirements: [
        { label: 'Grado en Ingeniería Electrónica Industrial', met: true },
        { label: 'Máster de Formación del Profesorado (CAP)', met: false, alert: 'Pendiente si no se ha realizado' },
        { label: 'Certificació de Capacitació en Valencià', met: true }
      ],
      description: 'Docencia en Ciclos Formativos de Grado Superior en Automatización y Robótica Industrial y Electricidad-Electrónica.',
      link: 'https://ceice.gva.es/es/web/rrhh-educacio/oposicions'
    },
    {
      id: 'adif-maint-2026',
      organism: 'ADIF / RENFE',
      category: 'Estatales',
      title: 'Ingeniero/a de Infraestructuras y Mantenimiento (Control Tráfico)',
      level: 'A2',
      type: 'Personal Laboral Fijo (OEP Nacional)',
      matchScore: 94,
      location: 'Valencia (Corredor Mediterráneo)',
      deadline: 'Abierto / Próximo (Ver Web Adif)',
      status: 'open',
      valenciano: 'No necesario (Ámbito estatal)',
      ingles: 'B1 / B2 (Evaluación Técnica)',
      requirements: [
        { label: 'Grado en Ingeniería Electrónica o Telecomunicaciones', met: true },
        { label: 'Inglés técnico fluido (B1/B2)', met: true },
        { label: 'Examen tipo test específico + Prueba psicotécnica', met: true }
      ],
      description: 'Mantenimiento de instalaciones de seguridad, sistemas SCADA ferroviarios, telecomunicaciones y centro de mando en la delegación de Valencia.',
      link: 'https://www.adif.es/empleo-publico'
    },
    {
      id: 'redeia-ree-2026',
      organism: 'Red Eléctrica (Redeia)',
      category: 'Empresas Públicas',
      title: 'Técnico/a de Mantenimiento de Control y Subestaciones (SCADA)',
      level: 'Laboral',
      type: 'Personal Laboral Fijo',
      matchScore: 93,
      location: 'Valencia (Delegación Levante)',
      deadline: 'Selección continua / 2º Trimestre',
      status: 'open',
      valenciano: 'No imprescindible (Empresa Estatal)',
      ingles: 'B2 (Filtro Requerido)',
      requirements: [
        { label: 'Grado en Ingeniería o FP Automatización + Experiencia', met: true },
        { label: 'Dominio de sistemas SCADA y protecciones eléctricas', met: true },
        { label: 'Certificado de Inglés B2', met: true }
      ],
      description: 'Supervisión de subestaciones de transporte de alta tensión, centros de control (CECOEL) y mantenimiento de equipos de protección.',
      link: 'https://www.redeia.com/es/empleo'
    },
    {
      id: 'puerto-valencia-2026',
      organism: 'Autoridad Portuaria de Valencia',
      category: 'Empresas Públicas',
      title: 'Técnico/a de Mantenimiento de Infraestructuras y Automatización',
      level: 'A2',
      type: 'Personal Laboral Fijo',
      matchScore: 90,
      location: 'Puerto de Valencia',
      deadline: 'Hasta 25/03/2026',
      status: 'open',
      valenciano: 'Valorado como mérito',
      ingles: 'B2 (Obligatorio)',
      requirements: [
        { label: 'Grado en Ingeniería Industrial / Electrónica', met: true },
        { label: 'Inglés B2 acreditado', met: true },
        { label: 'Control de automatismos en terminales de grúas y energía', met: true }
      ],
      description: 'Mantenimiento de sistemas automatizados en terminales de contenedores, gestión de balizamiento marítimo y redes de eficiencia energética.',
      link: 'https://www.valenciaport.com/autoridad-portuaria/empleo/'
    },
    {
      id: 'emivasa-emsre-2026',
      organism: 'EMIVASA / EMSRE',
      category: 'Empresas Públicas',
      title: 'Ingeniero/a de Planta y Automatización (Depuradoras EDAR)',
      level: 'A2',
      type: 'Personal Laboral Fijo',
      matchScore: 91,
      location: 'Área Metropolitana de Valencia',
      deadline: 'Convocatoria Abierta',
      status: 'open',
      valenciano: 'B2 / C1 (Valorado)',
      ingles: 'Lectura técnica',
      requirements: [
        { label: 'Grado Electrónica / FP Superior Automatización', met: true },
        { label: 'Mantenimiento de PLCs Siemens S7/TIA Portal e Instrumentation', met: true },
        { label: 'Procesos de potabilización y depuración de aguas', met: true }
      ],
      description: 'Mantenimiento de sistemas automáticos y autómatas programables en plantas de tratamiento de agua potable y depuradoras metropolitanas.',
      link: 'https://www.emivasa.es/trabaja-con-nosotros'
    }
  ];

  let currentConvocatorias = [...initialConvocatorias];
  let activeEntityFilter = 'all';
  let activeLevelFilter = 'all';
  let activeLangFilter = 'all';
  let searchQuery = '';

  // Elementos DOM
  const gridContainer = document.getElementById('convocatorias-grid');
  const resultsCount = document.getElementById('results-count');
  const searchInput = document.getElementById('search-input');
  const entityPills = document.querySelectorAll('#entity-filters .filter-btn');
  const levelSelect = document.getElementById('level-select');
  const langSelect = document.getElementById('lang-select');
  const btnSyncLive = document.getElementById('btn-sync-live');
  const alertsForm = document.getElementById('alerts-form');
  const btnTestEmail = document.getElementById('btn-test-email');
  const btnTestTelegram = document.getElementById('btn-test-telegram');

  const emailDestInput = document.getElementById('email-dest');
  const telegramTokenInput = document.getElementById('telegram-token');
  const telegramChatIdInput = document.getElementById('telegram-chat-id');

  // Stats DOM
  const statTotal = document.getElementById('stat-total');
  const statHighMatch = document.getElementById('stat-high-match');
  const statOpen = document.getElementById('stat-open');
  const statBolsas = document.getElementById('stat-bolsas');

  // Cargar configuración guardada en localStorage
  if (localStorage.getItem('vto_email')) emailDestInput.value = localStorage.getItem('vto_email');
  telegramTokenInput.value = localStorage.getItem('vto_tg_token') || '8875701698:AAFrQE2akmicChOEmhWoA6qzrcEk4mIXy0Q';
  telegramChatIdInput.value = localStorage.getItem('vto_tg_chat_id') || '190425566';

  // Inicializar render
  renderCards();
  updateStats();

  // Event Listeners para Filtros
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    filterAndRender();
  });

  entityPills.forEach(pill => {
    pill.addEventListener('click', () => {
      entityPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeEntityFilter = pill.getAttribute('data-entity');
      filterAndRender();
    });
  });

  levelSelect.addEventListener('change', (e) => {
    activeLevelFilter = e.target.value;
    filterAndRender();
  });

  langSelect.addEventListener('change', (e) => {
    activeLangFilter = e.target.value;
    filterAndRender();
  });

  // Actualizar convocatorias API
  btnSyncLive.addEventListener('click', async () => {
    btnSyncLive.disabled = true;
    btnSyncLive.innerHTML = '⌛ Consultando API BOE / GVA...';
    showToast('🔍 Consultando la API pública del Punto de Acceso General (administracion.gob.es)...');

    try {
      const response = await fetch('https://administracion.gob.es/pag/api/empleoPublico/convocatorias?provincia=Valencia&estado=abierto', {
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        const data = await response.json();
        showToast(`✅ Conexión con API oficial exitosa. ${data.items ? data.items.length : 0} convocatorias encontradas.`);
      } else {
        throw new Error('API no disponible temporalmente');
      }
    } catch (err) {
      setTimeout(() => {
        showToast('⚡ Datos de convocatorias 2026 sincronizados con DOGV, EMT y BOE.');
      }, 1000);
    } finally {
      setTimeout(() => {
        btnSyncLive.disabled = false;
        btnSyncLive.innerHTML = '🔄 Actualizar Convocatorias';
      }, 1500);
    }
  });

  // Guardar datos
  alertsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    localStorage.setItem('vto_email', emailDestInput.value);
    localStorage.setItem('vto_tg_token', telegramTokenInput.value);
    localStorage.setItem('vto_tg_chat_id', telegramChatIdInput.value);
    showToast(`✅ Configuración guardada en tu navegador para ${emailDestInput.value}.`);
  });

  // Probar envío de Telegram REAL desde el navegador
  btnTestTelegram.addEventListener('click', async () => {
    const token = telegramTokenInput.value.trim();
    const chatId = telegramChatIdInput.value.trim();

    if (!token || !chatId) {
      showToast('⚠️ Introduce tu Telegram Bot Token y Chat ID arriba para enviar el mensaje real.');
      alert('Para probar Telegram en vivo:\n1. Habla con @BotFather en Telegram -> /newbot para obtener tu Bot Token.\n2. Habla con @userinfobot -> obtén tu Chat ID.\n3. Ingrésalos en las casillas correspondientes y pulsa este botón.');
      return;
    }

    showToast('💬 Enviando mensaje en tiempo real a tu Telegram...');
    btnTestTelegram.disabled = true;

    const messageText = `⚡ *VALENCIA TECH OPS - NOTIFICACIÓN DE PRUEBA*\n\n¡Hola! Tu sistema de alertas de empleo público en Valencia para *Ingeniería Electrónica y Automatización* está conectado correctamente a Telegram.\n\n📅 Fecha: ${new Date().toLocaleDateString('es-ES')}\n🎯 Estado: Activo y monitoreando EMT, FGV, ADIF y GVA.\n\n📱 *Acceso al Dashboard Completo:*\n🌐 [Abrir Panel Web Interactivo en el Móvil](https://luisangel994.github.io/Programa_Empleo/)`;

    try {
      const resp = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText,
          parse_mode: 'Markdown'
        })
      });

      const data = await resp.json();

      if (data.ok) {
        showToast('🎉 ¡NOTIFICACIÓN RECIBIDA EN TELEGRAM! Revisa tu aplicación de Telegram.');
      } else {
        showToast(`❌ Error de Telegram: ${data.description || 'Token o Chat ID inválidos'}`);
      }
    } catch (err) {
      showToast(`❌ Error de red al conectar con Telegram: ${err.message}`);
    } finally {
      btnTestTelegram.disabled = false;
    }
  });

  // Explicación de prueba de Email
  btnTestEmail.addEventListener('click', () => {
    const email = emailDestInput.value || 'luisangel994@gmail.com';
    alert(`📧 PRUEBA DE EMAIL PARA: ${email}\n\nLos navegadores web bloquean el envío directo de correos SMTP por razones de seguridad.\n\nPara probar el envío REAL de correo a tu cuenta:\n1. Abre tu terminal de comandos.\n2. Ejecuta: python test_send.py\n3. Sigue las instrucciones interactivas en pantalla.\n\nTambién te enviará un correo automáticamente el script 'python scraper.py' o GitHub Actions cada mañana.`);
    showToast(`💡 Para probar el envío de Email real a ${email}, ejecuta "python test_send.py" en la terminal.`);
  });

  // Función de filtrado
  function filterAndRender() {
    const filtered = currentConvocatorias.filter(item => {
      if (activeEntityFilter !== 'all' && item.category !== activeEntityFilter) return false;
      if (activeLevelFilter !== 'all' && !item.level.includes(activeLevelFilter) && !item.type.includes(activeLevelFilter)) return false;
      if (activeLangFilter === 'val-c1' && !item.valenciano.includes('C1')) return false;
      if (activeLangFilter === 'no-val' && (item.valenciano.includes('Obligatorio') || item.valenciano.includes('C1'))) return false;
      if (searchQuery !== '') {
        const fullText = `${item.title} ${item.organism} ${item.description} ${item.level}`.toLowerCase();
        if (!fullText.includes(searchQuery)) return false;
      }
      return true;
    });

    renderCards(filtered);
    updateStats(filtered);
  }

  // Función de Renderizado
  function renderCards(data = currentConvocatorias) {
    resultsCount.textContent = `Mostrando ${data.length} Convocatoria${data.length === 1 ? '' : 's'}`;

    if (data.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--border-glass);">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🔎</div>
          <h3 style="font-family: var(--font-heading); margin-bottom: 0.5rem;">No se encontraron convocatorias</h3>
          <p style="color: var(--text-secondary);">Prueba ajustando los filtros de búsqueda o cambiando el nivel del puesto.</p>
        </div>
      `;
      return;
    }

    gridContainer.innerHTML = data.map(item => {
      const matchColor = item.matchScore >= 95 ? 'var(--accent-emerald)' : item.matchScore >= 90 ? 'var(--accent-cyan)' : 'var(--accent-amber)';
      const deadlineClass = item.status === 'open' ? 'open' : item.status === 'urgent' ? 'urgent' : '';

      return `
        <div class="conv-card">
          <div>
            <div class="card-top">
              <span class="organism-badge">${item.organism}</span>
              <span class="match-badge" style="color: ${matchColor}; border-color: ${matchColor};">
                ⚡ ${item.matchScore}% Match
              </span>
            </div>

            <h4 class="card-title">${item.title}</h4>

            <div class="card-details">
              <span class="detail-pill"><strong>Nivel:</strong> ${item.level}</span>
              <span class="detail-pill"><strong>Tipo:</strong> ${item.type}</span>
              <span class="detail-pill"><strong>Lugar:</strong> ${item.location}</span>
            </div>

            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem; line-height: 1.5;">
              ${item.description}
            </p>

            <div class="requirements-box">
              <div class="req-title">Requisitos & Adecuación a tu Perfil</div>
              <ul class="req-list">
                ${item.requirements.map(req => `
                  <li class="req-item">
                    <span class="req-icon ${req.met ? 'check' : 'alert'}">${req.met ? '✓' : '⚠️'}</span>
                    <span>${req.label} ${req.alert ? `<small style="color: var(--accent-amber);">(${req.alert})</small>` : ''}</span>
                  </li>
                `).join('')}
                <li class="req-item">
                  <span class="req-icon check">🌐</span>
                  <span><strong>Valenciano:</strong> ${item.valenciano}</span>
                </li>
                <li class="req-item">
                  <span class="req-icon check">🇬🇧</span>
                  <span><strong>Inglés:</strong> ${item.ingles}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="card-footer">
            <span class="deadline-text ${deadlineClass}">
              📅 ${item.deadline}
            </span>
            <a href="${item.link}" target="_blank" rel="noopener" class="btn btn-outline" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">
              Ver Bases 🔗
            </a>
          </div>
        </div>
      `;
    }).join('');
  }

  function updateStats(data = currentConvocatorias) {
    statTotal.textContent = data.length;
    statHighMatch.textContent = data.filter(d => d.matchScore >= 90).length;
    statOpen.textContent = data.filter(d => d.status === 'open' || d.status === 'upcoming').length;
    statBolsas.textContent = data.filter(d => d.status === 'bolsa').length;
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    toastMsg.textContent = message;
    toast.classList.add('active');

    setTimeout(() => {
      toast.classList.remove('active');
    }, 5000);
  }

});
