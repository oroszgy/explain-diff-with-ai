const got = require('got');
const core = require('@actions/core');

async function run() {
    try {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.INPUT_APIKEY}`,
            },
            json: {
                model: String(process.env.INPUT_MODEL),
                messages: [{"role": "user", "content": `${process.env.INPUT_PROMPT}:\n${process.env.INPUT_DIFF}`}],
                max_tokens: parseInt(process.env.INPUT_MAXTOKENS),
                temperature: parseFloat(process.env.INPUT_TEMPERATURE),
            },
            responseType: 'json'
        }
        const url = process.env.INPUT_BASEURL

        // Debug
        core.debug(url)
        core.debug(options.toString())

        const response = await got.post(url, options);

        const explanation = response.body.choices[0].message.content;
        core.info('Explanation:\n' + explanation);
        core.setOutput("explanation", explanation)

    } catch (error) {
        if (error.response) {
            core.error('Error Response: ' + error.response.statusCode);
            core.error('Error Details: ' + error.response.body);
            core.setFailed(error.response.body)
        } else {
            core.error('Request failed:\n' + error);
            core.setFailed(error.message)
        }
    }
}

run().then(() => console.log("Finished"));
