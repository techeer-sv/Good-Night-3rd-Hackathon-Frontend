<script lang="ts">
	import '../app.scss';
	import Header from './_components/Header.svelte';
</script>

<div class="layout">
	<Header />
	<main>
		<slot />
	</main>
</div>

<style lang="scss">
	.layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		header {
			background-color: $primary-color;
			padding: 1rem;
			color: white;
			nav {
				a {
					color: white;
					margin-right: 1rem;
					text-decoration: none;
					&:hover {
						text-decoration: underline;
					}
				}
			}
		}
		footer {
			margin-top: auto;
			background-color: $secondary-color;
			padding: 1rem;
			text-align: center;
			color: white;
		}
	}
</style>
