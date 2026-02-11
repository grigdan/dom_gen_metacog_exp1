var jsPsychNumerosityEstimationEnsemble = (function (jspsych) {
    'use strict';
    var css_added = false;

    const info = {
        name: "numerosity-estimation-ensemble",
        parameters: {
            stimulus: { type: jspsych.ParameterType.STRING, default: undefined },
            stimulus2: { type: jspsych.ParameterType.STRING, default: null },
            proportion_stim1: { type: jspsych.ParameterType.FLOAT, default: 1.0 },
            numerosity: { type: jspsych.ParameterType.INT, default: 50 },
            stimulus_duration: { type: jspsych.ParameterType.INT, default: 1000 },
            number_of_frames: { type: jspsych.ParameterType.INT, default: 4 },
            grid_rows: { type: jspsych.ParameterType.INT, default: 11 },
            grid_cols: { type: jspsych.ParameterType.INT, default: 11 },
            left_image: { type: jspsych.ParameterType.STRING, default: undefined },
            right_image: { type: jspsych.ParameterType.STRING, default: undefined },
            correct_response: { type: jspsych.ParameterType.STRING, default: null },
            confidence_timing: { type: jspsych.ParameterType.STRING, default: 'after' },
            feedback: { type: jspsych.ParameterType.BOOL, default: false },
            canvas_width: { type: jspsych.ParameterType.INT, default: 800 },
            canvas_height: { type: jspsych.ParameterType.INT, default: 600 }
        },
    };

    class NumerosityEstimationPlugin {
        constructor(jsPsych) {
            this.jsPsych = jsPsych;
        }

        trial(display_element, trial) {

            if (!css_added) {
                var css = `
        
        .slider-container { width: 600px; margin: 50px auto; text-align: center; display: none; }
        .jspsych-slider { width: 100%; }
        .slider-labels { display: flex; justify-content: space-between; margin-top: 10px; font-size: 14px; }
        .slider-btn { margin-top: 20px; padding: 10px 20px; font-size: 16px; cursor: pointer; }

        .num-container { display: flex; justify-content: space-between; align-items: center; width: 90%; margin: 50px auto; }
        .num-option { text-align: center; cursor: pointer; transition: transform 0.2s; }
        .num-option:hover { transform: scale(1.05); }
        .num-img { width: 200px; height: auto; border: 4px solid transparent; }
        .num-keys { font-size: 20px; margin-top: 10px; font-weight: bold; }
        .num-prompt { font-size: 24px; margin-top: 20px; text-align: center; }
        .feedback-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background: #ffffff; z-index: 999; }
        .feedback-msg { font-size: 50px; font-weight: bold; }
        `;
                var styleSheet = document.createElement("style");
                styleSheet.innerText = css;
                document.head.appendChild(styleSheet);
                css_added = true;
            }

            var trial_data = {
                numerosity: trial.numerosity,
                proportion_stim1: trial.proportion_stim1,
                task: 'numerosity_2afc',
                confidence_timing: trial.confidence_timing
            };

            const startTrial = () => {
                if (trial.confidence_timing === 'before') {
                    showConfidence(runAnimationSequence);
                } else {
                    runAnimationSequence();
                }
            };

            const showConfidence = (callback) => {
            display_element.innerHTML = `
                <div class="confidence-container" style="max-width: 800px; margin: 50px auto; text-align: center;">
                
                    <p style="font-size:24px; margin-bottom:40px;">
                    ${trial.confidence_timing === 'before' ? "How confident are you that you WILL choose correctly?" : "How confident are you that you DID choose correctly?"}
                    </p>

                <div style="display: flex; justify-content: center; gap: 8px; margin-bottom: 10px;">
                    ${[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(val => 
                        `<button class="conf-btn" data-value="${val}" 
                                 style="
                                    width: 55px; 
                                    height: 45px;
                                    padding: 0;
                                    display: flex; 
                                    align-items: center; 
                                    justify-content: center;
                                    font-size: 15px; 
                                    cursor: pointer; 
                                    border: 1px solid #ccc; 
                                    background-color: #f0f0f0; 
                                    border-radius: 5px;
                                    transition: all 0.2s;
                                 ">
                            ${val}%
                         </button>`
                    ).join('')}
                </div>

                <div style="display: flex; justify-content: space-between; font-size: 14px; color: #555; margin-bottom: 30px; padding: 0 5px;">
                    <span style="text-align: center;">Guessing</span>
                    <span style="text-align: center;">Uncertain</span>
                    <span style="text-align: center;">Certain</span>
                </div>

                <button id="btnSubmitConf" class="jspsych-btn" disabled 
                        style="padding: 12px 30px; font-size: 18px; opacity: 0.5; cursor: not-allowed;">
                    Submit Confidence
                </button>
                </div>
            `;
            var selectedValue = null;
            var start_time_conf = performance.now();
          
            const buttons = display_element.querySelectorAll('.conf-btn');
            const submitBtn = document.getElementById('btnSubmitConf');
            
            buttons.forEach(btn => {
                btn.addEventListener('click', function() {
                    
                    buttons.forEach(b => {
                        b.style.backgroundColor = '#f0f0f0';
                        b.style.color = 'black';
                        b.style.border = '1px solid #ccc';
                    });
                  
                    this.style.backgroundColor = '#2196F3'; 
                    this.style.color = 'white';
                    this.style.border = '1px solid #1976D2';

                    
                    selectedValue = parseInt(this.getAttribute('data-value'));
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.cursor = 'pointer';
                });
            });
            
            submitBtn.addEventListener('click', () => {
              if (selectedValue !== null) {
                  trial_data.confidence = selectedValue;
                  trial_data.rt_conf = performance.now() - start_time_conf;

                  display_element.innerHTML = '';
                  callback();
                    }            
                });
            };

            const runAnimationSequence = () => {

                var canvas = document.createElement("canvas");
                canvas.width = trial.canvas_width;
                canvas.height = trial.canvas_height;
                canvas.style.backgroundColor = "#E6E6E6";
                canvas.style.border = "1px solid #ccc";
                canvas.style.margin = "0 auto";
                canvas.style.display = "block";
                display_element.appendChild(canvas);
                var ctx = canvas.getContext("2d");

                ctx.fillStyle = "black";
                ctx.font = "50px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText("+", trial.canvas_width / 2, trial.canvas_height / 2);

                document.body.style.cursor = 'none';
                var jitter = Math.floor(Math.random() * 100) + 500;
                this.jsPsych.pluginAPI.setTimeout(() => {

                    
                    ctx.clearRect(0, 0, trial.canvas_width, trial.canvas_height);

                    var count1 = Math.round(trial.numerosity * trial.proportion_stim1);
                    var count2 = trial.numerosity - count1;
                    trial_data.count_stimulus1 = count1;
                    trial_data.count_stimulus2 = count2;

                    var rows = trial.grid_rows;
                    var cols = trial.grid_cols;
                    if (rows * cols < trial.numerosity) {
                        var root = Math.ceil(Math.sqrt(trial.numerosity));
                        rows = root; cols = root;
                    }

                    var cellWidth = trial.canvas_width / cols;
                    var cellHeight = trial.canvas_height / rows;
                    var itemSize = Math.min(cellWidth, cellHeight) * 0.7;
                    var maxJitterX = cellWidth - itemSize;
                    var maxJitterY = cellHeight - itemSize;

                    var allGridCells = [];
                    for (let r = 0; r < rows; r++) {
                        for (let c = 0; c < cols; c++) {
                            allGridCells.push({ baseX: (c * cellWidth), baseY: (r * cellHeight) });
                        }
                    }

                    const loadImg = (src) => {
                        return new Promise((resolve) => {
                            if (!src) resolve(null);
                            const img = new Image();
                            img.onload = () => resolve(img);
                            img.onerror = () => resolve(null);
                            img.src = src;
                        });
                    };

                    Promise.all([loadImg(trial.stimulus), loadImg(trial.stimulus2)]).then((images) => {
                        const img1 = images[0];
                        const img2 = images[1];
                        const frameDuration = trial.stimulus_duration / trial.number_of_frames;
                        let currentFrame = 0;

                        const drawFrame = () => {
                            if (currentFrame >= trial.number_of_frames) {
                                clearInterval(animationInterval);
                                showChoiceScreen();
                                return;
                            }
                            ctx.clearRect(0, 0, trial.canvas_width, trial.canvas_height);
                            var availableCells = this.jsPsych.randomization.shuffle([...allGridCells]);
                            var cellsForStim1 = availableCells.slice(0, count1);
                            var cellsForStim2 = availableCells.slice(count1, count1 + count2);

                            if (img1 && count1 > 0) {
                                for (let cell of cellsForStim1) {
                                    ctx.drawImage(img1, cell.baseX + Math.random() * maxJitterX, cell.baseY + Math.random() * maxJitterY, itemSize, itemSize);
                                }
                            }
                            if (img2 && count2 > 0) {
                                for (let cell of cellsForStim2) {
                                    ctx.drawImage(img2, cell.baseX + Math.random() * maxJitterX, cell.baseY + Math.random() * maxJitterY, itemSize, itemSize);
                                }
                            }
                            currentFrame++;
                        };
                        drawFrame();
                        var animationInterval = setInterval(drawFrame, frameDuration);
                    });
                }, jitter);
            };

            const showChoiceScreen = () => {
                document.body.style.cursor = 'default';
                display_element.innerHTML = '';
                var html = `
          <div class="num-prompt">Which had more elements presented?<br><span style="font-size:18px">Click on the image.</span></div>
          <div class="num-container">
              <div class="num-option" id="choice-left">
                  <img src="${trial.left_image}" class="num-img">
              </div>
              
              <div class="num-option" id="choice-right">
                  <img src="${trial.right_image}" class="num-img">
              </div>
          </div>`;
                display_element.innerHTML = html;

                var start_time_resp = performance.now();
                
                const handleResponse = (choice) => {
                    var rt = performance.now() - start_time_resp;
                    trial_data.rt = rt;
                    trial_data.response = choice; 

                    var correct = (choice === trial.correct_response);
                    trial_data.correct = correct;

                    if (trial.confidence_timing === 'after') {
                        showConfidence(checkFeedback);
                    } else {
                        checkFeedback();
                    }
                };
                
                document.getElementById('choice-left').addEventListener('click', () => handleResponse('left'));
                document.getElementById('choice-right').addEventListener('click', () => handleResponse('right'));
            };

            const checkFeedback = () => {
                if (trial.feedback && trial.correct_response) {
                    const color = trial_data.correct ? 'green' : 'red';
                    const msg = trial_data.correct ? 'CORRECT' : 'INCORRECT';

                    display_element.innerHTML = `
                <div class="feedback-overlay"><div class="feedback-msg" style="color: ${color};">${msg}</div></div>`;
                    setTimeout(endTrial, 1000);
                } else {
                    endTrial();
                }
            };

            const endTrial = () => {
                document.body.style.cursor = 'default';
                display_element.innerHTML = '';
                this.jsPsych.finishTrial(trial_data);
            };

            startTrial();
        }
    }
    NumerosityEstimationPlugin.info = info;
    return NumerosityEstimationPlugin;
})(jsPsychModule);