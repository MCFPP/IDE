<template>
    <main-window />
    <nav-bar />
</template>

<!-- ... -->

<script lang="ts">
// Vue stuff
import { Options, Vue } from "vue-class-component";
import NavBar from "./components/composed/NavBar.vue";
import MainWindow from "./components/composed/MainWindow.vue";

@Options({
    components: {
        MainWindow,
        NavBar,
    },
})

export default class App extends Vue { }

window.API.request.userOverrides().then((value: any) => {
    console.log("userOverrides", value);
});
</script>

<!-- ... -->

<style lang="scss" src="./assets/styles/base.scss">

</style>
