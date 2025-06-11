import React, { useState } from "react";

const SendEmail = () => {
  const [form, setForm] = useState({ to: "", subject: "", message: "" });
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("to", form.to);
    formData.append("subject", form.subject);
    formData.append("message", form.message);
    if (file) formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      alert(result.message);
    } catch (err) {
      console.error("Send failed:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Recipient Email"
        required
        onChange={(e) => setForm({ ...form, to: e.target.value })}
      />
      <input
        type="text"
        placeholder="Subject"
        required
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
      />
      <textarea
        placeholder="Your Message"
        required
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Send Email</button>
    </form>
  );
};

export default SendEmail;
