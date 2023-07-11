import { useEffect, useState } from "react";

type BreakPoint = "sm" | "md" | "lg"


type MediaProps = {
	breakpoint: BreakPoint 
}

const breakpointToPixel = (breakpoint: BreakPoint) => {
	switch (breakpoint) {
		case "sm":
			return 700;
		case "md":
			return 900;
		case "lg":
		default: 
			return 1200;
	}
}


const useMedia = ({ breakpoint }: MediaProps) => {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const media = window.matchMedia(`(min-width: ${breakpointToPixel(breakpoint)}px)`);
		if (media.matches !== matches) {
			setMatches(media.matches);
		}
		const listener = () => {
			setMatches(media.matches);
		}

		media.addEventListener("change", listener);
		return () => media.removeEventListener("change", listener);
	}, [breakpoint, matches]);


	return matches;
}

export default useMedia;





