<template>
    <component v-bind:is="component"></component>
</template>

<script>
import Boot from '@/components/Boot.vue';

export default {
    components: {
        'boot': Boot,
    },
    data () {
        return {
            component: "boot",
        }
    }
}
</script>