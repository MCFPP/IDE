<template>
    <section>
        <header>{{ title }}</header>
        <div>
            <slot></slot>
        </div>
        <footer>
            <button @click="$emit('cancel')">
                <strong>Cancel</strong>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"
                    class="icon">
                    <path
                        d="m12.293 13.707c0.39174 0.39174 1.0223 0.39174 1.4141 0s0.39174-1.0223 0-1.4141l-4.293-4.293 4.293-4.293c0.39174-0.39174 0.39174-1.0223 0-1.4141-0.39174-0.39174-1.0223-0.39174-1.4141 0l-4.293 4.293-4.293-4.293c-0.39174-0.39174-1.0223-0.39174-1.4141 0s-0.39174 1.0223 0 1.4141l4.293 4.293-4.293 4.293c-0.39174 0.39174-0.39174 1.0223 0 1.4141 0.39174 0.39174 1.0223 0.39174 1.4141 0l4.293-4.293z" />
                </svg>
            </button>
            <button @click="$emit('confirm')">
                <strong>Confirm</strong>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"
                    class="icon">
                    <path
                        d="m13 3.5a1 1 0 0 0-0.70703 0.29297l-6.293 6.293-2.293-2.293a1 1 0 0 0-1.4141 0 1 1 0 0 0 0 1.4141l3.707 3.707 7.707-7.707a1 1 0 0 0 0-1.4141 1 1 0 0 0-0.70703-0.29297z" />
                </svg>
            </button>
        </footer>
    </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

export interface Dialog {
    title: string,
    id: string,
}

@Options({
    props: {
        title: String,
    },
})

export default class DialogWindow extends Vue {
    title!: string;
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/common";

section {
    background-color: var(--primary-back);
    border: 2px solid rgb(var(--theme-warning));
    border-radius: 1rem;
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &>header {
        border-bottom: 1px solid rgb(255 255 255 / 0.16);
        font-weight: bold;
        padding: 0.5rem 1rem;
        text-align: center;
        color: rgb(var(--theme-warning));
        background-color: var(--primary-fore);
    }

    &>div {
        padding: 1rem;
    }

    &>footer {
        @extend %rowS;
        border-top: 1px solid rgb(255 255 255 / 0.16);

        &>button {
            @extend %reset;
            @extend %rowC;
            width: 100%;
            padding: 0.5rem 3rem;
            position: relative;
            justify-content: center;

            &:hover,
            &:focus {
                background-color: var(--primary-fore);
            }

            &:first-child {
                border-bottom-left-radius: 0.8rem;
            }

            &:last-child {
                border-bottom-right-radius: 0.8rem;
            }

            &>.icon {
                position: absolute;
                right: 0.5rem;
                transform: translateY(-1px);
            }
        }
    }
}
</style>
