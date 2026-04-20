import styles from './ProfileSprintTable.module.css';
import type { ProfileSprintTableProps } from './ProfileSprintTable.types';

const MAX_BUGS_RATIO = 0.3;
const MIN_RATE = 95;

const percentFormatter = new Intl.NumberFormat('id-ID', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const ratioFormatter = new Intl.NumberFormat('id-ID', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

function toCellClassName(isInvalid: boolean): string {
  return isInvalid
    ? `${styles.numberCell} ${styles.lowValueCell}`
    : styles.numberCell;
}

export default function ProfileSprintTable({
  title = 'TWBE Sprint Performance',
  rows,
  emptyMessage = 'Data TWBE belum tersedia untuk engineer ini.',
  className,
}: ProfileSprintTableProps) {
  return (
    <section
      className={className ? `${styles.section} ${className}` : styles.section}
    >
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.tableScroller}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Project Name</th>
              <th scope="col">Month</th>
              <th scope="col">Sprint Name</th>
              <th scope="col">Total Task</th>
              <th scope="col">Total Weights</th>
              <th scope="col">Bugs Ratio</th>
              <th scope="col">Done Rate</th>
              <th scope="col">Finish Rate</th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <tr
                  key={`${row.projectName}-${row.month}-${row.sprintName}-${index}`}
                >
                  <td>{row.projectName}</td>
                  <td>{row.month}</td>
                  <td>{row.sprintName}</td>
                  <td className={styles.numberCell}>{row.totalTask}</td>
                  <td className={styles.numberCell}>{row.totalWeights}</td>
                  <td
                    className={toCellClassName(row.bugsRatio > MAX_BUGS_RATIO)}
                  >
                    {ratioFormatter.format(row.bugsRatio)}
                  </td>
                  <td className={toCellClassName(row.doneRate < MIN_RATE)}>
                    {percentFormatter.format(row.doneRate)}%
                  </td>
                  <td className={toCellClassName(row.finishRate < MIN_RATE)}>
                    {percentFormatter.format(row.finishRate)}%
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className={styles.emptyCell} colSpan={8}>
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
