import Loader from "@/shared/Loader";
import Pager from "@/shared/Pager";

export default {
  name: "RestaurantCreateOrUpdate",
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

      restaurant: {
        name: null,
        address: null,
        phonenumber: null,
        restaurantownerid: null,
        restaurantcategories: [],
      },
      category: null,
    };
  },
  methods: {
    getAll(page) {
      this.isLoading = true;

      this.$proxies.categoryProxy
        .getAll(page, 30)
        .then((x) => {
          this.collection = x.data;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    create() {
      this.restaurant.restaurantownerid = this.user.id;
      for (this.category of this.restaurant.restaurantcategories) {
        delete this.category.name;
        delete this.category.restaurantcategories;
      }
      this.$proxies.restaurantProxy
        .create(this.restaurant)
        .then(() => {
          this.restaurant.name = null;
          this.restaurant.address = null;
          this.restaurant.phonenumber = null;
          this.restaurant.restaurantownerid = null;

          this.$notify({
            group: "global",
            type: "is-success",
            text: "Tu restaurante ha sido registrado con éxito",
          });
          this.$router.push("/restaurants/restaurantowners");
        })
        .catch(() => {
          this.isLoading = false;
          this.$notify({
            group: "global",
            type: "is-danger",
            text: "Ocurrió un error inesperado",
          });
        });
    },
  },
};
