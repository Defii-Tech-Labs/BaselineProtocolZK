# Baseline Protocol for Cross-Jurisdictional Invoice Financing

## NGI TRUSTCHAIN Open Call 4 Project

A production-ready implementation of the Baseline Protocol enabling standardized, verifiable cross-border SME invoice financing between Serbian and Romanian markets through privacy-preserving zero-knowledge proofs and blockchain verification.

---

## 🎯 Project Overview

### **Use Case: Cross-Border Invoice Portfolio Aggregation**

This project addresses the critical SME financing gap in Central and Eastern European markets by creating a standardized, verifiable process for invoice origination that enables portfolio aggregation across jurisdictions. The solution bridges the disconnect between fragmented local invoice financing companies and large debt providers seeking standardized, auditable investment opportunities.

### **Technology Readiness Level: TRL6**

- **Achieved**: Technology demonstrated in relevant environment using real-world data
- **Evidence**: End-to-end testing with genuine Serbian and Romanian invoice data formats, actual certificate structures, and real API response patterns from government systems
- **Validation**: Successful cross-BPI communication, zero-knowledge proof generation, and independent third-party verification

---

## 🏗️ Technical Architecture

### **Dual-BPI Implementation**

- **Serbian BPI**: Manages Serbian invoice origination with e-invoicing platform integration
- **Romanian BPI**: Handles Romanian invoice validation with business registry verification
- **Interoperability Layer**: Enables seamless cross-border data aggregation hosted within Serbian BPI

### **Key Technical Components**

#### **Multi-Chain Blockchain Support**

- **Primary**: Polygon, Avalanche (EVM-compatible)
- **Capability**: Cross-chain proof verification for independent auditing
- **Smart Contracts**: BPI State Anchor & Verifier contracts for proof storage

#### **Zero-Knowledge Proof System**

- **Custom Circom Circuits**: Validate Serbian/Romanian government certificate formats
- **Privacy-Preserving**: Verify invoice authenticity without exposing sensitive financial data
- **Jurisdiction-Specific**: Handle unique requirements while maintaining interoperability

#### **External System Integration**

- **Serbian E-Invoicing Platform**: API integration with government-signed responses
- **Romanian Business Registry**: Enhanced security through certificate validation
- **Multi-Format Support**: JSON and XML data processing for legacy ERP compatibility

---

## Project Structure

The project is structured into multiple directories, each serving a specific purpose:

- `bri-3/src/bri`: Main application codebase for the Baseline Protocol implementation

  1. `auth`: Authentication logic
  2. `authz`: Authorization policies and role management
  3. `ccsm`: Consensus Controlled State Machine for blockchain interactions. This allows for cross-chain interactions and verifies zero-knowledge proof using smart contracts.
  4. `communication`: Messaging and event handling using NATS
  5. `identity`: User management and DID authentication
  6. `state`: State management of BPISubjectAccounts as per workflow progress
  7. `transactions`: Transaction processing, including creation, execution, and verification of worksteps
  8. `vsm`: Virtual State Machine for queuing and processing transactions
  9. `workgroups`: Workgroup and workflow management, including workstep definitions (business logic) and transaction schemas
  10. `zeroKnowledgeProof`: Zero-knowledge proof generation and verification of business logic as defined in worksteps

- `docs`: Documentation related to the project, including architecture, API references, and integration guides
- `test`: End-to-end and unit test scripts and configurations
- `zeroKnowledgeArtifacts`: Pre-generated zero-knowledge proof artifacts for testing and development
- `docker`: Docker configurations and scripts for setting up the development and production environments
- `scripts`: Utility scripts for various tasks such as database seeding and migrations

---

**Technical Process**

The technical process for the Baseline Protocol implementation involves the following steps:

**Step 1: Generate Nonce + Login**

- The process starts with generating a nonce, which is a unique identifier used for authentication.
- The user logs in using their credentials, and the nonce is used to authenticate the user.

**Step 2: Create BPI Subject (Supplier & Buyer)**

- The user creates a BPI (Business Process Interface) subject for both the supplier and buyer.
- The BPI subject is created using the `createExternalBpiSubject` function, which takes in the subject's name and public key as input.
- The public key is used to authenticate the subject and ensure that only authorized parties can access the data.

