/**********************************************************************
 Saved data fields:
   phase, response_text, response_chars, response_words,
   ai_available, ai_used, ai_num_user_msgs, ai_log_json, rt
   (+ everything passed via `meta`)

 Requires global async window.getAssistantReply(messages, systemPrompt).
**********************************************************************/
(function (global) {
  "use strict";

  const PT = (global.jsPsychModule && global.jsPsychModule.ParameterType) || {
    STRING: "string", BOOL: "bool", INT: "int", OBJECT: "object"
  };

  const HEART = '<svg class="ic-heart" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 21s-6.716-4.297-9.193-8.06C1.07 10.2 1.86 6.9 4.6 5.6 6.6 4.65 8.9 5.2 10.3 6.85L12 8.8l1.7-1.95C15.1 5.2 17.4 4.65 19.4 5.6c2.74 1.3 3.53 4.6 1.793 7.34C18.716 16.703 12 21 12 21z"/></svg>';
  const BRAND = '<div class="app-brand"><span class="brand-badge">' + HEART + '</span><span class="brand-name">spark</span></div>';

  function escHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, c =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  // Render assistant text as clean plain text: turn list markers into bullets,
  // render **bold**, and strip any leftover markdown symbols so they don't show literally.
  function formatAssistant(s) {
    let x = escHtml(s);
    x = x.replace(/^\s*[-*]\s+/gm, "• ");                 // "- " / "* " -> bullet
    x = x.replace(/\*\*([^*]+?)\*\*/g, "<strong>$1</strong>"); // **bold**
    x = x.replace(/`{1,3}([^`]*)`{1,3}/g, "$1");          // strip code ticks
    x = x.replace(/\*{1,3}/g, "");                        // remove leftover *
    x = x.replace(/_{2,3}/g, "");                         // remove leftover __ ___
    x = x.replace(/^#{1,6}\s+/gm, "");                    // remove # headers
    return x;
  }

  const info = {
    name: "profile-write",
    parameters: {
      prompt_text:   { type: PT.STRING, default: "" },
      ai_available:  { type: PT.BOOL,   default: false },
      min_chars:     { type: PT.INT,    default: 1 },
      meta:          { type: PT.OBJECT, default: {} },
      system_prompt: { type: PT.STRING, default: "You are a friendly writing assistant helping someone write a short, authentic dating-app profile answer. Keep replies brief and natural." },
      placeholder:   { type: PT.STRING, default: "Write your answer…" }
    }
  };

  class ProfileWritePlugin {
    constructor(jsPsych) { this.jsPsych = jsPsych; }

    trial(display_element, trial) {
      const start = performance.now();
      const now = () => Math.round(performance.now() - start);
      const messages = [];
      const log = [];
      const step = trial.meta && trial.meta.trial_num ? trial.meta.trial_num : "";

      const aiPanel = trial.ai_available ? `
        <div class="ai-panel">
          <div class="ai-head">✍️ AI assistant</div>
          <div id="pw-chat" class="chat" aria-live="polite"></div>
          <div class="chat-input">
            <textarea id="pw-ai-input" rows="2" placeholder="Message the AI…”"></textarea>
            <button id="pw-ai-send" class="chat-send" type="button">Send</button>
          </div>
        </div>` : "";

      display_element.innerHTML = `
        <div class="app-screen">
          <div class="app-chrome">
            ${BRAND}
            <div class="app-step">${step ? "Prompt " + step + " of 4" : "Profile preview"}</div>
          </div>
          <div class="app-body">
            <div class="prompt-card">
              <div class="prompt-kicker">YOUR PROMPT</div>
              <div class="prompt-text">${trial.prompt_text}</div>
            </div>
            <textarea id="pw-answer" class="answer" placeholder="${trial.placeholder}"></textarea>
            <div class="answer-row">
              <span id="pw-count" class="answer-count">0 characters</span>
              <button id="pw-submit" class="btn-primary" type="button" disabled>Add to profile</button>
            </div>
            ${aiPanel}
          </div>
        </div>`;

      const answer = display_element.querySelector("#pw-answer");
      const submit = display_element.querySelector("#pw-submit");
      const count  = display_element.querySelector("#pw-count");

      const refresh = () => {
        const len = answer.value.trim().length;
        count.textContent = len + " characters";
        submit.disabled = len < trial.min_chars;
      };
      answer.addEventListener("input", refresh);
      refresh();

      if (trial.ai_available) {
        const chat  = display_element.querySelector("#pw-chat");
        const input = display_element.querySelector("#pw-ai-input");
        const send  = display_element.querySelector("#pw-ai-send");

        const addBubble = (role, text) => {
          const div = document.createElement("div");
          div.className = "bubble " + role;
          if (role === "assistant") {
            div.innerHTML = formatAssistant(text);
          } else {
            div.textContent = text;
          }
          chat.appendChild(div);
          chat.scrollTop = chat.scrollHeight;
        };

        const doSend = async () => {
          const text = input.value.trim();
          if (!text) return;
          input.value = "";
          messages.push({ role: "user", content: text });
          log.push({ role: "user", content: text, t: now() });
          addBubble("user", text);

          send.disabled = true; input.disabled = true;
          const typing = document.createElement("div");
          typing.className = "bubble assistant typing";
          typing.textContent = "…";
          chat.appendChild(typing); chat.scrollTop = chat.scrollHeight;

          let reply = "";
          try {
            reply = await global.getAssistantReply(messages, trial.system_prompt);
          } catch (e) {
            reply = "(The assistant is unavailable right now — please write your own answer.)";
          }
          typing.remove();
          messages.push({ role: "assistant", content: reply });
          log.push({ role: "assistant", content: reply, t: now() });
          addBubble("assistant", reply);
          send.disabled = false; input.disabled = false; input.focus();
        };

        send.addEventListener("click", doSend);
        input.addEventListener("keydown", (e) => {
          if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); doSend(); }
        });
      }

      submit.addEventListener("click", () => {
        const response_text = answer.value.trim();
        const n_user_msgs = log.filter(m => m.role === "user").length;
        const data = Object.assign({}, trial.meta, {
          phase: "profile_write",
          prompt_text: trial.prompt_text,
          ai_available: trial.ai_available,
          ai_used: n_user_msgs > 0,
          ai_num_user_msgs: n_user_msgs,
          ai_log_json: JSON.stringify(log),
          response_text: response_text,
          response_chars: response_text.length,
          response_words: response_text ? response_text.split(/\s+/).filter(Boolean).length : 0,
          rt: now()
        });
        display_element.innerHTML = "";
        this.jsPsych.finishTrial(data);
      });
    }
  }

  ProfileWritePlugin.info = info;
  global.ProfileWritePlugin = ProfileWritePlugin;
})(window);
