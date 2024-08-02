let tagify;
let settingsModal;

document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('idInput');
    tagify = new Tagify(input, {
        delimiters: ",| ",
        pattern: /.+/,
        maxTags: Infinity,
        placeholder: "Type IDs and press Enter"
    });

    settingsModal = new bootstrap.Modal(document.getElementById('settingsModal'));

    // Load saved values from localStorage
    document.getElementById('csrfInput').value = localStorage.getItem('csrfToken') || '';
    document.getElementById('cookiesInput').value = localStorage.getItem('cookies') || '';
});

function openModal() {
    settingsModal.show();
}

function saveSettings() {
    const csrfToken = document.getElementById('csrfInput').value;
    const cookies = document.getElementById('cookiesInput').value;

    // Save to localStorage
    localStorage.setItem('csrfToken', csrfToken);
    localStorage.setItem('cookies', cookies);

    settingsModal.hide();
}

async function getData() {
    const ids = tagify.value.map(tag => tag.value);
    const csrfToken = localStorage.getItem('csrfToken') || '';
    const cookies = localStorage.getItem('cookies') || '';

    try {
        const response = await fetch('/getData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ids, csrfToken, cookies }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`${errorData.error}: ${errorData.details}`);
        }

        const data = await response.json();
        displayTable(data);
    } catch (error) {
        console.error('Error:', error);
        alert(`An error occurred: ${error.message}`);
    }
}

function displayTable(data) {
    let tableHtml = `
        <h2>Results</h2>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>PU</th>
                    <th>Origin</th>
                    <th>DEL</th>
                    <th>Destination</th>
                    <th>Price</th>
                    <th>Mile</th>
                    <th>Drivers</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach(trip => {
        let badge = ''
        
        switch (trip.status) {
            case 'COMPLETED':
                badge = 'badge bg-success'; break;
            case 'REJECTED':
                badge = 'badge bg-danger'; break;
            case 'CANCELLED':
                badge = 'badge bg-warning'; break;
            case 'IN_TRANSIT':
                badge = 'badge bg-primary'; break;
            default:
                badge = 'badge bg-info'; break;
        }


        tableHtml += `
            <tr>
                <td>${trip.id}</td>
                <td>${trip.PU_date}</td>
                <td>${trip.PU_addr}</td>
                <td>${trip.DEL_date}</td>
                <td>${trip.DEL_addr}</td>
                <td>${trip.price}</td>
                <td>${trip.mile}</td>
                <td>${trip.drivers}</td>
                <td><span class='${badge}'>${trip.status}</span></td>
            </tr>
        `;
    });

    tableHtml += '</tbody></table>';

    document.getElementById('tableContainer').innerHTML = tableHtml;
}