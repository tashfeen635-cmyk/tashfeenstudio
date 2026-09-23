"use client";

import { FormEvent, useState } from "react";
import { SITE } from "@/lib/site";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);
  const [warning, setWarning] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setWarning("Please fill in all fields.");
      return;
    }
    setWarning("");
    const text = `Hello, I'm ${name.trim()} (${email.trim()}).\n\n${message.trim()}`;
    const url = `${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setDone(true);
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="contact-name">Your Name</label>
        <input
          className="form-control"
          type="text"
          id="contact-name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="contact-email">Your Email</label>
        <input
          className="form-control"
          type="email"
          id="contact-email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="contact-message">Your Message</label>
        <textarea
          className="form-control"
          id="contact-message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <div className="form-actions">
        <button className="btn" type="submit">
          Send Message
        </button>
      </div>
      {warning && <p className="form-message-warning">{warning}</p>}
      {done && (
        <p className="form-message-success">
          WhatsApp has opened with your message - just press send to deliver it
          to me.
        </p>
      )}
    </form>
  );
}