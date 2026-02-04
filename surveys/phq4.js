/**
* Patient health questionnaire (PHQ-4)
*
* Kroenke, K., Spitzer, R. L., & Williams, J. B. (2001). The PHQ‐9: validity of
* a brief depression severity measure. Journal of general internal medicine,
* 16(9), 606-613.
*
**/

var phq4 = {
  type: jsPsychSurveyTemplate,
  items: [
    "Feeling nervous, anxious or on edge",
    "Not being able to stop or control worrying",
    "Feeling down, depressed, or hopeless",
    "Little interest or pleasure in doing things"
  ],
  scale: [
    "Not at all",
    "Several days",
    "More than half the days",
    "Nearly every day",
    "Prefer not to disclose"
  ],
  reverse: [
    false, false, false, false, false, false, false, false, false,
  ],
  instructions: 'Over the last 2 weeks, how often have you been bothered by the following problems?',
  survey_width: 950,
  item_width: 40,
  scale_repeat: 9,
}
