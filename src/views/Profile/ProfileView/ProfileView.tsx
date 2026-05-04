import type { ProfileInfoRow } from '@/components/ProfileInfoTable';
import ProfileInfoTable from '@/components/ProfileInfoTable';
import ProfileChartSection from '@/components/ProfileChartSection';
import ProfileMonthlyTable from '@/components/ProfileMonthlyTable';
import ProfileSprintTable from '@/components/ProfileSprintTable';
import {
  getTwbeChartRowsByEmployeeName,
  getTwbeMonthlyRowsByEmployeeName,
  getTwbeSprintRowsByEmployeeName,
} from '@/utils/twbe';
import styles from '../ProfileCommon.module.css';
import type { ProfileViewProps } from './ProfileView.types';

function parseDateInDdMmYyyy(dateText: string): Date {
  const [day, month, year] = dateText.split('/').map(Number);
  return new Date(year, month - 1, day);
}

function getAgeInYears(dateOfBirth: Date): number {
  const today = new Date();
  let years = today.getFullYear() - dateOfBirth.getFullYear();
  const hasNotHadBirthdayThisYear =
    today.getMonth() < dateOfBirth.getMonth() ||
    (today.getMonth() === dateOfBirth.getMonth() &&
      today.getDate() < dateOfBirth.getDate());

  if (hasNotHadBirthdayThisYear) {
    years -= 1;
  }

  return years;
}

function getWorkingDuration(joinedDate: Date): string {
  const today = new Date();
  let years = today.getFullYear() - joinedDate.getFullYear();
  let months = today.getMonth() - joinedDate.getMonth();

  if (today.getDate() < joinedDate.getDate()) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return `${years} tahun ${months} bulan`;
}

export default function ProfileView({ profile, headingId }: ProfileViewProps) {
  const dateOfBirth = parseDateInDdMmYyyy(profile.dateOfBirth);
  const joinedDate = parseDateInDdMmYyyy(profile.joinedDate);
  const twbeRows = getTwbeSprintRowsByEmployeeName(profile.name);
  const twbeMonthlyRows = getTwbeMonthlyRowsByEmployeeName(profile.name);
  const twbeChartRows = getTwbeChartRowsByEmployeeName(profile.name);
  const profileRows: ProfileInfoRow[] = [
    {
      label: 'Nama Lengkap',
      value: profile.name,
    },
    {
      label: 'Tanggal Lahir',
      value: profile.dateOfBirth,
    },
    {
      label: 'Umur',
      value: `${getAgeInYears(dateOfBirth)} tahun`,
    },
    {
      label: 'Level Grade',
      value: profile.levelGrade,
    },
    {
      label: 'Tanggal Bergabung',
      value: profile.joinedDate,
    },
    {
      label: 'Lama Bekerja',
      value: getWorkingDuration(joinedDate),
    },
    {
      label: 'Proyek Aktif',
      value: profile.projects,
    },
    {
      label: 'Guild Aktif',
      value: profile.guilds,
    },
  ];

  return (
    <section className={styles.profileSection} aria-labelledby={headingId}>
      <header className={styles.hero}>
        <span className={styles.badge}>Frontend Engineer Profile</span>
        <h1 id={headingId} className={styles.title}>
          {profile.name}
        </h1>
        <p className={styles.description}>
          Ringkasan profil Frontend Engineer mencakup biodata, level, pengalaman
          kerja, proyek aktif, dan guild yang sedang dijalankan.
        </p>
      </header>

      <ProfileInfoTable rows={profileRows} />

      <ProfileChartSection rows={twbeChartRows} />

      <ProfileMonthlyTable rows={twbeMonthlyRows} />

      <ProfileSprintTable rows={twbeRows} />
    </section>
  );
}
