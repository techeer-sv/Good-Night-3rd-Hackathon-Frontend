<script lang="ts">
	import { adminPermission, userPermission } from '../../utils/imageURL';
	import { onMount } from 'svelte';

	let permissions: string;

	onMount(() => {
		permissions = localStorage.getItem('permissions') || '';
	});
</script>

<button
	on:click={() => {
		if (permissions === 'admin') {
			localStorage.setItem('permissions', 'user');
		} else {
			localStorage.setItem('permissions', 'admin');
		}
		location.reload();
	}}
>
	<img src={permissions === 'admin' ? adminPermission : userPermission} alt="Techeer Tree" />
</button>

<style lang="scss">
	button {
		position: fixed;
		bottom: 1.8%;
		right: 1.8%;
	}
</style>
