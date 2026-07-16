/**********************************************************************
 preference-plugin.js
 Tile-based preference screens for the "tune the model to you" pre-screener.

 Two modes:
  - SINGLE select (default): tap one tile -> auto-advance. Saves <field>=value.
  - MULTI select (max_select > 1): pick up to N, then Continue.
    Saves <field>=comma-joined values, plus <field>_n = count.

 Saves: phase="preference", the field(s) above, and rt.
**********************************************************************/
(function (global) {
  "use strict";
  const PT = (global.jsPsychModule && global.jsPsychModule.ParameterType) || {
    STRING: "string", BOOL: "bool", INT: "int", OBJECT: "object"
  };

  const HEART = '<svg class="ic-heart" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 21s-6.716-4.297-9.193-8.06C1.07 10.2 1.86 6.9 4.6 5.6 6.6 4.65 8.9 5.2 10.3 6.85L12 8.8l1.7-1.95C15.1 5.2 17.4 4.65 19.4 5.6c2.74 1.3 3.53 4.6 1.793 7.34C18.716 16.703 12 21 12 21z"/></svg>';
  const BRAND = '<div class="app-brand"><span class="brand-badge">' + HEART + '</span><span class="brand-name">spark</span></div>';

  const info = {
    name: "preference-tile",
    parameters: {
      title:      { type: PT.STRING, default: "" },
      subtitle:   { type: PT.STRING, default: "" },
      field:      { type: PT.STRING, default: "preference" },
      options:    { type: PT.OBJECT, default: [] },   // [{emoji,label,value}]
      step:       { type: PT.STRING, default: "Tuning" },
      max_select: { type: PT.INT,    default: 1 },     // 1 = single (auto-advance); >1 = multi
      min_select: { type: PT.INT,    default: 1 },      // multi mode: minimum required
      exclusive:  { type: PT.STRING, default: "" },   // value that clears others when picked
      collapse_to:{ type: PT.STRING, default: "" }    // if all non-exclusive picked, collapse to this value
    }
  };

  class PreferenceTilePlugin {
    constructor(jsPsych) { this.jsPsych = jsPsych; }
    trial(display_element, trial) {
      const start = performance.now();
      const multi = trial.max_select > 1;

      const tiles = trial.options.map(o => `
        <button class="pref-tile" type="button" data-value="${String(o.value).replace(/"/g,'&quot;')}">
          ${o.emoji ? `<div class="pref-emoji">${o.emoji}</div>` : ""}
          <div class="pref-label">${o.label}</div>
        </button>`).join("");

      display_element.innerHTML = `
        <div class="app-screen pref-screen">
          <div class="app-chrome">${BRAND}<div class="app-step">${trial.step}</div></div>
          <div class="app-body">
            <div class="pref-title">${trial.title}</div>
            ${trial.subtitle ? `<div class="pref-subtitle">${trial.subtitle}</div>` : ""}
            <div class="pref-grid ${multi ? "pref-grid-multi" : ""} ${trial.field === "pref_interested_in" ? "pref-grid-gender" : ""}"> ${tiles} </div>
            ${multi ? ` 
              <div class="pref-counter"><span id="pref-count">0</span> / ${trial.max_select} selected</div>
              <div style="text-align:center;"><button id="pref-continue" class="btn-primary" type="button" disabled>Continue</button></div>
              ` : ""}
          </div>
        </div>`;

      const els = Array.from(display_element.querySelectorAll(".pref-tile"));

      if (!multi) {
        // single-select: tap -> auto-advance
        els.forEach(t => t.addEventListener("click", () => {
          els.forEach(x => x.classList.remove("selected"));
          t.classList.add("selected");
          const data = { phase: "preference", rt: Math.round(performance.now() - start) };
          data[trial.field] = t.getAttribute("data-value");
          setTimeout(() => { display_element.innerHTML = ""; this.jsPsych.finishTrial(data); }, 260);
        }));
        return;
      }

      // multi-select: toggle up to max_select, enable Continue at >= min_select
      const countEl = display_element.querySelector("#pref-count");
      const btn = display_element.querySelector("#pref-continue");
      const selected = () => els.filter(e => e.classList.contains("selected"));
      const refresh = () => {
        const n = selected().length;
        countEl.textContent = n;
        btn.disabled = n < trial.min_select;
        const atCap = n >= trial.max_select;
        els.forEach(e => { if (!e.classList.contains("selected")) e.classList.toggle("pref-disabled", atCap); });
      };

      const exclusiveVal = trial.exclusive;
      const collapseTo   = trial.collapse_to || trial.exclusive; // default: collapse to the exclusive tile
      const specifics = () => els.filter(e => e.getAttribute("data-value") !== exclusiveVal);

      els.forEach(t => t.addEventListener("click", () => {
        const val = t.getAttribute("data-value");
        const isSel = t.classList.contains("selected");

        if (exclusiveVal && val === exclusiveVal) {
          // clicking "Everyone": clear everything else, select only it
          els.forEach(e => e.classList.remove("selected"));
          t.classList.add("selected");
        } else {
          // clicking a specific: deselect "Everyone" if it was on
          const exEl = els.find(e => e.getAttribute("data-value") === exclusiveVal);
          if (exEl) exEl.classList.remove("selected");
          if (!isSel && selected().length >= trial.max_select) return;
          t.classList.toggle("selected");
          // if all specifics are now chosen, collapse to "Everyone"
          if (collapseTo && specifics().every(e => e.classList.contains("selected"))) {
            els.forEach(e => e.classList.remove("selected"));
            const target = els.find(e => e.getAttribute("data-value") === collapseTo);
            if (target) target.classList.add("selected");
          }
        }
        refresh();
      }));


      btn.addEventListener("click", () => {
        const vals = selected().map(e => e.getAttribute("data-value"));
        const data = { phase: "preference", rt: Math.round(performance.now() - start) };
        data[trial.field] = vals.join(",");
        data[trial.field + "_n"] = vals.length;
        display_element.innerHTML = "";
        this.jsPsych.finishTrial(data);
      });
      refresh();
    }
  }
  PreferenceTilePlugin.info = info;
  global.PreferenceTilePlugin = PreferenceTilePlugin;
})(window);
