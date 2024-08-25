<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { fruit } from '../../utils/imageURL';
	let permissions: string;
	let targetUrl: string;

	onMount(() => {
		checkPermissions();
	});

	// 페이지 로드 시 localStorage에서 permissions 값을 확인
	function checkPermissions() {
		permissions = localStorage.getItem('permissions') || '';
		if (permissions === 'admin') {
			targetUrl = '/wish-fruit/allow';
		} else {
			targetUrl = '/wish';
		}
	}

	function handleKeyDown(event: KeyboardEvent, url: string) {
		if (event.key === 'Enter' || event.key === ' ') {
			goto(url);
		}
	}
</script>

<header>
	<nav>
		<button
			class="title"
			tabindex="0"
			aria-label="Go to Home"
			on:click={() => goto('/')}
			on:keydown={(event) => handleKeyDown(event, '/')}
		>
			<img src={fruit} alt="Techeer Tree" />
			Techeer Tree
		</button>
		<button
			aria-label="Go to About"
			on:click={() => goto(targetUrl)}
			on:keydown={(event) => handleKeyDown(event, '/about')}
		>
			{permissions === 'admin' ? '소원 승인 하기' : '소원 열매 달기'}
		</button>
	</nav>
</header>

<style lang="scss">
	header {
		background-color: $primary-color;
		color: white;
		height: $header-height;
		display: flex;
		align-items: center;

		nav {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 1rem;
			width: 100%;
		}

		img {
			height: 2rem;
		}

		.title {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			font-size: 1.5rem;
			font-weight: bold;
		}
	}
</style>
