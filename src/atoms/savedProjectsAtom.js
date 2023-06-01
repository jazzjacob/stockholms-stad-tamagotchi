import { atom } from 'recoil';

export const savedProjectsAtom = atom({
	key: "savedProjectsAtom",
	default: [],
});