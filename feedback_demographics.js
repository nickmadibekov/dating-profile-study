const feedback_demographics = {
  type: jsPsychSurveyHtmlForm,
  html: `
    <div style="max-width:700px; margin:auto; text-align:left;">
      <p style="text-align:center;">A few last questions to complete the study.</p>

      <!-- Believability / suspicion (manipulation check) -->
      <div style="margin-bottom:2em;">
        <div style="margin-bottom:0.5em;">
          <strong>While doing the task, how believable did the appeal scores feel to you?</strong>
        </div>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_score_believable" value="Very believable"> Very believable</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_score_believable" value="Somewhat believable"> Somewhat believable</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_score_believable" value="Not very believable"> Not very believable</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_score_believable" value="Not believable at all"> Not believable at all</label>
      </div>

      <div style="margin-bottom:2em;">
        <label for="suspicion"><strong>What did you think this study was about?</strong></label><br>
        <textarea name="suspicion" id="suspicion" rows="3" style="width:100%;"></textarea>
      </div>

      <div style="margin-bottom:2em;">
        <label for="strategy"><strong>How did you decide what to write for your responses?</strong></label><br>
        <textarea name="strategy" id="strategy" rows="3" style="width:100%;"></textarea>
      </div>

       <!-- AI use -->
      <div style="margin-bottom:2em;">
        <div style="margin-bottom:0.5em;">
          In the past <strong>month</strong>, how often have you used AI tools (e.g., ChatGPT) for <strong>work or school tasks</strong> (e.g., writing, coding, research)?
        </div>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_freq_work" value="Not at all"> Not at all</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_freq_work" value="Once or twice"> Once or twice</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_freq_work" value="A few times"> A few times</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_freq_work" value="About once a week"> About once a week</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_freq_work" value="Several times a week"> Several times a week</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_freq_work" value="Daily or almost daily"> Daily or almost daily</label>
      </div>

      <div style="margin-bottom:2em;">
        <div style="margin-bottom:0.5em;">
          In the past <strong>month</strong>, how often have you used AI tools (e.g., ChatGPT) for <strong>dating apps</strong> (e.g., profiles, messages, openers)?
        </div>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_freq_dating" value="Not at all"> Not at all</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_freq_dating" value="Once or twice"> Once or twice</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_freq_dating" value="A few times"> A few times</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_freq_dating" value="About once a week"> About once a week</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_freq_dating" value="Several times a week"> Several times a week</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_freq_dating" value="Daily or almost daily"> Daily or almost daily</label>
      </div>

      <div style="margin-bottom:2em;">
        <div style="margin-bottom:0.5em;">
          In the past <strong>month</strong>, how often have you used AI tools (e.g., ChatGPT) in your <strong>romantic relationship</strong> (e.g., texting or talking with a partner)?
        </div>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_freq_romantic" value="Not at all"> Not at all</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_freq_romantic" value="Once or twice"> Once or twice</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_freq_romantic" value="A few times"> A few times</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_freq_romantic" value="About once a week"> About once a week</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_freq_romantic" value="Several times a week"> Several times a week</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_freq_romantic" value="Daily or almost daily"> Daily or almost daily</label>
      </div>

      <div style="margin-bottom:2em;">
        <div style="margin-bottom:0.5em;">
          In the past <strong>month</strong>, how often have you used AI tools (e.g., ChatGPT) for <strong>companionship</strong> (e.g., talking to an AI for company or emotional support)?
        </div>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_freq_companion" value="Not at all"> Not at all</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_freq_companion" value="Once or twice"> Once or twice</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_freq_companion" value="A few times"> A few times</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_freq_companion" value="About once a week"> About once a week</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_freq_companion" value="Several times a week"> Several times a week</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_freq_companion" value="Daily or almost daily"> Daily or almost daily</label>
      </div>

      <!-- General AI trust (shown to everyone) -->
      <div style="margin-bottom:2em;">
        <div style="margin-bottom:0.5em;">
          In general, how much do you <strong>trust the AI's judgment</strong> in these kinds of contexts?
        </div>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_trust" value="Not at all"> Not at all</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_trust" value="Slightly"> Slightly</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_trust" value="Moderately"> Moderately</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_trust" value="Very much"> Very much</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_trust" value="Completely"> Completely</label>
      </div>

       <!-- Dating app use -->
      <div style="margin-bottom:2em;">
        <div style="margin-bottom:0.5em;">In the past <strong>month</strong>, how often have you used dating apps (e.g., Hinge, Bumble, Tinder)?</div>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="dating_app_use" value="Not at all"> Not at all</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="dating_app_use" value="Once or twice"> Once or twice</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="dating_app_use" value="A few times"> A few times</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="dating_app_use" value="About once a week"> About once a week</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="dating_app_use" value="Several times a week"> Several times a week</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="dating_app_use" value="Daily or almost daily"> Daily or almost daily</label>
      </div>

      <!-- Relationship status (+ conditional duration) -->
      <div style="margin-bottom:2em;">
        <div style="margin-bottom:0.5em;"><strong>What is your current relationship status?</strong></div>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="relationship_status" value="Single"> Single</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="relationship_status" value="In a relationship"> In a relationship</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="relationship_status" value="Engaged"> Engaged</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="relationship_status" value="Married"> Married</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="relationship_status" value="It's complicated"> It's complicated</label>
        <div id="rel_duration_wrap" style="display:none; margin-top:10px;">
          How long have you been together?
          <input type="text" name="relationship_duration" placeholder="e.g., 2 years" style="width:60%;">
        </div>
      </div>

      <!-- General feedback -->
      <div style="margin-bottom:2em;">
        <label for="feedback"><strong>Any feedback about the study?</strong></label><br>
          <textarea name="feedback" id="feedback" rows="3" style="width:100%;"></textarea>
      </div>

      <!-- Demographics (standard grid) -->
      <div style="display:grid; grid-template-columns:150px auto; row-gap:1.5em; column-gap:1em;">
        <div style="align-self:center;"><strong>Age:</strong></div>
        <div><input name="age" type="number" min="18" max="100" style="width:100%; max-width:100px;" /></div>

        <div style="align-self:center;"><strong>Gender:</strong></div>
        <div>
          <label><input name="gender" type="radio" value="Female"> Female</label>
          <label><input name="gender" type="radio" value="Male"> Male</label>
          <label><input name="gender" type="radio" value="Non-binary"> Non-binary</label><br>
          <label>Other: <input type="text" name="other_gender" style="width:50%;" /></label>
        </div>

        <div style="align-self:center;"><strong>Race:</strong></div>
        <div>
          <label><input name="race" type="radio" value="White"> White</label><br>
          <label><input name="race" type="radio" value="Black/African American"> Black/African American</label><br>
          <label><input name="race" type="radio" value="American Indian/Alaska Native"> American Indian/Alaska Native</label><br>
          <label><input name="race" type="radio" value="Asian"> Asian</label><br>
          <label><input name="race" type="radio" value="Native Hawaiian/Pacific Islander"> Native Hawaiian/Pacific Islander</label><br>
          <label><input name="race" type="radio" value="Multiracial/Mixed"> Multiracial/Mixed</label><br>
          <label>Other: <input type="text" name="other_race" style="width:50%;" /></label>
        </div>

        <div style="align-self:center;"><strong>Ethnicity:</strong></div>
        <div>
          <label><input name="ethnicity" type="radio" value="Hispanic"> Hispanic</label>
          <label><input name="ethnicity" type="radio" value="Non-Hispanic"> Non-Hispanic</label>
        </div>
      </div>

      <p style="text-align:center;">Please press the finish button to complete the experiment.</p>
    </div>`,

  button_label: 'Finish',

  on_load: function () {
    const wrap = document.getElementById("rel_duration_wrap");
    document.querySelectorAll('input[name="relationship_status"]').forEach(radio => {
      radio.addEventListener("change", () => {
        wrap.style.display = (radio.value !== "Single") ? "block" : "none";
      });
    });
  },

  on_finish: function (data) {
    const r = data.response;
    const out = {};
    out.phase = "demographics";
    out.ai_score_believable = r.ai_score_believable;
    out.suspicion = r.suspicion;
    out.strategy = r.strategy;
    out.ai_freq_work = r.ai_freq_work;
    out.ai_freq_dating = r.ai_freq_dating;
    out.ai_freq_romantic = r.ai_freq_romantic;
    out.ai_freq_companion = r.ai_freq_companion;
    out.ai_trust = r.ai_trust;
    out.dating_app_use = r.dating_app_use;
    out.feedback = r.feedback;
    out.relationship_status = r.relationship_status;
    out.relationship_duration = r.relationship_duration || "";
    out.age = parseInt(r.age);
    out.gender = (r.gender === 'Other' || typeof r.gender === 'undefined') ? r.other_gender : r.gender;
    out.race = (typeof r.race === 'undefined') ? r.other_race : r.race;
    out.ethnicity = (typeof r.ethnicity === 'undefined') ? '' : r.ethnicity;
    data.response = out;
    Object.keys(out).forEach(k => { data[k] = out[k]; });
  }
};
