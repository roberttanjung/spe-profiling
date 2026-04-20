import ProfileView, {
  type EngineerProfileData,
} from '@/views/Profile/ProfileView';

const profile: EngineerProfileData = {
  name: 'I Nyoman Arijaya Putra',
  dateOfBirth: '04/01/2001',
  levelGrade: 'II/2',
  joinedDate: '10/10/2023',
  projects: ['BNI QRIS'],
  guilds: ['Atomic Design'],
};

export default function INyomanArijayaPutraProfile() {
  return (
    <ProfileView profile={profile} headingId="i-nyoman-arijaya-putra-title" />
  );
}
