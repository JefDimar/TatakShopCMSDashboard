<template>
  <div>
    <div>
      <b-jumbotron header="Dashboard CMS" bg-variant="secondary"></b-jumbotron>
    </div>
    <div class="container-fluid bg-light">
      <b-table
        striped
        hover
        responsive
        :items="products"
        :fields="fields">
        <!-- render image with v-slot from bootstrap-vue -->
        <template #cell(image_url)="data">
          <img :src="data.value" style="width: 150px; height: 100px;">
        </template>
        <template #cell(price)="data">
          <p>{{ data.value.toLocaleString('en-US', { style: 'currency', currency: 'IDR' }) }}</p>
          <b-input-group prepend="Edit" size="sm">
            <b-form-input></b-form-input>
            <b-button size="sm">Submit</b-button>
          </b-input-group>
        </template>
        <template #cell(stock)="data">
          <p>{{ data.value }}</p>
          <b-input-group prepend="Edit" size="sm">
            <b-form-input></b-form-input>
            <b-button size="sm">Submit</b-button>
          </b-input-group>
        </template>
        <template #cell(actions)="">
          <b-button-group>
            <b-button variant="primary">Edit</b-button>
            <b-button variant="danger">Delete</b-button>
          </b-button-group>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  data () {
    return {
      fields: [
        {
          key: 'id',
          sortable: true
        },
        'image_url',
        {
          key: 'name',
          sortable: true
        },
        'price',
        {
          key: 'stock',
          sortable: true
        },
        'actions'
      ]
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>

<style>
</style>
