**Virtual State Machine (VSM)**

The VSM (Virtual State Machine) folder is located at `Baseline/bri-3/src/bri/vsm`. It is a subfolder of the `bri` directory, which suggests that it is a module within the larger Baseline protocol.

**Contents of VSM Folder**

The VSM folder contains the following subfolders and files:

- `agents`: This subfolder contains agent classes that implement VSM-related functionality. Specifically, it contains the `VsmTasksSchedulerAgent` class, which is responsible for scheduling VSM tasks.
- `capabilites`: This subfolder contains capability classes that implement VSM-related functionality. Specifically, it contains the `ExecuteVsmCycleCommandHandler` class, which handles the execution of VSM cycles.
- `models`: This subfolder contains model classes that represent VSM-related data. However, there are no model classes defined in this subfolder.
- `vsm.module.ts`: This file defines the VSM module, which imports and exports various VSM-related modules and components.

**APIs**

The VSM folder provides the following APIs:

1. **Execute VSM Cycle**: This API is handled by the `ExecuteVsmCycleCommandHandler` class and is responsible for executing a VSM cycle. It takes a `ExecuteVsmCycleCommand` object as input and returns a promise that resolves to a `TransactionResult` object.
2. **Schedule VSM Tasks**: This API is handled by the `VsmTasksSchedulerAgent` class and is responsible for scheduling VSM tasks. It takes a `ScheduleVsmTasksCommand` object as input and returns a promise that resolves to a `ScheduleVsmTasksResult` object.

**VSM Workflow**

The VSM workflow involves the following steps:

1. **Transaction Creation**: Transactions are created and added to a queue.
2. **VSM Task Scheduling**: The `VsmTasksSchedulerAgent` schedules VSM tasks to execute the transactions in the queue.
3. **VSM Cycle Execution**: The `ExecuteVsmCycleCommandHandler` executes a VSM cycle, which involves the following steps:
   - **Transaction Retrieval**: The VSM retrieves a transaction from the queue.
   - **Transaction Execution**: The VSM executes the transaction using the `TransactionAgent`.
   - **State Update**: The VSM updates the state using the `StateAgent`.
   - **Message Broadcasting**: The VSM broadcasts a message using the `EventBus`.
4. **Message Broadcasting**: The VSM broadcasts a message to notify other components of the transaction execution result.

**Relationship to Other Modules**

The VSM folder is related to other modules in the `bri` directory as follows:

- **Transaction Module**: The VSM folder uses the `TransactionAgent` class from the `transactions` module to execute transactions.
- **State Module**: The VSM folder uses the `StateAgent` class from the `state` module to update the state.
- **Event Bus Module**: The VSM folder uses the `EventBus` class from the `eventBus` module to broadcast messages.
- **CCSM Module**: The VSM folder uses the `CcsmStorageAgent` class from the `ccsm` module to store anchor hashes on the blockchain.

**Context**

The VSM folder is part of the larger Baseline protocol, which is designed to enable secure and private transactions between businesses. The VSM module is responsible for executing transactions and updating the state in a virtual state machine.

In the context of the Baseline protocol, the VSM folder provides APIs for executing VSM cycles and scheduling VSM tasks. These APIs are used by other modules in the protocol to manage the transaction execution workflow and ensure that transactions are executed correctly.

**Summary**

In summary, the VSM folder is a module within the Baseline protocol that provides APIs for executing VSM cycles and scheduling VSM tasks. It retrieves transactions from a queue, executes them using the `TransactionAgent`, updates the state using the `StateAgent`, and broadcasts messages using the `EventBus`. The VSM folder is an important part of the Baseline protocol and plays a critical role in enabling secure and private transactions between businesses.
