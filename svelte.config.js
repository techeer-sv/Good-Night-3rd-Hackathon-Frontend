import adapter from '@sveltejs/adapter-auto';
import sveltePreprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// svelte-preprocess를 사용하여 SCSS 설정
	preprocess: sveltePreprocess({
		scss: {
			// 모든 Svelte 파일의 스타일에 공통으로 사용할 SCSS 변수를 자동으로 임포트
			prependData: `@import '${path.resolve('src/styles/variables.scss')}';`
		}
	}),

	kit: {
		adapter: adapter(),
		alias: {
			$apis: path.resolve('./src/apis'),
			$lib: path.resolve('./src/lib'),
			$routes: path.resolve('./src/routes'),
			$styles: path.resolve('src/styles'), // SCSS 파일들을 절대 경로로 참조 가능하게 설정
			$types: path.resolve('./src/types'),
			$utils: path.resolve('./src/utils') // 추가된 별칭
		}
	}
};

export default config;
