const { GoogleGenerativeAI } = require("@google/generative-ai");

require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chatWithGemini = async (req, res) => {

    try {

        const { messages } = req.body;

        if (!messages || messages.length === 0) {

            return res.status(400).json({
                success: false,
                reply: "No messages received"
            });

        }

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash"
        });

        // convert frontend format → Gemini format
        const formattedMessages = messages.map(msg => ({

            role: msg.role === "model"
                ? "model"
                : "user",

            parts: Array.isArray(msg.parts)
                ? msg.parts
                : [{ text: msg.parts }]

        }));

        const result = await model.generateContent({

            contents: formattedMessages,

            systemInstruction: {
                parts: [
                    {
                        text:
                            "Respond exactly to the user's request only. Do not add extra explanations, greetings, or suggestions."
                    }
                ]
            }

        });

        const response = await result.response;

        const reply = response.text();

        res.status(200).json({

            success: true,
            reply

        });

    }
    catch (error) {

        console.error("Gemini Backend Error:", error);

        res.status(500).json({

            success: false,
            reply: "⚠️ AI response failed"

        });

    }

};

module.exports = { chatWithGemini };