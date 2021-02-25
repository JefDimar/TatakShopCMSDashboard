<template>
  <div>
    <jumbotron/>
    <div class="container-fluid bg-light">
      <b-button variant="primary" class="mt-3 mb-3" v-b-modal.modal-2>Add Products</b-button>
      <!-- Tabel -->
      <b-table
        striped
        hover
        responsive
        :items="products"
        :fields="fields">
        <!-- render image with v-slot from bootstrap-vue -->
        <template #cell(image_url)="data">
          <img :src="data.value" :alt="data.item.name" style="width: 150px; height: 100px;">
        </template>
        <template #cell(price)="data">
          <p>{{ data.value.toLocaleString('en-US', { style: 'currency', currency: 'IDR' }) }}</p>
        </template>
        <template #cell(stock)="data">
          <p>{{ data.value }}</p>
        </template>
        <template #cell(actions)="data">
          <b-button-group>
            <b-button variant="primary" v-b-modal.modal-1 @click.prevent="populateForm(data.item.id)">Edit</b-button>
            <b-button variant="warning" v-b-modal.modal-3 @click.prevent="populateForm(data.item.id)">Update</b-button>
            <b-button variant="danger" @click.prevent="deleteProduct(data.item.id)">Delete</b-button>
          </b-button-group>
        </template>
      </b-table>
      <!-- Modal buat edit kak gabisa dipisah ke component masih belom paham docs di bootstrap vue -->
      <b-modal id="modal-1" title="Edit Form:" ok-only @ok.prevent="editProduct(populate.id)">
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

      <b-modal id="modal-2" title="Add Form:" ok-only @ok.prevent="addProduct">
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

      <b-modal id="modal-3" title="Edit Form Price/Stock:" ok-only @ok.prevent="editStockPrice(populate.id)">
        <b-form-group>
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
import Jumbotron from '../components/Jumbotron'

export default {
  name: 'MainPage',
  components: {
    Jumbotron
  },
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
      id: 0,
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
      this.id = id
      this.name = this.populate.name
      this.image_url = this.populate.image_url
      this.price = this.populate.price
      this.stock = this.populate.stock
    },
    deleteProduct (id) {
      this.$store.dispatch('deleteProduct', id)
    },
    editProduct (id) {
      const data = {
        id,
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock
      }
      this.$store.dispatch('editProduct', data)
      this.id = 0
      this.name = ''
      this.image_url = ''
      this.price = 0
      this.stock = 0
      this.$nextTick(() => {
        this.$bvModal.hide('modal-1')
      })
    },
    editStockPrice (id) {
      const data = {
        id,
        price: this.price,
        stock: this.stock
      }
      this.$store.dispatch('editStockPrice', data)
      this.id = 0
      this.name = ''
      this.image_url = ''
      this.price = 0
      this.stock = 0
      this.$nextTick(() => {
        this.$bvModal.hide('modal-3')
      })
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    populate () {
      return this.$store.state.product
    }
  }
}
</script>

<style>
</style>
