var helpers = require('./sparql-helpers');
var generators = require('./random-data-generators.js');

/*
 Define the models
 */
var real = "http://real-estate.langens-jonathan.com/voc/";

var debtClass = real + "Debt";
var debtBase = real + "debts/";
var debtProperties = [
    {
        key: 'amount',
        predicate: real + "amount",
        type: {
            type: 'number',
            options: {}
        }
    },
    {
        key: 'dueDate',
        predicate: real + "due",
        type: {
            type: 'date',
            options: {}
        }
    },
    {
        key: 'fulfilled',
        predicate: real + "fulfilled",
        type: {
            type: 'string',
            options: {}
        }
    }
];

var contractClass = real + "Contract";
var contractBase = real + "contracts/";
var contractProperties = [
    {
        key: 'startDate',
        predicate: real + "startDate",
        type: {
            type: 'date',
            options: {}
        }
    },
    {
        key: 'endDate',
        predicate: real + "endDate",
        type: {
            type: 'date',
            options: {}
        }
    },
    {
        key: 'deposit',
        predicate: real + "deposit",
        type: {
            type: 'number',
            options: {}
        }
    },
    {
        key: 'mensuality',
        predicate: real + "mensuality",
        type: {
            type: 'number',
            options: {}
        }
    },
    {
        key: 'dailyRate',
        predicate: real + "dailyRate",
        type: {
            type: 'number',
            options: {}
        }
    },
    {
        key: 'room',
        predicate: real + "room",
        type: {
            type: 'string',
            options: {}
        }
    },
    {
        key: 'debts',
        predicate: real + "debt",
        type: {
            type: 'relation',
            options: {
                relationClass: debtClass,
                relationBase: debtBase,
                relationProperties: debtProperties
            }
        }
    }
];

var tenantClass = real + "Tenant";
var tenantBase = real + "tenants/";
var tenantProperties = [
    {
        key: "name",
        predicate: "http://xmlns.com/foaf/0.1/name",
        type: {
            type: 'string',
            options: {}
        }
    },
    {
        key: "tel",
        predicate: real + "tel",
        type: {
            type: 'string',
            options: {}
        }
    },
    {
        key: "email",
        predicate: "http://xmlns.com/foaf/0.1/mbox",
        type : {
            type: 'string',
            options: {}
        }
    },
    {
        key: "contracts",
        predicate: real + "hasContract",
        type: {
            type: "relation",
            options: {
                relationClass: contractClass,
                relationBase: contractBase,
                relationProperties: contractProperties
            }
        }
    }
];

/*
 Reset the database
*/
var emptyStoreQuery = "WITH <http://mu.semte.ch/application> DELETE { ?s ?p ?o } WHERE { ?s ?p ?o .}";
helpers.getQuery(emptyStoreQuery);

