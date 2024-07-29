// Inicializa o array para armazenar atividades
var activities = [];

// Obtém o número total de atividades a partir do DOM e calcula o número de páginas
var totalActivites = document.querySelector("body > div.page.container > form > div.h3.results-summary > div").textContent.replace('.', '').split(' ')[0];
var totalPages = Math.floor(totalActivites / 20 + 1);
var currentPage = 1;
var done = 0;

// Função para converter um array de objetos para CSV
function convertToCSV(arr) {
    const array = [Object.keys(arr[0])].concat(arr);
    return array.map(it => {
        return Object.values(it).toString();
    }).join('\n');
}

// Loop para percorrer todas as páginas e coletar atividades
while (currentPage <= totalPages) {
    jQuery.ajax({
        url: `https://www.strava.com/athlete/training_activities?page=${currentPage}&per_page=20`,
        dataType: "json",
        method: "get",
        success: function (data) {
            // Adiciona cada atividade ao array de atividades
            for (var activity in data.models) {
                activities.push(data.models[activity]);
            }
            done++;
            console.log(Math.round(done * 100 / totalPages) + '%');

            // Exibe no console cada cabeçalho e seu valor correspondente para cada atividade
            activities.forEach((activity, index) => {
                console.log(`Atividade ${index + 1}:`);
                Object.entries(activity).forEach(([key, value]) => {
                    console.log(`  ${key}: ${value}`);
                });
            });

            // Se todas as páginas foram processadas
            if (done >= totalPages) {
                console.log('\nDONE!!!');
                console.log("\nIf download didn't start, check browser window to enable permission");

                // Verifica se existem atividades coletadas
                if (activities.length > 0) {
                    // Obtém os cabeçalhos e garante que cada atividade tenha valores correspondentes
                    let headers = Object.keys(activities[0]);
                    let header = headers.join(',');
                    let values = activities.map(activity => {
                        // Substitui a vírgula por ponto no campo start_date
                        if (activity['start_date']) {
                            activity['start_date'] = activity['start_date'].replace(',', '.');
                        }
                        // Substitui a vírgula por ponto no campo distance
                        if (activity['distance']) {
                            activity['distance'] = activity['distance'].replace(',', '.');
                        }
                        // Substitui a vírgula por ponto no campo description
                        if (activity['description']) {
                            activity['description'] = activity['description'].replace(',', '.');
                        }
                        // Substitui a vírgula por ponto no campo name
                        if (activity['name']) {
                            activity['name'] = activity['name'].replace(',', '.');
                        }
                        // Substitui a vírgula por ponto no campo twitter_msg
                        if (activity['twitter_msg']) {
                            activity['twitter_msg'] = activity['twitter_msg'].replace(',', '.');
                        }
                        return headers.map(header => activity[header] || '').join(',');
                    }).join('\n');

                    // Gera o CSV e inicia o download
                    let csv = header + '\n' + values;
                    var hiddenElement = document.createElement('a');
                    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
                    hiddenElement.target = '_blank';
                    hiddenElement.download = 'activities.csv';
                    hiddenElement.click();
                }
            }
        }
    });
    currentPage++;
}
