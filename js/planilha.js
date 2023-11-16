
// Em seguida, use a biblioteca para ler e manipular a planilha
var workbook = XLSX.read(data, { type: 'binary' });

// Acesse a primeira planilha
var first_sheet_name = workbook.SheetNames[0];
var worksheet = workbook.Sheets[first_sheet_name];

// Faça alterações na planilha
// Por exemplo, altere o valor da célula A1 para "Hello, World!"
worksheet['A1'].v = "Hello, World!";

// Escreva a planilha de volta para um arquivo
var wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), 'test.xlsx');