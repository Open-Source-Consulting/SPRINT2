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
