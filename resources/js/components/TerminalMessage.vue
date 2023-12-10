<template>
	<div class="terminal__message">
		<span class="user_msg">{{ sender }}:</span>
		<span class="user_loc">~</span><span class="user_doll">$</span>
		<span class="terminal__text">{{ message }}</span>
	</div>
</template>

<script setup>

	const props =  defineProps({
	    message: String,
	    sender: String,
	    type: String
	})


</script>

<style scoped>

</style>
