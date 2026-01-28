/**
* Metacognition Self-Assessment Scale (MSAS)
*
* Kroenke, K., Spitzer, R. L., & Williams, J. B. (2001). The PHQ‐9: validity of
* a brief depression severity measure. Journal of general internal medicine,
* 16(9), 606-613.
*
**/

var msas_a = {
    type: jsPsychSurveyTemplate,
    items: [
    "I can distinguish and differentiate my own mental abilities (e.g. remembering, imagining, having fantasies, dreaming, desiring, deciding, foreseeing and thinking).",  
    "I can define, distinguish and name my own emotions.",  
    "I am aware of what are the thoughts or emotions that lead my actions.",  
    "I am aware that what I think about myself is an idea and not necessarily true. I realize that my opinions may not be accurate and may change.", 
    "I am aware that what I wish or what I expect may not be realized and that I have a limited power to influence things.", 
    "I can clearly perceive and describe my thoughts, emotions and relationships in which I am involved.",
    "I can describe the thread that binds my thoughts and my emotions even when they differ from one moment to the next." 

    ],
    scale: [
    "Never", 
    "Rarely", 
    "Sometimes", 
    "Frequently", 
    "Almost always"
    ],
    reverse: [
    false, false, false, false, false, false, false,
    ],
    instructions: 'RESPECT TO MYSELF, USUALLY…',
    survey_width: 950,
    item_width: 40,
    scale_repeat: 9,
}
var msas_b = {
  type: jsPsychSurveyTemplate,
  items: [
    "I can understand and distinguish the different mental activities as when they are, for example, remembering, imagining, having fantasies, dreaming, desiring, deciding, foreseeing and thinking.", 
    "I can identify and understand the emotions of people I know.", 
    "I can describe the thread that binds thoughts and emotions of people I know, even when they differ from one moment to the next." 
  ],
  scale: [
    "Never", 
    "Rarely", 
    "Sometimes", 
    "Frequently", 
    "Almost always"
    ],
  reverse: [
    false, false, false, 
  ],
  instructions: 'RESPECT TO OTHERS, USUALLY …',
  survey_width: 950,
  item_width: 40,
  scale_repeat: 9,
}
var msas_c = {
  type: jsPsychSurveyTemplate,
  items: [
    "I’m aware that I am not necessarily at the centre of the other’s thoughts, feelings and emotions and that other’s behaviours arise from reasons and goals that can be independent from my own perspective and from my own involvement in the relationship.", 
    "I am aware that others may perceive facts and events in a different way from me and interpret them differently.", 
    "I am aware that age and life experience can touch other’s thoughts, emotions and behaviour." 
    ],
  scale: [
    "Never", 
    "Rarely", 
    "Sometimes", 
    "Frequently", 
    "Almost always"
    ],
  reverse: [
    false, false, false, 
  ],
  instructions: 'RESPECT TO “PUT YOURSELF IN SOMEBODY SHOES”, USUALLY …',
  survey_width: 950,
  item_width: 40,
  scale_repeat: 9,
}
var msas_d = {
  type: jsPsychSurveyTemplate,
  items: [
    "I can deal with the problem voluntarily imposing or inhibiting a behaviour on myself.", 
    "I can deal with the problems voluntarily trying to follow my own mental order.", 
    "I can deal with the problems trying to challenge or enrich my views and my beliefs on problems themselves.", 
    "When problems are related to the relationship with the other people, I try to solve them on the basis of what I believe to be their mental functioning.", 
    "I can deal with the problems, recognizing and accepting my limitations in managing myself and influencing events."
  ],
  scale: [
    "Never", 
    "Rarely", 
    "Sometimes", 
    "Frequently", 
    "Almost always"
    ],
  reverse: [
    false, false, false, false, false, 
  ],
  instructions: 'RESPECT TO SOLVING PROBLEMS, USUALLY …',
  survey_width: 950,
  item_width: 40,
  scale_repeat: 9,
}
