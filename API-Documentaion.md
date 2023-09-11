
# KIB


1. [Server alive test](#1-server-alive-test)
1. [seed from excel](#5-seed-from-excel)
1. [Create new pokemon](#4-create-new-pokemon)
1. [Update Pokemon by ID](#3-update-pokemon-by-id)
1. [Get single pokemon by ID](#6-get-single-pokemon-by-id)
1. [List All Pokemon](#7-list-all-pokemon)
1. [Delete Pokemon by Object ID](#2-delete-pokemon-by-object-id)



## Endpoints


--------



### 1. Server alive test


API to **check the server is a live**


***Endpoint:***

```bash
URL: localhost:8080
```

### 2. Delete Pokemon by Object ID


API to **delete a specific pokemon** by it's own object ID


***Endpoint:***

```bash
Method: DELETE
Type: RAW
URL: localhost:8080/api/v1.0.0/pokemon/deleteByID/64fcbac067329d75542ece3c
```

### 3. Update Pokemon by ID


API to **update a specific pokeon** by ID

**pokemonPayload**: cobatin all fields to be updated


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: localhost:8080/api/v1.0.0/pokemon/update/64fc69ef95d0bce9c33f8237
```



***Body:***

```js        
{
    "pokemonPayload": {
        "Row": 4,
        "Name": "Venusaur",
        "PokedexNumber": 3,
        "ImgName": "venusaur.png",
        "Generation": 1,
        "EvolutionStage": 3,
        "Evolved": 1,
        "FamilyID": 1,
        "CrossGen": 0,
        "Type1": "grass",
        "Type2": "poison",
        "Weather1": "Sunny/clear",
        "Weather2": "Cloudy",
        "STAT_TOTAL": 525,
        "ATK": 198,
        "DEF": 198,
        "STA": 129,
        "Legendary": 0,
        "Aquireable": 1,
        "Spawns": 1,
        "Regional": 0,
        "Raidable": 0,
        "Hatchable": 5,
        "Shiny": 0,
        "Nest": 0,
        "New": 0,
        "NotGettable": 0,
        "FutureEvolve": 0,
        "CP100_40": 2568,
        "CP100_39": 2531
    }
}
```



### 4. Create new pokemon


API to **save new pokemon** in database

**pokemonPayload**: contain all pockemon object details


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: localhost:8080/api/v1.0.0/pokemon/create
```



***Body:***

```js        
{
    "pokemonPayload": {
        "Row": 3,
        "Name": "Venusaur",
        "PokedexNumber": 3,
        "ImgName": "venusaur.png",
        "Generation": 1,
        "EvolutionStage": 3,
        "Evolved": 1,
        "FamilyID": 1,
        "CrossGen": 0,
        "Type1": "grass",
        "Type2": "poison",
        "Weather1": "Sunny/clear",
        "Weather2": "Cloudy",
        "STAT_TOTAL": 525,
        "ATK": 198,
        "DEF": 198,
        "STA": 129,
        "Legendary": 0,
        "Aquireable": 1,
        "Spawns": 1,
        "Regional": 0,
        "Raidable": 0,
        "Hatchable": 5,
        "Shiny": 0,
        "Nest": 0,
        "New": 0,
        "NotGettable": 0,
        "FutureEvolve": 0,
        "CP100_40": 2568,
        "CP100_39": 2531
    }
}
```



### 5. seed from excel


It's an API to **read from the excel sheet** and save to database

**Note**: **you need to call this API first of all to be able to get results in the other APIs**


***Endpoint:***

```bash
Method: POST
Type: 
URL: localhost:8080/api/v1.0.0/pokemon/seed
```



### 6. Get single pokemon by ID


api to get specific **pokemon** by mongo object ID


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: localhost:8080/api/v1.0.0/pokemon/getByID/64fcc02b1b1a492b48c1bdc7
```



### 7. List All Pokemon


Api to list all pokemon with pagination and search or/and sorting:

- **search** : search keyword
- **searchBy** : searchBy key (should start with capital letter)
- **page** : page number
- **limit** : result per page
- **sortBy** : sortBy key (should start with capital letter)
- **sortOrder** : sort order (should be asc/desc)


***Endpoint:***

```bash
Method: GET
Type: 
URL: localhost:8080/api/v1.0.0/pokemon/listAllPokemon
```



***Query params:***

| Key | Examples Value | Description |
| --- | ------|-------------|
| search | Bulbasaur |  search keyword |
| searchBy | Name |  searchBy key (should start with capital letter) |
| page | 1 |  page number  |
| limit | 10 | result per page  |
| sortBy | Row | sortBy key (should start with capital letter) |
| sortOrder | asc | sort order (should be asc/desc) |



---
[Back to top](#kib)