var insertRoomsQuery = "WITH <http://mu.semte.ch/application> " +
        "INSERT DATA { " +
        "<http://example.com/resources/rooms/599F6FC70343910009000001> a <http://real-estate.langens-jonathan.com/voc/Room> . " +
        "<http://example.com/resources/rooms/599F6FD40343910009000002> a <http://real-estate.langens-jonathan.com/voc/Room> . " +
        "<http://example.com/resources/rooms/599F6FE00343910009000003> a <http://real-estate.langens-jonathan.com/voc/Room> . " +
        "<http://example.com/resources/rooms/599F6FE60343910009000004> a <http://real-estate.langens-jonathan.com/voc/Room> . " +
        "<http://example.com/resources/rooms/599F6FEC0343910009000005> a <http://real-estate.langens-jonathan.com/voc/Room> . " +
        "<http://example.com/resources/rooms/599F6FF40343910009000006> a <http://real-estate.langens-jonathan.com/voc/Room> . " +
        "<http://example.com/resources/rooms/599F6FFB0343910009000007> a <http://real-estate.langens-jonathan.com/voc/Room> . " +
        "<http://example.com/resources/rooms/599F70050343910009000008> a <http://real-estate.langens-jonathan.com/voc/Room> . " +
        "<http://example.com/resources/rooms/599F700A0343910009000009> a <http://real-estate.langens-jonathan.com/voc/Room> . " +
        "<http://example.com/resources/rooms/599F6FC70343910009000001> <http://mu.semte.ch/vocabularies/core/uuid> \"599F6FC70343910009000001\" . " +
        "<http://example.com/resources/rooms/599F6FD40343910009000002> <http://mu.semte.ch/vocabularies/core/uuid> \"599F6FD40343910009000002\" . " +
        "<http://example.com/resources/rooms/599F6FE00343910009000003> <http://mu.semte.ch/vocabularies/core/uuid> \"599F6FE00343910009000003\" . " +
        "<http://example.com/resources/rooms/599F6FE60343910009000004> <http://mu.semte.ch/vocabularies/core/uuid> \"599F6FE60343910009000004\" . " +
        "<http://example.com/resources/rooms/599F6FEC0343910009000005> <http://mu.semte.ch/vocabularies/core/uuid> \"599F6FEC0343910009000005\" . " +
        "<http://example.com/resources/rooms/599F6FF40343910009000006> <http://mu.semte.ch/vocabularies/core/uuid> \"599F6FF40343910009000006\" . " +
        "<http://example.com/resources/rooms/599F6FFB0343910009000007> <http://mu.semte.ch/vocabularies/core/uuid> \"599F6FFB0343910009000007\" . " +
        "<http://example.com/resources/rooms/599F70050343910009000008> <http://mu.semte.ch/vocabularies/core/uuid> \"599F70050343910009000008\" . " +
        "<http://example.com/resources/rooms/599F700A0343910009000009> <http://mu.semte.ch/vocabularies/core/uuid> \"599F700A0343910009000009\" . " +
        "<http://example.com/resources/rooms/599F6FC70343910009000001> <http://purl.org/dc/terms/title> \"Kamer 00.01\" . " +
        "<http://example.com/resources/rooms/599F6FD40343910009000002> <http://purl.org/dc/terms/title> \"Kamer 00.02\" . " +
        "<http://example.com/resources/rooms/599F6FE00343910009000003> <http://purl.org/dc/terms/title> \"Kamer 01.01\" . " +
        "<http://example.com/resources/rooms/599F6FE60343910009000004> <http://purl.org/dc/terms/title> \"Kamer 01.02\" . " +
        "<http://example.com/resources/rooms/599F6FEC0343910009000005> <http://purl.org/dc/terms/title> \"Kamer 01.03\" . " +
        "<http://example.com/resources/rooms/599F6FF40343910009000006> <http://purl.org/dc/terms/title> \"Kamer 02.01\" . " +
        "<http://example.com/resources/rooms/599F6FFB0343910009000007> <http://purl.org/dc/terms/title> \"Kamer 02.02\" . " +
        "<http://example.com/resources/rooms/599F70050343910009000008> <http://purl.org/dc/terms/title> \"Kamer 03.01\" . " +
        "<http://example.com/resources/rooms/599F700A0343910009000009> <http://purl.org/dc/terms/title> \"Kamer 03.02\" . " +
        "}";
helpers.getQuery(insertRoomsQuery);

/*
 Global variables for bookkeeping, at the end tenants will be the one that gets written to the SPARQL store
*/
var years = [2012, 2013, 2014, 2015, 2016, 2017];

var rooms = ["Kamer 00.01", "Kamer 00.02", "Kamer 01.01", "Kamer 01.02", "Kamer 01.03", "Kamer 02.01", "Kamer 02.02", "Kamer 03.01", "Kamer 03.02"];

var prices = [220, 250, 300];

var lastTenantForRoom = {}; // hashmap that stores the last tenant for a room, I use this to simulate a prolonging of the contract

var tenants = [];

/*
 Helper methods to generate contracts and debts
*/
function generateContract(startDate, endDate, price, room, tenant) {
    var period = endDate.getMonth() - startDate.getMonth() + ((endDate.getYear() - startDate.getYear()) * 12);

    var dayPrice = price / 30;
    var contract = {
        startDate: startDate,
        endDate: endDate,
        deposit: price,
        mensuality: price,
        dailyRate: dayPrice,
        room: room,
        debts: []
    };

    var stoppedPaying = false;
    for(var i = 0; i < period; ++i) {
        var fulfilled = false;
        if(!stoppedPaying) {
            if(generators.getRandomNumber(0, 100) > 98){
                stoppedPaying = true;
            } else {
                fulfilled = true;
            }
        }
        if(fulfilled) {
            fulfilled = "true";
        } else {
            fulfilled = "false";
        }
        var dateMonth = startDate.getMonth() + i;
        var dateYear = startDate.getYear();
        if(dateMonth > 12) {
            dateMonth %= 12;
            dateYear = endDate.getYear();
        }
        generateDebt(price, new Date(dateMonth + "-01-" + dateYear), fulfilled, contract);
    }

    tenant.contracts.push(contract);
}

function generateDebt(amount, dueDate, fulfilled, contract) {
    var debt = {
        amount: amount,
        dueDate: dueDate,
        fulfilled: fulfilled
    };
    contract.debts.push(debt);
}

