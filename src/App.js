import { useEffect } from 'react';
import { SPRITE_SHEET_SRC } from './helpers/consts';
import RenderLevel from './components/level-layout/RenderLevel';
import { useRecoilState } from 'recoil';
import { spriteSheetImageAtom } from './atoms/spriteSheetImageAtom';
import { currentViewAtom } from './atoms/currentViewAtom';
import MenuRow from './components/menu-row/MenuRow';

function App() {
	const [spriteSheetImage, setSpriteSheetImage] = useRecoilState(spriteSheetImageAtom);
	const [currentView, setCurrentView] = useRecoilState(currentViewAtom);
	
	useEffect(() => {
		setCurrentView(0);
	}, [])
	
	useEffect(() => {
		const image = new Image();
		image.src = SPRITE_SHEET_SRC;
		image.onload = () => {
			setSpriteSheetImage(image);
		};
	}, [setSpriteSheetImage]);
	
	if (!spriteSheetImage) {
		return null;
	};

  return (
    <div style={{
			width: "100vw",
			height: "100vh"
		}}>
			<RenderLevel />
    </div>
  );
}

export default App;
