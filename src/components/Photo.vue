<template>
    <q-card>
        <img :src="src" :class="'photo' + (loaded ? '' : ' photo-loading')" />
    </q-card>
</template>

<script>
export default {
    name: 'Photo',
    props: ['src'],
    data() {
        return {
            img: null,
            loaded: false
        }
    },
    created() {
        this.img = new Image()
        this.img.addEventListener('load', () => {
            this.loaded = true
        })
        this.img.src = this.src
    }
}
</script>

<style lang="scss">
/* 1210 x 805 */
.photo-loading {
    opacity: 0.8;
}
.photo {
    aspect-ratio: 1.5031;
}
</style>