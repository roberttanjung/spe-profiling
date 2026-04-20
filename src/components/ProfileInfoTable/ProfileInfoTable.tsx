import styles from './ProfileInfoTable.module.css';
import type { ProfileInfoTableProps } from './ProfileInfoTable.types';

/**
 * Reusable vertical table for read-only profile details.
 * rows: ordered label-value pairs.
 * className: optional extra class for layout adjustments.
 * Example: <ProfileInfoTable rows={[{ label: 'Nama', value: 'Agmar Putra' }]} />
 */
export default function ProfileInfoTable({
  rows,
  className,
}: ProfileInfoTableProps) {
  const renderValue = (
    value: ProfileInfoTableProps['rows'][number]['value'],
  ) => {
    if (Array.isArray(value)) {
      return (
        <ul className={styles.multiValueList}>
          {value.map((item, index) => (
            <li
              key={`${index}-${String(item)}`}
              className={styles.multiValueItem}
            >
              {item}
            </li>
          ))}
        </ul>
      );
    }

    return value;
  };

  return (
    <div
      className={
        className ? `${styles.tableWrapper} ${className}` : styles.tableWrapper
      }
    >
      <table className={styles.profileTable}>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row" className={styles.labelCell}>
                {row.label}
              </th>
              <td className={styles.valueCell}>{renderValue(row.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
