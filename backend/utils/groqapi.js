import "dotenv/config";

const getapiresponse = async (message) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            "messages": [
  {
    role: "system",
    content: `
You are an AI fashion stylist.
ONLY return outfit suggestions.
Always respond in this exact format:

Outfit 1:
Top:
Bottom:
Footwear:
Accessories:

Outfit 2:
Top:
Bottom:
Footwear:
Accessories:
`
  },
  {
    role: "user",
    content: message
  }
            ]
        })
    };

    try {
        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            options
        );

        const data = await response.json();
        return data.choices[0].message.content;

    } catch (err) {
        console.log("error detected", err);
        return "Sorry, I couldn't generate outfit suggestions right now.";
    }
};

export default getapiresponse;
