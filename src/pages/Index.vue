<template>
    <q-page :class="loading ? 'page-loading' : ''" ref="indexPage">
        <transition-group appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <div v-show="loading" key="loadingScreen">
                <section class="index-section loading-section">
                    <div class="text-h3 section-title text-white">{{loadingDynamicText}}</div>
                </section>
            </div>
            <div key="mainScreen">
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
                    <div class="text-h2 section-title text-white">Capture the beauty of nature.</div>
                </section>
                <section class="index-section" ref="winter2020">
                    <q-card class="section-card" @click="cardLink('/2020/winter')">
                        <q-card-section>
                            <div class="row">
                                <div class="col-12 col-md">
                                    <div class="text-h3">Winter 2020</div>
                                    <div class="q-mt-md text-subtitle2">Find peace within the white paradise.</div>
                                    <div class="q-mt-sm text-caption text-grey-7">December 2020 - February 2021. Vancouver, BC, Canada.</div>
                                </div>
                                <div class="col-12 col-md-auto">
                                    <div class="view-collection">
                                        <div class="text-subtitle2">View Collection &gt;</div>
                                    </div>
                                </div>
                            </div>
                        </q-card-section>
                    </q-card>
                </section>
                <section class="index-section" ref="fall2020">
                    <q-card class="section-card" @click="cardLink('/2020/fall')">
                        <q-card-section>
                            <div class="row">
                                <div class="col-12 col-md">
                                    <div class="text-h3">Fall 2020</div>
                                    <div class="q-mt-md text-subtitle2">Experience the brilliant colors of the fall.</div>
                                    <div class="q-mt-sm text-caption text-grey-7">November &amp; December 2020. Vancouver, BC, Canada.</div>
                                </div>
                                <div class="col-12 col-md-auto">
                                    <div class="view-collection">
                                        <div class="text-subtitle2">View Collection &gt;</div>
                                    </div>
                                </div>
                            </div>
                        </q-card-section>
                    </q-card>
                </section>
                <div class="index-background" ref="background"></div>
            </div>
        </transition-group>
    </q-page>
</template>

<script>
import { scroll } from 'quasar'
const sections = [
    { id: 'section1', img: 'https://legendword.com/gallery/images/2020/fall/sm/DSC_0644.jpg' },
    { id: 'section2', img: 'https://legendword.com/gallery/images/2020/winter/sm/DSC_0892.jpg' },
    { id: 'winter2020', img: 'https://legendword.com/gallery/images/2020/winter/sm/DSC_1301.jpg' },
    { id: 'fall2020', img: 'https://legendword.com/gallery/images/2020/fall/sm/DSC_0798.jpg' }
];
export default {
    name: 'Index',
    data() {
        return {
            loadingDynamicText: 'Loading',
            loadingDynamicCounter: 0,
            currentSection: 'section1',
            imageCache: {},
            loading: true
        }
    },
    computed: {
        windowHeight() {
            return window.innerHeight;
        }
    },
    mounted() {
        //preload image
        for (let i of sections) {
            var img = new Image()
            img.addEventListener('load', () => {
                console.log('imageLoaded', i.id)
                this.imageCache[i.id].loaded = true
                if (this.loading == true) {
                    this.loading = false
                    this.$refs.background.classList.add('bg-'+sections[0].id)
                    this.loadingFinished()
                }
                
                /*
                if (this.currentSection == i.id) {
                    this.$refs.background.classList.add(i.id)
                } */
            })
            img.src = i.img
            this.imageCache[i.id] = {
                img: img,
                loaded: false
            }
        }
        this.init()
    },
    beforeDestroy() {
        console.log('beforeDestroy')
        window.removeEventListener('scroll', this.scrollListener)
    },
    methods: {
        showScrollText() {
            this.$refs.scrollText.classList.add('show')
        },
        cardLink(link) {
            this.$router.push(link)
        },
        loadingDynamic() {
            console.log('loadingDynamic')
            if (this.loading) {
                if (this.loadingDynamicCounter == 3) {
                    this.loadingDynamicText = 'Loading'
                    this.loadingDynamicCounter = 0
                }
                else {
                    this.loadingDynamicText += '.'
                    ++this.loadingDynamicCounter
                }
                setTimeout(this.loadingDynamic, 500)
            }
        },
        loadingFinished() {
            //set time out for not scrolling detection
            setTimeout(() => {
                if (scroll.getScrollPosition(window) == 0) { //user has not scrolled yet
                    this.showScrollText()
                }
            }, 2000)
        },
        scrollListener(ev) {
            if (this.loading) { //prevent scrolling on loading
                ev.preventDefault()
                return
            }
            if (this.$refs.scrollText.classList.contains('show')) {
                this.$refs.scrollText.classList.remove('show')
            }
            let pos = scroll.getScrollPosition(window)
            let curSec = sections[0].id
            for (let i of sections) {
                if (pos >= this.$refs[i.id].offsetTop - this.windowHeight/3) curSec = i.id;
                else break;
            }
            if (curSec != this.currentSection) {
                this.$refs.background.classList.remove('bg-'+this.currentSection)
                //if (this.imageCache[curSec].loaded) {
                    this.$refs.background.classList.add('bg-'+curSec)
                //}
                this.currentSection = curSec
            }
        },
        init() {
            //scrollListener for changing background image
            window.addEventListener('scroll', this.scrollListener)

            //start loading dynamic text timer
            setTimeout(this.loadingDynamic, 500)
        }
    }
}
</script>

<style lang="scss">
@import '../css/app.scss';
@include featured-images;

.page-loading {
    overflow: hidden;
    height: 100vh;
    width: 100vw;
}

.index-background {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transition: background-image 0.8s ease;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    /* filter: blur(2px); */
    z-index: -1 !important;
    background-color: #295a1da3;
}
.index-section {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &.loading-section {
        background-color: #295a1da3;
    }

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

        .view-collection {
            opacity: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100%;
            transition: opacity 0.8s ease;
        }

        &:hover {
            opacity: 0.9;

            .view-collection {
                opacity: 1;
            }
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