export const zh = {
  // App Header
  appTitle: "CogniTrain",
  stats: "统计",
  history: "历史",
  settings: "设置",

  // Common
  startTraining: "开始训练",
  trainingCompleted: "训练完成!",
  trainingEffect: "本次训练效果显著，大脑皮层活跃度提升。",
  finalScore: "最终得分",
  returnHome: "返回主页",
  score: "分数",

  // Games
  games: {
    schulte: {
      title: "舒尔特方格",
      subtitle: "视觉搜索与专注力",
      description: "通过在30秒内按升序寻找数字，提高视觉搜索和注意力，增加专注力。",
      duration: "30秒",
      benefits: ["广度视觉", "注意力稳定性", "视觉定向搜索"],
      howToPlay: [
        "保持视线集中在方格中心。",
        "利用余光感知周围数字。",
        "按顺序（1-25）尽可能快地点击数字。",
        "尽量减少眼球大幅度移动。"
      ],
      science: "舒尔特表训练通过高强度的视觉搜索任务，激活顶叶和额叶皮层，增强丘脑-皮层回路的效率。研究表明，这种训练能显著提高选择性注意力和视觉扫描速度。",
      citation: "Tonkonogii, I. M. (1973). Brief Neuropsychological Examination."
    },
    stroop: {
      title: "斯特鲁普效应",
      subtitle: "抗干扰与抑制控制",
      description: "说出字的颜色而非字本身，锻炼前额叶皮层和颞叶，提升记忆力、注意力和多任务处理能力。",
      duration: "1分钟",
      benefits: ["抑制控制", "认知灵活性", "前额叶激活"],
      howToPlay: [
        "屏幕上会出现表示颜色的汉字（如'红'）。",
        "字的字体颜色可能与字义不同（如蓝色的'红'字）。",
        "请忽略字的含义，快速选择**字体的颜色**。",
        "如果字是红色的，就点'红色'按钮。"
      ],
      science: "斯特鲁普任务要求大脑抑制自动化的阅读反应（字义），转而处理较弱的刺激（颜色）。这一过程强烈激活前扣带皮层（ACC）和背外侧前额叶（DLPFC），是衡量执行功能和抑制控制的黄金标准。",
      citation: "Stroop, J. R. (1935). Studies of interference in serial verbal reactions.",
      // Stroop specific
      chooseColor: "选择这个字的颜色",
      correctCount: "正确题数",
      wrongCount: "错误题数",
      accuracy: "正确率",
      detailedStats: "详细统计"
    },
    serialMemory: {
      title: "序列工作记忆",
      subtitle: "动态记忆编码",
      description: "记住物品品类和出现顺序，增强记忆编码和提取能力，提高学习技能的速度。",
      duration: "3分钟",
      benefits: ["工作记忆刷新", "序列重构", "视觉空间画板"],
      howToPlay: [
        "观察屏幕上依次出现的物品。",
        "记住它们的内容以及**出现的顺序**。",
        "展示结束后，在下方选项中按**原顺序**还原物品序列。",
        "难度会随关卡提升。"
      ],
      science: "序列记忆任务锻炼'工作记忆'中的'语音回路'和'视觉空间画板'。根据Baddeley的工作记忆模型，增强序列回忆能力有助于提升流体智力和复杂任务的学习效率。",
      citation: "Baddeley, A. D. (2000). The episodic buffer: A new component of working memory?",
      level: "第 {level} 关",
      memorizeTime: "记忆时间: {time}秒",
      restoreSequence: "按原顺序还原物品",
      clickToFill: "点击下方物品填充此处"
    },
    auditoryAttention: {
      title: "听觉选择性注意",
      subtitle: "听觉加工与专注",
      description: "记住数字和出现顺序，锻炼听觉皮层和前额叶皮层，增强注意力调控能力。",
      duration: "4分钟",
      benefits: ["听觉工作记忆", "集中注意力", "抗干扰能力"],
      howToPlay: [
        "闭上眼睛或集中精神，仔细聆听读出的数字串。",
        "数字播放完毕后，在输入框中按**原顺序**输入数字。",
        "随着等级提升，数字串会变长。",
        "请确保在安静的环境下进行。"
      ],
      science: "听觉数字广度测试主要涉及左侧颞顶联合区和前额叶网络。这种训练能够增强大脑对瞬时听觉信息的保持能力（回声记忆）以及将其转化为长期记忆的编码能力。",
      citation: "Conway, A. R., et al. (2005). Working memory span tasks: A methodological review.",
      level: "第 {level} 关",
      listenNumbers: "听数字，然后按顺序输入。",
      playing: "正在朗读...",
      replay: "重听一遍",
      submitAnswer: "提交答案",
      correct: "正确!",
      wrong: "错误。正确答案是: {answer}"
    },
    mirrorCoordination: {
      title: "双侧肢体镜像协调",
      subtitle: "全脑协同开发",
      description: "双手同步画镜像图形，锻炼运动皮层和小脑，提高打字、写字效率，减少思维卡顿。",
      duration: "6分钟",
      benefits: ["半球间整合", "精细运动控制", "胼胝体强化"],
      howToPlay: [
        "这通常需要触摸屏或鼠标。",
        "在屏幕一侧绘画，笔迹会实时镜像到另一侧。",
        "尝试沿着灰色的引导线，平滑地描绘图形。",
        "感受左右脑同时控制手部运动的协调感。"
      ],
      science: "双侧协调运动需要左右大脑半球通过胼胝体进行高效的信号传递。这种训练能增强运动皮层（M1）和小脑的连接，改善双侧整合能力，有助于提升复杂运动技能的学习。",
      citation: "Serrien, D. J., et al. (2006). Lateralization of motor control in the human brain."
    },
    logicClassification: {
      title: "规则导向分类逻辑",
      subtitle: "执行功能与决策",
      description: "说出物品属性分类，优化逻辑能力、分类思维和信息整合能力，提高决策效率。",
      duration: "7分钟",
      benefits: ["概念形成", "类别抽象", "快速决策"],
      howToPlay: [
        "AI 会生成一个核心词汇（如'苹果'）。",
        "你需要从选项中快速选择它所属的**正确分类**（如'水果'）。",
        "有些选项可能具有干扰性，请基于最本质的属性进行判断。",
        "追求速度与准确率的平衡。"
      ],
      science: "威斯康星卡片分类测验（WCST）的变体。分类任务依赖前额叶皮层来提取规则和维持定势。这种训练能增强大脑处理抽象概念和进行自上而下信息处理的能力。",
      citation: "Milner, B. (1963). Effects of different brain lesions on card sorting.",
      question: "问题 {current} / {total}",
      score: "得分: {score}",
      classifyItem: "请为该物品归类",
      generating: "正在准备逻辑谜题..."
    },
    contextMemory: {
      title: "情景联想记忆",
      subtitle: "语义与情景整合",
      description: "用物品构建连贯场景故事，增强记忆存储、关联能力和语义记忆整合能力。",
      duration: "8分钟",
      benefits: ["联想记忆", "创造性思维", "海马体激活"],
      howToPlay: [
        "系统会随机给出3个不相关的物品。",
        "发挥想象力，编造一个简短的故事将它们串联起来。",
        "故事越生动、越离奇，记忆效果越好。",
        "在脑海中构建画面，然后写下或在心中默念你的故事。"
      ],
      science: "情景记忆依赖于海马体和内侧颞叶系统。通过'精细加工'（Elaboration）策略，将孤立的信息编织成有意义的网络，可以显著提高长时记忆的存储和提取效果。",
      citation: "Tulving, E. (1972). Episodic and semantic memory.",
      theme: "主题建议: {theme}",
      createStory: "将这些物品连成故事",
      storyPlaceholder: "很久很久以前...",
      completeCreation: "完成创作",
      pickingItems: "正在挑选故事元素..."
    }
  },

  // Training Session
  trainingGuide: "训练指南",
  sciencePrinciple: "科学原理",

  // Dashboard
  brainTrainingGames: "大脑训练游戏",
  selectGameToStart: "选择游戏开始训练",

  // Language
  language: "语言",
  chinese: "中文",
  english: "English"
};

export type TranslationKeys = typeof zh;
