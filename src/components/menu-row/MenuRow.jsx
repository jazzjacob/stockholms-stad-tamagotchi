import styles from './MenuRow.module.css';
import MenuItem from './MenuItem';
import { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { currentViewAtom } from '../../atoms/currentViewAtom';
 import { currentLevelIdAtom } from '../../atoms/currentLevelIdAtom';
import LevelsMap from '../../levels/LevelsMap';

export default function MenuRow() {
	//const [currentId, setCurrentId] = useRecoilState(currentLevelIdAtom);
	const [menuItems, setMenuItems] = useState([
		{id: 0},
		{id: 1},
		{id: 2}
	]);
	
	const [currentView, setCurrentView] = useRecoilState(currentViewAtom);
	const indexOfActiveItem = useRecoilValue(currentViewAtom);
	
	useEffect(() => {
		//console.log("Current view: ", currentView)
	}, [currentView]);
	
	const handleForwardClick = () => {
		//console.log(indexOfActiveItem)
		const levelsArray = Object.keys(LevelsMap);
		/*const currentIndex = levelsArray.findIndex(id => {
			return id === currentId;
		});*/
		//const nextLevelId = levelsArray[currentIndex + 1] ?? levelsArray[0];
		//setCurrentId(nextLevelId);
		
		if (indexOfActiveItem + 1 === menuItems.length) {
			setCurrentView(0);
		} else {
			setCurrentView(indexOfActiveItem + 1);
		}
	}
	
	function handleBackwardClick() {
		const levelsArray = Object.keys(LevelsMap);
		const currentIndex = levelsArray.findIndex(id => {
			//return id === currentId;
		});
		const nextLevelId = levelsArray[currentIndex - 1] ?? levelsArray[levelsArray.length - 1];
		//setCurrentId(nextLevelId);
		
		if (indexOfActiveItem === 0) {
			setCurrentView(menuItems.length - 1);
		} else {
			setCurrentView(indexOfActiveItem - 1);
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