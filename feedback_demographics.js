const feedback_demographics = {
  type: jsPsychSurveyHtmlForm,
  html: `
    <div style="max-width:700px; margin:auto; text-align:left;">
      <p style="text-align:center;">A few last questions to complete the study.</p>

      <!-- Believability / suspicion (manipulation check) -->
      <div style="margin-bottom:2em;">
        <div style="margin-bottom:0.5em;">
          <strong>While doing the task, how believable did the “likes” estimates feel to you?</strong>
        </div>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="likes_believable" value="Very believable"> Very believable</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="likes_believable" value="Somewhat believable"> Somewhat believable</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="likes_believable" value="Not very believable"> Not very believable</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="likes_believable" value="Not believable at all"> Not believable at all</label>
      </div>

      <div style="margin-bottom:2em;">
        <label for="suspicion"><strong>What did you think this study was about?</strong></label><br>
        <textarea name="suspicion" id="suspicion" rows="3" style="width:100%;"></textarea>
      </div>

      <div style="margin-bottom:2em;">
        <label for="strategy"><strong>How did you decide what to write for your responses?</strong></label><br>
        <textarea name="strategy" id="strategy" rows="3" style="width:100%;"></textarea>
      </div>

      <!-- AI familiarity -->
      <div style="margin-bottom:2em;">
        <div style="margin-bottom:0.5em;">
          In the past <strong>12 months</strong>, how often have you used AI writing tools (e.g., ChatGPT) to help write things?
        </div>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_use_freq" value="Never"> Never</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_use_freq" value="A few times"> A few times</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_use_freq" value="About once a month"> About once a month</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_use_freq" value="About once a week"> About once a week</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="ai_use_freq" value="Daily or almost daily"> Daily or almost daily</label>
      </div>

      <!-- Dating app use -->
      <div style="margin-bottom:2em;">
        <div style="margin-bottom:0.5em;">Have you used dating apps (e.g., Hinge, Bumble, Tinder)?</div>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="dating_app_use" value="Never"> Never</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="dating_app_use" value="In the past"> In the past</label>
        <label style="display:block; margin:0.25em 0;"><input type="radio" name="dating_app_use" value="Currently"> Currently</label>
      </div>

      <!-- General feedback -->
      <div style="margin-bottom:2em;">
        <label for="feedback"><strong>Any feedback about the study?</strong></label><br>
        <textarea name="feedback" id="feedback" rows="3" style="width:100%;"
          placeholder="Optional."></textarea>
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

  on_finish: function (data) {
    const r = data.response;
    const out = {};
    out.phase = "demographics";
    out.likes_believable = r.likes_believable;
    out.suspicion = r.suspicion;
    out.strategy = r.strategy;
    out.ai_use_freq = r.ai_use_freq;
    out.dating_app_use = r.dating_app_use;
    out.feedback = r.feedback;
    out.age = parseInt(r.age);
    out.gender = (r.gender === 'Other' || typeof r.gender === 'undefined') ? r.other_gender : r.gender;
    out.race = (typeof r.race === 'undefined') ? r.other_race : r.race;
    out.ethnicity = (typeof r.ethnicity === 'undefined') ? '' : r.ethnicity;
    data.response = out;
    Object.keys(out).forEach(k => { data[k] = out[k]; });
  }
};
