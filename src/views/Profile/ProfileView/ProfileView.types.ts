export interface EngineerProfileData {
  name: string;
  dateOfBirth: string;
  levelGrade: string;
  joinedDate: string;
  projects: string[];
  guilds: string[];
}

export interface ProfileViewProps {
  profile: EngineerProfileData;
  headingId: string;
}
