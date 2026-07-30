export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      reply: "Method not allowed."
    });
  }

  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content: "You are I.N.E.O.N., a futuristic AI assistant. Be friendly, intelligent, and concise."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();
console.log(data);

if (!response.ok) throw new Error(JSON.stringify(data));
    res.status(200).json({
      reply: data.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({
      reply: "Sorry, I couldn't reach the AI."
    });
  }
              }
