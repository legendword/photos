<template>
    <q-page>
        <section class="index-section">
            <div class="text-h2 section-title text-white"><span style="font-weight: 400;">Legendword </span><span style="font-weight: 300;">Photos</span></div>
        </section>
        <section class="index-section">
            <div class="text-h2 text-center"><span style="font-weight: 400;">Legendword </span><span style="font-weight: 300;">Photos</span></div>
        </section>
        <div class="index-background">
        </div>
    </q-page>
</template>

<script>
export default {
    name: 'Index',
    computed: {
        windowHeight() {
            return window.innerHeight;
        }
    }
}
</script>

<style lang="scss">
.index-background {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: url('https://legendword.com/gallery/images/2020%20Fall/DSC_0798.jpg');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    filter: blur(4px);
    z-index: -1 !important;
}
.index-section {
    height: 100vh;
    width: 100vw;
    position: relative;

    .section-title {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
    }
}
</style>