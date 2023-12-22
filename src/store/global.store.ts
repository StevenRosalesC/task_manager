import { defineStore } from "pinia";
import { ref } from 'vue';

export const useGlobalStore = defineStore("globalStore", () => {
    const isLoading  = ref<boolean>(false);

    return{
        isLoading
    }
});