import { useState } from "react";

export default function Home() {
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState("");

  const sendFeedback = async () => {
    if (!feedback.trim()) {
      setStatus("❌ Please type something.");
      return;
    }

    setStatus("⏳ Sending...");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("✅ Feedback sent!");
        setFeedback("");
      } else {
        setStatus("❌ Failed to send feedback.");
      }
    } catch (error) {
      setStatus("❌ Error sending feedback.");
    }
  };

  return (
    <div style={{ backgroundColor: "#0d0d0d", color: "white", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h1 style={{ fontSize: "2rem" }}>Send Feedback 📝</h1>
      <textarea
        style={{ width: "300px", height: "100px", margin: "10px", padding: "10px", background: "#1a1a1a", color: "white", border: "1px solid gray", borderRadius: "8px" }}
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      ></textarea>
      <button
        style={{ background: "#333", padding: "10px 20px", borderRadius: "8px", cursor: "pointer" }}
        onClick={sendFeedback}
      >
        Submit
      </button>
      <p>{status}</p>
    </div>
  );
}
