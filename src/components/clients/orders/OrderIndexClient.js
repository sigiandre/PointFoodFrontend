import Loader from "@/shared/Loader";
import Pager from "@/shared/Pager";

export default {
  name: "OrderIndexClient",
  components: {
    Loader,
    Pager,
  },
  mounted() {
    this.getAll(1);
  },
  data() {
    return {
      isLoading: false,
      collection: {
        hasItems: false,
        items: [],
        total: 0,
        page: 1,
        pages: 0,
      },
      user: this.$store.state.user,
    };
  },
  methods: {
    getAll(page) {
      this.isLoading = true;
      this.$proxies.orderProxy
        .getAllByClient(this.user.userId, page, 5)
        .then((x) => {
          this.collection = x.data;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    cancelOrder(id) {
      this.isLoading = true;
      this.$proxies.orderProxy
        .cancelOrder(id)
        .then(() => {
          this.getAll(1);
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
};
