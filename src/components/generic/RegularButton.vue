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

export default class ButtonElement extends Vue {
    icon!: string;
    name!: string;
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/common";

button {
    @extend %reset;
    @extend %rowC;
    @extend %fontR;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid transparent;
    background-color: rgb(var(--btn-color) / 0.08);
    transition: 200ms background-color, 200ms color, 200ms border;
    color: var(--text);
    cursor: pointer;

    &.compact {
        background-color: transparent;
        padding: 0.25rem;
        justify-content: center;

        &>strong {
            display: none;
        }
    }

    &:focus {
        border: 1px solid rgb(var(--btn-color));
        opacity: 1 !important;
    }

    &:hover {
        background-color: rgb(var(--btn-color) / 0.16);
        color: rgb(var(--btn-color));
    }
}
</style>