**Step 3: Create BPI Subject Account (Supplier & Buyer)**

- Once the BPI subject is created, a BPI subject account is created for both the supplier and buyer.
- The BPI subject account is created using the `createBpiSubjectAccount` function, which takes in the subject's ID and public key as input.
- The BPI subject account is used to manage the subject's data and ensure that only authorized parties can access it.

**Step 4: Create "Origination" Workgroup**

- A workgroup is created for the origination process, which is used to manage the workflow and transactions.
- The workgroup is created using the `createWorkgroup` function, which takes in the workgroup's name and description as input.

**Step 5: Create Worksteps**

- Worksteps are created for each step in the origination process, such as creating a transaction and verifying the transaction result.
- The worksteps are created using the `createWorkstep` function, which takes in the workstep's name and description as input.

**Step 6: Create Workflow & Add Worksteps**

- A workflow is created to manage the origination process, which includes the worksteps created in the previous step.
- The workflow is created using the `createWorkflow` function, which takes in the workflow's name and description as input.
- The worksteps are added to the workflow using the `addWorkstepToWorkflow` function.

**Step 7: Add Transaction Schemas to Worksteps**

- Transaction schemas are added to each workstep to define the structure of the transaction data.
- The transaction schemas are added using the `addTransactionSchemaToWorkstep` function, which takes in the workstep's ID and transaction schema as input.

**Step 8: Create Transactions**

- Transactions are created for each workstep, which includes the transaction data and schema.
- The transactions are created using the `createTransaction` function, which takes in the workstep's ID, transaction data, and schema as input.

**Step 9: Check Transaction Execution**

- The transaction execution is checked to ensure that it was successful.
- The transaction execution is checked using the `checkTransactionExecution` function, which takes in the transaction's ID as input.

**Step 10: Verify Transaction Result on-chain (ZK Proof)**

- The transaction result is verified on-chain using a zero-knowledge proof (ZK proof).
- The ZK proof is used to ensure that the transaction result is correct and that the data has not been tampered with.
- The ZK proof is verified using the `verifyTransactionResultOnChain` function, which takes in the transaction's ID and ZK proof as input.

---

## 🚀 Quick Start

### **Prerequisites**

- Docker & Docker Compose
- Git
- Node.js 18+ (for development)

### **Local Development Setup**

```bash

# Clone the repository
git clone https://github.com/NGI-TRUSTCHAIN/Baseline.git
cd Baseline
cd bri-3

# DB

$ docker run --name postgres -e POSTGRES_PASSWORD=example -p 5432:5432 -d postgres # start a postgres container
$ create a .env file based on the .env.sample # provide a connection string for the db instance
$ npm install # install project dependencies
$ npm run prisma:generate # generate the prisma client
$ npm run prisma:migrate:dev # migrate the db to latest state
$ npx prisma db seed # seed db

$ npx prisma migrate reset # reset the db to initial state, remove all data and apply seed

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# For manual testing, swagger is running on http://localhost:3000/api
# To get json format to use tools like postman, checkout http://localhost:3000/api-json

$ npm run start
```

```bash
# Unit testing - .spec files located next to the thing they are testing

$ npm run test

# Run single spec file
$ npm run test -- transactions.agent.spec.ts
```

```bash
# Use following commands to generate the zk artifacts for the origination e2e test case

$ cd Baseline/bri-3
$ PROTOCOL=plonk npm run snarkjs:circuit originationWorkgroup/serbia_workstep1
$ PROTOCOL=plonk npm run snarkjs:circuit originationWorkgroup/serbia_workstep2
$ PROTOCOL=plonk npm run snarkjs:circuit originationWorkgroup/serbia_workstep3
$ PROTOCOL=plonk npm run snarkjs:circuit originationWorkgroup/serbia_workstep4
$ PROTOCOL=plonk npm run snarkjs:circuit originationWorkgroup/romania_workstep1
```

