<template>
    <details v-if="show" :class="contents ? 'folder' : 'file'" @click="contents ? null : openFile()">
        <summary :title="(root ? root + separator : '') + name">
            <svg v-if="!contents && name.endsWith('.recipe')" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                viewBox="0 0 16 16" fill="currentColor" class="icon" style="color: var(--format-recipe)">
                <path
                    d="m5.5 3c-.27614 0-.5.22386-.5.5v5.5h5v3.5c0 .27614.22386.5.5.5s.5-.22386.5-.5v-9.5zm8.5 2h-1v-1.5c0-.27614.22386-.5.5-.5s.5.22386.5.5zm-11.5 8c-.27614 0-.5-.22386-.5-.5v-1.5h6v2h-5.5zm.5-9.5c0-1.3807 1.1193-2.5 2.5-2.5h8c1.3807 0 2.5 1.1193 2.5 2.5v3.5h-3v5.5c0 1.3807-1.1193 2.5-2.5 2.5h-8c-1.3807 0-2.5-1.1193-2.5-2.5v-3.5h3v-5.5z"
                    fill-rule="evenodd" />
            </svg>
            <svg v-if="!contents && name.endsWith('.advancement')" xmlns="http://www.w3.org/2000/svg" width="16"
                height="16" viewBox="0 0 16 16" fill="currentColor" class="icon"
                style="color: var(--format-advancement)">
                <path
                    d="m8 4.3774 1.0648 2.157 2.3805 0.34617-1.7224 1.6793 0.40638 2.3709-2.1293-1.1192-2.1293 1.1192 0.40638-2.3709-1.7224-1.6793 2.3805-0.34617zm1e-7 -4.3774 2.3515 4.7634 5.2569 0.76446-3.8036 3.7084 0.89744 5.2359-4.7023-2.4715-4.7023 2.4715 0.89744-5.2359-3.8036-3.7084 5.2569-0.76446z"
                    fill-rule="evenodd" />
            </svg>
            <svg v-if="!contents && name.endsWith('.mcfpp')" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                viewBox="0 0 16 16" fill="currentColor" class="icon" style="color: var(--format-function)">
                <path
                    d="m13 1c.404462-1.8e-7.769047.2435129.923828.6171875.154781.3736744.0692.8038458-.216797 1.0898437l-3.292969 3.2929688 3.292969 3.2929688c.285998.2859978.371578.7161702.216797 1.0898432-.154781.373676-.519365.617188-.923828.617188h-9v3c0 .552285-.4477153 1-1 1s-1-.447715-1-1v-12c0-.5522847.4477153-1 1-1zm-9 2h6.586l-3 3 3 3h-6.586z"
                    fill-rule="evenodd" />
            </svg>
            <svg v-if="!contents && name.endsWith('.predicate')" xmlns="http://www.w3.org/2000/svg" width="16"
                height="16" viewBox="0 0 16 16" fill="currentColor" class="icon" style="color: var(--format-predicate)">
                <path
                    d="m15.121 5.1213c1.1716-1.1716 1.1716-3.0711 0-4.2426-1.1716-1.1716-3.0711-1.1716-4.2426 3e-7l-1.7927 1.7932-1.3789-1.3789c-.39052-.39052-1.0235-.39052-1.4141 0-.39052.39052-.39052 1.0235 0 1.4141l1.3789 1.3789-7.6719 7.6719v4.2422h4.2422l7.6719-7.6719 1.3789 1.3789c.39052.39052 1.0235.39052 1.4141-2e-7.39052-.39052.39052-1.0235 0-1.4141l-1.3789-1.3789zm-6.0354.37868 1.4141 1.4141-7.0859 7.0859-1.4141-1e-6 1e-7-1.4141z" />
            </svg>
            <svg v-if="!contents && name.endsWith('.loot_table')" xmlns="http://www.w3.org/2000/svg" width="16"
                height="16" viewBox="0 0 16 16" fill="currentColor" class="icon"
                style="color: var(--format-loot-table)">
                <path
                    d="m3 1c-1.108 0-2 0.892-2 2v10c0 1.108 0.892 2 2 2h10c1.108 0 2-0.892 2-2v-10c0-1.108-0.892-2-2-2h-10zm2 2a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2zm6 6a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2z" />
            </svg>
            <svg v-if="!contents && name.endsWith('.item_modifier')" xmlns="http://www.w3.org/2000/svg" width="16"
                height="16" viewBox="0 0 16 16" fill="currentColor" class="icon"
                style="color: var(--format-item-modifier)">
                <path
                    d="m12 15v-2h-2.0859375l-1.9453125-1.968749 1.53125-1.531251 1.5 1.5h1v-2h1l3 3-3 3zm-8.5-8.482422-1.5-1.517578h-2v-2h3l2 2z" />
                <path d="m13 1h-1v2h-2l-8 8h-2v2h3l8-8h1v2h1l3-3z" />
            </svg>
            <svg v-if="contents" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                fill="currentColor" class="icon folder-arrow">
                <path
                    d="m5.292 12.292c-0.39174 0.39173-0.39174 1.0243 0 1.416 0.39174 0.39174 1.0243 0.39174 1.416 0l5.7051-5.707-5.7051-5.707c-0.39174-0.39174-1.0243-0.39174-1.416 0-0.39174 0.39173-0.39174 1.0243 0 1.416l4.293 4.291z" />
            </svg>

            <strong>{{ contents? name: name.split(".")[0] }}</strong>

            <div v-if="contents" style="--btn-color: var(--theme-accent)">
                <regular-button title="New file" @click="newFile()" class="compact" name=""
                    icon='<path d="m5 0c-1.662 0-3 1.338-3 3v10c0 1.662 1.338 3 3 3h4.992v-0.02148h-2.006v-1.979h-2.986c-0.554 0-1-0.446-1-1v-10c0-0.554 0.446-1 1-1h3v4h4v1.971h2v-2.799l-5.172-5.172h-3.828zm6.992 9.971v1 1.008h-1.006-1v2h1 1.006v1.008 1h2v-1-1.008h1.008 1v-2h-1-1.008v-1.008-1h-2z" />' />
            </div>
            <div v-if="contents" style="--btn-color: var(--theme-accent)">
                <regular-button title="New folder" @click="newFolder()" class="compact" name=""
                    icon='<path d="m3 0c-1.627 0-3 1.373-3 3v8c0 1.627 1.373 3 3 3h5v-2h-5c-0.554 0-1-0.446-1-1v-6c0-0.554 0.446-1 1-1h10c0.554 0 1 0.446 1 1v3h2v-3c0-1.627-1.373-3-3-3h-4l-2-2h-4zm9 10v2h-2v2h2v2h2v-2h2v-2h-2v-2h-2z" />' />
            </div>
            <div style="--btn-color: var(--theme-warning)">
                <regular-button title="Edit" @click="renameFile()" class="compact" name=""
                    icon='<path d="m15.086 5.328c1.2188-1.2189 1.2188-3.195 0-4.4139-1.2189-1.2188-3.195-1.2188-4.4139-1e-7l-10.672 10.672v4.4141h4.4141l5.3359-5.336zm-5.0859-0.91396 1.5859 1.5859-8 8h-1.5859v-1.5859z" fill-rule="evenodd" />' />
            </div>
            <div style="--btn-color: var(--theme-disturbing)">
                <regular-button title="Delete" @click="deleteFile()" class="compact" name=""
                    icon='<path d="m6 0c-1.108 0-2 0.892-2 2h-2c-0.554 0-1 0.446-1 1s0.446 1 1 1v9c0 1.662 1.338 3 3 3h6c1.662 0 3-1.338 3-3v-9c0.554 0 1-0.446 1-1s-0.446-1-1-1h-2c0-1.108-0.892-2-2-2h-4zm-2 4h8v9c0 0.554-0.446 1-1 1h-6c-0.554 0-1-0.446-1-1v-9zm2.334 2c-0.554 0-1 0.446-1 1v4c0 0.554 0.446 1 1 1s1-0.446 1-1v-4c0-0.554-0.446-1-1-1zm3.332 0c-0.554 0-1 0.446-1 1v4c0 0.554 0.446 1 1 1 0.554 0 1-0.446 1-1v-4c0-0.554-0.446-1-1-1z" fill-rule="evenodd" />' />
            </div>
        </summary>
        <section>
            <tree-item v-for="entry in contents" :key="entry.name" :contents="entry.content"
                :root="(root ? root + separator : '') + name" :name="entry.name" @reload-tree="$emit('reload-tree')">
            </tree-item>
        </section>
    </details>
    <dialog-window :title="dialog?.title" v-if="dialog" @cancel="dialog = null" @confirm="dialogConfirm()">
        <input v-model="dialogInputField" type="text" placeholder="Name...">
        <select-option v-if="dialog?.id === 'create_file'" :options="fileTypeOptions" @selected="fileTypeSelected" />
    </dialog-window>
