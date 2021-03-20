export interface Tutorial {
  category: TutorialCategory;
  tutorialId: string;
}

export interface TutorialUrlParams {
  category: TutorialCategory;
  tutorialId: string;
}

export enum TutorialCategory {
  all = 'All',
  backend = 'Back-End-Developers',
  crypto = 'Crypto-Currency',
  design = 'Design',
  frontend = 'Front-End-Developers',
  gitOrgihub = 'Git / Github',
  math = 'Math',
  mobileDev = 'Mobile Development',
  programming = 'Programming',
  science = 'Science',
  security = 'Security',
}
