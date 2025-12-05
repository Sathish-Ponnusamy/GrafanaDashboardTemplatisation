document.getElementById('datasourceForm').addEventListener('submit', async function(e) {

    e.preventDefault();



    const messageDiv = document.getElementById('message');

    const datasourceName = document.getElementById('name').value;

    const datasourceUrl = document.getElementById('url').value;



    // Show loading state

    messageDiv.textContent = 'Creating datasource...';

    messageDiv.className = '';



    const payload = {

        name: datasourceName,

        type: "graphite",

        url: datasourceUrl,

        access: "proxy",

        basicAuth: false

    };



    try {

        // Using our proxy server endpoint

        const response = await fetch('/api/datasources', {

            method: 'POST',

            headers: {

                'Content-Type': 'application/json',

                'Accept': 'application/json'

            },

            body: JSON.stringify(payload)

        });



        if (!response.ok) {

            const errorData = await response.text();

            throw new Error(`Grafana API Error (${response.status}): ${errorData || response.statusText}`);

        }



        const data = await response.json();

        messageDiv.textContent = 'Datasource created successfully!';

        messageDiv.className = 'success';

        document.getElementById('datasourceForm').reset();

    } catch (error) {

        console.error('Error details:', error);

        messageDiv.textContent = `Error: ${error.message}`;

        messageDiv.className = 'error';

    }

});