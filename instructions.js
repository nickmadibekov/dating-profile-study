(function (global) {
  "use strict";

  function page(inner, title) {
    return `
      <div class="instr-wrap">
        ${title ? `<div class="instr-title">${title}</div>` : ""}
        <div class="instr-text">${inner}</div>
      </div>`;
  }

  const instructions_pages = [
    page(
      `<p><b>Thanks for taking part!</b> Please read these instructions carefully. Use the on-screen buttons to move between pages.</p>`,
      "Welcome"
    ),
    page(
      `<p>We're building an early <b>model that predicts how dating-profile answers perform</b>. To train and test it, we're comparing a few different ways that people write their profile answers.</p>
       <p>You'll complete <b>4 short rounds</b>. In each round you'll see a profile prompt (the kind you'd find on an app like Hinge) and write a short response to it.</p>`,
      "What you'll do"
    ),
    page(
      `<p>On <b>some</b> rounds, an <b>AI assistant</b> will be available in a chat box next to your answer. Using it is entirely up to you — some people won't use it at all, some will use it a little, and some will use it a lot. None of these is better or more expected than the others.</p>
       <p>If you do use it, use it however you normally would: a quick question, a back-and-forth, or nothing at all. Please just do whatever feels natural to you for each prompt.</p>
       <p>On <b>other</b> rounds, the AI won't be available and you'll write on your own.</p>
       <div class="instr-note">There's no right or wrong amount to use it, and no expectation either way.</div>`,
    ),
    page(
      `<p>Once you submit, a <b>separate scoring model</b> — not the writing assistant — evaluates your finished profile. It was trained on millions of real dating-app profiles and how they performed, and it predicts how appealing your answer is as an <b>appeal score from 1 to 10</b>, personalized to your preferences.</p>
       <p>This scoring model is the same on every round, whether or not you used the writing assistant. Some answers score above average and some below, and it reflects writing style as the model sees it, not a judgment of you.</p>`,
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
      { prompt: "After each response, you'll see an AI appeal score from 1 to 10.", options: ["True", "False"], required: true }
    ],
    on_finish: function (data) {
      data.comprehension_correct =
        data.response.Q0 === "True" &&
        data.response.Q1 === "True" &&
        data.response.Q2 === "False" &&
        data.response.Q3 === "True";
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
