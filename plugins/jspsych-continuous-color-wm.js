var jsPsychContinuousColorWM = (function (jspsych) {
    'use strict';

    var css_added = false;

    const info = {
        name: "continuous-color-wm",
        parameters: {
            set_size: { type: jspsych.ParameterType.INT, default: 5 },
            num_placeholders: { type: jspsych.ParameterType.INT, default: 5 },
            confidence_timing: { type: jspsych.ParameterType.STRING, default: 'after_probe' },
            feedback: { type: jspsych.ParameterType.BOOL, default: false },
            stimulus_duration: { type: jspsych.ParameterType.INT, default: 500 },
            delay_time: { type: jspsych.ParameterType.INT, default: 1000 },
            item_radius: { type: jspsych.ParameterType.INT, default: 150 },
            item_size: { type: jspsych.ParameterType.INT, default: 70 },
            min_difference: { type: jspsych.ParameterType.INT, default: 30 },
            color_wheel_num_options: { type: jspsych.ParameterType.INT, default: 2 },
        },
    };

    class ContinuousColorWMPlugin {
        constructor(jsPsych) {
            this.jsPsych = jsPsych;
        }

        trial(display_element, trial) {

            if (!css_added) {
                var css = `

          .wm-container { 
              position: relative; 
              width: 800px; 
              height: 600px; 
              margin: 0 auto; 
              background-color: #E6E6E6; 
              border: 1px solid #000;
          }
          
          .wm-item { 
              position: absolute; 
              border-radius: 50%; 
              border: 1px solid black; 
              box-sizing: border-box; 
          }

          .wm-target-cue {
              border: 5px solid black !important;
              z-index: 10;
          }

          .wm-fixation { 
             position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
             font-size: 40px; cursor: pointer; color: black;
          }
          
          .wm-feedback {
             position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
             font-size: 50px; font-weight: bold;
          }

          .slider-container { width: 600px; margin: 50px auto; text-align: center; display: none; }
          .jspsych-slider { width: 100%; }
          .slider-labels { display: flex; justify-content: space-between; margin-top: 10px; font-size: 14px; }
          .slider-btn { margin-top: 20px; padding: 10px 20px; font-size: 16px; cursor: pointer; }
        `;
                var styleSheet = document.createElement("style");
                styleSheet.innerText = css;
                document.head.appendChild(styleSheet);
                css_added = true;
            }

            const lab2rgb = (lab) => {
                var y = (lab[0] + 16) / 116, x = lab[1] / 500 + y, z = y - lab[2] / 200;
                var r, g, b;
                x = 0.95047 * ((x * x * x > 0.008856) ? x * x * x : (x - 16 / 116) / 7.787);
                y = 1.00000 * ((y * y * y > 0.008856) ? y * y * y : (y - 16 / 116) / 7.787);
                z = 1.08883 * ((z * z * z > 0.008856) ? z * z * z : (z - 16 / 116) / 7.787);
                r = x * 3.2406 + y * -1.5372 + z * -0.4986;
                g = x * -0.9689 + y * 1.8758 + z * 0.0415;
                b = x * 0.0557 + y * -0.2040 + z * 1.0570;
                r = (r > 0.0031308) ? (1.055 * Math.pow(r, 1 / 2.4) - 0.055) : 12.92 * r;
                g = (g > 0.0031308) ? (1.055 * Math.pow(g, 1 / 2.4) - 0.055) : 12.92 * g;
                b = (b > 0.0031308) ? (1.055 * Math.pow(b, 1 / 2.4) - 0.055) : 12.92 * b;
                return "rgb(" + (Math.max(0, Math.min(1, r)) * 255) + "," + (Math.max(0, Math.min(1, g)) * 255) + "," + (Math.max(0, Math.min(1, b)) * 255) + ")";
            };

            const getLabColor = (deg) => {
                var a = deg; var b = 40; var deg2rad = Math.PI / 180;
                var a_lab = Math.cos(a * deg2rad) * b;
                var b_lab = Math.sin(a * deg2rad) * b;
                return lab2rgb([70, a_lab, b_lab]);
            };

            // Trial Structure 
            // 1. Pick colors
            var color_degrees = [];
            var attempts = 0;
            while (color_degrees.length < trial.set_size && attempts < 1000) {
                let cand = Math.floor(Math.random() * 360);
                let ok = true;
                for (let existing of color_degrees) {
                    let diff = Math.abs(cand - existing);
                    if (diff > 180) diff = 360 - diff;
                    if (diff < trial.min_difference) ok = false;
                }
                if (ok) color_degrees.push(cand);
                attempts++;
            }
            if (color_degrees.length < trial.set_size) {
                for (let k = color_degrees.length; k < trial.set_size; k++) color_degrees.push(Math.floor(Math.random() * 360));
            }

            // 2. Determine Target
            var target_idx = Math.floor(Math.random() * trial.set_size);
            var target_degree = color_degrees[target_idx];
            // 3. Generate Foil
            var offset = (Math.random() < 0.5 ? -30 : 30);
            var foil_degree = (target_degree + 180 + offset + 360) % 360;

            var options = [target_degree, foil_degree];
            options = this.jsPsych.randomization.shuffle(options);
            // 4. RT fix
            var start_time = 0; 
            
            var trial_data = {
                task: 'ContinuousWM',
                set_size: trial.set_size,
                confidence_timing: trial.confidence_timing,
                target_degree: target_degree,
                foil_degree: foil_degree,
                correct_degree: target_degree
            };

            display_element.innerHTML = `
        <div class="wm-container" id="wmStage">
            <div id="wmFixation" class="wm-fixation">+</div>
            <div id="wmItems"></div>
        </div>
        
        <div class="slider-container" id="wmSlider">
            <p style="font-size:24px; margin-bottom:20px;">
            ${trial.confidence_timing === 'before_stimuli' ? "How likely are you to remember the target?" : "How likely that you did remember the target?"}
            </p>
            <input type="range" min="0" max="100" value="50" class="jspsych-slider" id="confRange">
            <div class="slider-labels">
                <span>0% confident<br>(I was guessing)</span>
                <span>50% confident<br>(Somewhat uncertain)</span>
                <span>100% confident<br>(Completely certain)</span>
            </div>
            <button class="slider-btn" id="btnSubmitConf">Submit</button>
        </div>
      `;

            // Trial Canvases
            // 'encoding' (circles), 'delay' (no colors), 'probe' (target)
            const drawScene = (phase) => {
                var html = '';
                var cx = 400, cy = 300;


                for (let i = 0; i < trial.set_size; i++) {
                    let angle = (i * (2 * Math.PI) / trial.set_size) - (Math.PI / 2);

                    let x = cx + Math.cos(angle) * trial.item_radius - (trial.item_size/2);
                    let y = cy + Math.sin(angle) * trial.item_radius - (trial.item_size/2);
                    let bg_color = 'transparent'; 
                    let border_class = 'wm-item'; 

                    // encoding
                    if (phase === 'encoding') {
                        bg_color = getLabColor(color_degrees[i]);
                    }

                    // probe
                    if (phase === 'probe' && i === target_idx) {
                        border_class = 'wm-item wm-target-cue'; 
                    }

                    html += `<div class="${border_class}" style="left:${x}px; top:${y}px; width:${trial.item_size}px; height:${trial.item_size}px; background-color:${bg_color};"></div>`;
                }

                if (phase === 'probe') {
                   
                    let opt1_col = getLabColor(options[0]);
                    let opt2_col = getLabColor(options[1]);

                    let choiceWidth = trial.item_size / 2;
                    let gap = 20; 

                    html += `<div class="wm-item wm-choice" data-degree="${options[0]}" style="left:${cx - gap - choiceWidth}px; top:${cy - choiceWidth / 2}px; width:${choiceWidth}px; height:${choiceWidth}px; background-color:${opt1_col}; cursor:pointer; border: 2px black;"></div>`;
                    html += `<div class="wm-item wm-choice" data-degree="${options[1]}" style="left:${cx + gap}px; top:${cy - choiceWidth / 2}px; width:${choiceWidth}px; height:${choiceWidth}px; background-color:${opt2_col}; cursor:pointer; border: 2px black;"></div>`;
                }

                document.getElementById('wmItems').innerHTML = html;

                if (phase === 'probe') {
                    document.querySelectorAll('.wm-choice').forEach(el => {
                        el.addEventListener('click', handleResponse);
                    });
                }
            };
            // Assemble trial structure
            const startSequence = () => {
                if (trial.confidence_timing === 'before_stimuli') {
                    runSliderPhase(runMemoryPhase);
                } else {
                    runMemoryPhase();
                }
            };

            const runMemoryPhase = () => {
                document.getElementById('wmStage').style.display = 'block';
                document.getElementById('wmFixation').style.display = 'block';

                document.getElementById('wmFixation').addEventListener('click', () => {
                    
                    drawScene('encoding');

                    this.jsPsych.pluginAPI.setTimeout(() => {
                        
                        drawScene('delay');
                        this.jsPsych.pluginAPI.setTimeout(() => {
                            
                            document.getElementById('wmFixation').style.display = 'none';
                            drawScene('probe');
                            start_time = performance.now();
                        }, trial.delay_time);

                    }, trial.stimulus_duration);
                }, { once: true });
            };

            const handleResponse = (e) => {
                var rt = performance.now() - start_time; 
                trial_data.rt = rt;
                var chosen_deg = parseInt(e.target.getAttribute('data-degree'));
                trial_data.response_degree = chosen_deg;
                trial_data.response_correct = (chosen_deg === target_degree);

                document.getElementById('wmItems').innerHTML = '';

                if (trial.confidence_timing === 'after_probe') {
                    runSliderPhase(handleFeedback);
                } else {
                    handleFeedback();
                }
            };

            const runSliderPhase = (callback) => {
                document.getElementById('wmStage').style.display = 'none';
                var sliderDiv = document.getElementById('wmSlider');
                sliderDiv.style.display = 'block';

                var range = document.getElementById('confRange');
                var btn = document.getElementById('btnSubmitConf');

                var start_time_conf = performance.now();

                btn.onclick = () => { 
                    trial_data.confidence = range.value;
                    trial_data.rt_conf = performance.now() - start_time_conf;
                    sliderDiv.style.display = 'none';
                    callback();
                };
            };

            const handleFeedback = () => {
                if (trial.feedback) {
                    document.getElementById('wmStage').style.display = 'block';
                    var msg = trial_data.response_correct ? "<span style='color:green'>CORRECT</span>" : "<span style='color:red'>INCORRECT</span>";
                    document.getElementById('wmItems').innerHTML = `<div class='wm-feedback'>${msg}</div>`;

                    this.jsPsych.pluginAPI.setTimeout(() => {
                        this.jsPsych.finishTrial(trial_data);
                    }, 1000);
                } else {
                    this.jsPsych.finishTrial(trial_data);
                }
            };

            startSequence();
        }
    }
    ContinuousColorWMPlugin.info = info;
    return ContinuousColorWMPlugin;
})(jsPsychModule);

