# Project Backend Kelompok 1: Aplikasi Kurir

# Fitur

1. Registrasi akun (superuser): `/users`

   - Menambah akun admin gudang
   - Menambah akun kurir
   - request body: nama, email, password, no hp, role

2. Login, mendapatkan access token (admin / kurir): `/login`

   - access token berisi data akun: id, nama, role

3. Menambah pesanan (protected as admin): `/orders`

   - request body: nama gudang, berat, pengirim, penerima

4. Menambah pengiriman barang (protected as admin): `/shipments`

   - request body: resi, nama gudang, keterangan

5. Mengupdate lokasi gudang pengiriman barang (protected as admin) `/shipments/gudang/{resi}`

   - request body: resi, nama gudang, keterangan

6. Mengupdate status pengiriman (protected as kurir): `/shipments/kurir/{resi}`

   - request body: resi, nama penerima, status pengiriman

7. Mendapatkan detil pengiriman barang (public) `/shipments/{resi}`

   - request body: resi

# Specs

1. Registrasi akun

   Properti `role` bisa `admin` atau `kurir`.

   - Request:

     - Path: `/users`
     - Method: `POST`
     - Body:

       ```json
       {
         "nama": "string",
         "email": "string",
         "password": "string",
         "noHp": "string",
         "role": "string"
       }
       ```

   - Response:

     - Status: `201`

     - Body:

       ```json
       {
         "status": "success",
         "data": {
           "idUser": "string",
           "nama": "string",
           "email": "string",
           "password": "string",
           "noHp": "string",
           "role": "string"
         }
       }
       ```

2. Login, mendapatkan access token

   - Request:

     - Path: `/login`
     - Method: `POST`
     - Body:

       ```json
       {
         "email": "string",
         "password": "string"
       }
       ```

   - Response:

     - Status: `200`
     - Body:

       ```json
       {
         "status": "success",
         "data": {
           "accessToken": "string"
         }
       }
       ```

3. Menambah pesanan pengiriman

   - Request:

     - Path: `/orders`
     - Method: `POST`
     - Body:

       ```json
       {
         "namaGudang": "string",
         "barang": {
           "nama": "string",
           "berat": "number"
         },
         "pengirim": {
           "nama": "string",
           "alamat": "string",
           "kota": "string",
           "noHp": "string"
         },
         "penerima": {
           "nama": "string",
           "alamat": "string",
           "kota": "string",
           "noHp": "string"
         }
       }
       ```

   - Response:

     - Status: `201`
     - Body:

       ```json
       {
         "status": "success",
         "data": {
           "resi": "string",
           "ongkir": "string",
           "status": "string",
           "barang": {
             "nama": "string",
             "berat": "number"
           },
           "pengirim": {
             "nama": "string",
             "alamat": "string",
             "kota": "string",
             "noHp": "string"
           },
           "penerima": {
             "nama": "string",
             "alamat": "string",
             "kota": "string",
             "noHp": "string"
           }
         }
       }
       ```

4. Menambah pengiriman barang

   - Request:

     - Path: `/shipments`
     - Method: `POST`
     - Body:

       ```json
       {
         "resi": "string",
         "namaGudang": "string",
         "keterangan": "string"
       }
       ```

   - Response:

     - Status: `201`
     - Body:

       ```json
       {
         "status": "success",
         "data": {
           "resi": "string",
           "pengiriman": {
             "keterangan": "string",
             "waktu": "string"
           }
         }
       }
       ```

5. Mengupdate lokasi gudang pengiriman barang

   Setiap perpindahan barang terdapat update lokasi pengiriman.

   - Request:

     - Path: `/shipments/gudang/{resi}`
     - Method: `PUT`
     - Body:

       ```json
       {
         "namaGudang": "string",
         "keterangan": "string"
       }
       ```

   - Response:

     - Status: `200`
     - Body:

       ```json
       {
         "status": "success",
         "data": {
           "resi": "string",
           "gudang": [
             {
               "waktu": "datetime",
               "keterangan": "string"
             }
           ]
         }
       }
       ```

6. Mengupdate status pengiriman

   Kurir dapat mengupdate status pengiriman

   - Request:

     - Path: `/shipments/kurir/{resi}`
     - Method: `PUT`
     - Body:

       ```json
       {
         "keterangan": "string"
       }
       ```

   - Response:

     - Status: 200
     - Body:

       ```json
       {
         "status": "success",
         "data": {
           "resi": "string",
           "keterangan": "string",
           "waktu": "string"
         }
       }
       ```

7. Mendapatkan detil pengiriman barang

   - Request:

     - Path: `/shipments/{resi}`
     - Method: `GET`

   - Response:

     - Status: `200`
     - Body:

       ```json
       {
         "status": "success",
         "data": {
           "resi": "string",
           "lokasi": [
             {
               "keterangan": "string",
               "waktu": "datetime"
             }
           ]
         }
       }
       ```

### Test Collection

- Thunder Client (VSCode): [AIALogisticsAPI](./test/AIALogisticsAPI.json 'AIALogisticsAPI')
