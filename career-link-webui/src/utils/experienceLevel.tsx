export const ExperienceLevel = {
    0: "0 - 1 year",
    1: "1 - 3 years",
    2: "3 - 5 years",
    3: "5 - 7 years",
    4: "7+ years",
  } as const;
  
  export type ExperienceLevelKey = keyof typeof ExperienceLevel;
  
  export function getExperienceLevelLabel(level: ExperienceLevelKey): string {
    return ExperienceLevel[level];
  }