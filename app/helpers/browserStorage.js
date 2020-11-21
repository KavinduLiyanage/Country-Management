class BrowserStorage {
    setLocalStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getLocalStorage(key) {
        const storedValue = localStorage.getItem(key);

        return storedValue ? JSON.parse(storedValue) : null;
    }

    removeLocalStorage(key) {
        localStorage.removeItem(key);
    }
}

export default new BrowserStorage();