/*
 The actual logic that will make all the tenants, contracts and debts
*/
for(year in years) {
    for(room in rooms) {
        var fullYearContract = generators.getRandomNumber(0, 100) < 20;
        var prolonging = (year > 0 && (generators.getRandomNumber(0,100) < 20) && fullYearContract);

        var tenant;
        if(prolonging) {
            tenant = lastTenantForRoom[rooms[room]];
        } else {
            tenant = generators.getRandomPerson();
            tenant['contracts'] = [];
            tenants.push(tenant)
        }

        if(fullYearContract) {
            var startDate = generators.getRandomDate(new Date("09-01-" + years[year]), new Date("10-05-" + years[year]));
            var endDate = generators.getRandomDate(new Date("06-30-" + (years[year] + 1)), new Date("08-31-" + (years[year] + 1)));
            var price = prices[generators.getRandomNumber(0, 2)];
            generateContract(startDate, endDate, price, rooms[room], tenant);
            lastTenantForRoom[rooms[room]] = tenant;
        } else {
            var startDate = generators.getRandomDate(new Date("09-01-" + years[year]), new Date("10-05-" + years[year]));
            var endDate = generators.getRandomDate(new Date("01-05-" + (years[year] + 1)), new Date("02-05-" + (years[year] + 1)));
            var price = prices[generators.getRandomNumber(0, 2)];
            generateContract(startDate, endDate, price, rooms[room], tenant);

            tenant = generators.getRandomPerson();
            tenant['contracts'] = [];
            tenants.push(tenant)

            var startDate = generators.getRandomDate(new Date("02-06-" + years[year]), new Date("02-15-" + years[year]));
            var endDate = generators.getRandomDate(new Date("06-30-" + (years[year] + 1)), new Date("08-31-" + (years[year] + 1)));
            var price = prices[generators.getRandomNumber(0, 2)];
            generateContract(startDate, endDate, price, rooms[room], tenant);
            lastTenantForRoom[rooms[room]] = tenant;
        }
    }
}

/*
 Now we just have to write it to the triple store and that's it
*/
for(tenant in tenants){
    helpers.writeObjectToStore(tenants[tenant], tenantClass, tenantBase, tenantProperties);
}

/*
 Some relations are harder to capture with this method but with a simple trick they can be restored
 as shown below.
 */

var fixRoomQuery = "PREFIX real: <http://real-estate.langens-jonathan.com/voc/>" +
        "WITH <http://mu.semte.ch/application> " +
        "INSERT { " +
        "?room real:operatedOnByContract ?contract . " +
        "} " +
        "WHERE { " +
        "  ?contract real:room ?roomName . " +
        "  ?room <http://purl.org/dc/terms/title> ?roomName . " +
        "}";

helpers.getQuery(fixRoomQuery);

var cleanupRoomQuery = "PREFIX real: <http://real-estate.langens-jonathan.com/voc/> " +
        "WITH <http://mu.semte.ch/application> " +
        "DELETE { " +
        " ?contract real:room ?roomName . " +
        "} " +
        "WHERE { " +
        "  ?contract real:room ?roomName . " +
        "} ";

helpers.getQuery(cleanupRoomQuery);

var insertPaymentsQuery = "WITH <http://mu.semte.ch/application>" +
"INSERT {" +
"?puri a <http://real-estate.langens-jonathan.com/voc/Payment> ; " +
"<http://real-estate.langens-jonathan.com/voc/paid_on> ?date; " +
"<http://mu.semte.ch/vocabularies/core/uuid> ?uuid ; " +
"<http://real-estate.langens-jonathan.com/voc/paid_by> ?tenant ." +
"} " +
"WHERE " +
"{ " +
"?debt <http://real-estate.langens-jonathan.com/voc/due> ?date ; " +
"<http://real-estate.langens-jonathan.com/voc/fulfilled> \"true\" . " +
"?contract <http://real-estate.langens-jonathan.com/voc/debt> ?debt . " +
"?tenant <http://real-estate.langens-jonathan.com/voc/hasContract> ?contract . " +
"BIND(STRUUID() as ?uuid) " +
"BIND(IRI(CONCAT(\"http://real-estate.langens-jonathan.com/payments/\", ?uuid)) as ?puri) " +
"}";

helpers.getQuery(insertPaymentsQuery);

/*
 Now the comments are the only thing that still needs to be inserted
 */
var commentClass = real + "Comment";
var commentBase = real + "comments/";
var commentProperties = [
    {
        key: 'content',
        predicate: real + "comment",
        type: {
            type: 'string',
            options: {}
        }
    },
    {
        key: 'context',
        predicate: real + "commentFor",
        type: {
            type: 'string',
            options: {}
        }
    }
];


var contexts = ["general", "TENANTS-OVERVIEW", "CONTRACTS-OVERVIEW"];

for(context in contexts) {
    var n = generators.getRandomNumber(0, 4);
    for(var i = 0; i < n; ++i) {
        helpers.writeObjectToStore({
            content: generators.getRandomQuote(),
            context: contexts[context]
        },
                                   commentClass,
                                   commentBase,
                                   commentProperties);
    }
}
