<script lang="ts">
	import '../app.scss';
	import Header from './_components/Header.svelte';
	import Footer from './_components/Footer.svelte';
	import { onMount } from 'svelte';

	let permissions: string;

	onMount(() => {
		permissions = localStorage.getItem('permissions') || '';
		if (permissions === '') {
			localStorage.setItem('permissions', 'user');
			permissions = 'user';
		}
	});
</script>

<div class="layout">
	<Header />
	<main>
		<slot />
	</main>
	<Footer />
</div>

<style lang="scss">
	.layout {
		display: flex;
		flex-direction: column;
		min-height: calc(100vh - $header-height);

		main {
			flex: 1;
		}
	}
</style>
