export const en = {
  // App Header
  appTitle: "CogniTrain",
  stats: "Stats",
  history: "History",
  settings: "Settings",

  // Common
  startTraining: "Start Training",
  trainingCompleted: "Training Completed!",
  trainingEffect: "This training session has significantly boosted brain cortex activity.",
  finalScore: "Final Score",
  returnHome: "Return Home",
  score: "Score",

  // Games
  games: {
    schulte: {
      title: "Schulte Table",
      subtitle: "Visual Search & Focus",
      description: "Find numbers in ascending order within 30 seconds to improve visual search and attention skills.",
      duration: "30 sec",
      benefits: ["Broad Vision", "Attention Stability", "Visual Directional Search"],
      howToPlay: [
        "Keep your eyes focused on the center of the grid.",
        "Use peripheral vision to perceive surrounding numbers.",
        "Click numbers in order (1-25) as quickly as possible.",
        "Minimize large eye movements."
      ],
      science: "Schulte table training activates parietal and frontal cortex through high-intensity visual search tasks, enhancing thalamo-cortical circuit efficiency. Studies show this training significantly improves selective attention and visual scanning speed.",
      citation: "Tonkonogii, I. M. (1973). Brief Neuropsychological Examination."
    },
    stroop: {
      title: "Stroop Effect",
      subtitle: "Interference Resistance & Inhibitory Control",
      description: "Name the color of the word rather than reading the word itself, exercising the prefrontal cortex and temporal lobes to improve memory, attention, and multitasking abilities.",
      duration: "1 min",
      benefits: ["Inhibitory Control", "Cognitive Flexibility", "Prefrontal Activation"],
      howToPlay: [
        "Chinese characters representing colors will appear (e.g., '红' for red).",
        "The font color may differ from the word meaning (e.g., blue '红' character).",
        "Ignore the word meaning and quickly select the **font color**.",
        "If the character is red, click the 'red' button."
      ],
      science: "The Stroop task requires the brain to inhibit automated reading responses (word meaning) and instead process weaker stimuli (color). This process strongly activates the anterior cingulate cortex (ACC) and dorsolateral prefrontal cortex (DLPFC), serving as the gold standard for measuring executive function and inhibitory control.",
      citation: "Stroop, J. R. (1935). Studies of interference in serial verbal reactions.",
      // Stroop specific
      chooseColor: "Choose the color of this word",
      correctCount: "Correct Answers",
      wrongCount: "Wrong Answers",
      accuracy: "Accuracy",
      detailedStats: "Detailed Statistics"
    },
    serialMemory: {
      title: "Serial Working Memory",
      subtitle: "Dynamic Memory Encoding",
      description: "Remember item categories and their sequence to enhance memory encoding and retrieval abilities, improving learning skill acquisition speed.",
      duration: "3 min",
      benefits: ["Working Memory Refresh", "Sequence Reconstruction", "Visuospatial Sketchpad"],
      howToPlay: [
        "Observe items appearing sequentially on screen.",
        "Remember both their content and **appearance order**.",
        "After display ends, reconstruct the item sequence in **original order** from options below.",
        "Difficulty increases with each level."
      ],
      science: "Serial memory tasks exercise the 'phonological loop' and 'visuospatial sketchpad' in working memory. According to Baddeley's working memory model, enhanced sequence recall ability helps improve fluid intelligence and complex task learning efficiency.",
      citation: "Baddeley, A. D. (2000). The episodic buffer: A new component of working memory?",
      level: "Level {level}",
      memorizeTime: "Memorize time: {time}s",
      restoreSequence: "Restore items in original order",
      clickToFill: "Click items below to fill here"
    },
    auditoryAttention: {
      title: "Auditory Selective Attention",
      subtitle: "Auditory Processing & Focus",
      description: "Remember numbers and their sequence to exercise auditory cortex and prefrontal cortex, enhancing attention regulation abilities.",
      duration: "4 min",
      benefits: ["Auditory Working Memory", "Focused Attention", "Interference Resistance"],
      howToPlay: [
        "Close your eyes or concentrate, carefully listen to the number sequence being read.",
        "After numbers finish playing, input them in **original order** in the text box.",
        "Number sequences get longer with increasing levels.",
        "Please ensure you're in a quiet environment."
      ],
      science: "Auditory digit span testing primarily involves the left temporoparietal junction and frontal lobe networks. This training enhances the brain's ability to maintain instantaneous auditory information (echoic memory) and encode it into long-term memory.",
      citation: "Conway, A. R., et al. (2005). Working memory span tasks: A methodological review.",
      level: "Level {level}",
      listenNumbers: "Listen to numbers, then input in order.",
      playing: "Playing...",
      replay: "Listen again",
      submitAnswer: "Submit Answer",
      correct: "Correct!",
      wrong: "Wrong. Correct answer: {answer}"
    },
    mirrorCoordination: {
      title: "Bilateral Mirror Coordination",
      subtitle: "Whole Brain Synergy Development",
      description: "Draw mirror images with both hands simultaneously to exercise motor cortex and cerebellum, improving typing and writing efficiency while reducing mental blocks.",
      duration: "6 min",
      benefits: ["Interhemispheric Integration", "Fine Motor Control", "Corpus Callosum Strengthening"],
      howToPlay: [
        "This typically requires a touchscreen or mouse.",
        "Draw on one side of screen, strokes will mirror to the other side in real-time.",
        "Try to smoothly trace along the gray guide lines.",
        "Feel the coordination of both brain hemispheres controlling hand movements simultaneously."
      ],
      science: "Bilateral coordinated movement requires efficient signal transmission between left and right brain hemispheres through the corpus callosum. This training enhances connections between motor cortex (M1) and cerebellum, improving bilateral integration abilities and helping develop complex motor skills.",
      citation: "Serrien, D. J., et al. (2006). Lateralization of motor control in the human brain."
    },
    logicClassification: {
      title: "Rule-Based Classification Logic",
      subtitle: "Executive Function & Decision Making",
      description: "Categorize items by their properties to optimize logical ability, classification thinking, and information integration, improving decision-making efficiency.",
      duration: "7 min",
      benefits: ["Concept Formation", "Category Abstraction", "Fast Decision Making"],
      howToPlay: [
        "AI will generate a core vocabulary (e.g., 'apple').",
        "You need to quickly select its **correct classification** from options (e.g., 'fruit').",
        "Some options may be misleading, judge based on essential properties.",
        "Balance speed and accuracy."
      ],
      science: "A variant of the Wisconsin Card Sorting Test (WCST). Classification tasks rely on prefrontal cortex to extract rules and maintain set. This training enhances the brain's ability to process abstract concepts and perform top-down information processing.",
      citation: "Milner, B. (1963). Effects of different brain lesions on card sorting.",
      question: "Question {current} / {total}",
      score: "Score: {score}",
      classifyItem: "Classify this item",
      generating: "Preparing logic puzzles..."
    },
    contextMemory: {
      title: "Context Association Memory",
      subtitle: "Semantic & Contextual Integration",
      description: "Build coherent scene stories with items to enhance memory storage, association abilities, and semantic memory integration.",
      duration: "8 min",
      benefits: ["Associative Memory", "Creative Thinking", "Hippocampal Activation"],
      howToPlay: [
        "System will randomly provide 3 unrelated items.",
        "Use imagination to create a short story linking them together.",
        "The more vivid and bizarre the story, the better the memory effect.",
        "Build mental images, then write down or mentally rehearse your story."
      ],
      science: "Contextual memory depends on the hippocampus and medial temporal lobe system. Through 'elaborative' (Elaboration) strategies, isolated information can be woven into meaningful networks, significantly improving long-term memory storage and retrieval.",
      citation: "Tulving, E. (1972). Episodic and semantic memory.",
      theme: "Theme suggestion: {theme}",
      createStory: "Connect these items into a story",
      storyPlaceholder: "Once upon a time...",
      completeCreation: "Complete Creation",
      pickingItems: "Picking story elements..."
    }
  },

  // Training Session
  trainingGuide: "Training Guide",
  sciencePrinciple: "Scientific Principle",

  // Dashboard
  brainTrainingGames: "Brain Training Games",
  selectGameToStart: "Select a game to start training",

  // Language
  language: "Language",
  chinese: "中文",
  english: "English"
};

export type TranslationKeys = typeof en;
