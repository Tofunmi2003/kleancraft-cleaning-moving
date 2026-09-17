"use client";

import { useState } from "react";
import { Bot, MessageSquareText, MessageCircle, Phone, Send, Sparkles, X } from "lucide-react";

const quickPrompts = [
  "Book a service",
  "What services do you offer?",
  "Availability this weekend",
  "Need a quick call",
];

const initialMessages = [
  {
    role: "assistant",
    text: "Hi! I’m your cleaning concierge. I can help you choose the right service, check availability, and guide you toward booking.",
  },
  {
    role: "assistant",
    text: "Tell me a bit about your space and preferred date, and I’ll recommend the best option.",
  },
];

export function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(initialMessages);

  const handlePrompt = (prompt: string) => {
    const nextMessages = [...messages, { role: "user", text: prompt }];

    let response = "I can help with that. Tell me the type of property, service you need, and the date you prefer.";
    if (prompt.toLowerCase().includes("call") || prompt.toLowerCase().includes("phone")) {
      response = "You can reach us directly by phone, or use the WhatsApp button in the floating action bar for quick contact.";
    } else if (prompt.toLowerCase().includes("book")) {
      response = "I can guide you to a booking request. Share your preferred date and whether this is a one-time or recurring clean.";
    } else if (prompt.toLowerCase().includes("service")) {
      response = "We offer residential, deep, sofa & chair, office, commercial, post-construction, move-in / move-out, and event cleaning. We can tailor a package to your space.";
    }

    setMessages([...nextMessages, { role: "assistant", text: response }]);
    setInput("");
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!input.trim()) return;
    handlePrompt(input);
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      <div className="relative z-20 flex flex-col items-end gap-2">
        <a
          href="https://wa.me/2349064621664?text=Hi%20KleanCraft%2C%20I%20want%20to%20book%20a%20service."
          target="_blank"
          rel="noreferrer"
          aria-label="Contact us on WhatsApp"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_35px_-18px_rgba(37,211,102,0.8)] transition hover:scale-[1.02]"
        >
          <MessageCircle size={18} />
        </a>
        <a
          href="tel:+2349064621664"
          aria-label="Call KleanCraft"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-700 text-white shadow-[0_18px_35px_-18px_rgba(109,74,197,0.8)] transition hover:scale-[1.02]"
        >
          <Phone size={18} />
        </a>
      </div>

      {open ? (
        <div className="w-[min(92vw,360px)] overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_32px_80px_-28px_rgba(46,24,69,0.38)]">
          <div className="flex items-center justify-between bg-violet-700 px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                <Bot size={16} />
              </div>
              <div>
                <p className="text-sm font-semibold">Cleaning Concierge</p>
                <p className="text-[10px] uppercase tracking-[0.15em] text-violet-100">AI assistant</p>
              </div>
            </div>
            <button type="button" aria-label="Close chat" onClick={() => setOpen(false)} className="rounded-full p-1.5 hover:bg-white/10">
              <X size={16} />
            </button>
          </div>

          <div className="max-h-[340px] space-y-3 overflow-y-auto bg-slate-50 p-4">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-6 ${message.role === "assistant" ? "bg-white text-slate-700 ring-1 ring-slate-200" : "bg-violet-700 text-white"}`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 bg-white p-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {quickPrompts.map((prompt) => (
                <button key={prompt} type="button" onClick={() => handlePrompt(prompt)} className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-[11px] font-medium text-violet-800 transition hover:bg-violet-100">
                  {prompt}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about services or booking…"
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
              <button type="submit" aria-label="Send message" className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-700 text-white transition hover:bg-violet-800">
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => setOpen(true)} className="relative z-10 flex items-center gap-3 rounded-full bg-violet-700 px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-18px_rgba(95,63,141,0.8)] transition hover:bg-violet-800">
          <MessageSquareText size={18} />
          <span>Need help?</span>
          <Sparkles size={16} className="text-violet-200" />
        </button>
      )}
    </div>
  );
}
