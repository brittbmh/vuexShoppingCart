<template>
  <div>
    <h1>Product List</h1>
    <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif" />
    <ul v-else>
      <li v-for="(product, index) in products" v-bind:key="index">
        {{product.title}} - {{product.price | currency}} - {{product.inventory}}
        <button
          :disabled="!productIsInStock(product)"
          @click="addProductToCart(product)"
        >Add to Cart</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapState({
      products: state => state.products.items
    }),
    ...mapGetters("products", {
      productIsInStock: "productIsInStock"
    })
  },
  methods: {
    ...mapActions({
      fetchproducts: "products/fetchProducts",
      addProductToCart: "cart/addProductToCart"
    })
  },
  created() {
    this.loading = true;
    this.fetchproducts().then(() => (this.loading = false));
  }
};
</script>

<style scoped>
ul {
  border: solid 1px;
  list-style-type: none;
}

button {
  margin: 10px;
}
</style>

