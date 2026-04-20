import ProfileView, {
  type EngineerProfileData,
} from '@/views/Profile/ProfileView';

const profile: EngineerProfileData = {
  name: 'Nanda Yusuf Nur Pratama',
  dateOfBirth: '03/08/1999',
  levelGrade: 'II/4',
  joinedDate: '24/08/2021',
  projects: ['CRING!'],
  guilds: ['Atomic Design', 'Dynamic Dashboard'],
};

export default function NandaYusufNurPratamaProfile() {
  return (
    <ProfileView profile={profile} headingId="nanda-yusuf-nur-pratama-title" />
  );
}
