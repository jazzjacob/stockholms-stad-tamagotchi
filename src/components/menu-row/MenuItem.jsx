import styles from './MenuRow.module.css';

export default function MenuItem({active = false}) {
	return (
		<div
			className={styles.menuItem}
			style={{
				backgroundColor: active ? "blue" : "red",
			}}
		></div>
	);
}