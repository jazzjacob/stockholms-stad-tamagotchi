import { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { currentViewAtom } from '../../atoms/currentViewAtom';
import { currentLevelIdAtom } from '../../atoms/currentLevelIdAtom';
import LevelsMap from '../../levels/LevelsMap';

export default function TextList() {
	const [currentId, setCurrentId] = useRecoilState(currentLevelIdAtom);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [navigationStarted, setNavigationStarted] = useState(false);
	
	const projectList = [
		{name: "Slussen", distance: 0.1},
		{name: "Albano", distance: 4},
		{name: "Kista", distance: 7},
	];
	
	useEffect(() => {
		setCurrentIndex(0);
	}, []);
	
	function handleUpButton() {
		const nextIndex = currentIndex - 1 < 0 ? projectList.length - 1 : currentIndex - 1;
		setCurrentIndex(nextIndex);
	}
	
	function handleDownButton() {
		const nextIndex = currentIndex + 1 > projectList.length - 1 ? 0 : currentIndex + 1;
		setCurrentIndex(nextIndex);
	}
	
	function handleOKButton() {
		console.log(projectList[currentIndex])
		setNavigationStarted(!navigationStarted);
		
		// Go to Active Level
		/*const levelsArray = Object.keys(LevelsMap);
		const currentIndex = levelsArray.findIndex(id => {
			return id === currentId;
		});
		const nextLevelId = levelsArray[currentIndex + 1] ?? levelsArray[0];*/
	}
	
	return (
			<>
				<div style={{
					height: "fit-content",
					width: "fit-content",
					backgroundColor: "lightgray",
					fontSize: "1.5rem",
					lineHeight: "2px"
				}}>
					{navigationStarted ? (
						<>
							<p>{projectList[currentIndex].name}</p>
							<div style={{ marginBottom: "42px"}}>{projectList[currentIndex].distance} km</div>
						</>
					) : (
						<>
							{projectList.map((projectItem, index) => {
								if (index === currentIndex) {
									return <p>-{projectItem.distance}km {projectItem.name}</p>
								}
								return <p>{projectItem.distance}km {projectItem.name}</p>
							})}
						<div style={{width: "100px", height: "100px", backgroundColor: "lightgray"}}></div>
						</>
					)}
				</div>
				<div style={{
					position: "absolute",
					top: "129px",
					left: "500px"
				}}>
					<p><button onClick={() => handleUpButton()}>↑</button></p>
					<p><button onClick={() => handleDownButton()}>↓</button></p>
					<button onClick={() => handleOKButton()}>OK</button>
				</div>
			</>
	)
}