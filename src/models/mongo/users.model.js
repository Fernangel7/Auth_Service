require('dotenv').config()

const crypto = require('node:crypto')

const { getMongoDataBase } = require("../../db/mongo.db.js")

class user_model {
    static async createEmptyColeccionUsers(req, res) {
        try {
            const db = await getMongoDataBase()
            if ((await db.listCollections({ name: 'users' }).toArray()).length > 0) {
                await db.collection('users').drop();
            }

            await db.createCollection('users', {
                validator: {
                    $jsonSchema: {
                        bsonType: 'object',
                        required: ['name', 'mail', 'age'],
                        properties: {
                            UUID: {
                                bsonType: 'string',
                                description: 'Universal Unique Identificator'
                            },
                            name: {
                                bsonType: 'string',
                                description: 'El nombre del usuario debe ser un texto y es obligatorio'
                            },
                            mail: {
                                bsonType: 'string',
                                pattern: '^.+@.+\\..+$',
                                description: 'Debe ser un correo válido y es obligatorio'
                            },
                            age: {
                                bsonType: 'int',
                                minimum: 0,
                                maximum: 120,
                                description: 'La edad debe ser un número entero entre 0 y 120'
                            },
                            activated: {
                                bsonType: 'bool',
                                description: 'Indica si el usuario está activo o no (opcional)'
                            },
                            register_date: {
                                bsonType: 'date',
                                description: 'Fecha en que se registró el usuario (opcional)'
                            },
                            agent_id: {
                                bsonType: 'string',
                                description: 'N/A'
                            },
                            access_key: {
                                bsonType: 'string',
                                description: 'N/A'
                            }
                        }
                    }
                }
            })

            const users = db.collection('users');

            await users.createIndex({ UUID: 1 }, { unique: true, name: 'idx_uuid_unique' });
            await users.createIndex({ name: 1 }, { name: 'idx_name' });
            await users.createIndex({ mail: 1 }, { unique: true, name: 'idx_mail_unique' });
            await users.createIndex({ age: 1 }, { name: 'idx_age' });
            await users.createIndex({ activated: 1 }, { name: 'idx_activated' });
            await users.createIndex({ register_date: -1 }, { name: 'idx_register_date_desc' });
            await users.createIndex({ agent_id: 1 }, { name: 'idx_agent' });
            await users.createIndex({ access_key: 1 }, { unique: true, sparse: true, name: 'idx_access_key_unique' });

            let responses = [
                { response: "✅ Database created successfully" }
            ]

            responses.push(await this.add_user(req, res))

            res.json(responses)
        } catch (err) {
            console.log(err)
            res.json({ response: "❌ Error on create Database" })
        }
    }

    static async auth_user(req, res) {
        try {
            const db = await getMongoDataBase()
            const collection = db.collection("users")

            const { agent_id, access_key } = req

            const filter = {
                agent_id: agent_id,
                access_key: access_key
            }

            const result = await collection.find(filter).toArray()

            // const asd = await collection.find({}).toArray()
            // const asd = await collection.findOne({})

            if (result.length == 1) {
                return {
                    status: 200,
                    msg: "correct authentication..."
                }
            } else {
                return {
                    status: 401,
                    msg: "incorrect authentication..."
                }
            }

            // const response = await db.collection("users").insertOne()

        } catch (err) {
            return {
                status: 204,
                msg: "No Content..."
            }
        }
    }

    static async add_user(req, res) {
        try {
            const db = await getMongoDataBase()
            if (!db) throw new Error("❌ No Database")

            const users = db.collection('users')

            const new_user = {
                UUID: crypto.randomUUID(),
                name: 'Donnovan Joel Creano Rodriguez',
                mail: 'djoel_crofriguez@securityservice.com',
                age: 19,
                activated: true,
                register_date: new Date(),
                agent_id: 'Donnovan_Agent',
                access_key: 'dAgent_#4193@dotcom'
            }

            const result = await users.insertOne(new_user)

            console.log('✅ Usuario insertado correctamente');
            console.log('🆔 ID del documento:', result.insertedId);
            return ({ response: '✅ User added to the Database successfully' })
        } catch (err) {
            return ({ response: "❌ Error on add an user on the Database" })
        }
    }
}

module.exports = {
    user_model: {
        auth_user: user_model.auth_user
    }
}