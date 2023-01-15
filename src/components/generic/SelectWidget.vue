<template>
    <section @mouseleave="open = false">
        <header @click="open = true">
            <select-option :name="options[selection].description" :icon="options[selection].icon" />
        </header>
        <footer v-if="open" @mouseleave="open = false">
            <select-option v-for="option, index in options" :key="index"
                @click="selection = index; open = false; $emit('selected', index)" :name="option.description"
                :icon="option.icon" />
        </footer>
    </section>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/common";

section {
    background-color: var(--primary-fore);
    max-height: 2rem;
    min-height: 2rem;
    border-radius: 0.66rem;
    border: 2px solid transparent;
    cursor: pointer;
    position: relative;

    &:hover {
        background-color: var(--primary-fore);
    }

    footer {
        @extend %colS;
        background-color: var(--primary-fore);
        position: absolute;
        top: calc(-2px - 0.5rem);
        left: calc(-2px - 0.5rem);
        z-index: 1;
        border-radius: 1rem;
        width: 100%;
        border: 2px solid var(--text-fore);
        padding: 0.5rem;
        box-shadow: 0 0 2rem rgb(0 0 0 / 0.3);
    }

    div {
        @extend %rowC;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;

        &:hover {
            background-color: rgb(255 255 255 / 0.08);
        }
    }
}
</style>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SelectOption from "./SelectOption.vue";

export interface Option {
    name: string,
    icon: string,
    description: string,
}

@Options({
    props: {
        options: Array,
    },
    components: {
        SelectOption,
    },
})

export default class SelectWidget extends Vue {
    options!: Option[];
    open = false;
    selection = 0;
}
</script>