NOTE: for above to work, make sure circom v2.1.9 is installed. If this [guide](https://docs.circom.io/getting-started/installation/#installing-dependencies) is followed for installation, after `git clone https://github.com/iden3/circom.git` execute `cd circom and git checkout v2.1.9`.

```bash
# e2e testing - .e2e.spec files and the bash script used for running located in ./test folder
# before running the tests, make sure that postgres and nats are running
# also make sure that the .env file contains correct values for DID login to work (as explained in the .env.sample)

$ cd test
$ sh ./e2e-test-sri.sh
$ sh ./e2e-test-origination.sh
```

For testing origination workflow, folder `zeroKnowledgeArtifacts` has to be present in `bri-3` as it is mounted as volume of docker containers.
This can be built manually with `plonk` as described above, but for convenience zip file is available and can be downloaded like this:

```
cd bri-3
rm -rf zeroKnowledgeArtifacts
curl -L https://zkartifacts.sfo3.digitaloceanspaces.com/zeroKnowledgeArtifacts.zip -o zeroKnowledgeArtifacts.zip
unzip -q zeroKnowledgeArtifacts.zip -d .
```

To run e2e tests with docker:

```bash
$ make test-sri
```

```bash
$ make test-origination
```

### make test-origination

This single command:

- Spins up complete dockerized infrastructure
- Executes Serbian and Romanian invoice validation workflows
- Demonstrates cross-BPI communication
- Validates zero-knowledge proof generation
- Simulates government API interactions

### **Local Environment Includes**

- PostgreSQL databases (Romanian & Serbian BPIs)
- NATS messaging system
- Mock external APIs (business registries, e-invoicing platforms)
- Blockchain interaction layers
- Both BPI instances with full workflow support

---

## Messaging

Relevant information can be found in ./docs/nats/nats-configuration.md

## Environment configuration

Can be found in ./env.sample.

Relevant information on DID Auth can be found in ./docs/dids/did-authentication.md

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## CI

There are 3 workflows:

- `bri-3.yaml`

This workflow is checking if build, formatter, linter and unit tests are working. It is running on every commit on PR and push to main.

- `origination-tests.yaml`

This workflow is running origination e2e tests on self hosted github runner. It is running on every push to main.

- `deploy-staging.yaml`

This workflow is manually triggered. It will pull latest main branch on staging environment, clean up and redeploy all docker containers needed to run origination flow.

## 📋 Core Features

### **For Invoice Financing Companies**

- **Standardized Origination**: Unified invoice submission process across jurisdictions
- **Automated Verification**: Digital signature and business registry validation
- **Minimal Integration**: REST APIs with comprehensive documentation
- **Privacy Protection**: Zero-knowledge proofs protect sensitive business data

### **For Debt Providers**

- **Portfolio Aggregation**: Cross-border invoice portfolio consolidation
- **Independent Verification**: Blockchain-stored proofs for third-party auditing
- **Regulatory Compliance**: Jurisdiction-specific validation workflows
- **Risk Assessment**: Standardized data formats for consistent analysis

### **For Auditors & Regulators**

- **Independent Verification**: Blockchain-based proof validation without system access
- **Compliance Tracking**: Complete audit trails for regulatory requirements
- **Cross-Border Transparency**: Standardized verification across jurisdictions

---

## 🔧 API Documentation

### **Core Endpoints**

#### **Invoice Submission**

```http
POST /workgroups/{workgroupId}/workflows/{workflowId}/transactions
Authorization: Bearer <JWT>
Content-Type: application/json

{
  "workstepIndex": 0,
  "payload": {
    "invoiceData": "...",
    "certificateData": "...",
    "supplierDetails": "..."
  }
}
```

#### **Transaction Status**

```http
GET /transactions/{transactionId}
Authorization: Bearer <JWT>
```

#### **Cross-BPI Data Retrieval**

```http
GET /workgroups/{interopWorkgroupId}/aggregated-data
Authorization: Bearer <JWT>
```

#### **Independent Verification**

```http
GET /verification/proofs/{proofHash}
# Public endpoint - no authentication required
```

### **Authentication**

All API endpoints require JWT authentication except public verification endpoints. Authentication is managed through the BPI identity system with role-based access control.

---

## 🌍 Real-World Implementation

### **Current Validation Status**

- **Testing**: Comprehensive end-to-end scenarios with real data formats
- **Government Integration**: Successfully integrated with Serbian e-invoicing platform (signed responses)
- **Certificate Validation**: Romanian and Serbian government certificate verification
- **Cross-Border Proof**: Demonstrated portfolio aggregation across jurisdictions

### **Pilot Participants**

- **Debt Funds**: Representatives managing €400M+ in developing market assets
- **Invoice Financing Companies**: Serbian and Romanian market leaders
- **Verification Services**: Business registries and e-invoicing platform providers
- **Auditors**: Independent verification specialists

### **Staging Environment**

Production-ready staging environment with:

- Polygon/Avalanche testnet integration
- Real government API connections (where available)
- Full workflow simulation capabilities
- Monitoring and logging infrastructure

---

## 🔐 Security & Privacy

### **Privacy-by-Design**

- **Zero-Knowledge Proofs**: Verify data validity without exposing content
- **Selective Disclosure**: Share only necessary information with debt providers
- **Encrypted Communications**: All inter-BPI messaging encrypted
- **Role-Based Access**: Granular permissions per participant type

### **Compliance Framework**

- **GDPR Compliant**: European data protection standards
- **Local Regulations**: Serbian and Romanian financial regulations
- **Audit Ready**: Complete transaction trails for regulatory review
- **Data Sovereignty**: Jurisdiction-specific data handling

---

## 🏆 TRUSTCHAIN Alignment

### **Ecosystem Contributions**

- **Reusable Modules**: Identity management, cross-border financial processes
- **Technical Innovation**: Privacy-preserving compliance verification
- **Interoperability**: Standard APIs for financial data exchange
- **Open Source**: All components available for community use

### **Value to TrustChain**

- **Real-World Application**: Proven blockchain use case in traditional finance
- **Cross-Project Synergies**: Reusable components for other financial applications
- **Market Validation**: Demonstrated business viability and user adoption
- **Technical Leadership**: Advanced ZKP applications in regulatory compliance

---

## 📚 Documentation

### **Developer Resources**

- **API Reference**: Complete OpenAPI/Swagger documentation
- **Integration Guide**: Step-by-step implementation instructions

---

## 🔄 Development Status

### **Completed Features**

- ✅ Dual-BPI architecture with interoperability layer
- ✅ Serbian e-invoicing platform integration
- ✅ Romanian business registry validation
- ✅ Custom zero-knowledge circuits for both jurisdictions
- ✅ Multi-chain blockchain support (Polygon, Avalanche)
- ✅ Comprehensive API suite with authentication
- ✅ Docker containerization for all components
- ✅ End-to-end testing framework
- ✅ Mock external system integrations

### **In Progress (D4 Focus)**

- 🔄 Production staging environment deployment
- 🔄 Pilot testing with real participants
- 🔄 Enhanced monitoring and logging
- 🔄 Performance optimization and scaling
- 🔄 Final security audits and penetration testing

---

## 🚀 Deployment Options

### **Local Development**

```bash
make test-origination  # Complete test scenario
make start-dev         # Development mode with hot reload
make test-unit         # Run unit test suite
```

### **Staging Environment**

- **URL**: Will be provided for D4 pilot participants
- **Features**: Full production simulation with testnet blockchains
- **Access**: Controlled access for pilot participants and evaluators

## 📄 License & Contributing

### **Open Source License**

This project is released under Apache License as part of the NGI TRUSTCHAIN initiative.

### **Contributing**

We welcome contributions from the community. Please see our contributing guidelines and code of conduct.

### **Citation**

If you use this work in academic research, please cite our TRUSTCHAIN deliverables and publications.

---

## 🔗 Links & Resources

- **Project Repository**: https://github.com/NGI-TRUSTCHAIN/Baseline
- **TRUSTCHAIN Program**: [NGI TRUSTCHAIN Website]
- **Technical Documentation**: [Link to comprehensive docs]
- **API Documentation**: [Swagger/OpenAPI endpoint]
- **Community Forum**: [Discord/Telegram link]

---

_This project is funded by the European Union's Next Generation Internet (NGI) TRUSTCHAIN program under Grant Agreement No. [Agreement Number]. The content reflects only the authors' views and the European Commission is not responsible for any use that may be made of the information it contains._
