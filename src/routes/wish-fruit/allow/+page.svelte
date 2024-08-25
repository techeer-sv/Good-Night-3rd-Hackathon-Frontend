<script lang="ts">
	import { onMount } from 'svelte';
	import { getWishList, updateApprovalWish } from '$apis/wish';
	import { approveIcon, rejectIcon } from '$utils/imageURL';
	import type { wishListType } from '$types/wish';

	let permissions: string;

	let wishList: wishListType[] = [];

	async function fetchWish() {
		try {
			const res = await getWishList('', null);
			if (res.status === 200) {
				wishList = res.wishes;
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

<div class="page">
	{#if permissions === 'admin'}
		<div class="admin-container">
			<div class="title">소원 열매 승인</div>
			{#each wishList as wish}
				<div class="wish-item">
					<div class="wish-item-title">{wish.title}</div>
					<button
						class="approval-control-button"
						on:click={() => {
							updateApprovalWish(wish.id, true).then((res) => {
								if (res.status === 200) {
									console.log(res);
									location.reload();
								} else {
									console.error(wish.id, res);
								}
							});
						}}
					>
						<img src={approveIcon} alt="approve" />
					</button>
					<button
						class="approval-control-button"
						on:click={() => {
							updateApprovalWish(wish.id, false).then(() => {
								location.reload();
							});
						}}
					>
						<img src={rejectIcon} alt="reject" />
					</button>
				</div>
			{/each}
		</div>
	{:else}
		<div class="warning">권한 없음</div>
		<div class="warning-content">Admin만 소원 승인을 할 수 있습니다. 😢</div>
	{/if}
</div>

<style lang="scss">
	.page {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 5rem;

		.admin-container {
			display: flex;
			flex-direction: column;
			align-items: start;
			justify-content: center;
			width: 50%;

			.title {
				font-size: 2rem;
				font-weight: bold;
			}

			.wish-item {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				margin-top: 1rem;

				.wish-item-title {
					display: flex;
					align-items: center;
					width: 90%;
					height: 100%;
					font-size: 1.5rem;
					border: 1px solid #aaa;
					border-radius: 0.5rem;
					height: 3rem;
					padding: 0 1rem;
				}

				.approval-control-button {
					width: 2rem;
					height: 2rem;
					display: flex;
					align-items: center;
					justify-content: center;
					img {
						width: 1.5rem;
						height: 1.5rem;
					}
				}
			}
		}
	}

	.warning {
		font-size: 2rem;
		font-weight: bold;
	}

	.warning-content {
		font-size: 1.5rem;
	}
</style>
