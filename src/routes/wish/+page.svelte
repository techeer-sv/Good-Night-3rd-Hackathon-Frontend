<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { postWish } from '../../apis/wish';

	let permissions: string;

	let subject: string = '';
	let category: string = '';
	let content: string = '';

	onMount(() => {
		permissions = localStorage.getItem('permissions') || '';
	});

	function handleSubmit() {
		if (permissions === 'admin') {
			alert('권한이 없습니다.');
			return;
		}

		if (!subject || !category || !content) {
			alert('소원 제목, 카테고리, 내용을 모두 입력해주세요.');
			return;
		} else {
			postWish(subject, category, content).then((res) => {
				console.log(res);
				alert('소원 열매를 달았습니다.');
				goto(`/wish-fruit/${res?.id}`, { replaceState: true });
			});
		}
	}
</script>

<div class="page">
	{#if permissions === 'admin'}
		<div class="warning">권한 없음</div>
		<div class="warning-content">Admin은 소원 열매를 달 수 없습니다. 😢</div>
	{:else}
		<div class="post">
			<div class="title">소원 제목</div>
			<input class="subject-input" bind:value={subject} placeholder="소원의 제목을 입력하세요" />
		</div>

		<div class="post">
			<div class="title">소원 카테고리</div>
			<select bind:value={category} class="category-select">
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

		<div class="post">
			<div class="title">소원 내용</div>
			<input class="content-input" bind:value={content} placeholder="소원의 내용을 작성하세요" />
		</div>

		<div class="post">
			<div class="title" />
			<button class="submit" on:click={handleSubmit}>소원 열매 달기</button>
		</div>
	{/if}
</div>

<style lang="scss">
	// 변수 선언
	$font-size-large: 2rem;
	$font-size-medium: 1.25rem;
	$input-height: 3rem;
	$border-color: #aaa;
	$focus-border-color: #aaa;
	$input-width: 50%;
	$primary-bg-color: $primary-color;
	$hover-bg-color: darken($primary-color, 3%);

	// 믹스인 정의
	@mixin input-style {
		width: $input-width;
		height: $input-height;
		margin-left: 1rem;
		border: 2px solid $border-color;
		font-size: $font-size-medium;
		padding: 0.25rem;

		&:focus {
			outline: none;
			border: 2px solid $focus-border-color;
		}
	}

	.page {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-height: calc(100vh - $header-height);

		.warning {
			font-size: $font-size-large;
			font-weight: bold;
			color: $primary-color;
		}

		.warning-content {
			font-size: $font-size-medium;
		}

		.post {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;
			font-size: $font-size-medium;
			margin-bottom: 1rem;

			.title {
				width: 10%;
				font-weight: bold;
				text-align: right;
			}

			.subject-input,
			.category-select,
			.content-input {
				@include input-style;
			}

			.content-input {
				height: calc(4 * $input-height);
			}
		}

		.submit {
			@include input-style;
			background-color: $primary-bg-color;
			color: white;
			cursor: pointer;

			&:hover {
				background-color: $hover-bg-color;
			}
		}
	}
</style>
