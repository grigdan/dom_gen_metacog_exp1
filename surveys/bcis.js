/**
* Beck Cognitive Insight Scale (BCIS)
*
**/

var bcis = {
  type: jsPsychSurveyTemplate,
  items: [
    "At times, I have misunderstood other people's attitudes towards me.",
    "My interpretations of my experiences are definitely right.",
    "Other people can understand the cause of my unusual experiences better than I can.",
    "I have jumped to conclusions too fast.",
    "Some of my experiences that have seemed very real may have been due to my imagination.",
    "Some of the ideas I was certain were true turned out to be false.",
    "If something feels right, it means that it is right.",
    "Even though I feel strongly that I am right, I could be wrong.",
    "I know better than anyone else what my problems are.",
    "When people disagree with me, they are generally wrong.",
    "I cannot trust other people's opinion about my experiences.",
    "If somebody points out that my beliefs are wrong, I am willing to consider it.",
    "I can trust my own judgment at all times.",
    "There is often more than one possible explanation for why people act the way they do.",
    "My unusual experiences may be due to my being extremely upset or stressed."
  ],
  scale: [
    "Do not agree at all",
    "Agree slightly",
    "Agree a lot",
    "Agree completely",
    "Prefer not to disclose"
  ],
  reverse: [
    false, false, false, false, false, false, false, false, false,
  ],
  instructions: 'Below is a list of sentences about how people think and feel. Please read each sentence in the list carefully. Indicate how much you agree with each statement.',
  survey_width: 950,
  item_width: 40,
  scale_repeat: 8,
}
