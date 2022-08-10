# Project Backend Kelompok 1: Aplikasi Kurir

# Fitur

1. Registrasi akun (superuser): `/users`

   - Menambah akun admin gudang
   - Menambah akun kurir
   - request body: nama, email, password, no hp, role

2. Login, mendapatkan access token (admin / kurir): `/login`

   - access token berisi data akun: id, nama, role

3. Menambah barang pengiriman (protected as admin): `/shipments`

   - request body: nama, berat, pengirim, penerima

4. Mengupdate lokasi gudang barang pengiriman (protected as admin) `/shipments/gudang/{resi}`

   - request body: resi, nama gudang, keterangan

5. Mengupdate status pengiriman (protected as kurir): `/shipments/kurir/{resi}`

   - request body: resi, nama penerima, status pengiriman

6. Mendapatkan detil barang pengiriman (public) `/shipments/{resi}`

   - request body: resi

# Spek

1. Registrasi akun

   Properti `role` bisa `admin` atau `kurir`.

   - Request:

     - Path: `/users`
     - Method: `POST`
     - Body:

       ```json
       {
         "nama": string,
         "email": string,
         "password": string,
         "noHp": string,
         "role": string,
       }
       ```

   - Response:

     - Status: `201`

     - Body:

       ```json
       {
         "status": "success",
         "data": {
           "idUser": string,
           "nama": string,
           "email": string,
           "password": string,
           "noHp": string,
           "role": string
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
         "email": string,
         "password": string
       }
       ```

   - Response:

     - Status: `200`
     - Body:

       ```json
       {
         "status": "success",
         "data": {
           "accessToken": string
         }
       }
       ```

3. Menambah barang pengiriman

   - Request:

     - Path: `/shipments`
     - Method: `POST`
     - Body:

       ```json
       {
         "barang": {
           "nama": string,
           "berat": number
         },
         "pengirim": {
           "nama": string,
           "alamat": string,
           "kota": string,
           "noHp": string
         },
         "penerima": {
           "nama": string,
           "alamat": string,
           "kota": string,
           "noHp": string
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
           "resi": string,
           "ongkir": string,
           "barang": {
             "nama": string,
             "berat": number
           },
           "pengirim": {
             "nama": string,
             "alamat": string,
             "noHp": string
           },
           "penerima": {
             "nama": string,
             "alamat": string,
             "noHp": string
           }
         }
       }
       ```

4. Mengupdate lokasi gudang barang pengiriman

   Setiap perpindahan barang terdapat update lokasi pengiriman.

   - Request:

     - Path: `/shipments/gudang/{resi}`
     - Method: `PUT`
     - Body:

       ```json
       {
         "namaGudang": string,
         "keterangan": string
       }
       ```

   - Response:

     - Status: `200`
     - Body:

       ```json
       {
         "status": "success",
         "data": {
           "resi": string,
           "gudang": [
             {
               "waktu": datetime,
               "kurir": string
             }
           ]
         }
       }
       ```

5. Mengupdate status pengiriman

   Kurir dapat mengupdate status pengiriman

   - Request:

     - Path: `/shipments/kurir/{resi}`
     - Method: `PUT`
     - Body:

       ```json
       {
         "keterangan": string,
       }
       ```

   - Response:

     - Status: 200
     - Body:

       ```json
       {
         "status": "success",
         "data": {
           "resi": string,
           "keterangan": string,
           "waktu": string,
         }
       }
       ```

6. Mendapatkan detil barang pengiriman

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
           "resi": string,
           "lokasi": [
             {
               "keterangan": string,
               "waktu": datetime,
             }
           ]
         }
       }
       ```
