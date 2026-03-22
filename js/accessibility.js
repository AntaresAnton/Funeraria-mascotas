(function() {
    // 1. Crear el botón flotante de accesibilidad
    const btn = document.createElement('button');
    btn.id = 'accessibility-btn';
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 14.14 14.14"/><path d="M12 2v20"/><path d="M2 12h20"/></svg>'; 
    // Icono simple de "Universal Access" o similar. Usaré uno genérico de persona/cuerpo
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="5" r="1"></circle>
        <path d="M9 20l3-6 3 6"></path>
        <path d="M6 8l6 2 6-2"></path>
        <path d="M12 10v4"></path>
    </svg>`;
    
    // Estilos del botón
    Object.assign(btn.style, {
        position: 'fixed',
        bottom: '20px',
        left: '20px', // A la izquierda como solicitado
        zIndex: '9999',
        backgroundColor: '#2C5F5D',
        color: 'white',
        border: '2px solid white',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.3s ease'
    });

    btn.onmouseover = () => btn.style.transform = 'scale(1.1)';
    btn.onmouseout = () => btn.style.transform = 'scale(1)';

    // 2. Crear el menú de opciones (oculto por defecto)
    const menu = document.createElement('div');
    menu.id = 'accessibility-menu';
    Object.assign(menu.style, {
        position: 'fixed',
        bottom: '90px',
        left: '20px',
        zIndex: '9999',
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '12px',
        padding: '15px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        display: 'none',
        flexDirection: 'columm',
        gap: '10px',
        minWidth: '200px'
    });

    // Opciones del menú
    const options = [
        { label: 'Aumentar Texto', action: 'toggleNodesFontSize' },
        { label: 'Alto Contraste', action: 'toggleContrast' },
        { label: 'Escala de Grises', action: 'toggleGrayscale' },
        { label: 'Restablecer', action: 'reset' }
    ];

    options.forEach(opt => {
        const item = document.createElement('button');
        item.textContent = opt.label;
        Object.assign(item.style, {
            display: 'block',
            width: '100%',
            padding: '10px',
            marginBottom: '5px',
            backgroundColor: '#f5f5f5',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            textAlign: 'left',
            color: '#333',
            fontSize: '14px'
        });
        item.onmouseover = () => item.style.backgroundColor = '#e0e0e0';
        item.onmouseout = () => item.style.backgroundColor = '#f5f5f5';
        
        item.onclick = () => handleAction(opt.action);
        menu.appendChild(item);
    });

    // 3. Insertar en el DOM
    document.body.appendChild(btn);
    document.body.appendChild(menu);

    // 4. Lógica
    btn.onclick = () => {
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    };

    let isLargeText = false;
    let isHighContrast = false;
    let isGrayscale = false;

    function handleAction(action) {
        const html = document.documentElement;
        
        switch(action) {
            case 'toggleNodesFontSize':
                isLargeText = !isLargeText;
                if(isLargeText) {
                    html.style.fontSize = '120%';
                } else {
                    html.style.fontSize = '';
                }
                break;
            
            case 'toggleContrast':
                isHighContrast = !isHighContrast;
                if(isHighContrast) {
                    html.style.filter = isGrayscale ? 'grayscale(100%) contrast(150%)' : 'contrast(150%)';
                    document.body.style.backgroundColor = 'black';
                    document.body.style.color = 'yellow';
                    // Nota: una implementación real sería más robusta manejando variables CSS
                } else {
                    html.style.filter = isGrayscale ? 'grayscale(100%)' : '';
                    document.body.style.backgroundColor = '';
                    document.body.style.color = '';
                }
                break;

            case 'toggleGrayscale':
                isGrayscale = !isGrayscale;
                if(isGrayscale) {
                    html.style.filter = isHighContrast ? 'contrast(150%) grayscale(100%)' : 'grayscale(100%)';
                } else {
                    html.style.filter = isHighContrast ? 'contrast(150%)' : '';
                }
                break;

            case 'reset':
                isLargeText = false;
                isHighContrast = false;
                isGrayscale = false;
                html.style.fontSize = '';
                html.style.filter = '';
                document.body.style.backgroundColor = '';
                document.body.style.color = '';
                break;
        }
    }

})();