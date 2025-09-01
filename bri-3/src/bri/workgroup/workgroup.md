**Summary:**

The `workgroup` folder is a module within the `src/bri` directory that manages workgroups, workflows, and worksteps. It provides a comprehensive set of APIs, handlers, and agents to create, update, delete, and retrieve workgroups, workflows, and worksteps.

**Description:**
The `workgroup` module is responsible for managing workgroups, which are collections of users who collaborate on specific tasks or projects. Each workgroup can have multiple `workflows`, which define a series of steps to complete a task on the state of the BPIAccount. Each workflow consists of multiple `worksteps`, which represent individual actions or tasks within the workflow. Each `workstep` is a set of business logic that is encoded in a zero-knowledge circuit. These workstep actions are changes enacted upon the state of a `BPIAccount`.

**APIs:**

The following APIs are found in the `workgroup` folder:

**Workgroups:**

- `CreateWorkgroupCommand`: creates a new workgroup
- `UpdateWorkgroupCommand`: updates an existing workgroup
- `DeleteWorkgroupCommand`: deletes a workgroup
- `GetWorkgroupByIdQuery`: retrieves a workgroup by ID
- `GetAllWorkgroupsQuery`: retrieves all workgroups

**Workflows:**

- `CreateWorkflowCommand`: creates a new workflow
- `UpdateWorkflowCommand`: updates an existing workflow
- `DeleteWorkflowCommand`: deletes a workflow
- `GetWorkflowByIdQuery`: retrieves a workflow by ID
- `GetAllWorkflowsQuery`: retrieves all workflows

**Worksteps:**

- `CreateWorkstepCommand`: creates a new workstep
- `UpdateWorkstepCommand`: updates an existing workstep
- `DeleteWorkstepCommand`: deletes a workstep
- `GetWorkstepByIdQuery`: retrieves a workstep by ID
- `GetAllWorkstepsQuery`: retrieves all worksteps

**Workstep Types**

The `WorkstepType` enum defines the different types of worksteps that can be created. These types determine the behavior and functionality of each workstep in a workflow. The following are the different workstep types:

- **PAYLOAD_FROM_USER**: This type of workstep receives payload from a user which is proccessed as per business logic given in a connected zero-knowledge circuit.

- **PAYLOAD_FROM_API**: This type of workstep receives payload for an API. It is typically used to retrieve data from an external API or service. The payload is then processed and used to trigger the next workstep in the workflow.

- **BPI_TRIGGER**: This type of workstep triggers a BPI (Business Process Initiative) action. It is typically used to initiate a business process or workflow. The BPI action is triggered based on the payload received from the previous workstep.

- **BPI_WAIT**: This type of workstep waits for a BPI action to complete. It is typically used to pause the workflow until the BPI action is completed. The workflow will resume once the BPI action is completed.

**Relationships:**

Workgroups, workflows, and worksteps are related to each other as follows:

- A workgroup can have multiple workflows and worksteps.
- A workflow is associated with one workgroup.
- A workstep is associated with one workflow.

**Relationships to other modules:**

The `workgroup` module is related to other modules in the `src/bri` directory as follows:

- `identity`: the `workgroup` module uses BPI subjects and accounts from the `identity` module to manage workgroup participants and administrators. BPI Subjects can be assigned roles within a workgroup, such as member or admin.
- `state`: the `workgroup` module interacts with the `state` module to manage the state of `BPIAccounts` as worksteps are executed within workflows.
- `circuit`: the `workstep` module utilizes zero-knowledge circuits defined in the `zeroKnowledgeProof` module to encode the business logic of worksteps.
