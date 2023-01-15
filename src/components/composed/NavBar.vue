<template>
    <aside>
        <div>
            <section id="explorer" v-if="tab === 'explorer'">
                <header>
                    <h1>{{ projectName || "Untitled" }}</h1>
                    <div style="--btn-color: var(--theme-accent)">
                        <regular-button title="Refresh" @click="reload()" class="compact" name=""
                            icon='<path d="m14.99 0.9453-2.178 2.178a1 1 0 0 0-0.1016-0.1191c-1.336-1.337-3.095-2.004-4.854-2.004-1.758 1e-7 -3.516 0.6674-4.852 2.004-2.671 2.673-2.671 7.036 0 9.709 2.671 2.673 7.034 2.673 9.705 0a1 1 0 0 0-0.001953-1.414 1 1 0 0 0-1.414 0.001953c-1.907 1.908-4.968 1.908-6.875 0-1.907-1.908-1.907-4.974 0-6.883 1.907-1.908 4.968-1.908 6.875 0a1 1 0 0 0 0.1289 0.09375l-2.434 2.434h4.5a1.5 1.5 0 0 0 0.293-0.02734 1.5 1.5 0 0 0 0.2812-0.08594 1.5 1.5 0 0 0 0.2598-0.1387 1.5 1.5 0 0 0 0.2266-0.1875 1.5 1.5 0 0 0 0.1875-0.2266 1.5 1.5 0 0 0 0.1387-0.2598 1.5 1.5 0 0 0 0.08398-0.2812 1.5 1.5 0 0 0 0.0293-0.293v-4.5z" />' />
                    </div>
                    <div style="--btn-color: var(--theme-accent)">
                        <regular-button title="New file" @click="newFile()" class="compact" name=""
                            icon='<path d="m5 0c-1.662 0-3 1.338-3 3v10c0 1.662 1.338 3 3 3h4.992v-0.02148h-2.006v-1.979h-2.986c-0.554 0-1-0.446-1-1v-10c0-0.554 0.446-1 1-1h3v4h4v1.971h2v-2.799l-5.172-5.172h-3.828zm6.992 9.971v1 1.008h-1.006-1v2h1 1.006v1.008 1h2v-1-1.008h1.008 1v-2h-1-1.008v-1.008-1h-2z" />' />
                    </div>
                    <div style="--btn-color: var(--theme-accent)">
                        <regular-button title="New folder" @click="newFolder()" class="compact" name=""
                            icon='<path d="m3 0c-1.627 0-3 1.373-3 3v8c0 1.627 1.373 3 3 3h5v-2h-5c-0.554 0-1-0.446-1-1v-6c0-0.554 0.446-1 1-1h10c0.554 0 1 0.446 1 1v3h2v-3c0-1.627-1.373-3-3-3h-4l-2-2h-4zm9 10v2h-2v2h2v2h2v-2h2v-2h-2v-2h-2z" />' />
                    </div>
                    <div style="--btn-color: var(--theme-accent)">
                        <regular-button title="Collapse folders" @click="collapseFolders()" class="compact" name=""
                            icon='<path d="m6.018 0a1 1 0 0 0-0.7109 0.2812 1 1 0 0 0-0.02734 1.412l2.721 2.822 2.721-2.822a1 1 0 0 0-0.02734-1.412 1 1 0 0 0-1.414 0.02539l-1.279 1.326-1.279-1.326a1 1 0 0 0-0.7031-0.3066zm-4.018 6a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-12zm6 5.521-2.721 2.822a1 1 0 0 0 0.02734 1.412 1 1 0 0 0 1.414-0.02539l1.279-1.326 1.279 1.326a1 1 0 0 0 1.414 0.02539 1 1 0 0 0 0.02734-1.412l-2.721-2.822z" />' />
                    </div>
                    <dialog-window :title="dialog?.title" v-if="dialog" @cancel="dialog = null"
                        @confirm="dialogConfirm()">
                        <input v-model="dialogInputField" type="text" placeholder="Name...">
                        <select-option v-if="dialog?.id === 'create_file'" :options="fileTypeOptions"
                            @selected="fileTypeSelected" />
                    </dialog-window>
                </header>
                <span v-if="explorerState === 'loading'">Loading explorer..</span>
                <section v-else-if="explorerState === 'done'">
                    <tree-item v-for="entry in projectTree" :key="entry.name" :contents="entry.content" root=""
                        :name="entry.name" @reload-tree="reload">
                    </tree-item>
                </section>
            </section>
            <section id="pack_info" v-if="tab === 'pack_info'"></section>
            <section id="search" v-if="tab === 'search'"></section>
        </div>
        <nav>
            <large-button @click="tab = 'explorer'" name="Explorer"
                icon='<path d="m11 2c1.662 0 3 1.338 3 3v2h1c0.554 0 1 0.446 1 1s-0.446 1-1 1h-1v2c0 1.662-1.338 3-3 3-0.55228 0-1-0.44772-1-1s0.44772-1 1-1c0.554 0 1-0.446 1-1v-6c0-0.554-0.446-1-1-1-0.55228 0-1-0.44772-1-1s0.44772-1 1-1zm-6 0c-1.662 0-3 1.338-3 3v2h-1c-0.554 0-1 0.446-1 1s0.446 1 1 1h1v2c0 1.662 1.338 3 3 3 0.55228 0 1-0.44772 1-1s-0.44772-1-1-1c-0.554 0-1-0.446-1-1v-6c0-0.554 0.446-1 1-1 0.55228 0 1-0.44772 1-1s-0.44772-1-1-1z" />' />
            <large-button @click="tab = 'pack_info'" name="Pack info"
                icon='<path d="m7 0a2 2 0 00-2 2h-2c-1.662 0-3 1.338-3 3v8c0 1.662 1.338 3 3 3h8c1.662 0 3-1.338 3-3v-2a2 2 0 002-2 2 2 0 00-2-2v-2c0-1.662-1.338-3-3-3h-2a2 2 0 00-2-2zm-4 4h8c.554 0 1 .446 1 1v8c0 .554-.446 1-1 1h-2a2 2 0 00-2-2 2 2 0 00-2 2h-2c-.554 0-1-.446-1-1v-2a2 2 0 002-2 2 2 0 00-2-2v-2c0-.554.446-1 1-1z" fill-rule="evenodd" />' />
            <large-button @click="tab = 'search'" name="Search"
                icon='<path d="m10 7a3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3 3 3 0 0 1 3 3zm-3-5a5 5 0 0 0-5 5 5 5 0 0 0 5 5 5 5 0 0 0 2.7539-0.83203l2.5391 2.5391c0.39052 0.39052 1.0235 0.39052 1.4141 0 0.39052-0.39052 0.39052-1.0235 0-1.4141l-2.5391-2.5391a5 5 0 0 0 0.83203-2.7539 5 5 0 0 0-5-5z" fill-rule="evenodd" />' />
        </nav>
    </aside>
