const btnIniciar = document.querySelector('button');
const somAlarme = document.querySelector('audio');
somAlarme.src = 'alarm_clock.mp3';

btnIniciar.addEventListener('click', function() {
    this.style.display = 'none'; 
    iniciarRelogio();
    tocarAlarme(); 
    setTimeout(tocarAlarme, 45 * 60 * 1000);
});

    function tocarAlarme() {
    somAlarme.play();
}

function iniciarRelogio() {
    const ponteiroHora = document.querySelector('.ponteiro-hora');
    const ponteiroMinuto = document.querySelector('.ponteiro-minuto');
    const ponteiroSegundo = document.querySelector('.ponteiro-segundo');
    const relogio = document.querySelector('.relogio');

    let horasAtual = 12; 
    let minutosAtual = 0; 
    let segundosAtual = 0; 

    setInterval(atualizarRelogio, 1000);
            
    function atualizarRelogio() {
        segundosAtual++;
        if (segundosAtual === 60) {
            segundosAtual = 0;
            minutosAtual++;
            if (minutosAtual === 60) {
                minutosAtual = 0;
                horasAtual++;
                if (horasAtual === 13) {
                    horasAtual = 1;
                }
            }
        }
        atualizarPosicaoPonteiros();
    }

    function atualizarPosicaoPonteiros() {
        const grausSegundos = (segundosAtual / 60) * 360;
        const grausMinutos = (minutosAtual / 60) * 360 + (segundosAtual / 60) * 6;
        const grausHoras = (horasAtual / 12) * 360 + (minutosAtual / 60) * 30;
                
        ponteiroSegundo.style.transform = `translateX(-50%) rotate(${grausSegundos}deg)`;
        ponteiroMinuto.style.transform = `translateX(-50%) rotate(${grausMinutos}deg)`;
        ponteiroHora.style.transform = `translateX(-50%) rotate(${grausHoras}deg)`;
                
        atualizarCorFundoRelogio(grausMinutos);
    }

    function atualizarCorFundoRelogio(grausMinutos) {
        const minutosPassados = (grausMinutos / 360) * 60; 
                
        if (minutosPassados < 15) {
            const grausVermelho = (minutosPassados / 15) * 90;
            relogio.style.background = `conic-gradient(#d32f2f 0deg, #d32f2f ${grausVermelho}deg, #fafafa ${grausVermelho}deg, #fafafa 90deg)`;
        } else if (minutosPassados < 45) {
            const grausAzul = ((minutosPassados - 15) / 30) * 90 + 90;
            relogio.style.background = `conic-gradient(#d32f2f 0deg, #d32f2f 90deg, #1976d2 90deg, #1976d2 ${grausAzul}deg, #fafafa ${grausAzul}deg, #fafafa 180deg)`;
        } else {
            const grausVerde = ((minutosPassados - 45) / 15) * 90 + 180;
            relogio.style.background = `conic-gradient(#d32f2f 0deg, #d32f2f 90deg, #1976d2 90deg, #1976d2 180deg, #388e3c 180deg, #388e3c ${grausVerde}deg, #fafafa ${grausVerde}deg, #fafafa 360deg)`;
        }
    }    
}