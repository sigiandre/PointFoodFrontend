import Loader from '@/shared/Loader'

export default {
    name: 'OrderDetailClient',
    components: {
        Loader
    },
    mounted() {
        this.get();
    },
    data() {
        return {
            isLoading: false,
            model: {
                orderId: null,
                client: {
                    name: null
                },
                products: [],
                registeredAt: null,
                restaurant: {},
                delivery: null,
                total: null,
                stateName: null
            }
        }
    },
    methods: {
        get() {
            this.isLoading = true;

            this.$proxies.orderProxy.get(this.$route.params.id)
                .then(x => {
                    this.model = x.data;
                    this.isLoading = false;
                }).catch(() => {
                    this.isLoading = false;
                });
        }
    }
}