import adapter from '@sveltejs/adapter-auto';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// svelte-preprocess를 사용하여 SCSS 설정
	preprocess: sveltePreprocess({
		scss: {
			prependData: `@import 'src/styles/variables.scss';` // 공통으로 사용할 SCSS 파일을 자동으로 임포트
		}
	}),

	kit: {
		adapter: adapter()
	}
};

export default config;
