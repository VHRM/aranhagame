(() => {
    const alternativaButton = document.getElementsByClassName('alternativa');
    const aranha = document.getElementById('aranha');
    const borboleta = document.getElementById('borboleta');
    const carrapato = document.getElementById('carrapato');
    const grilo = document.getElementById('grilo');
    const libelula = document.getElementById('libelula');
    const mariposa = document.getElementById('mariposa');
    const mosca = document.getElementById('mosca');

    let isWaiting = false;
    let fase = 0;

    const posicao = {
        "x": {
            'a': [50, 49, 49],
            'b': [60, 71, 85],
            'c': [60, 71, 86],
            'd': [50, 51, 51],
            'e': [40, 29, 15],
            'f': [40, 29, 14],
        }, 
        "y": {
            'a': [37, 24, 8],
            'b': [43, 36, 27],
            'c': [54, 60, 68],
            'd': [60, 73, 89],
            'e': [54, 62, 70],
            'f': [43, 37, 29],
        }
    }

    const animalAlternativa = {
        'a': 'mariposa',
        'b': 'carrapato',
        'c': 'mosca',
        'd': 'borboleta',
        'e': 'grilo',
        'f': 'libelula',
    }

    Swal.showLoading();
    for (let index = 0; index < 6; index++) {
        const element = alternativaButton[index];
        element.addEventListener('click', (event) => {
            if(!isWaiting) {
                isWaiting = true;
                moverAranha(event.target.nodeName === "SPAN" ? event.target.parentElement.id : event.target.id);
            }
        });
        element.addEventListener('mousedown', () => {
            element.classList.add('active');
        });
        element.addEventListener('mouseup', () => {
            element.classList.remove('active');
        })
    }
    Swal.close();

    function moverAranha(alternativa) {
        mover(aranha, posicao['x'][alternativa][fase], posicao['y'][alternativa][fase]);
        setTimeout(()=>{
            requestAnimationFrame(() => {
                document.getElementById(animalAlternativa[alternativa]).style.display = 'none';
            });
            Swal.fire({
                title: 'Respondida!',
                text: `Você respondeu a pergunta ${fase + 1} com a opção ${alternativa.toUpperCase()}`,
                confirmButtonText: 'Proxima pergunta',
                allowOutsideClick: false,
            }).then(() => {
                isWaiting = false;
                fase++;
                if (fase < 3) {
                    plotarMapa();
                } else {
                    Swal.fire({
                        title: 'Parabens!',
                        text: 'Você respondeu todas as perguntas',
                        icon: 'success',
                        showConfirmButton: false,
                        allowOutsideClick: false,
                    })
                }
            });
        }, 1000);
    }

    function mover(animal, posicaoX, posicaoY) {
        animal.style.left = posicaoX + '%';
        animal.style.top = posicaoY + '%';
    }

    function plotarMapa() {
        document.getElementById('mapa').src = `./src/img/${fase+1}.png`;
        borboleta.style.display = 'block';
        carrapato.style.display = 'block';
        grilo.style.display = 'block';
        libelula.style.display = 'block';
        mariposa.style.display = 'block';
        mosca.style.display = 'block';
        mover(aranha, 50, 50);
        mover(mariposa, posicao['x']['a'][fase], posicao['y']['a'][fase]);
        mover(carrapato, posicao['x']['b'][fase], posicao['y']['b'][fase]);
        mover(mosca, posicao['x']['c'][fase], posicao['y']['c'][fase]);
        mover(borboleta, posicao['x']['d'][fase], posicao['y']['d'][fase]);
        mover(grilo, posicao['x']['e'][fase], posicao['y']['e'][fase]);
        mover(libelula, posicao['x']['f'][fase], posicao['y']['f'][fase]);
    }

})();