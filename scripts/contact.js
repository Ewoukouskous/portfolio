(function(){
    const SERVICE_ID = 'service_iwrv2t2';
    const TEMPLATE_ID = 'template_ow873dt';
    const PUBLIC_KEY = 'ZvB8V2GZaZXkmzBtM';

    if (window.emailjs) {
        try { emailjs.init(PUBLIC_KEY); } catch(e){}
    }

    const form = document.getElementById('contact-form');
    const statusEl = document.getElementById('contact-status');
    const submitBtn = form.querySelector('button[type="submit"]');

    function showStatus(message, ok = true) {
        statusEl.classList.remove('hidden');
        statusEl.textContent = message;
        if (ok) {
            statusEl.classList.remove('bg-red-600','text-red-50');
            statusEl.classList.add('bg-lavender-purple/20','text-thistle');
        } else {
            statusEl.classList.remove('bg-lavender-purple/20','text-thistle');
            statusEl.classList.add('bg-red-600','text-red-50');
        }
    }

    function hideStatus(){ statusEl.classList.add('hidden'); }

    if (form) {
        form.addEventListener('submit', function(e){
            e.preventDefault();
            hideStatus();

            const name = form.querySelector('#name');
            const email = form.querySelector('#email');
            const message = form.querySelector('#message');

            if (!name.value.trim() || !email.value.trim() || !message.value.trim()){
                showStatus('Merci de remplir au moins le nom, l\'email et le message.', false);
                return;
            }

            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-60','cursor-not-allowed');

            if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY || SERVICE_ID === 'YOUR_SERVICE_ID'){
                showStatus('Intégration EmailJS configurée mais les identifiants ne sont pas définis.', false);
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-60','cursor-not-allowed');
                return;
            }

            emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, '#contact-form')
                .then(function(){
                    showStatus('Message envoyé — merci !', true);
                    form.reset();
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('opacity-60','cursor-not-allowed');
                }, function(error){
                    console.error('EmailJS error', error);
                    showStatus('Erreur lors de l\'envoi. Réessayez plus tard.', false);
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('opacity-60','cursor-not-allowed');
                });
        });
    }
})();
