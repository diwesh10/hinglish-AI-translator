chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === "TRANSLATE_TEXT") {
    const text = message.text;
    const translatedText = await fetchTranslation(text);
    
    let popup = document.getElementById("hinglish-popup");
    if (!popup) {
      popup = document.createElement("div");
      popup.id = "hinglish-popup";
      popup.style.position = "fixed";
      popup.style.bottom = "20px";
      popup.style.right = "20px";
      popup.style.background = "#fff";
      popup.style.border = "1px solid #ccc";
      popup.style.padding = "12px";
      popup.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
      popup.style.zIndex = 10000;
      popup.style.borderRadius = "6px";
      popup.style.maxWidth = "300px";
      popup.style.fontFamily = "sans-serif";
      document.body.appendChild(popup);
    }

    popup.innerText = translatedText;
    setTimeout(() => {
      popup.remove();
    }, 6000);
  }
});

async function fetchTranslation(text) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer YOUR_OPENAI_API_KEY",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "user",
          content: `Translate this English text to Hinglish (mix of Hindi and English): ${text}`
        }]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Translation failed:", error);
    return "Translation error";
  }
}
