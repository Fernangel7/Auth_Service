// index.js
require("dotenv").config()

const { MongoClient, ServerApiVersion } = require('mongodb');
const { MONGODB_URI } = require("./env_vars.js");

const client = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Conectar al cluster
    await client.connect();

    // Hacer ping a la base de datos
    await client.db("admin").command({ ping: 1 });

    console.log("✅ ¡Conectado correctamente a MongoDB Atlas!");
  } catch (err) {
    console.error("❌ Error al conectar con MongoDB:", err);
  } finally {
    // Cerrar la conexión
    await client.close();
    console.log("🔒 Conexión cerrada.");
  }
}

module.exports = run
