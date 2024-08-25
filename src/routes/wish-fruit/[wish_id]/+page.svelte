<script lang="ts">
	import { getWishDetail, deleteWish } from '$apis/wish';
	import { page } from '$app/stores';
	import { fruit } from '$utils/imageURL';
	import { onMount } from 'svelte';
	import { deleteIcon } from '$utils/imageURL';

	let permissions: string;

	const id: number = parseInt($page.params.wish_id, 10);
	let wish = {
		title: '',
		category: '',
		content: ''
	};

	async function fetchWish() {
		try {
			const res = await getWishDetail(id);
			if (res.status === 200) {
				wish.title = res.title;
				wish.category = res.category;
				wish.content = res.content;
				console.log(res);
			} else {
				console.error('error', res);
			}
		} catch (error) {
			console.error('캐치!', error);
		}
	}

	onMount(() => {
		fetchWish();
		permissions = localStorage.getItem('permissions') || '';
	});
</script>

<img class="background" src={fruit} alt="Techeer Tree" />

<div class="page">
	<div class="title">{wish.title}</div>
	<div class="category">{wish.category}</div>
	<div class="content">{wish.content}</div>
</div>

{#if permissions === 'admin'}
	<button
		class="delete-button"
		type="button"
		on:click={() => {
			deleteWish(id).then((res) => {
				if (res.status === 200) {
					alert('소원 열매를 삭제했습니다.');
					location.href = '/';
				} else {
					alert('소원 열매 삭제에 실패했습니다.');
				}
			});
		}}
		aria-label="Delete"
	>
		<img class="delete-icon" src={deleteIcon} alt="delete" />
	</button>
{/if}

<style lang="scss">
	$background-opacity: 0.5;
	.background {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: 80vh;
		z-index: -1;
		opacity: $background-opacity;
	}

	.page {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;

		.title {
			font-size: 2rem;
			font-weight: bold;
			margin-bottom: 1rem;
		}

		.category {
			font-size: 1rem;
			margin-bottom: 1rem;
			color: #aaa;
		}

		.content {
			font-size: 1.5rem;
		}
	}

	.delete-button {
		position: fixed;
		bottom: 1.8%;
		right: 4.6%;
		background-color: white;
		border: none;
		border-radius: 50%;
		padding: 0.5rem;
		border: 2.5px solid #bbb;
		width: 2.65rem;
		height: 2.65rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.delete-icon {
		width: 1.75rem;
	}
</style>