</template>

<script lang="ts">
import { TreeEntry } from "@/background";
import { Options, Vue } from "vue-class-component";
import RegularButton from "./RegularButton.vue";
import DialogWindow, { Dialog } from "../composed/DialogWindow.vue";
import SelectOption, { Option } from "./SelectWidget.vue";

@Options({
    props: {
        name: String,
        root: String,
        contents: Array,
    },
    components: {
        RegularButton,
        DialogWindow,
        SelectOption,
    },
    emits: ["reload-tree"],
})

export default class TreeItem extends Vue {
    name!: string;
    root!: string;
    contents!: TreeEntry[];
    separator = window.API.separator;
    show = true;
    dialog: Dialog | null = null;
    dialogInputField = "";
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

    deleteFile() {
        window.API.send.removeFile(this.root + this.separator + this.name);
        this.$emit("reload-tree");
        this.show = false;
    }

    renameFile() {
        this.dialogInputField = this.name.split(".")[0];
        this.dialog = {
            title: `Rename ${this.name}`,
            id: "rename",
        };
    }

    dialogConfirm() {
        if (this.dialog?.id === "rename") {
            window.API.send.move(`${this.root}${this.separator}${this.name}`, this.name.split(".")[1] ? `${this.root}${this.separator}${this.dialogInputField}.${this.name.split(".")[1]}` : `${this.root}${this.separator}${this.dialogInputField}`);
        }

        if (this.dialog?.id === "create_file") {
            window.API.send.createFile(`${this.root}${this.separator}${this.name}${this.separator}${this.dialogInputField}.${this.fileTypeOptions[this.fileTypeSelection].name}`);
        }

        if (this.dialog?.id === "create_folder") {
            window.API.send.createDirectory(`${this.root}${this.separator}${this.name}${this.separator}${this.dialogInputField}`);
        }

        this.$emit("reload-tree");
        this.dialog = null;
    }

    newFile() {
        this.dialogInputField = "";
        this.dialog = {
            title: `Create a new file inside ${this.name}`,
            id: "create_file",
        };
    }

    newFolder() {
        this.dialogInputField = "";
        this.dialog = {
            title: `Create a new folder inside ${this.name || "root"}`,
            id: "create_folder",
        };
    }

    openFile() {
        console.log("TODO", `${this.root}${this.separator}${this.name}`);
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/common";

details {
    background-color: transparent;

    &.folder[open]>summary>.folder-arrow {
        transform: rotate(90deg);
    }

    &.file[open]>summary>strong {
        color: var(--text-back);

        &::after {
            content: " [Open]";
        }
    }

    &>summary {
        @extend %reset;
        @extend %rowC;
        gap: 0.25rem;
        list-style: none;
        cursor: pointer;
        padding: 0.25rem 0.5rem;

        &>strong {
            margin-right: auto;
        }

        &>div>button {
            opacity: 0;
        }

        &:hover>div>button {
            opacity: 1;
        }

        &:hover {
            background-color: var(--primary);

            &>div>button {
                opacity: 1;
            }
        }
    }

    &>section {
        margin-left: 1rem;
        border-left: 2px solid var(--primary-fore);
    }
}
</style>
