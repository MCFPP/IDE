<template>
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"
            class="icon" v-html="icon">
        </svg>
        <strong>{{ name }}</strong>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        icon: String,
        name: String,
    },
})

export default class SelectOption extends Vue {
    icon!: string;
    name!: string;
}
</script>
