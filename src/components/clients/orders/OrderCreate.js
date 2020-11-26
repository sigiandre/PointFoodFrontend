import Loader from "@/shared/Loader";
import Pager from "@/shared/Pager";

export default {
  name: "OrderCreate",
  components: {
    Loader,
    Pager,
  },
  mounted() {
    this.getAll(1);
  },
  computed: {
    iva() {
      if (this.productsSelected.length === 1)
        return this.productsSelected[0].iva;

      if (this.productsSelected.length > 1) {
        let sum = 0;
        for (let i = 0; i < this.productsSelected.length; i++) {
          sum = sum + this.productsSelected[i].iva;
        }
        return sum;
      }

      return 0;
    },
    subTotal() {
      if (this.productsSelected.length === 1)
        return this.productsSelected[0].subTotal;

      if (this.productsSelected.length > 1) {
        let sum = 0;
        for (let i = 0; i < this.productsSelected.length; i++) {
          sum = sum + this.productsSelected[i].subTotal;
        }
        return sum;
      }

      return 0;
    },
    total() {
      if (this.productsSelected.length === 1)
        return this.productsSelected[0].total;

      if (this.productsSelected.length > 1) {
        let sum = 0;
        for (let i = 0; i < this.productsSelected.length; i++) {
          sum = sum + this.productsSelected[i].total;
        }
        return sum;
      }

      return 0;
    },
  },
  data() {
    return {
      isLoading: false,
      model: {
        clientId: 0,
        products: [],
        restaurantId: null,
        delivery: null,
        address: null,
        total: null,
      },
      collectionRestaurant: {
        hasItems: false,
        items: [],
        total: 0,
        page: 1,
        pages: 0,
      },
      collectionCategory: {
        hasItems: false,
        items: [],
        total: 0,
        page: 1,
        pages: 0,
      },
      products: [],
      dishes: [],
      extras: [],
      productsSelected: [],
      product: {
        productId: null,
        quantity: null,
        price: null,
        subTotal: null,
      },

      //STEPS
      activeStep: 0,

      showExtra: true,
      isAnimated: true,
      isRounded: true,
      isStepsClickable: false,

      hasNavigation: true,
      customNavigation: false,
      isProfileSuccess: false,

      prevIcon: "chevron-left",
      nextIcon: "chevron-right",
      labelPosition: "bottom",
      mobileMode: "minimalist",

      categorySelected: null,

      user: this.$store.state.user,
    };
  },
  methods: {
    getAll(page) {
      if (this.categorySelected == null) {
        this.isLoading = true;

        this.$proxies.restaurantProxy
          .getAll(page, 5)
          .then((x) => {
            this.collectionRestaurant = x.data;
            this.isLoading = false;
          })
          .catch(() => {
            this.isLoading = false;
          });
        this.isLoading = true;

        this.$proxies.categoryProxy
          .getAll(page, 30)
          .then((x) => {
            this.collectionCategory = x.data;
            this.isLoading = false;
          })
          .catch(() => {
            this.isLoading = false;
          });
      } else {
        this.isLoading = true;

        this.$proxies.restaurantProxy
          .getAllByCategory(this.categorySelected, page, 5)
          .then((x) => {
            this.collectionRestaurant = x.data;
            this.isLoading = false;
          })
          .catch(() => {
            this.isLoading = false;
          });
      }
    },
    selectRestaurant(restaurantId) {
      this.isLoading = true;

      //Borrar datos
      if (this.model.restaurantId != restaurantId) {
        this.product.quantity = null;
        this.product.price = null;
        this.model.products = [];
        this.products = [];
        this.dishes = [];
        this.extras = [];
        this.productsSelected = [];
      }

      this.model.restaurantId = restaurantId;
      this.products = this.collectionRestaurant.items.find(
        (x) => x.restaurantId == restaurantId
      ).products;
      this.dishes = this.products.filter((x) => x.productTypeId == 1);
      this.extras = this.products.filter((x) => x.productTypeId == 2);

      this.isLoading = false;
    },
    onChangeProductSelection() {
      let product = this.products.find(
        (x) => x.productId == this.product.productId
      );
      this.product.quantity = 1;
      this.product.price = product.price;
    },
    addProduct() {
      if (
        !this.model.products.some((x) => x.productId === this.product.productId)
      ) {
        const ivaRate = 0.18;

        //MODEL
        let item = {
          productId: this.product.productId,
          quantity: this.product.quantity,
        };
        item.subtotal = this.product.price * this.product.quantity;
        //TEMPORAL
        let itemSelected = {
          productId: this.product.productId,
          name: this.products.find(
            (x) => x.productId === this.product.productId
          ).name,
          quantity: this.product.quantity,
          price: this.product.price,
        };
        itemSelected.total = this.product.price * this.product.quantity;
        itemSelected.subTotal =
          Math.round((itemSelected.total / (1 + ivaRate)) * 100) / 100;
        itemSelected.iva =
          Math.round((itemSelected.total - itemSelected.subTotal) * 100) / 100;

        this.model.products.push(item);
        this.productsSelected.push(itemSelected);
        this.onChangeProductSelection();
      } else {
        const ivaRate = 0.18;

        this.model.products.find(
          (x) => x.productId === this.product.productId
        ).quantity =
          this.model.products.find(
            (x) => x.productId === this.product.productId
          ).quantity + this.product.quantity;

        let quantityModel = this.model.products.find(
          (x) => x.productId === this.product.productId
        ).quantity;

        this.model.products.find(
          (x) => x.productId === this.product.productId
        ).subTotal = this.product.price * quantityModel;

        this.productsSelected.find(
          (x) => x.productId === this.product.productId
        ).quantity =
          this.productsSelected.find(
            (x) => x.productId === this.product.productId
          ).quantity + this.product.quantity;

        let quantity = this.productsSelected.find(
          (x) => x.productId === this.product.productId
        ).quantity;
        this.productsSelected.find(
          (x) => x.productId === this.product.productId
        ).total = this.product.price * quantity;

        let total = this.productsSelected.find(
          (x) => x.productId === this.product.productId
        ).total;
        this.productsSelected.find(
          (x) => x.productId === this.product.productId
        ).subTotal = Math.round((total / (1 + ivaRate)) * 100) / 100;

        let subTotal = this.productsSelected.find(
          (x) => x.productId === this.product.productId
        ).subTotal;
        this.productsSelected.find(
          (x) => x.productId === this.product.productId
        ).iva = Math.round((total - subTotal) * 100) / 100;

        this.onChangeProductSelection();
      }
    },
    removeProduct(id) {
      this.model.products = this.model.products.filter(
        (x) => x.productId != id
      );
      this.productsSelected = this.productsSelected.filter(
        (x) => x.productId != id
      );
    },
    create() {
      this.isLoading = true;

      this.model.clientId = this.user.id;
      if (this.model.delivery === "delivery") {
        this.model.delivery = true;
      } else {
        this.model.delivery = false;
        this.model.address = null;
      }

      let sumTotal = 0;
      for (let i = 0; i < this.productsSelected.length; i++) {
        sumTotal = sumTotal + this.productsSelected[i].total;
      }
      this.model.total = sumTotal;

      this.$proxies.orderProxy
        .create(this.model)
        .then(() => {
          this.isLoading = false;
          this.$notify({
            group: "global",
            type: "is-success",
            text: "La orden ha sido creada",
          });

          this.$router.push("/");
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
