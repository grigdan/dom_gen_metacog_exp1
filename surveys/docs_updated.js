var jsPsychSurveyDOCS = (function (jspsych) {
    'use strict';

    const info = {
        name: 'survey-docs',
        description: '',
        parameters: {
            button_label: {
                type: jspsych.ParameterType.STRING,
                pretty_name: 'Button label',
                default: 'Continue',
                description: 'The text that appears on the button to finish the trial.'
            },
        }
    }
    class SurveyDuditPlugin {
            constructor(jsPsych) {
                this.jsPsych = jsPsych;
            }

            trial(display_element, trial) {

                //---------------------------------------//
                // 1. DEFINE YOUR PAGES & ITEMS HERE
                //---------------------------------------//

                const pages = [
                    // --- PAGE 1 ---
                    [
                        {
                            prompt: "About how much time have you spent each day thinking about contamination and engaging in washing or cleaning behaviours because of contamination?",
                            responses: ["None at all", "Less than 1 hour each day", "Between 1 and 3 hours each day", "Between 3 and 8 hours each day", "8 hours or more each day", "Prefer not to disclose"],
                            values: [0, 1, 2, 3, 4, 5]
                        },
                        {
                            prompt: "To what extent have you avoided situations in order to prevent concerns with contamination or having to spend time washing, cleaning, or showering?",
                            responses: ["None at all", "A little avoidance", "A moderate amount of avoidance", "A great deal of avoidance", "Extreme avoidance of nearly all things", "Prefer not to disclose"],
                            values: [0, 1, 2, 3, 4, 5]
                        },
                        {
                            prompt: "If you had thoughts about contamination but could not wash, clean, or shower (or otherwise remove the contamination), how distressed or anxious did you become?",
                            responses: ["Not at all distressed/anxious", "Mildly distressed/anxious", "Moderately distressed/anxious", "Severely distressed/anxious", "Extremely distressed/anxious", "Prefer not to disclose"],
                            values: [0, 1, 2, 3, 4, 5]
                        },
                        {
                            prompt: "To what extent has your daily routine (work, school, self-care, social life) been disrupted by contamination concerns and excessive washing, showering, cleaning, or avoidance behaviours?",
                            responses: ["No disruption at all", "A little disruption, but I mostly function well", "Many things are disrupted, but I can still manage", "My life is disrupted in many ways and I have trouble managing", "My life is completely disrupted and I cannot function at all", "Prefer not to disclose"],
                            values: [0, 1, 2, 3, 4, 5]
                        },
                        {
                            prompt: "How difficult is it for you to disregard thoughts about contamination and refrain from behaviours such as washing, showering, cleaning, and other decontamination routines when you try to do so?",
                            responses: ["Not at all difficult", "A little difficult", "Moderately difficult", "Very difficult", "Extremely difficult", "Prefer not to disclose"],
                            values: [0, 1, 2, 3, 4, 5]
                        }
                    ],

                    // --- PAGE 2 ---
                    [
                        {
                            prompt: "About how much time have you spent each day thinking about the possibility of harm or disasters and engaging in checking or efforts to get reassurance that such things do not (or did not) occur?",
                            responses: ["None at all", "Less than 1 hour each day", "Between 1 and 3 hours each day", "Between 3 and 8 hours each day", "8 hours or more each day", "Prefer not to disclose"],
                            values: [0, 1, 2, 3, 4, 5]
                        },
                        {
                            prompt: "To what extent have you avoided situations so that you did not have to check for danger or worry about possible harm or disasters?",
                            responses: ["None at all", "A little avoidance", "A moderate amount of avoidance", "A great deal of avoidance", "Extreme avoidance of nearly all things", "Prefer not to disclose"],
                            values: [0, 1, 2, 3, 4, 5]
                        },
                        {
                            prompt: "When you think about the possibility of harm or disasters, or if you cannot check or get reassurance about these things, how distressed or anxious did you become?",
                            responses: ["Not at all distressed/anxious", "Mildly distressed/anxious", "Moderately distressed/anxious", "Severely distressed/anxious", "Extremely distressed/anxious", "Prefer not to disclose"],
                            values: [0, 1, 2, 3, 4, 5]
                        },
                        {
                            prompt: "To what extent has your daily routine (work, school, self-care, social life) been disrupted by thoughts about harm or disasters and excessive checking or asking for reassurance?",
                            responses: ["No disruption at all", "A little disruption, but I mostly function well", "Many things are disrupted, but I can still manage", "My life is disrupted in many ways and I have trouble managing", "My life is completely disrupted and I cannot function at all", "Prefer not to disclose"],
                            values: [0, 1, 2, 3, 4, 5]
                        },
                        {
                            prompt: "How difficult is it for you to disregard thoughts about possible harm or disasters and refrain from checking or reassurance-seeking behaviours when you try to do so?",
                            responses: ["Not at all difficult", "A little difficult", "Moderately difficult", "Very difficult", "Extremely difficult", "Prefer not to disclose"],
                            values: [0, 1, 2, 3, 4, 5]
                        }
                    ],

                    // --- PAGE 3 ---
                    [
                        {
                            prompt: "About how much time have you spent each day with unwanted unpleasant thoughts and with behavioural or mental actions to deal with them?",
                            responses: ["None at all", "Less than 1 hour each day", "Between 1 and 3 hours each day", "Between 3 and 8 hours each day", "8 hours or more each day", "Prefer not to disclose"],
                            values: [0, 1, 2, 3, 4, 5]
                        },
                        {
                            prompt: "To what extent have you been avoiding situations, places, objects and other reminders (e.g., numbers, people) that trigger unwanted or unpleasant thoughts?",
                            responses: ["None at all", "A little avoidance", "A moderate amount of avoidance", "A great deal of avoidance", "Extreme avoidance of nearly all things", "Prefer not to disclose"],
                            values: [0, 1, 2, 3, 4, 5]
                        },
                        {
                            prompt: "When unwanted or unpleasant thoughts come to mind against your will how distressed or anxious did you become?",
                            responses: ["Not at all distressed/anxious", "Mildly distressed/anxious", "Moderately distressed/anxious", "Severely distressed/anxious", "Extremely distressed/anxious", "Prefer not to disclose"],
                            values: [0, 1, 2, 3, 4, 5]
                        },
                        {
                            prompt: "To what extent has your daily routine (work, school, self-care, social life) been disrupted by unwanted and unpleasant thoughts and efforts to avoid or deal with such thoughts?",
                            responses: ["No disruption at all", "A little disruption, but I mostly function well", "Many things are disrupted, but I can still manage", "My life is disrupted in many ways and I have trouble managing", "My life is completely disrupted and I cannot function at all", "Prefer not to disclose"],
                            values: [0, 1, 2, 3, 4, 5]
                        },
                        {
                            prompt: "How difficult is it for you to disregard unwanted or unpleasant thoughts and refrain from using behavioural or mental acts to deal with them when you try to do so?",
                            responses: ["Not at all difficult", "A little difficult", "Moderately difficult", "Very difficult", "Extremely difficult", "Prefer not to disclose"],
                            values: [0, 1, 2, 3, 4, 5]
                        }
                    ],
                    // --- PAGE 4 ---
                    [
                        {
                            prompt: "About how much time have you spent each day with unwanted thoughts about symmetry, order, or balance and with behaviours intended to achieve symmetry, order or balance?",
                            responses: ["None at all", "Less than 1 hour each day", "Between 1 and 3 hours each day", "Between 3 and 8 hours each day", "8 hours or more each day", "Prefer not to disclose"],
                            values: [0, 1, 2, 3, 4, 5]
                        },
                        {
                            prompt: "To what extent have you been avoiding situations, places or objects associated with feelings that something is not symmetrical or “just right?”",
                            responses: ["None at all", "A little avoidance", "A moderate amount of avoidance", "A great deal of avoidance", "Extreme avoidance of nearly all things", "Prefer not to disclose"],
                            values: [0, 1, 2, 3, 4, 5]
                        },
                        {
                            prompt: "When you have the feeling of something being “not just right,” how distressed or anxious did you become?",
                            responses: ["Not at all distressed/anxious", "Mildly distressed/anxious", "Moderately distressed/anxious", "Severely distressed/anxious", "Extremely distressed/anxious", "Prefer not to disclose"],
                            values: [0, 1, 2, 3, 4, 5]
                        },
                        {
                            prompt: "To what extent has your daily routine (work, school, self-care, social life) been disrupted by the feeling of things being “not just right,” and efforts to put things in order or make them feel right?",
                            responses: ["No disruption at all", "A little disruption, but I mostly function well", "Many things are disrupted, but I can still manage", "My life is disrupted in many ways and I have trouble managing", "My life is completely disrupted and I cannot function at all", "Prefer not to disclose"],
                            values: [0, 1, 2, 3, 4, 5]
                        },
                        {
                            prompt: "How difficult is it for you to disregard thoughts about the lack of symmetry and order, and refrain from urges to arrange things in order or repeat certain behaviours when you try to do so?",
                            responses: ["Not at all difficult", "A little difficult", "Moderately difficult", "Very difficult", "Extremely difficult", "Prefer not to disclose"],
                            values: [0, 1, 2, 3, 4, 5]
                        }
                    ],
                ];

                const total_pages = pages.length;
                let current_page = 0;
                const instructions = 'This questionnaire asks you about thoughts and behaviors that you might or might not experience.';

                //---------------------------------------//
                // 2. RENDER HTML
                //---------------------------------------//

                var html = '';

                // CSS
                html += `<style>
        .audit-header { width: 1000px; background-color: #fff; font-size: 16px; text-align: center; }
        input[type="radio"] { width: 14px; height: 14px; margin: 0 6px 0 0; }
        label { padding: 0 16px 0 20px; display: inline-block; }
        .audit-container { margin: auto; width: 1000px; background-color: #F8F8F8; border-radius: 5px; }
        .audit-prompt { float: left; width: 50%; margin-top: 6px; margin-bottom: 6px; font-size: 16px; text-align: left; }
        .audit-resp { float: left; width: 50%; margin-top: 6px; margin-bottom: 6px; font-size: 16px; text-align: left; }
        .row:after { content: ""; display: table; clear: both; }
        .audit-footer { margin: auto; width: 1000px; padding: 0 0 0 0; background-color: #fff; text-align: right; }
        .audit-btn { background-color: #F0F0F0; color: black; padding: 8px 20px; border: none; border-radius: 4px; float: right; margin-top: 2px; margin-bottom: 20px; cursor: pointer; }
        </style>`;

                html += "<div class=audit-header><p>" + instructions + "</p></div>";
                html += '<form id="jspsych-survey-audit">'
                html += '<div class="audit-container">';

                let global_q_index = 0;

                // --- LOOP THROUGH PAGES ---
                for (let p = 0; p < total_pages; p++) {
                    let display_style = (p === 0) ? "display: block;" : "display: none;";
                    html += `<div id="page-${p}" class="audit-page" style="${display_style}">`;

                    const current_items = pages[p];

                    for (let i = 0; i < current_items.length; i++) {
                        let item = current_items[i];
                        global_q_index++;
                        const qid = ("0" + global_q_index).slice(-2);

                        if (i > 0) { html += '<hr color="#fff">'; }

                        html += '<div class="row">';
                        html += `<div class="audit-prompt"><label for="Q${qid}">` + item.prompt + '</label></div>';
                        html += '<div class="audit-resp">';
                        for (let j = 0; j < item.responses.length; j++) {
                            // Note: We use 'required' here initially.
                            html += `<label><input type="radio" name="Q${qid}" value="${item.values[j]}" required>${item.responses[j]}</label><br>`;
                        }
                        html += '</div></div>';
                    }
                    html += `</div>`;
                }
                html += '</div>';

                // Buttons
                html += `<div class="audit-footer">`;
                if (total_pages > 1) {
                    html += `<button type="button" id="jspsych-survey-audit-next" class="audit-btn jspsych-btn">Next</button>`;
                }
                let submit_display = (total_pages > 1) ? "display: none;" : "";
                html += `<input type="submit" id="jspsych-survey-audit-submit" class="audit-btn jspsych-btn" value="${trial.button_label}" style="${submit_display}"></input>`;
                html += `</div>`;
                html += '</form>'

                display_element.innerHTML = html;

                //---------------------------------------//
                // 3. LOGIC & HANDLERS
                //---------------------------------------//

                const mediaQuery = window.matchMedia('(min-width: 1000px)');
                window.onbeforeunload = function () { window.scrollTo(0, 0); }

                var key_events = [], mouse_events = [], radio_events = [];
                var startTime = performance.now();

                function log_event(event) {
                    const response_time = performance.now() - startTime
                    if (event.screenX > 0) mouse_events.push(response_time);
                    else key_events.push(response_time);
                    if (event.target.type == "radio") radio_events.push(response_time)
                }
                document.addEventListener("click", log_event);

                const nextBtn = display_element.querySelector('#jspsych-survey-audit-next');
                const submitBtn = display_element.querySelector('#jspsych-survey-audit-submit');
                const form = display_element.querySelector('#jspsych-survey-audit');

                // --- HELPER TO VALIDATE CURRENT PAGE ONLY ---
                function validateCurrentPage() {
                    const currentPageDiv = display_element.querySelector(`#page-${current_page}`);
                    const inputs = currentPageDiv.querySelectorAll('input[type="radio"]');
                    let isValid = true;

                    // Check validity manually or using checkValidity()
                    for (let input of inputs) {
                        if (!input.checkValidity()) {
                            input.reportValidity(); // This triggers the browser popup on the visible element
                            isValid = false;
                            break;
                        }
                    }
                    return isValid;
                }

                // --- HELPER TO REMOVE REQUIRED FROM HIDDEN PAGES ---
                function removeRequiredFromCurrentPage() {
                    const currentPageDiv = display_element.querySelector(`#page-${current_page}`);
                    const inputs = currentPageDiv.querySelectorAll('input[type="radio"]');
                    for (let input of inputs) {
                        input.removeAttribute('required');
                    }
                }

                // --- NEXT BUTTON LOGIC ---
                if (nextBtn) {
                    nextBtn.addEventListener('click', function (e) {

                        // 1. Check if the visible questions are answered
                        if (validateCurrentPage()) {

                            // 2. IMPORTANT: Remove 'required' from these questions so they don't block the next pages
                            removeRequiredFromCurrentPage();

                            // 3. Switch Pages
                            const currentPageDiv = display_element.querySelector(`#page-${current_page}`);
                            currentPageDiv.style.display = 'none';

                            current_page++;

                            const nextPageDiv = display_element.querySelector(`#page-${current_page}`);
                            nextPageDiv.style.display = 'block';
                            window.scrollTo(0, 0);

                            // 4. Check if last page
                            if (current_page === total_pages - 1) {
                                nextBtn.style.display = 'none';
                                submitBtn.style.display = 'inline-block';
                            }
                        }
                    });
                }

                // --- SUBMIT LOGIC ---
                form.addEventListener('submit', function (event) {
                    event.preventDefault(); // Stop standard submit to handle data manually

                    // Final check for the last page
                    if (validateCurrentPage()) {

                        var endTime = performance.now();
                        var response_time = endTime - startTime;

                        // Simplified data gathering
                        const formData = new FormData(this);
                        const question_data = Object.fromEntries(formData.entries());

                        var trialdata = {
                            "rt": response_time,
                            "responses": question_data,
                            "screen_resolution": (mediaQuery.matches) ? 1 : 0
                        };

                        document.removeEventListener("click", log_event);
                        display_element.innerHTML = '';
                        jsPsych.finishTrial(trialdata);
                    }
                });
            }
        }
        SurveyDuditPlugin.info = info;
        return SurveyDuditPlugin;
    })(jsPsychModule);
