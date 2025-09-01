**Communication Module**

The Communication module is responsible for handling communication-related functionality in the application. It utilizes the NATS (Neural Autonomic Transport System) messaging system to enable message passing between different services.

**NATS Usage**

NATS is used as a message broker to facilitate communication between services. The Communication module uses the `NatsMessagingClient` to publish and subscribe to messages on various subjects. This allows different services to communicate with each other in a decoupled manner.

**Model/Schema**

The Communication module uses the `BpiMessage` model to represent messages being sent between services. The `BpiMessage` model has the following properties:

- `id`: Unique identifier for the message
- `subject`: The subject of the message (e.g., "bpi.message.created")
- `data`: The payload of the message
- `created_at`: Timestamp when the message was created

**Available APIs**

Here is a succinct list of the available APIs in the Communication module:

- **Create BPI Message**: Creates a new BPI message
  - Endpoint: `POST /messages`
  - Request Body: `BpiMessage` object
  - Response: `BpiMessage` object with generated `id`
- **Get BPI Message by ID**: Retrieves a BPI message by ID
  - Endpoint: `GET /messages/{id}`
  - Response: `BpiMessage` object
- **Update BPI Message**: Updates an existing BPI message
  - Endpoint: `PATCH /messages/{id}`
  - Request Body: `BpiMessage` object with updated properties
  - Response: `BpiMessage` object with updated properties
- **Delete BPI Message**: Deletes a BPI message
  - Endpoint: `DELETE /messages/{id}`
  - Response: `204 No Content`
- **Publish Message**: Publishes a message to a subject
  - Endpoint: `POST /publish`
  - Request Body: `BpiMessage` object with subject and data
  - Response: `204 No Content`
- **Subscribe to Subject**: Subscribes to a subject to receive messages
  - Endpoint: `POST /subscribe`
  - Request Body: Subject name
  - Response: `204 No Content`

**Relationship with Other Modules**

The Communication module relates to the following modules:

- **Identity Module**: The Communication module uses the Identity module's `BpiSubject` model to authenticate and authorize messages.
- **Transaction Module**: The Communication module is used by the Transaction module to publish and subscribe to messages related to transactions.
- **Workgroup Module**: The Communication module is used by the Workgroup module to publish and subscribe to messages related to workflows and workgroups.

In summary, the Communication module provides a messaging system using NATS to enable communication between services. It uses the `BpiMessage` model to represent messages and provides APIs for creating, retrieving, updating, and deleting messages. The module relates to the Identity, Transaction, and Workgroup modules to facilitate communication and coordination between services.
