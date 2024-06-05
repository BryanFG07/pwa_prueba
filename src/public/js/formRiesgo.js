import { saveForm, getAllForms, deleteForm } from './indexedDB.js';

document.getElementById('registroaceites').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const formDataObj = Object.fromEntries(formData.entries());
    const formularioId = 'registroaceites_' + new Date().getTime(); // Crear un ID único basado en el timestamp
    const data = { id: formularioId, formData: formDataObj };

    if (navigator.onLine) {
        //enviarDatosAlServidor(data);
        saveForm(data).then(() => {
            mostrarNotificacion();
        }).catch(error => {
            console.error('Error al guardar el formulario localmente:', error);
        });
    } else {
        saveForm(data).then(() => {
            mostrarNotificacion();
        }).catch(error => {
            console.error('Error al guardar el formulario localmente:', error);
        });
    }
});

// Función para enviar datos al servidor
function enviarDatosAlServidor(data) {
    fetch('/registrar', {
        method: 'POST',
        body: JSON.stringify(data.formData),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            deleteForm(data.id);
            alert("Registro guardado correctamente");
        } else {
            return Promise.reject('Failed to send data to server');
        }
    }).catch(error => {
        console.error(`Error al enviar el formulario ${data.id} al servidor:`, error);
    });
}

// Mostrar una notificación
function mostrarNotificacion() {
    getAllForms().then(forms => {
        forms.forEach(data => {
            //enviarDatosAlServidor(data);
            console.log(data)
        });
    }).catch(error => {
        console.error('Error al obtener los formularios guardados:', error);
    });
    alert("Sin conexión, datos guardados internamente");
}

// Verifica si hay formularios guardados al cargar la PWA
window.addEventListener('load', function() {
    if (navigator.onLine) {
        getAllForms().then(forms => {
            forms.forEach(data => {
                //enviarDatosAlServidor(data);
                console.log(data)
            });
        }).catch(error => {
            console.error('Error al obtener los formularios guardados:', error);
        });
    }
});

// Registrar la sincronización en segundo plano
if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.ready.then(registration => {
        return registration.sync.register('sync-enviar-formularios');
    }).then(() => {
        console.log('Sincronización de envío de formularios registrada');
    }).catch(error => {
        console.error('Error al registrar la sincronización de envío de formularios:', error);
    });
}