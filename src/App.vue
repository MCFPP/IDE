<template>
    <MainWindow />
    <NavBar />
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

// IDE stuff
interface exposedAPI {
    API: {
        request: {
            userOverrides: () => Promise<any>,
        }
    }
}

const API = (window as unknown as exposedAPI).API;

API.request.userOverrides().then(value => {
    console.log(value);
});
</script>

<!-- ... -->

<style lang="scss" src="./assets/styles/base.scss">

</style>
