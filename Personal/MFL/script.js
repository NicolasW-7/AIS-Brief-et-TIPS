document.addEventListener('DOMContentLoaded', (event) => {
    const initialValues = [
        [1800, 2500, 4500, 9000, 17000, 38000, 83000, 210000],
        [1400, 1900, 3600, 7000, 13500, 30000, 65000, 160000],
        [1100, 1500, 2900, 5500, 11000, 23000, 53000, 130000],
        [900, 1200, 2300, 4400, 8500, 18500, 43000, 110000],
        [750, 1000, 1900, 3600, 7000, 15500, 35000, 85000],
        [600, 850, 1600, 3000, 6000, 13000, 28000, 73000],
        [500, 750, 1400, 2500, 5000, 11000, 24500, 60000],
        [450, 650, 1200, 2300, 4400, 9500, 21500, 53000],
        [400, 650, 1000, 2000, 3900, 8500, 19000, 48000],
        [350, 550, 950, 1800, 3500, 7500, 17000, 43000],
        [300, 450, 850, 1600, 3300, 7000, 15500, 40000],
        [300, 430, 800, 1500, 3000, 6500, 14500, 38000]
    ];

    const valuesTable = document.getElementById('valuesTable').getElementsByTagName('tbody')[0];
    const percentageTable = document.getElementById('percentageTable').getElementsByTagName('tbody')[0];

    function fillTable(table, data) {
        table.innerHTML = '';
        data.forEach((row, rowIndex) => {
            const tr = document.createElement('tr');
            const th = document.createElement('th');
            th.innerText = rowIndex + 1;
            tr.appendChild(th);
            row.forEach(value => {
                const td = document.createElement('td');
                td.innerText = value;
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });
    }

    fillTable(valuesTable, initialValues);

    window.calculatePercentages = function () {
        const percentage = parseFloat(document.getElementById('percentageInput').value) || 0;
        const percentages = initialValues.map(row => row.map(value => (value * percentage) / 100));

        fillTable(percentageTable, percentages);
    }
});
