(function (global) {
  "use strict";

  const HEART = '<svg class="ic-heart" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 21s-6.716-4.297-9.193-8.06C1.07 10.2 1.86 6.9 4.6 5.6 6.6 4.65 8.9 5.2 10.3 6.85L12 8.8l1.7-1.95C15.1 5.2 17.4 4.65 19.4 5.6c2.74 1.3 3.53 4.6 1.793 7.34C18.716 16.703 12 21 12 21z"/></svg>';

  function page(inner, title, icon) {
    return `
      <div class="app-screen">
        <div class="app-chrome">
          <div class="app-brand"><span class="brand-badge">${HEART}</span><span class="brand-name">spark</span></div>
          <div class="app-step">Getting started</div>
        </div>
        <div class="app-body" style="text-align:center;">
          ${icon ? `<div class="instr-icon">${icon}</div>` : ""}
          ${title ? `<div class="instr-title">${title}</div>` : ""}
          <div class="instr-text">${inner}</div>
        </div>
      </div>`;
  }

  const instructions_pages = [
    page(
      `<p><b>Thanks for taking part!</b> Please read these instructions carefully. Use the on-screen buttons to move between pages.</p>`,
      "Welcome"
    ),
    page(
       `<p>We're studying how people write short dating-profile answers, and how different writing approaches tend to land. In this session you'll write a few profile answers and see how an automated tool rates them.</p
       <p>You'll complete <b>4 short rounds</b>. In each round you'll see a profile prompt (the kind you'd find on an app like Hinge) and write a short response to it.</p>`,
      "What you'll do"
    ),
    page(
      `<p>On <b>some</b> rounds, an AI assistant will be available in a chat box next to your answer. Using it is entirely up to you — some people won't use it at all, some will use it a little, and some will use it a lot. None of these is better or more expected than the others.</p>
       <p>If you do use it, use it however you normally would: a quick question, a back-and-forth, or nothing at all. Please just do whatever feels natural to you for each prompt.</p>
       <p>On <b>other</b> rounds, the AI won't be available and you'll write on your own.</p>
       <div class="instr-note">There's no right or wrong amount to use it, and no expectation either way.</div>`,
    ),
    page(
      `<p>Once you submit, a eparate scoring model (not the writing assistant) evaluates your finished profile. It was trained on 5,250,000 real Hinge and Tinder profiles and how they performed. In testing, its predicted scores closely matched real-world outcomes (correlating at r = .94, within one point about 97% of the time), so the score is a strong estimate of how your profile would actually land.</p>
       <p>The model gives an <b>appeal score from 1 to 10</b>, personalized to your preferences. Some answers score above average and some below, and it reflects writing style as the model sees it.</p>`,
    ),
    page(
      `<p>After each estimate, we'll ask you a few quick questions about how you feel about that round.</p>
       <div class="instr-note"><b>Please answer openly and honestly.</b> There are no right or wrong answers — we just want your genuine reactions.</div>`,
      "A few questions each round"
    ),
    page(
      `<p>Write as if you were really filling out your own profile — in your own voice. When you're ready, continue to a quick comprehension check.</p>`,
      "Almost ready"
    )
  ];

  global.instructions = {
    type: jsPsychInstructions,
    pages: instructions_pages,
    show_clickable_nav: true,
    button_label_previous: "Previous",
    button_label_next: "Next"
  };

  const comprehension = {
    type: jsPsychSurveyMultiChoice,
    preamble: `<h3>Quick check</h3><p>Just to make sure everything's clear:</p>`,
    questions: [
      { prompt: "You'll write short responses to dating-profile prompts.", options: ["True", "False"], required: true },
      { prompt: "On some rounds, an optional AI assistant is available in a chat box.", options: ["True", "False"], required: true },
      { prompt: "You must use the AI whenever it is available.", options: ["True", "False"], required: true },
      { prompt: "After each response, you'll see an AI appeal score from 0 to 10.", options: ["True", "False"], required: true }
    ],
    on_finish: function (data) {
      data.comprehension_correct =
        data.response.Q0 === "True" &&
        data.response.Q1 === "True" &&
        data.response.Q2 === "False" &&
        data.response.Q3 === "False";
    }
  };

  const fail_comprehension = {
    timeline: [{
      type: jsPsychHtmlButtonResponse,
      stimulus: `<h3>Not quite</h3><p>One or more answers were off. Please review the instructions and try again.</p>`,
      choices: ["Review instructions"]
    }],
    conditional_function: function () {
      const last = jsPsych.data.get().filter({ trial_type: "survey-multi-choice" }).last(1).values()[0];
      return !(last && last.comprehension_correct === true);
    }
  };

  global.comprehension_loop = {
    timeline: [global.instructions, comprehension, fail_comprehension],
    loop_function: function () {
      const last = jsPsych.data.get().filter({ trial_type: "survey-multi-choice" }).last(1).values()[0];
      return !(last && last.comprehension_correct === true);
    }
  };
})(window);
