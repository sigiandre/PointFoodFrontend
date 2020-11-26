import Loader from '@/shared/Loader'
import Pager from '@/shared/Pager'

export default {
  name: 'ProductCreateOrUpdate',
  components: {
    Loader, Pager
  },
  mounted() {
    this.get();
    this.getProductTypes(1);
  },
  validators: {
    'model.name'(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(5)
        .maxLength(50);
    },
    'model.description'(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(5)
        .maxLength(200);
    }
  },
  data() {
    return {
      isLoading: false,
      model: {
        productId: 0,
        name: null,
        description: null,
        price: null,
        productTypeId: null,
        productTypeName: null,
        userId: null
      },
      collection: {
        hasItems: false,
        items: [],
        total: 0,
        page: 1,
        pages: 0,
      },
      user: this.$store.state.user
    }
  },
  methods: {
    get() {
      let id = this.$route.params.id;

      if (!id) return;

      this.isLoading = true;
      this.$proxies.productProxy.get(id)
        .then(x => {
          this.model = x.data;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
          this.$notify({
            group: "global",
            type: "is-danger",
            text: 'Ocurrió un error inesperado'
          });
        })
    },
    getProductTypes(page){
      this.isLoading = true;

      this.$proxies.productTypeProxy
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
      this.$validate().then(success => {
        if (!success) return;

        this.isLoading = true;

        if(this.model.productId) {
          this.$proxies.productProxy.update(this.model.productId, this.model)
          .then(() => {
            this.$notify({
              group: "global",
              type: "is-success",
              text: 'Producto actualizado con éxito'
            });
            this.$router.push('/products');
          })
          .catch(() => {
            this.isLoading = false;
            this.$notify({
              group: "global",
              type: "is-danger",
              text: 'Ocurrió un error inesperado'
            });
          });
        } else {
          this.model.userId = this.user.id;
          this.$proxies.productProxy.create(this.model)
          .then(() => {
            this.$notify({
              group: "global",
              type: "is-success",
              text: 'Producto creado con éxito'
            });
            this.$router.push('/products');
          })
          .catch(() => {
            this.isLoading = false;
            this.$notify({
              group: "global",
              type: "is-danger",
              text: 'Ocurrió un error inesperado'
            });
          });
        }
      })
    }
  }
}