<template>
    <section>
        <div v-for="option in options" :key="option.name">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"
                class="icon" v-html="option.icon">
            </svg>
            <strong>{{ option.name }}</strong>
        </div>
    </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

export interface Option {
    name: string,
    icon: string,
    description: string,
}

@Options({
    props: {
        options: Array,
    },
})

export default class SelectOption extends Vue {
    options!: Option[];
}
</script>

<style lang="scss">

</style>
