<template>
    <q-page>

    </q-page>
</template>

<script>
import photoIndex from '../photoIndex'
export default {
    name: 'Collection',
    data() {
        return {
            loading: true,
            collection: {},
            year: null,
            season: null
        }
    },
    created() {
        let params = this.$route.params
        if (!params.year || !params.season) {
            this.$router.replace('/notFound')
        }
        else {
            this.collection = photoIndex.collections.find(v => v.year == params.year && v.season == params.season)
            if (!this.collection) this.$router.replace('/notFound')
        }
        this.year = params.year
        this.season = params.season
        this.$api.get('/' + this.year + '/' + this.season).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    },
    mounted() {
        
    }
}
</script>

<style>

</style>