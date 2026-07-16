/**********************************************************************
 range-slider-plugin.js
 Tinder-style dual-handle range slider (e.g., preferred age range).
 Saves: phase="preference", <field>_min, <field>_max, rt
**********************************************************************/
(function (global) {
  "use strict";
  const PT = (global.jsPsychModule && global.jsPsychModule.ParameterType) || {
    STRING:"string", BOOL:"bool", INT:"int", OBJECT:"object"
  };
  const HEART = '<svg class="ic-heart" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-6.716-4.297-9.193-8.06C1.07 10.2 1.86 6.9 4.6 5.6 6.6 4.65 8.9 5.2 10.3 6.85L12 8.8l1.7-1.95C15.1 5.2 17.4 4.65 19.4 5.6c2.74 1.3 3.53 4.6 1.793 7.34C18.716 16.703 12 21 12 21z"/></svg>';
  const BRAND = '<div class="app-brand"><span class="brand-badge">'+HEART+'</span><span class="brand-name">spark</span></div>';

  const info = {
    name:"range-slider",
    parameters:{
      title:{type:PT.STRING,default:""},
      subtitle:{type:PT.STRING,default:""},
      field:{type:PT.STRING,default:"range"},
      min:{type:PT.INT,default:18},
      max:{type:PT.INT,default:80},
      start_min:{type:PT.INT,default:24},
      start_max:{type:PT.INT,default:35},
      step_label:{type:PT.STRING,default:"Tuning"},
      max_plus:{type:PT.BOOL,default:true}  // show top value as "N+"
    }
  };

  class RangeSliderPlugin {
    constructor(jsPsych){ this.jsPsych=jsPsych; }
    trial(display_element, trial){
      const start = performance.now();
      display_element.innerHTML = `
        <div class="app-screen">
          <div class="app-chrome">${BRAND}<div class="app-step">${trial.step_label}</div></div>
          <div class="app-body">
            <div class="pref-title">${trial.title}</div>
            ${trial.subtitle?`<div class="pref-subtitle">${trial.subtitle}</div>`:""}
            <div class="rs-value"><span id="rs-lo">${trial.start_min}</span> – <span id="rs-hi">${trial.start_max}${trial.max_plus?"+":""}</span></div>
            <div class="rs-wrap">
              <div class="rs-track"></div>
              <div class="rs-fill" id="rs-fill"></div>
              <input type="range" id="rs-min" min="${trial.min}" max="${trial.max}" value="${trial.start_min}" step="1">
              <input type="range" id="rs-max" min="${trial.min}" max="${trial.max}" value="${trial.start_max}" step="1">
            </div>
            <div style="text-align:center; margin-top:22px;">
              <button id="rs-continue" class="btn-primary" type="button">Continue</button>
            </div>
          </div>
        </div>`;

      const lo = display_element.querySelector("#rs-min");
      const hi = display_element.querySelector("#rs-max");
      const loLbl = display_element.querySelector("#rs-lo");
      const hiLbl = display_element.querySelector("#rs-hi");
      const fill  = display_element.querySelector("#rs-fill");
      const span = trial.max - trial.min;

      const update = () => {
        let a = parseInt(lo.value), b = parseInt(hi.value);
        if (a > b) { if (document.activeElement === lo) { b = a; hi.value = b; } else { a = b; lo.value = a; } }
        loLbl.textContent = a;
        hiLbl.textContent = b + (trial.max_plus && b === trial.max ? "+" : "");
        const left = ((a - trial.min)/span)*100, right = ((b - trial.min)/span)*100;
        fill.style.left = left + "%";
        fill.style.width = (right - left) + "%";
      };
      lo.addEventListener("input", update);
      hi.addEventListener("input", update);
      update();

      display_element.querySelector("#rs-continue").addEventListener("click", () => {
        const data = { phase:"preference", rt: Math.round(performance.now()-start) };
        data[trial.field + "_min"] = parseInt(lo.value);
        data[trial.field + "_max"] = parseInt(hi.value);
        display_element.innerHTML = "";
        this.jsPsych.finishTrial(data);
      });
    }
  }
  RangeSliderPlugin.info = info;
  global.RangeSliderPlugin = RangeSliderPlugin;
})(window);