</template>

<script lang="ts">
import { TreeEntry } from "@/background";
import { Options, Vue } from "vue-class-component";
import LargeButton from "../generic/LargeButton.vue";
import RegularButton from "../generic/RegularButton.vue";
import TreeItem from "../generic/TreeItem.vue";
import DialogWindow, { Dialog } from "./DialogWindow.vue";
import SelectOption, { Option } from "../generic/SelectWidget.vue";

@Options({
    components: {
        LargeButton,
        DialogWindow,
        RegularButton,
        SelectOption,
        TreeItem,
    },
})

export default class NavBar extends Vue {
    // FIXME ⚠️ This code was written by a degenerate
    // "Dialog" for creating files/directories is a dublicate code from TreeItem
    // Make sure to fix this up before publishing to production!
    tab = "explorer";
    explorerState = "loading";
    projectName = null;
    dialog: Dialog | null = null;
    dialogInputField = "";
    projectTree: TreeEntry[] = [];
    fileTypeSelection = 0;
    fileTypeOptions: Option[] = [
        {
            name: "mcfpp",
            icon: "<path d=\"m13 1c.404462-1.8e-7.769047.2435129.923828.6171875.154781.3736744.0692.8038458-.216797 1.0898437l-3.292969 3.2929688 3.292969 3.2929688c.285998.2859978.371578.7161702.216797 1.0898432-.154781.373676-.519365.617188-.923828.617188h-9v3c0 .552285-.4477153 1-1 1s-1-.447715-1-1v-12c0-.5522847.4477153-1 1-1zm-9 2h6.586l-3 3 3 3h-6.586z\" fill- rule=\"evenodd\" /> ",
            description: "Function",
        },
        {
            name: "advancement",
            icon: "<path d=\"m8 4.3774 1.0648 2.157 2.3805 0.34617-1.7224 1.6793 0.40638 2.3709-2.1293-1.1192-2.1293 1.1192 0.40638-2.3709-1.7224-1.6793 2.3805-0.34617zm1e-7 -4.3774 2.3515 4.7634 5.2569 0.76446-3.8036 3.7084 0.89744 5.2359-4.7023-2.4715-4.7023 2.4715 0.89744-5.2359-3.8036-3.7084 5.2569-0.76446z\" fill- rule=\"evenodd\" /> ",
            description: "Advancement",
        },
        {
            name: "recipe",
            icon: "<path d=\"m5.5 3c-.27614 0-.5.22386-.5.5v5.5h5v3.5c0 .27614.22386.5.5.5s.5-.22386.5-.5v-9.5zm8.5 2h-1v-1.5c0-.27614.22386-.5.5-.5s.5.22386.5.5zm-11.5 8c-.27614 0-.5-.22386-.5-.5v-1.5h6v2h-5.5zm.5-9.5c0-1.3807 1.1193-2.5 2.5-2.5h8c1.3807 0 2.5 1.1193 2.5 2.5v3.5h-3v5.5c0 1.3807-1.1193 2.5-2.5 2.5h-8c-1.3807 0-2.5-1.1193-2.5-2.5v-3.5h3v-5.5z\" fill- rule=\"evenodd\" /> ",
            description: "Recipe",
        },
        {
            name: "item_modifier",
            icon: "<path d=\"m12 15v-2h-2.0859375l-1.9453125-1.968749 1.53125-1.531251 1.5 1.5h1v-2h1l3 3-3 3zm-8.5-8.482422-1.5-1.517578h-2v-2h3l2 2z\" /> <path d=\"m13 1h-1v2h-2l-8 8h-2v2h3l8-8h1v2h1l3-3z\" />",
            description: "Item Modifier",
        },
        {
            name: "loot_table",
            icon: "<path d=\"m3 1c-1.108 0-2 0.892-2 2v10c0 1.108 0.892 2 2 2h10c1.108 0 2-0.892 2-2v-10c0-1.108-0.892-2-2-2h-10zm2 2a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2zm6 6a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2z\" /> ",
            description: "Loot table",
        },
        {
            name: "predicate",
            icon: "<path d=\"m15.121 5.1213c1.1716-1.1716 1.1716-3.0711 0-4.2426-1.1716-1.1716-3.0711-1.1716-4.2426 3e-7l-1.7927 1.7932-1.3789-1.3789c-.39052-.39052-1.0235-.39052-1.4141 0-.39052.39052-.39052 1.0235 0 1.4141l1.3789 1.3789-7.6719 7.6719v4.2422h4.2422l7.6719-7.6719 1.3789 1.3789c.39052.39052 1.0235.39052 1.4141-2e-7.39052-.39052.39052-1.0235 0-1.4141l-1.3789-1.3789zm-6.0354.37868 1.4141 1.4141-7.0859 7.0859-1.4141-1e-6 1e-7-1.4141z\" /> ",
            description: "Predicate",
        },
    ];

