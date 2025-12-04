// Système de traductions multilingue (FR/EN)
const translations = {
    fr: {
        // Hero Section
        "hero.title": "Étudiant en cybersécurité à Toulouse Ynov Campus",
        "hero.subtitle": "Passionné par la cybersécurité et l'analyse de malware | Joueur de CTF",

        // CV Section
        "cv.intro": "Vous souhaitez en apprendre plus sur moi ?",
        "cv.skills.title": "$ whoami --skills",
        "cv.skills.pentest": "Résolution de challenge type CTF",
        "cv.skills.exploit": "Rédaction de rapports, write up",
        "cv.skills.reverse": "Hardening sur machines Linux",
        "cv.skills.script": "Scripting",
        "cv.skills.crypto": "Web",
        "cv.skills.osint": "OSINT",
        "cv.skills.forensics": "Élévation de privilège",
        "cv.tools.title": "$ ls /usr/bin/ | grep -i tools",
        "cv.download": "[ wget cv.pdf ]",
        "cv.contact.status": "status:",
        "cv.contact.value": "open_to_opportunities",
        "cv.contact.text": "N'hésitez pas à me contacter pour discuter de vos opportunités de stage ou alternance en cybersécurité",
        "cv.contact.button": "$ ./contact.sh →",

        // CTF Section
        "ctf.title": "$ ls -la ./ctf_challenges/",
        "ctf.subtitle": "Mes participations et résolutions de challenges CTF",
        "ctf.card1.title": "Nom du CTF",
        "ctf.card1.desc": "Challenge d'exploitation web avancé impliquant SQLi et bypass de WAF",
        "ctf.card1.time": "Résolu en 2h30 - Points: 500",
        "ctf.card2.title": "Nom du CTF",
        "ctf.card2.desc": "Reverse engineering d'un binaire ELF avec techniques d'anti-debugging",
        "ctf.card2.time": "Résolu en 4h15 - Points: 750",
        "ctf.card3.title": "Nom du CTF",
        "ctf.card3.desc": "Analyse forensics d'un dump mémoire avec extraction de données cachées",
        "ctf.card3.time": "Résolu en 3h00 - Points: 600",

        // Projects Section
        "projects.title": "$ ls -la ./academic_projects/",
        "projects.subtitle": "Projets réalisés dans le cadre de ma formation",
        "projects.card1.title": "Nom du Projet",
        "projects.card1.desc": "Application web sécurisée avec authentification JWT et protection CSRF",
        "projects.card1.time": "Réalisé en équipe de 4 - Durée: 3 mois",
        "projects.card2.title": "Nom du Projet",
        "projects.card2.desc": "Infrastructure réseau sécurisée avec VPN, firewall et IDS/IPS",
        "projects.card2.time": "Projet individuel - Durée: 6 semaines",
        "projects.card3.title": "Nom du Projet",
        "projects.card3.desc": "Pipeline CI/CD sécurisé avec analyse de vulnérabilités automatisée",
        "projects.card3.time": "En binôme - Durée: 2 mois",

        // Personal Projects Section
        "personal.title": "$ ls -la ./personal_projects/",
        "personal.subtitle": "Mes projets personnels et contributions open-source",
        "personal.card1.title": "Nom du Projet",
        "personal.card1.desc": "Scanner de vulnérabilités automatisé avec reporting détaillé et suggestions de correction",
        "personal.card1.stats": "⭐ 45 stars - 12 forks - Actif",
        "personal.card2.title": "Nom du Projet",
        "personal.card2.desc": "Extension de navigateur pour l'analyse de sécurité en temps réel des sites web",
        "personal.card2.stats": "⭐ 89 stars - 23 forks - 500+ utilisateurs",
        "personal.card3.title": "Nom du Projet",
        "personal.card3.desc": "Dashboard de monitoring pour la sécurité réseau avec alertes en temps réel",
        "personal.card3.stats": "⭐ 34 stars - 8 forks - Maintenance active",

        // Contact Section
        "contact.title": "$ vim contact.msg",
        "contact.subtitle": "Envoyez-moi un message",
        "contact.form.name.placeholder": "votre_nom",
        "contact.form.email.placeholder": "votre@email.com",
        "contact.form.subject.placeholder": "Sujet de votre message",
        "contact.form.message.label": "Message",
        "contact.form.message.placeholder": "Votre message...",
        "contact.form.send": "Envoyer le message",

        // Footer
        "footer.navigation": "$ ls navigation/",
        "footer.links": "$ ls links/",
        "footer.contact": "$ cat contact.info",
        "footer.email": "email: contact@exemple.com",
        "footer.location": "location: france",
        "footer.copyright": '$ echo "© 2024 Portfolio. Tous droits réservés."',
    },
    en: {
        // Hero Section
        "hero.title": "Cybersecurity student at Toulouse Ynov Campus",
        "hero.subtitle": "Passionate about cybersecurity and malware analysis | CTF Player",

        // CV Section
        "cv.intro": "Want to learn more about me?",
        "cv.skills.title": "$ whoami --skills",
        "cv.skills.pentest": "CTF-style challenge solving",
        "cv.skills.exploit": "Report writing / write-ups",
        "cv.skills.reverse": "Linux hardening",
        "cv.skills.script": "Scripting",
        "cv.skills.crypto": "Web",
        "cv.skills.osint": "OSINT",
        "cv.skills.forensics": "Privilege escalation",
        "cv.tools.title": "$ ls /usr/bin/ | grep -i tools",
        "cv.download": "[ wget cv.pdf ]",
        "cv.contact.status": "status:",
        "cv.contact.value": "open_to_opportunities",
        "cv.contact.text": "Feel free to contact me to discuss your internship or work-study opportunities in cybersecurity",
        "cv.contact.button": "$ ./contact.sh →",

        // CTF Section
        "ctf.title": "$ ls -la ./ctf_challenges/",
        "ctf.subtitle": "My CTF challenge participations and resolutions",
        "ctf.card1.title": "CTF Name",
        "ctf.card1.desc": "Advanced web exploitation challenge involving SQLi and WAF bypass",
        "ctf.card1.time": "Solved in 2h30 - Points: 500",
        "ctf.card2.title": "CTF Name",
        "ctf.card2.desc": "ELF binary reverse engineering with anti-debugging techniques",
        "ctf.card2.time": "Solved in 4h15 - Points: 750",
        "ctf.card3.title": "CTF Name",
        "ctf.card3.desc": "Memory dump forensics analysis with hidden data extraction",
        "ctf.card3.time": "Solved in 3h00 - Points: 600",

        // Projects Section
        "projects.title": "$ ls -la ./academic_projects/",
        "projects.subtitle": "Projects completed during my education",
        "projects.card1.title": "Project Name",
        "projects.card1.desc": "Secure web application with JWT authentication and CSRF protection",
        "projects.card1.time": "Team of 4 - Duration: 3 months",
        "projects.card2.title": "Project Name",
        "projects.card2.desc": "Secure network infrastructure with VPN, firewall and IDS/IPS",
        "projects.card2.time": "Individual project - Duration: 6 weeks",
        "projects.card3.title": "Project Name",
        "projects.card3.desc": "Secure CI/CD pipeline with automated vulnerability analysis",
        "projects.card3.time": "Pair project - Duration: 2 months",

        // Personal Projects Section
        "personal.title": "$ ls -la ./personal_projects/",
        "personal.subtitle": "My personal projects and open-source contributions",
        "personal.card1.title": "Project Name",
        "personal.card1.desc": "Automated vulnerability scanner with detailed reporting and fix suggestions",
        "personal.card1.stats": "⭐ 45 stars - 12 forks - Active",
        "personal.card2.title": "Project Name",
        "personal.card2.desc": "Browser extension for real-time security analysis of websites",
        "personal.card2.stats": "⭐ 89 stars - 23 forks - 500+ users",
        "personal.card3.title": "Project Name",
        "personal.card3.desc": "Network security monitoring dashboard with real-time alerts",
        "personal.card3.stats": "⭐ 34 stars - 8 forks - Active maintenance",

        // Contact Section
        "contact.title": "$ vim contact.msg",
        "contact.subtitle": "Send me a message",
        "contact.form.name.placeholder": "your_name",
        "contact.form.email.placeholder": "your@email.com",
        "contact.form.subject.placeholder": "Subject of your message",
        "contact.form.message.label": "Message",
        "contact.form.message.placeholder": "Your message...",
        "contact.form.send": "Send message",

        // Footer
        "footer.navigation": "$ ls navigation/",
        "footer.links": "$ ls links/",
        "footer.contact": "$ cat contact.info",
        "footer.email": "email: contact@example.com",
        "footer.location": "location: france",
        "footer.copyright": '$ echo "© 2024 Portfolio. All rights reserved."',
    }
};

// Gestion de la langue
let currentLang = localStorage.getItem('language') || 'fr';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);

    // Mettre à jour tous les éléments avec data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Mettre à jour tous les placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });

    // Mettre à jour le bouton de langue (affiche la langue ACTUELLE)
    const langIcon = document.getElementById('lang-icon');
    if (langIcon) {
        // Si on est en FR, le bouton affiche FR (langue actuelle)
        // Si on est en EN, le bouton affiche EN (langue actuelle)
        langIcon.textContent = lang === 'fr' ? '🇫🇷 FR' : '🇬🇧 EN';
    }

    // Ajouter une classe pour les animations
    document.body.classList.add('lang-switching');
    setTimeout(() => {
        document.body.classList.remove('lang-switching');
    }, 300);
}

// Initialiser la langue au chargement
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);

    // Gérer le clic sur le bouton de langue
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const newLang = currentLang === 'fr' ? 'en' : 'fr';
            setLanguage(newLang);
        });
    }
});
