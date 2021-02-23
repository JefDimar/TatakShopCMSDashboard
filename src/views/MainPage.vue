<template>
  <div>
    <div>
      <b-jumbotron header="Dashboard CMS" bg-variant="secondary"></b-jumbotron>
    </div>
    <div class="container-fluid bg-light">
      <b-button variant="primary" class="mt-3 mb-3" v-b-modal.modal-2>Add Products</b-button>
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
        <template #cell(actions)="data">
          <b-button-group>
            <b-button variant="primary" v-b-modal.modal-1 @click.prevent="populateForm(data.item.id)">Edit</b-button>
            <b-button variant="danger" @click.prevent="deleteProduct(data.item.id)">Delete</b-button>
          </b-button-group>
        </template>
      </b-table>
      <!-- Modal buat edit kak gabisa dipisah ke component masih belom docs di bootstrap vue -->
      <b-modal id="modal-1" title="Edit Form:">
        <b-form-group>
          <label>Name:</label>
          <b-form-input v-model="name"></b-form-input>
          <label>Image Url:</label>
          <b-form-input type="url" v-model="image_url"></b-form-input>
          <label>Price:</label>
          <b-form-input type="number" v-model="price"></b-form-input>
          <label>Stock:</label>
          <b-form-input type="number" v-model="stock"></b-form-input>
        </b-form-group>
      </b-modal>

      <b-modal id="modal-2" title="Add Form:" @ok.prevent="addProduct">
        <b-form-group>
          <label>Name:</label>
          <b-form-input v-model="name"></b-form-input>
          <label>Image Url:</label>
          <b-form-input type="url" v-model="image_url"></b-form-input>
          <label>Price:</label>
          <b-form-input type="number" v-model="price"></b-form-input>
          <label>Stock:</label>
          <b-form-input type="number" v-model="stock"></b-form-input>
        </b-form-group>
      </b-modal>
      <!-- end of modal -->
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
      ],
      name: '',
      image_url: '',
      price: 0,
      stock: 0
    }
  },
  methods: {
    addProduct () {
      const data = {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock
      }
      this.$store.dispatch('addProduct', data)
      // buat close modal
      this.$nextTick(() => {
        this.$bvModal.hide('modal-2')
      })
      this.name = ''
      this.image_url = ''
      this.price = 0
      this.stock = 0
    },
    populateForm (id) {
      this.$store.dispatch('populateForm', id)
    },
    deleteProduct (id) {
      this.$store.dispatch('deleteProduct', id)
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    populate: {
      get: function () {
        return this.$store.state.product
      },
      set: function (newValue) {
        this.name = newValue.name
        this.image_url = newValue.image_url
        this.price = newValue.price
        this.stock = newValue.stock
      }
    }
  }
}
</script>

<style>
</style>
