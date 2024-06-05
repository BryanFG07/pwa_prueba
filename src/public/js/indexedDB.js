function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('FormDatabase', 1);

        request.onupgradeneeded = event => {
            const db = event.target.result;
            db.createObjectStore('forms', { keyPath: 'id' });
        };

        request.onsuccess = event => {
            resolve(event.target.result);
        };

        request.onerror = event => {
            reject(event.target.error);
        };
    });
}

function saveForm(data) {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['forms'], 'readwrite');
            const store = transaction.objectStore('forms');
            const request = store.add(data);

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = event => {
                reject(event.target.error);
            };
        });
    });
}

function getAllForms() {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['forms'], 'readonly');
            const store = transaction.objectStore('forms');
            const request = store.getAll();

            request.onsuccess = event => {
                resolve(event.target.result);
            };

            request.onerror = event => {
                reject(event.target.error);
            };
        });
    });
}

function deleteForm(id) {
    return openDatabase().then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['forms'], 'readwrite');
            const store = transaction.objectStore('forms');
            const request = store.delete(id);

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = event => {
                reject(event.target.error);
            };
        });
    });
}
export { openDatabase, saveForm, getAllForms, deleteForm };