import ProfileView, {
  type EngineerProfileData,
} from '@/views/Profile/ProfileView';

const profile: EngineerProfileData = {
  name: 'Bagus Nur Solayman',
  dateOfBirth: '22/07/2001',
  levelGrade: 'II/3',
  joinedDate: '30/05/2022',
  projects: ['QRISAN x Jateng', 'QRISAN x KB Bank', 'SPD', 'DKI QRIS'],
  guilds: ['Atomic Design'],
};

export default function BagusNurSolaymanProfile() {
  return <ProfileView profile={profile} headingId="bagus-nur-solayman-title" />;
}
