var frisby = require('frisby');
var endpoint = 'http://localhost:4567/api/flights'

frisby.create('Create a flight')
    .post(endpoint, {

    data_partida: "2015-12-12T00:00:00.000Z",
    data_chegada: "2015-12-12T00:00:00.000Z",
    numero: "15",
    origem: "BH",
    destino: "RJ",
    duracao: 12,
    lugares: 12,
    companhia: "Azul",
    id: 1

    })
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
.toss();

frisby.create('Search for the created flight')
    .get(endpoint+'/1')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONTypes({

    data_partida: String,
    data_chegada: String,
    numero: String,
    origem: String,
    destino: String,
    companhia: String,
    duracao: Number,
    lugares: Number,
    id: Number

    })
    .expectJSON({
        id: 1,
    })
.toss();

frisby.create('Create duplicated flights')
    .post(endpoint, {

    data_partida: "2015-12-12T00:00:00.000Z",
    data_chegada: "2015-12-12T00:00:00.000Z",
    numero: "15",
    origem: "BH",
    destino: "RJ",
    duracao: 12,
    lugares: 12,
    companhia: "Azul",
    id: 1

    })
    .expectStatus(500)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON('error',{
        message: "Duplicate entry for flight.id"
    })
.toss();


frisby.create('Verify if the created flight exists')
    .get(endpoint+'/1/exists')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONTypes({
        exists: Boolean
    })
    .expectJSON({
        exists: true,
    })
.toss();

frisby.create('Verify if a flight that was not created exists')
    .get(endpoint+'/2/exists')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONTypes({
        exists: Boolean
    })
    .expectJSON({
        exists: false,
    })
.toss();

frisby.create('Update a flight')
    .put(endpoint+'/1', {

    data_partida: "2015-12-12T00:00:00.000Z",
    data_chegada: "2015-12-12T00:00:00.000Z",
    numero: "15",
    origem: "SP",
    destino: "RJ",
    duracao: 12,
    lugares: 12,
    companhia: "Azul",
    id: 1

    })
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        origem: "SP",
    })
.toss();


frisby.create('Update/create a flight with missing attributes')
    .post(endpoint, {

    })
    .expectStatus(422)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON('error',{
        message: "The `flight` instance is not valid. Details: `data_partida` can't be blank (value: undefined); `data_chegada` can't be blank (value: undefined); `numero` can't be blank (value: undefined); `origem` can't be blank (value: undefined); `destino` can't be blank (value: undefined); `duracao` can't be blank (value: undefined); `lugares` can't be blank (value: undefined); `companhia` can't be blank (value: undefined)."
    })
.toss();

frisby.create('Verify the number of flights in the DB')
    .get(endpoint+'/count')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        count: 1,
    })
.toss();

frisby.create('Delete the created flight')
    .delete(endpoint+'/1')
    .expectStatus(204)
    .expectHeaderContains('content-type', 'application/json')
.toss();

frisby.create('Search for the deleted flight')
    .get(endpoint+'/1')
    .expectStatus(404)
    .expectHeaderContains('content-type', 'application/json')
.toss();

frisby.create('Verify the number of flights in the DB after a deletion')
    .get(endpoint+'/count')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        count: 0,
    })
.toss();

