const botaoF = document.getElementById('botaoF');
const botaoR = document.getElementById('botaoR');


function contar() {
    const inserir = document.getElementById('inserir').value;
    const resultado = document.getElementById('resultado');

    if (inserir !== '') {
        const contarCaractere = inserir.length;
        resultado.textContent = `O texto digitado tem ${contarCaractere} caracteres`;
    } else {
        resultado.textContent = 'Preencha o campo!';
    }
}

function resetar() {
    const inserir = document.getElementById('inserir').value;
    const resultado = document.getElementById('resultado');
    document.getElementById('inserir').value = ''; 
    document.getElementById('resultado').textContent = ''; 
}

botaoF.addEventListener('click', contar);
botaoR.addEventListener('click', resetar);
