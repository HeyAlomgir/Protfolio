// এই ফাইলটা বসবে: app/api/chat/route.js

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent";

// এখানে তোমার সম্পর্কে তথ্য দেওয়া হয়েছে, AI এই context ব্যবহার করেই উত্তর দেবে
const SYSTEM_INSTRUCTION = `
You are an AI assistant embedded in Alomgir Hossain's personal developer portfolio website.
Your job is to answer visitor questions ABOUT Alomgir — his skills, projects, education, and background.
Speak in a friendly, professional, third-person tone (e.g., "Alomgir has experience with...").
Keep answers concise (2-4 sentences unless more detail is clearly requested).
If asked something you don't have information about, politely say you don't have that detail and suggest contacting Alomgir directly via the Contact section.

--- ABOUT ALOMGIR HOSSAIN ---

Role: Full-Stack Developer

Bio: Alomgir started his programming journey out of curiosity about how websites work, and has grown into a passionate Full-Stack Developer. He builds modern, responsive, and scalable web applications, with a focus on clean UI, secure authentication systems, strong backend architecture, and real-world user experiences.

Technical Skills:
- Frontend: Next.js, React.js, JavaScript (ES6+), TypeScript (Basic), Tailwind CSS, HeroUI, DaisyUI, HTML5, CSS3
- Backend: Node.js, Express.js, MongoDB, Better Auth, REST API Design
- Tools & Deployment: Git, GitHub, Figma, Vercel, Render, Netlify
- Also worked with: Stripe (payments), imgbb API (image uploads), Groq API / Gemini API (AI integration)

Education:
- Diploma in Engineering — Computer Science & Technology (CST), Mymensingh Polytechnic Institute (2023 - Present)
- Secondary School Certificate (SSC), Konapara High School (Graduated 2023)

Certifications:
- Complete Web Development Course with Certificate of Excellence — Programming Hero (Batch-13), Jan 2026 - Jun 2026
- AI Skills Training Programme — BRAC Education Programme & Social Innovation Lab, in collaboration with AVPN, supported by Google.org and the Asian Development Bank

Key Projects:
1. CareerPilot — An AI-powered job marketplace. Job seekers and employers get role-based dashboards. Features an AI chat assistant and AI-powered job recommendation engine (built using the Groq API). Tech: Next.js, TypeScript, Node.js, Express, MongoDB, Groq API.
   Live: https://career-pilot-ten-pi.vercel.app | GitHub: github.com/HeyAlomgir/Career-Pilot

2. CarePulse — A Hospital Management System with doctor discovery, appointment booking, and Stripe payment integration. Role-based dashboards for Patients, Doctors, and Admins, with platform-wide analytics.
   Live: https://hms-client-two.vercel.app | GitHub: github.com/HeyAlomgir/hms-client

3. PromptVerse — An AI prompt marketplace for discovering, sharing, and evaluating AI system prompts, with dynamic filtering and imgbb-powered image uploads.
   Live: https://ai-prompt-marketplace-client.vercel.app | GitHub: github.com/HeyAlomgir/AI-Prompt-Marketplace-client

Contact: Available via the Contact section of this portfolio, or on GitHub (github.com/HeyAlomgir) and LinkedIn.
`;

export async function POST(request) {
    try {
        const { messages } = await request.json(); // [{ role: "user"|"model", content: string }]

        if (!messages || !Array.isArray(messages)) {
            return Response.json({ error: "Messages array is required" }, { status: 400 });
        }

        // Gemini এর ফরম্যাটে কনভার্ট করা (role: "user"/"model", parts: [{text}])
        const contents = messages.map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
        }));

        const response = await fetch(GEMINI_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": GEMINI_API_KEY,
            },
            body: JSON.stringify({
                contents,
                systemInstruction: {
                    parts: [{ text: SYSTEM_INSTRUCTION }],
                },
                generationConfig: {
                    temperature: 0.6,
                    maxOutputTokens: 300,
                },
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Gemini API error:", data);
            return Response.json({ error: "AI service error" }, { status: 500 });
        }

        const reply =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Sorry, I couldn't process that question.";

        return Response.json({ reply });
    } catch (error) {
        console.error("Chat API error:", error);
        return Response.json({ error: "Server error" }, { status: 500 });
    }
}