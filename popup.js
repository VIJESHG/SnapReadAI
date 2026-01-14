document.getElementById('summarizeBtn').addEventListener('click', async () => {
    const statusDiv = document.getElementById('status');
    const summaryDiv = document.getElementById('summary');
    
    // Get user input (default to 3)
    const pointCount = document.getElementById('pointCount').value || 3;

    statusDiv.textContent = "🔄 Authorizing...";
    
    chrome.identity.getAuthToken({ interactive: true }, async function(token) {
        if (chrome.runtime.lastError || !token) {
            statusDiv.textContent = "❌ Login failed.";
            return;
        }

        statusDiv.textContent = "📄 Reading page...";

        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: getPageText,
        }, async (results) => {
            if (!results || !results[0]) {
                statusDiv.textContent = "❌ Could not read page.";
                return;
            }
            
            const pageText = results[0].result;
            statusDiv.textContent = "🤖 Thinking...";

            try {
                const summary = await callGeminiWithToken(pageText, token, pointCount);
                statusDiv.textContent = "✅ Done!";
                summaryDiv.style.display = 'block';
                
                // NEW: Use our helper function to format the list properly
                summaryDiv.innerHTML = formatToHTML(summary);
                
            } catch (error) {
                statusDiv.textContent = "Error: " + error.message;
            }
        });
    });
});

// --- Helper Functions ---

function getPageText() {
    return document.body.innerText.substring(0, 5000);
}

// NEW Function: Converts raw text into a nice HTML list
function formatToHTML(text) {
    // 1. Convert **bold** text to <b> tags
    let html = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

    // 2. Split by newlines so we can handle each bullet point
    let lines = html.split('\n');

    // 3. Process lines: remove empty ones, clean up symbols, wrap in <li>
    let listItems = lines
        .filter(line => line.trim().length > 0) // Remove empty lines
        .map(line => {
            // Remove the "*" or "-" from the start of the line
            let cleanLine = line.replace(/^[\*\-]\s*/, ''); 
            return `<li>${cleanLine}</li>`;
        })
        .join('');

    // 4. Wrap everything in a <ul> tag
    return `<ul>${listItems}</ul>`;
}

async function callGeminiWithToken(text, token, count) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent`;

    const prompt = `Summarize the following text in exactly ${count} bullet points:\n\n${text}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: prompt
                }]
            }]
        })
    });

    if (!response.ok) {
        throw new Error("Gemini API Error: " + response.statusText);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}