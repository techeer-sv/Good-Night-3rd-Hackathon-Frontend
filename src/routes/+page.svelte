<script lang="ts">
	import { tree } from '../utils/imageURL';
	import { getWishList } from '$apis/wish';
	import { onMount } from 'svelte';
	import { fruit } from '$utils/imageURL';
	import type { wishListType } from '$types/wish';

	let wishList: wishListType[] = [];
	let category: string = '';

	async function fetchWishList() {
		try {
			const res = await getWishList(category, 'true');
			if (res.status === 200) {
				wishList = res.wishes;
				console.log(wishList);
			} else {
				wishList = [];
				console.error(res);
			}
		} catch (error) {
			wishList = [];
			console.error(error);
		}
	}

	onMount(() => {
		fetchWishList();
	});
</script>

<img class="background" src={tree} alt="Techeer Tree" />

<div class="page">
	<div class="container">
		<div class="category-select-container">
			<div />
			<select bind:value={category} on:change={fetchWishList} class="category-select">
				<option value="" disabled selected>카테고리를 선택하세요</option>
				<option value="진로">진로</option>
				<option value="건강">건강</option>
				<option value="인간 관계">인간 관계</option>
				<option value="돈">돈</option>
				<option value="목표">목표</option>
				<option value="학업/성적">학업/성적</option>
				<option value="기타">기타</option>
			</select>
		</div>
		<div class="wish">
			{#each wishList as wish}
				<a class="wish-item" href={`/wish-fruit/${wish.id}`}>
					<img class="wish-fruit" src={fruit} alt="wish-fruit" />
					<div class="wish-title">{wish.title}</div>
				</a>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	// 변수 선언
	$background-opacity: 0.1;
	$container-width: 60%;
	$wish-item-width: 30%;
	$font-size-large: 1.5rem;
	$gap-size: 1rem;

	// 믹스인 정의
	@mixin center-flex {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@mixin column-flex {
		@include center-flex;
		flex-direction: column;
	}

	@mixin shake-animation {
		animation: shake 1s ease-in-out infinite;
	}

	.background {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100vw;
		z-index: -1;
		opacity: $background-opacity;
	}

	.page {
		@include column-flex;
		width: 100%;

		.container {
			@include column-flex;
			width: $container-width;

			.category-select-container {
				@include center-flex;
				width: 100%;
				margin-top: 4rem;
				margin-bottom: 4rem;
				display: flex;
				justify-content: space-between;

				.category-select {
					width: 15%;
					height: 3rem;
					font-size: 1rem;
					margin-bottom: $gap-size;
				}
			}

			.wish {
				@include center-flex;
				flex-wrap: wrap;
				gap: $gap-size;
				width: 100%;
				height: 100%;

				.wish-item {
					@include column-flex;
					gap: $gap-size;
					width: $wish-item-width;
					height: 100%;
					font-size: $font-size-large;
					margin-bottom: $gap-size;
					text-decoration: none;
					color: black;
					cursor: pointer;

					&:hover .wish-fruit {
						@include shake-animation;
					}

					.wish-fruit {
						width: 70%;
					}

					.wish-title {
						font-size: $font-size-large;
						font-weight: bold;
					}
				}
			}
		}
	}
</style>
