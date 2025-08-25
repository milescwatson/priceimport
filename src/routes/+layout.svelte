<script>
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/Navbar.svelte';
	let { children } = $props();
	import "../app.css";
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<Navbar />
<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  <!-- Content goes here -->
   <br />
   {@render children?.()}
</div>
