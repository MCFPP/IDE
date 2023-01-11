<template>
    <button class="button">
        <svg v-html="icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
            fill="currentColor" class="icon">
        </svg>
        <strong>
            {{ name }}
        </strong>
    </button>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        icon: String,
        name: String,
    },
})

export default class LargeButton extends Vue {
    icon!: string;
    name!: string;
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/common";

button {
    @extend %reset;
    @extend %colC;
    @extend %fontR;
    gap: 0.5rem;
    padding: 1rem 0.5rem;
    border: 1px solid transparent;
    background-color: transparent;
    color: var(--text-back);
    cursor: pointer;

    &:focus {
        border: 1px solid var(--accent);
    }

    &:focus,
    &:hover {
        color: var(--text);
    }

    &>.icon {
        width: 1.5rem;
        height: 1.5rem;
    }

    &>strong {
        font-size: 0.75rem;
    }
}
</style>
