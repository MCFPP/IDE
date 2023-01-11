<template>
    <aside>
        <div>
            <section id="explorer" v-if="tab === 'explorer'"></section>
            <section id="pack_info" v-if="tab === 'pack_info'"></section>
            <section id="search" v-if="tab === 'search'"></section>
        </div>
        <nav>
            <LargeButton @click="tab = 'explorer'" name="Explorer" icon='<path d="m11 2c1.662 0 3 1.338 3 3v2h1c0.554 0 1 0.446 1 1s-0.446 1-1 1h-1v2c0 1.662-1.338 3-3 3-0.55228 0-1-0.44772-1-1s0.44772-1 1-1c0.554 0 1-0.446 1-1v-6c0-0.554-0.446-1-1-1-0.55228 0-1-0.44772-1-1s0.44772-1 1-1zm-6 0c-1.662 0-3 1.338-3 3v2h-1c-0.554 0-1 0.446-1 1s0.446 1 1 1h1v2c0 1.662 1.338 3 3 3 0.55228 0 1-0.44772 1-1s-0.44772-1-1-1c-0.554 0-1-0.446-1-1v-6c0-0.554 0.446-1 1-1 0.55228 0 1-0.44772 1-1s-0.44772-1-1-1z" />' />
            <LargeButton @click="tab = 'pack_info'" name="Pack info" icon='<path d="m7 0a2 2 0 00-2 2h-2c-1.662 0-3 1.338-3 3v8c0 1.662 1.338 3 3 3h8c1.662 0 3-1.338 3-3v-2a2 2 0 002-2 2 2 0 00-2-2v-2c0-1.662-1.338-3-3-3h-2a2 2 0 00-2-2zm-4 4h8c.554 0 1 .446 1 1v8c0 .554-.446 1-1 1h-2a2 2 0 00-2-2 2 2 0 00-2 2h-2c-.554 0-1-.446-1-1v-2a2 2 0 002-2 2 2 0 00-2-2v-2c0-.554.446-1 1-1z" fill-rule="evenodd" />' />
            <LargeButton @click="tab = 'search'" name="Search" icon='<path d="m10 7a3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3 3 3 0 0 1 3 3zm-3-5a5 5 0 0 0-5 5 5 5 0 0 0 5 5 5 5 0 0 0 2.7539-0.83203l2.5391 2.5391c0.39052 0.39052 1.0235 0.39052 1.4141 0 0.39052-0.39052 0.39052-1.0235 0-1.4141l-2.5391-2.5391a5 5 0 0 0 0.83203-2.7539 5 5 0 0 0-5-5z" fill-rule="evenodd" />' />
        </nav>
    </aside>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import LargeButton from "../generic/LargeButton.vue";

@Options({
    components: {
        LargeButton,
    },
})

export default class NavBar extends Vue {
    tab = "explorer";
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/common";

aside {
    @extend %rowS;

    & > div,
    & > nav {
        @extend %colS;
    }

    & > div {
        min-width: 20rem;
        background-color: var(--primary-back);
        border-left: var(--border);
        border-right: var(--border);
    }

    & > nav {
        min-width: 5rem;
    }
}
</style>
