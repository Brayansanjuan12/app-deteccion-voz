function iniciarReconocimiento() {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition(); 
        recognition.continuous = true;
        recognition.lang = 'es-ES';
        let envioActivo = false;

        recognition.onstart = function() {
            console.log('Reconocimiento de voz iniciado.');
        };

        recognition.onend = function() {
            console.log('Reconocimiento de voz detenido.');
        };

        recognition.onresult = function(event) {
            const orden = event.results[event.results.length - 1][0].transcript.trim();
            const usuario = 'Brayan';
            const fechaHora = obtenerFechaHoraActual();

            // Verificar si la orden es exactamente igual a "BRIAN"
            if (orden.toUpperCase() === 'BRIAN') {
                // No hacer nada si la orden es solo "BRIAN"
                console.log('Palabra clave detectada: BRIAN');
            } else if (orden.toUpperCase().startsWith('BRIAN')) {
                // Enviar la orden y los detalles al MOCKAPI personalizado
                enviarOrdenAMockAPI(orden, usuario, fechaHora)
                    .then(() => {
                        console.log('Orden enviada correctamente al MOCKAPI:', orden);
                    })
                    .catch(() => {
                        console.error('Error al enviar orden al MOCKAPI.');
                    });
            }
        };

        function obtenerFechaHoraActual() {
            const fechaHora = new Date();
            return fechaHora.toLocaleString('es-ES');
        }

        function enviarOrdenAMockAPI(orden, usuario, fechaHora) {
            const url = 'https://662c6b2f0547cdcde9de4777.mockapi.io/Voz';


            const datos = {
                Orden: orden,
                Usuario: usuario,
                "Fecha-Hora": fechaHora
            };

            return fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            })
            .then(response => {
                if (response.ok) {
                    return response.json(); // Procesar la respuesta JSON si es necesario
                } else {
                    throw new Error('Error al enviar orden al MOCKAPI');
                }
            })
            .catch(error => {
                console.error('Error al enviar orden al MOCKAPI:', error);
                throw error; // Propagar el error para manejarlo externamente si es necesario
            });
        }

        recognition.start(); // Iniciar el reconocimiento de voz
    } else {
        console.error('Tu navegador no soporta la API de reconocimiento de voz.');
    }
}

// Ejecutar la función para iniciar el reconocimiento de voz al cargar la página
window.addEventListener('load', iniciarReconocimiento);



