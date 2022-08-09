# Project Backend Kelompok 1: Aplikasi Kurir

# Fitur

- Registrasi akun (superuser)
- Login, mendapatkan access token (admin / kurir)
- Menambah barang pengiriman (protected as admin)
- Mendapatkan detil barang pengiriman (public)
- Mengupdate lokasi gudang barang pengiriman (protected as admin)
- Mengupdate status pengiriman (protected)

# Spek

1. Registrasi akun

   - Request:

     - Path: `/users`
     - Method: `POST`
     - Body:

       ```json
       {
         "nama": string,
         "email": string,
         "password": string,
         "nohp": string,
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
           "nohp": string,
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
           "nohp": string
         },
         "penerima": {
           "nama": string,
           "alamat": string,
           "nohp": string
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
             "nohp": string
           },
           "penerima": {
             "nama": string,
             "alamat": string,
             "nohp": string
           }
         }
       }
       ```

4. Mendapatkan detil barang pengiriman

   - Request:

     - Path: `/shipments`
     - Method: `GET`
     - Body:

       ```json
       {
         "resi": string
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

5. Mengupdate lokasi gudang barang pengiriman

   - Request:

     - Path: `/shipments`
     - Method: `PUT`
     - Body:

       ```json
       {
         "idBarang": string,
         "idGudang": string,
       }
       ```

   - Response:

     - Status: `200`
     - Body:

       ```json
       {
         "status": "success",
         "data": {
           "gudang": [
             {
               "idGudang": string,
               "waktu": datetime,
               "kurir": string
             }
           ]
         }
       }
       ```

6. Mengupdate status pengiriman

   - Request:

     - Path: `/shipments`
     - Method: `PUT`
     - Body:

       ```json
       {
         "resi": string,
         "statusPengiriman": string,
         "namaPenerima": string
       }
       ```

   - Response:

     - Status: 200
     - Body:

       ```json
       {
         "status": "success",
         "data": {
           "idBarang": string,
           "statusPengiriman": string,
           "namaPenerima": string
         }
       }
       ```
