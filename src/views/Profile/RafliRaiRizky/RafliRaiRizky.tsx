import ProfileView, {
  type EngineerProfileData,
} from '@/views/Profile/ProfileView';

const profile: EngineerProfileData = {
  name: 'Rafli Rai Rizky',
  dateOfBirth: '09/05/2002',
  levelGrade: 'II/3',
  joinedDate: '30/09/2025',
  projects: ['CRING! Point', 'CRING!'],
  guilds: ['Atomic Design'],
};

export default function RafliRaiRizkyProfile() {
  return <ProfileView profile={profile} headingId="rafli-rai-rizky-title" />;
}
