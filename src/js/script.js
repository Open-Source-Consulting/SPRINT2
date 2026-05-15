document.addEventListener('DOMContentLoaded', () => {
    const isIndex = window.location.pathname.endsWith('index.html') || !window.location.pathname.includes('.html');
    if (isIndex) {
        const permite = prompt("Você permite que a câmera tenha acesso à galeria do dispositivo?");
        if (permite && permite.toLowerCase() === 'sim') {
            alert("Ok, agora pode realizar as suas capturas");
        } else {
            alert("você não poderá realizar capturas");
        }
    }

    const app = document.getElementById('camera-app');
    const modeItems = document.querySelectorAll('.mode-item');
    const shutterBtn = document.querySelector('.shutter-btn');
    const flipBtn = document.querySelector('.flip-btn');
    const cameraView = document.getElementById('camera-view');
    const galleryBtn = document.querySelector('.gallery-btn');

    if (galleryBtn) {
        galleryBtn.addEventListener('click', () => {
            const permiteGaleria = prompt("Você permite que o app tenha acesso a galeria do dispositivo?");
            if (permiteGaleria && permiteGaleria.toLowerCase() === 'sim') {
                alert("ok, agora pode acessar as suas imagens e videos");
            } else {
                alert("você não poderá acessar suas imagens e videos.");
            }
        });
    }

    let isFrontCamera = false;

    // Gerencia troca de modos
    modeItems.forEach(item => {
        item.addEventListener('click', () => {
            const modeText = item.textContent.trim().toUpperCase();

            // Tratamento especial para "MAIS"
            if (modeText === 'MAIS' || modeText === 'MORE') {
                app.classList.add('mode-transitioning');
                setTimeout(() => {
                    window.location.href = 'more.html';
                }, 400);
                return;
            }

            // Remove o estado ativo de todos
            modeItems.forEach(i => i.classList.remove('active'));

            // Define o estado ativo
            item.classList.add('active');

            // Dispara efeito de transição
            app.classList.add('mode-transitioning');
            setTimeout(() => {
                app.classList.remove('mode-transitioning');
            }, 500);

            // Centraliza o item na tela
            item.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        });
    });

    // Gerencia troca de câmera
    if (flipBtn) {
        flipBtn.addEventListener('click', () => {
            isFrontCamera = !isFrontCamera;

            // Adiciona efeito de transição
            app.classList.add('mode-transitioning');

            setTimeout(() => {
                // Altera a imagem da câmera
                if (cameraView) {
                    cameraView.src = isFrontCamera ? 'src/assets/imagem2.png' : 'src/assets/imagem1.png';
                    cameraView.style.transform = isFrontCamera ? 'scaleX(-1)' : 'scaleX(1)';
                }
            }, 250);

            setTimeout(() => {
                app.classList.remove('mode-transitioning');
            }, 500);
        });
    }

    // Centraliza o modo ativo ao carregar a página
    const activeMode = document.querySelector('.mode-item.active');
    if (activeMode) {
        activeMode.scrollIntoView({ inline: 'center' });
    }

    // Animação simples do botão de captura
    if (shutterBtn) {
        shutterBtn.addEventListener('click', () => {
            // Efeito de flash
            const flash = document.createElement('div');
            flash.style.position = 'absolute';
            flash.style.inset = '0';
            flash.style.backgroundColor = 'white';
            flash.style.zIndex = '100';
            flash.style.opacity = '0';
            flash.style.transition = 'opacity 0.1s ease-out';

            app.appendChild(flash);

            requestAnimationFrame(() => {
                flash.style.opacity = '0.8';
                setTimeout(() => {
                    flash.style.opacity = '0';
                    setTimeout(() => flash.remove(), 100);
                }, 50);
            });
        });
    }

    // ========================
    // Overlay do Chat IA
    // ========================
    const aiBtn = document.querySelector('.ai-btn');
    const aiOverlay = document.getElementById('ai-overlay');
    const aiCloseBtn = document.getElementById('ai-close');
    const aiInput = document.getElementById('ai-input');
    const aiSendBtn = document.getElementById('ai-send');
    const aiMessages = document.getElementById('ai-messages');

    // Respostas simuladas do bot
    const botResponses = [
        'Posso ajudar a melhorar a iluminação da sua foto!',
        'Tente usar o modo retrato para fotos com fundo desfocado.',
        'O modo noite funciona melhor com o celular estabilizado.',
        'Use o HDR para capturar mais detalhes nas sombras.',
        'Quer que eu sugira o melhor modo para esta cena?',
        'A resolução 4K é ideal para fotos com muitos detalhes.',
        'Para panoramas, mova o celular lentamente da esquerda para a direita.',
        'O modo Astro precisa de pelo menos 15 segundos de exposição.',
    ];

    function openAiOverlay() {
        if (aiOverlay) {
            aiOverlay.classList.add('ai-overlay-visible');
        }
    }

    function closeAiOverlay() {
        if (aiOverlay) {
            aiOverlay.classList.remove('ai-overlay-visible');
        }
    }

    function addMessage(text, isUser) {
        if (!aiMessages) return;

        const msg = document.createElement('div');
        msg.className = `ai-msg ${isUser ? 'ai-msg-user' : 'ai-msg-bot'}`;
        msg.innerHTML = `
            <div class="ai-avatar">${isUser ? 'EU' : 'AI'}</div>
            <div class="ai-bubble">${text}</div>
        `;
        aiMessages.appendChild(msg);
        aiMessages.scrollTop = aiMessages.scrollHeight;
    }

    function sendMessage() {
        if (!aiInput) return;

        const text = aiInput.value.trim();
        if (!text) return;

        // Adiciona mensagem do usuário
        addMessage(text, true);
        aiInput.value = '';

        // Simula resposta do bot após um atraso
        setTimeout(() => {
            const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
            addMessage(randomResponse, false);
        }, 800 + Math.random() * 700);
    }

    // Listeners de eventos do chat IA
    if (aiBtn) {
        aiBtn.addEventListener('click', openAiOverlay);
    }

    if (aiCloseBtn) {
        aiCloseBtn.addEventListener('click', closeAiOverlay);
    }

    if (aiSendBtn) {
        aiSendBtn.addEventListener('click', sendMessage);
    }

    if (aiInput) {
        aiInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
        });
    }
});
