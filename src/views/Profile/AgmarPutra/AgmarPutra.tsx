import ProfileView, {
  type EngineerProfileData,
} from '@/views/Profile/ProfileView';

const profile: EngineerProfileData = {
  name: 'Agmar Putra',
  dateOfBirth: '04/01/2003',
  levelGrade: 'II/3',
  joinedDate: '14/01/2022',
  projects: ['QRISAN', 'QRISAN x Kaltimtara', 'QRISAN x KB Bank'],
  guilds: ['Atomic Design', 'Dynamic Dashboard', 'SPEInside'],
};

export default function AgmarPutraProfile() {
  return <ProfileView profile={profile} headingId="agmar-title" />;
}
