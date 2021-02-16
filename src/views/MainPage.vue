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
        :fields="fields"
      ></b-table>
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
        }
      ],
      products: [
        {
          id: 1,
          name: 'Kamera kanon',
          image_url:
            'https://d2pa5gi5n2e1an.cloudfront.net/webp/global/images/product/digitalcameras/Canon_EOS_600D_kit/Canon_EOS_600D_kit_L_1.jpg',
          price: 15000000,
          stock: 4
        },
        {
          id: 2,
          name: 'Mouse seri besi',
          image_url:
            'https://images-na.ssl-images-amazon.com/images/I/31j9d7a8PTL._AC_SY400_.jpg',
          price: 15000000,
          stock: 4
        },
        {
          id: 3,
          name: 'Headset uler ijo',
          image_url:
            'https://www.eliteprintsolutions.com.au/wp-content/uploads/2020/04/razer-kraken-te-gallery-02.jpg',
          price: 15000000,
          stock: 4
        },
        {
          id: 4,
          name: 'Keyboard logika',
          image_url:
            'https://azcd.harveynorman.com.au/media/catalog/product/cache/21/image/992x558/9df78eab33525d08d6e5fb8d27136e95/9/2/920-009239-logitech-g-pro-x-gaming-keyboard-0.jpg',
          price: 15000000,
          stock: 4
        },
        {
          id: 5,
          name: 'Gamepad xcircle',
          image_url:
            'https://compass-ssl.xbox.com/assets/e9/de/e9de9a16-1e08-4c4b-9fcf-b6fac66d7c2c.jpg?n=X1-Controller-52048_Content-Placement-0_Accessory-hub_740x417.jpg',
          price: 15000000,
          stock: 4
        }
      ]
    }
  }
}
</script>

<style>
</style>
