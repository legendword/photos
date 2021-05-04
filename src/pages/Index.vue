<template>
    <q-page ref="indexPage">
        <div class="scroll-text" ref="scrollText">
            <div class="text-h5 text-white">Scroll Down</div>
            <div class="text-h5 text-white">
                <q-icon name="arrow_downward" color="white" />
            </div>
        </div>
        <section class="index-section" ref="section1">
            <div class="text-h2 section-title text-white"><span style="font-weight: 400;">Legendword </span><span style="font-weight: 300;">Photos</span></div>
        </section>
        <section class="index-section" ref="section2">
            <div class="text-h2 section-title text-white">Capture the art of nature.</div>
        </section>
        <section class="index-section" ref="section3">
            <q-card class="section-card" @click="cardLink('/2020/fall')">
                <q-card-section>
                    <div class="text-h3">2020 Fall</div>
                    <div class="q-mt-md text-subtitle2">Experience the brilliant colors of the fall.</div>
                    <div class="q-mt-sm text-caption text-grey-7">November &amp; December 2020. Vancouver, BC, Canada.</div>
                </q-card-section>
            </q-card>
        </section>
        <div class="index-background section1" ref="background"></div>
    </q-page>
</template>

<script>
import { scroll } from 'quasar'
const sections = ['section1', 'section2', 'section3']
export default {
    name: 'Index',
    data() {
        return {
            scrollListener: null,
            currentSection: 'section1'
        }
    },
    computed: {
        windowHeight() {
            return window.innerHeight;
        }
    },
    mounted() {
        console.log(this.$refs.section3.offsetTop)
        this.scrollListener = window.addEventListener('scroll', (ev) => {
            if (this.$refs.scrollText.classList.contains('show')) {
                this.$refs.scrollText.classList.remove('show')
            }
            let pos = scroll.getScrollPosition(window)
            let curSec = sections[0]
            for (let i of sections) {
                if (pos >= this.$refs[i].offsetTop - this.windowHeight/3) curSec = i;
                else break;
            }
            if (curSec != this.currentSection) {
                this.$refs.background.classList.remove(this.currentSection)
                this.$refs.background.classList.add(curSec)
                this.currentSection = curSec
            }
        })
        setTimeout(() => {
            if (scroll.getScrollPosition(window) == 0) { //user has not scrolled yet
                this.showScrollText()
            }
        }, 2000)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.scrollListener)
    },
    methods: {
        showScrollText() {
            this.$refs.scrollText.classList.add('show')
        },
        cardLink(link) {
            this.$router.push(link)
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
    transition: background-image 1s ease;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    filter: blur(2px);
    z-index: -1 !important;

    &.section1 {
        background-image: url('https://legendword.com/gallery/images/2020/fall/DSC_0644.jpg');
    }
    &.section2 {
        background-image: url('https://legendword.com/gallery/images/2020/winter/DSC_0892.jpg');
    }
    &.section3 {
        background-image: url('https://legendword.com/gallery/images/2020/fall/DSC_0798.jpg');
    }
}
.index-section {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .section-title {
        text-align: center;
    }
    .section-card {
        margin-left: auto;
        margin-right: auto;
        width: min(80%, 800px);
        border-radius: 4px;
        padding: 1.5rem;
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        transition: opacity 0.8s ease;
        opacity: 1;

        &:hover {
            opacity: 0.7;
        }
    }
}
.scroll-text {
    position: fixed;
    bottom: 7%;
    width: 100%;
    text-align: center;
    transition: opacity 1s ease;
    animation: scrollTextAnimation 3s ease-in-out infinite;
    opacity: 0;

    &.show {
        opacity: 0.8;
    }
}
@keyframes scrollTextAnimation {
    0% {
        bottom: 7%;
    }
    50% {
        bottom: 5%;
    }
    100% {
        bottom: 7%;
    }
}
</style>