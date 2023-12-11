<template>
	<span class="user_sender">{{ sender }}:</span>
	<span class="user_loc">~</span><span class="user_doll">$</span>
	<div class="terminal__text">
		{{ message }}
	</div>
</template>

<script setup>

const props = defineProps({
    message: String,
    sender: String,
})

</script>


<style scoped>

.terminal__text {
    padding-left: 5px;
    color: #ddd;
}

.user_sender {
    padding-left: 5px;
    color: #87d441;
}

.user_loc {
    color: #6d85a9;
}

.user_doll {
    color: #ddd;
}
</style>