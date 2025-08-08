import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { feedback } = req.body;
  if (!feedback) {
    return res.status(400).json({ error: "No feedback provided" });
  }

  try {
    const webhookUrl = process.env.DISCORD_WEBHOOK;
    if (!webhookUrl) {
      throw new Error("Webhook URL not set in environment variables");
    }

    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: `📩 New Feedback:\n${feedback}` }),
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({ error: "Failed to send feedback" });
  }
}
