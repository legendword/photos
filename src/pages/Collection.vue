<template>
    <q-page>
        <div class="title-block">
            <div class="collection-page">
                <div class="text-subtitle2 q-mb-md back-btn-outer">
                    <q-btn class="back-btn" flat icon="navigate_before" label="Back" @click="goHome" />
                </div>
                <div class="text-h3">{{collection.name}}</div>
                <div class="text-subtitle1 q-mt-sm">{{collection.desc}}</div>
                <div class="text-subtitle2 text-grey-7 q-mt-sm">{{collection.footnote}}</div>
            </div>
        </div>
        <div class="collection-page">
            <q-card>
                <!--
                <q-card-section>
                    Tags (Todo)
                </q-card-section>
                -->
                <q-card-section class="q-pb-none">
                    <div class="text-h6 q-pl-sm">{{collection.images.length}} Photos</div>
                </q-card-section>
                <q-card-section>
                    <div class="row">
                        <div class="col-12 col-sm-6 col-md-4 q-pa-sm" v-for="(img, ind) in collection.images" :key="img">
                            <photo :src="baseUrl + 'sm/' + img" class="photo-display" @click.native="photoClick(img, ind)" />
                        </div>
                    </div>
                </q-card-section>
            </q-card>
            <q-card class="q-mt-lg q-mb-md">
                <q-card-section>
                    <div class="text-caption text-center">&copy; Copyright 2020-2021 Legendword. Use of images on this site is free of charge only if you give explicit credit to Legendword.</div>
                </q-card-section>
            </q-card>
        </div>
        <q-dialog v-model="photoDialog">
            <q-card style="width: 1200px; max-width: 85vw;">
                <q-card-section>
                    <div class="flex justify-between">
                        <div class="text-h5">{{selectedPhoto}}</div>
                        <div>
                            <q-btn-dropdown color="primary" flat label="Download">
                                <q-list class="text-right">
                                    <q-item clickable v-close-popup @click="downloadSelected('sm/')">
                                        <q-item-section>
                                            <q-item-label>Small <span class="text-grey-7">(1210x805)</span></q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-item clickable v-close-popup @click="downloadSelected('md/')">
                                        <q-item-section>
                                            <q-item-label>Medium <span class="text-grey-7">(1512x1006)</span></q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-item clickable v-close-popup @click="downloadSelected('')">
                                        <q-item-section>
                                            <q-item-label>Original <span class="text-grey-7">(6048x4024)</span></q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </q-btn-dropdown>
                        </div>
                    </div>
                </q-card-section>
                <q-card-section class="q-py-none q-mb-md relative-position">
                    <img :src="baseUrl + 'sm/' + selectedPhoto" class="photoDialog-photo" />
                    <div class="photo-controls">
                        <div class="prev">
                            <q-btn flat round icon="navigate_before" :disable="selectedIndex == 0" @click="navPhoto(-1)" />
                        </div>
                        <div class="next">
                            <q-btn flat round icon="navigate_next" :disable="selectedIndex == collection.images.length-1" @click="navPhoto(1)" />
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>
        <div :class="'index-background bg-'+bgName" ref="background"></div>
        <!-- place QPageScroller at end of page -->
        <q-page-scroller position="bottom-right" :scroll-offset="500" :offset="[18, 18]">
            <q-btn fab icon="keyboard_arrow_up" color="white" class="text-black" />
        </q-page-scroller>
    </q-page>
</template>

<script>
import photoIndex from '../photoIndex'
import Photo from '../components/Photo'
import downloadFile from '../downloadFile'
export default {
    name: 'Collection',
    components: {
        Photo
    },
    data() {
        return {
            loading: true,
            collection: {},
            year: '',
            season: '',
            photoDialog: false,
            selectedPhoto: '',
            selectedIndex: 0
        }
    },
    methods: {
        goHome() {
            this.$router.push('/')
        },
        navPhoto(pos) {
            this.photoClick(this.collection.images[this.selectedIndex+pos], this.selectedIndex+pos)
        },
        downloadSelected(rsl) {
            if (this.selectedPhoto == '') return
            if (location.hostname != 'legendword.com') {
                //download file through <a> 'download' attribute does not work cross-origin
                window.open(this.baseUrl + rsl + this.selectedPhoto, '_blank')
                return
            }
            let res = downloadFile(this.selectedPhoto, this.baseUrl + rsl + this.selectedPhoto)
            if (res !== true) {
                this.$q.notify({
                    color: 'negative',
                    position: 'top',
                    message: 'Unable to download, opening image in new window...'
                })
                window.open(this.baseUrl + rsl + this.selectedPhoto, '_blank')
            }
        },
        photoClick(img, ind) {
            console.log('photoClick')
            this.selectedPhoto = img
            this.selectedIndex = ind
            this.photoDialog = true
        }
    },
    created() {
        let params = this.$route.params
        if (!params.year || !params.season) {
            this.$router.replace('/notFound')
        }
        this.collection = photoIndex.collections.find(v => v.year == params.year && v.season == params.season)
        if (!this.collection) this.$router.replace('/notFound')

        this.year = params.year
        this.season = params.season
    },
    computed: {
        baseUrl() {
            return photoIndex.baseUrl + this.year + '/' + this.season + '/'
        },
        bgName() {
            return this.season + this.year
        }
    }
}
</script>

<style lang="scss">
@import '../css/app.scss';
@include featured-images;

.collection-page {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
}
@media (max-width: 600px) {
    .collection-page {
        width: 95%;
    }
}
.back-btn {
    opacity: 0.7;
    &:hover {
        opacity: 1;
    }
}
.back-btn-outer {
    position: relative;
    left: -20px;
}
.title-block {
    padding-top: max( 25px, 6vh );
    padding-bottom: 50px;
    margin-bottom: max( 50px, 10vh );
    background-color: #fff;
    width: 100%;
    opacity: 0.9;
}
.photo-controls {
    & > * {
        position: absolute;
        height: 100%;
        top: 0;
        width: 48px;
        z-index: 100;

        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .prev {
        left: 10px;
    }
    .next {
        right: 10px;
    }
}
.photo-display {
    cursor: zoom-in;
}
.photoDialog-photo {
    display: block;
    aspect-ratio: 1.5031;
    width: auto;
    margin: auto;
    max-height: calc( 100vh - 132px );
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
</style>