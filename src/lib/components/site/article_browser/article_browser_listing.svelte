<script lang="ts">
	import { admin_mode } from '$lib/scripts/frontend/auth/auth_state';
	import type { article_preview_type } from '$lib/scripts/universal/datatypes';

	import ArticleBrowserItem from './article_browser_item.svelte';

	import { v4 } from 'uuid';
	import Button from '$lib/components/elements/button.svelte';

	function categorize(articles: article_preview_type[]): MonthData[] {
		const months: MonthData[] = [];
		articles.forEach((article) => {
			const date = new Date(article.createdAt.replace("\"", '').replace("\"", ''));
			const month = date.toLocaleString('default', { month: 'long' });
			const year = date.getFullYear().toString();
			const month_index = months.findIndex((m) => m.month === month && m.year === year);
			if (month_index === -1) {
				months.push({
					month,
					year,
					articles: [article]
				});
			} else {
				months[month_index].articles.push(article);
			}
		});
		months.sort((a, b) => {
			const a_date = new Date(`${a.year}-${a.month}`);
			const b_date = new Date(`${b.year}-${b.month}`);
			return b_date.getTime() - a_date.getTime();
		});
		return months;
	}

	interface MonthData {
		month: string;
		year: string;
		articles: article_preview_type[];
	}

	export let articles: article_preview_type[];
	let month_data: MonthData[] = [];
	$: month_data = categorize(articles);
</script>

<div class="outer">
	{#if $admin_mode}
		<div class="add">
			<Button onclick={`/articles/${v4()}`} text={'Add article'} />
		</div>
	{/if}
	{#each month_data as month}
		<div class="month">
			<h2>{month.year} - {month.month}</h2>
			<div class="month_articles">
				{#each month.articles as article (article)}
					<ArticleBrowserItem {article} />
				{/each}
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	.month_articles {
		display: grid;
		justify-content: center;
		gap: 30px;
		padding: 2vw;
		width: 100%;
		grid-template-columns: repeat(auto-fit, min(100%, 300px));
	}
	.month {
		width: 100%;
	}
	.outer {
		width: 100%;
	}
	.add {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 300px;
	}
</style>
