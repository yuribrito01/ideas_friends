const sheetId = '1mNdPlhoHrHWM-SPm3DUFhz3wvP4qGNZrPxp4EHosWg4'; // Substitua pelo ID da sua planilha
const apiKey = 'AIzaSyBz7r9j2TOeexDSMZbrrE7eCQEgYmmpRd0';
const range = 'ideias_roles!B:C'; // Ajuste para o intervalo desejado

async function buscarIdeia(valorSelecionado) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.values) {
            // Filtra as ideias com base no valor selecionado
            const ideiasFiltradas = data.values.filter(row => row[1] === valorSelecionado);
            if (ideiasFiltradas.length > 0) {
                const ideiaAleatoria = ideiasFiltradas[Math.floor(Math.random() * ideiasFiltradas.length)];
                return ideiaAleatoria[0]; // Retorna apenas a ideia
            } else {
                return 'Nenhuma ideia encontrada para este valor.';
            }
        } else {
            return 'Erro ao buscar dados da planilha.';
        }
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return 'Erro ao conectar com a API.';
    }
}

document.getElementById('buscar').addEventListener('click', async () => {
    const valorSelecionado = document.getElementById('valor').value;
    document.getElementById('resultado').textContent = 'Buscando ideia... 🎲';
    const ideia = await buscarIdeia(valorSelecionado);
    document.getElementById('resultado').textContent = `✨ ${ideia}`;
});
