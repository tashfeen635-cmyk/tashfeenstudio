"use client";

import { FormEvent, useState } from "react";
import { FORM_ENDPOINT } from "@/lib/site";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [warning, setWarning] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setWarning("Please fill in all fields.");
      return;
    }
    setWarning("");
    setSubmitting(true);
    try {
      await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: JSON.stringify({ name, email, message }),
        mode: "no-cors",
      });
      setDone(true);
    } catch {
      setDone(true);
    } finally {
      setSubmitting(false);
    }
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
        <button className="btn" type="submit" disabled={submitting}>
          {submitting ? "Sending ..." : "Send Message"}
        </button>
        {submitting && <span className="submitting">Please wait ...</span>}
      </div>
      {warning && <p className="form-message-warning">{warning}</p>}
      {done && (
        <p className="form-message-success">
          Your message has been sent. Thank you for contacting us - you will be
          heard back soon.
        </p>
      )}
    </form>
  );
}