document.addEventListener('DOMContentLoaded', () => {
    const toggleLink = document.getElementById('mode-toggle');
    const body = document.body;
    const modeKey = 'colorMode'; // Schlüssel für localStorage

    // Funktion zum Setzen des Modus und Text-Änderung
    function setMode(mode) {
        if (mode === 'dark') {
            body.classList.add('dark-mode');
            toggleLink.textContent = 'light?'; // Dark Mode ist aktiv -> Frage: willst du light?
        } else {
            body.classList.remove('dark-mode');
            toggleLink.textContent = 'dark?'; // Light Mode ist aktiv -> Frage: willst du dark?
        }
    }

    // 1. Beim Laden: Prüfe, ob eine Präferenz gespeichert wurde (oder verwende System-Standard)
    const savedMode = localStorage.getItem(modeKey);

    if (savedMode) {
        setMode(savedMode);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Wenn System-Präferenz Dark ist, starte Dark (kann übersprungen werden, falls nicht gewünscht)
        setMode('dark');
    } else {
        // Standardmäßig Light Mode setzen
        setMode('light');
    }

    // 2. Beim Klicken: Modus umschalten und speichern
    toggleLink.addEventListener('click', (e) => {
        // Standard-Link-Verhalten (Seitenneuladen) verhindern
        e.preventDefault(); 
        
        const currentMode = body.classList.contains('dark-mode') ? 'dark' : 'light';
        let newMode;

        if (currentMode === 'dark') {
            newMode = 'light';
        } else {
            newMode = 'dark';
        }

        setMode(newMode);
        localStorage.setItem(modeKey, newMode); // Speichern für den nächsten Besuch
    });
});