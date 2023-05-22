import styles from './MenuRow.module.css';
import MenuItem from './MenuItem';
import { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentViewAtom } from '../../atoms/currentViewAtom';

export default function MenuRow() {
	const [menuItems, setMenuItems] = useState([
		{id: 0},
		{id: 1},
		{id: 2}
	]);
	
	const setViewState = useSetRecoilState(currentViewAtom);
	const indexOfActiveItem = useRecoilValue(currentViewAtom);
	
	const handleForwardClick = () => {
		console.log(indexOfActiveItem)
		if (indexOfActiveItem + 1 === menuItems.length) {
			setViewState(0);
		} else {
			setViewState(indexOfActiveItem + 1);
		}
	}
	
	function handleBackwardClick() {
		if (indexOfActiveItem === 0) {
			setViewState(menuItems.length - 1);
		} else {
			setViewState(indexOfActiveItem - 1);
		}
	}
	
	return (
		<div className={styles.menuRowContainer}>
			<button onClick={() => handleBackwardClick()}>{"<"}</button>
			{menuItems.map((menuItem, index) => {
				return <MenuItem key={menuItem.id} active={indexOfActiveItem === index ? false : true} />
			})}
			<button onClick={() => handleForwardClick()}>></button>
		</div>
	)
}