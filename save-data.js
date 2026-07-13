// save-data.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const data = req.body;

        const getRes = await fetch('https://api.github.com/repos/maqsoodhassansolangi-ai/Bijli-bill/contents/data.json', {
            headers: {
                'Authorization': 'token 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'
            }
        });
        const getData = await getRes.json();
        const sha = getData.sha;

        const content = btoa(JSON.stringify(data, null, 2));
        const putRes = await fetch('https://api.github.com/repos/maqsoodhassansolangi-ai/Bijli-bill/contents/data.json', {
            method: 'PUT',
            headers: {
                'Authorization': 'token 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',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Update data via admin panel',
                content: content,
                sha: sha
            })
        });

        if (!putRes.ok) {
            const err = await putRes.text();
            return res.status(putRes.status).json({ error: err });
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
