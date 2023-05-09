import styled, { css, keyframes } from "styled-components";

export const fadeKeyframe = keyframes`
from {
	opacity: 0;
	transform: translateX(-100%);
}
to {
	opacity: 1;
	transform: translateX(0);
}
`;

export const slideKeyFrame = keyframes`
from {
	opacity: 0;
	transform: translateY(-100%);
}
to {
	opacity: 1;
	transform: translateY(0);

}
`;

export const widthKeyFrame = keyframes`
from {
	opacity: 0;
	width: 0;
}
to {
	opacity: 1;
	width: 100%;
}
`;

export const dropDownKeyFrame = keyframes`
	from {
		opacity: 0;
		transform: translateY(-10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
`;

export const scaleKeyframe = keyframes`
from {
	opacity: 1;
	transform: scale(1);
}
to {
	opacity: 0;
	transform: scale(1.3);
}
`;

export const getAnimatedLogo = (Logo, keyframe, str) => {
  return styled(Logo)({
    animation: () =>
      css`
        ${keyframe} ${str};
      `,
  });
};