    fileTypeSelected(index: number) {
        this.fileTypeSelection = index;
    }

    created() {
        this.reload();
    }

    reload() {
        window.API.request.explorerContents().then((project: TreeEntry[] | null) => {
            if (project === null) { // Hide if no project is opened
                this.tab = "none";
                this.explorerState = "cancelled";
                return;
            }

            this.projectTree = project;
            this.explorerState = "done";
        });
    }

    newFile() {
        this.dialogInputField = "";
        this.dialog = {
            title: "Create a new file",
            id: "create_file",
        };
    }

    newFolder() {
        this.dialogInputField = "";
        this.dialog = {
            title: "Create a new folder",
            id: "create_folder",
        };
    }

    dialogConfirm() {
        if (this.dialog?.id === "create_file") {
            window.API.send.createFile(`${this.dialogInputField}.${this.fileTypeOptions[this.fileTypeSelection].name}`);
        }

        if (this.dialog?.id === "create_folder") {
            window.API.send.createDirectory(`${this.dialogInputField}`);
        }

        this.reload();
        this.dialog = null;
    }

    collapseFolders() {
        this.$el.querySelectorAll(".folder").forEach((el: HTMLDetailsElement) => { el.open = false; });
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/common";

aside {
    @extend %rowS;
    @extend %fontR;

    &>div,
    &>nav {
        @extend %colS;
    }

    &>div>section {
        min-width: 20rem;
        height: 100%;
        background-color: var(--primary-back);
        border-left: var(--border);
        border-right: var(--border);
        overflow-y: auto;

        header {
            @extend %rowC;
            border-bottom: var(--border);
            padding: 0.5rem 1rem;
            gap: 0.5rem;

            h1 {
                @extend %reset;
                font-weight: 900;
                font-size: 1.5rem;
                margin-right: auto;
            }
        }
    }

    &>nav {
        min-width: 5rem;
    }
}
</style>
