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
  7. `transactions`: Transaction processing, including execution, and verification of worksteps
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

You can use [Postman commands + scripts](https://github.com/NGI-TRUSTCHAIN/Baseline/blob/main/bri-3/test/Origination%20E2E%20Test-3.md) and {
	"info": {
		"_postman_id": "079932d9-0491-4628-9a4f-9e999c8056c0",
		"name": "Trustchain OC4",
		"schema": "https://schema.getpostman.com/json/collection/v2.0.0/collection.json",
		"_exporter_id": "12867239"
	},
	"item": [
		{
			"name": "Identity",
			"item": [
				{
					"name": "Bpi Subject",
					"item": [
						{
							"name": "Update Bpi Subject",
							"request": {
								"method": "PUT",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"id\": \"30bee6cf-6a75-4777-901b-68694525b25b\",\n    \"name\": \"hello3\",\n    \"desc\": \"world2\",\n    \"publicKeys\": [{\"type\": \"ECDSA\", \"value\": \"1234325\"}]\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://localhost:3000/subjects/30bee6cf-6a75-4777-901b-68694525b25b"
							},
							"response": []
						},
						{
							"name": "Create BPI Subject",
							"event": [
								{
									"listen": "test",
									"script": {
										"exec": [
											"let jsonData = pm.response.text();",
											"pm.environment.set(\"createdBpiSubjectBuyerId\", jsonData);"
										],
										"type": "text/javascript",
										"packages": {}
									}
								},
								{
									"listen": "prerequest",
									"script": {
										"packages": {},
										"type": "text/javascript"
									}
								}
							],
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": {
										"token": "{{accessToken}}"
									}
								},
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n  \"name\": \"External Bpi Subject - Buyer\",\n  \"desc\": \"A test Bpi Subject\",\n  \"publicKeys\": [\n    {\n      \"type\": \"ecdsa\",\n      \"value\": \"{{buyerBpiSubjectEcdsaPublicKey}}\"\n    },\n    {\n      \"type\": \"eddsa\",\n      \"value\": \"{{buyerBpiSubjectEddsaPublicKey}}\"\n    }\n  ]\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://46.101.255.174:3000/subjects"
							},
							"response": []
						},
						{
							"name": "Delete Bpi Subject",
							"request": {
								"method": "DELETE",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://localhost:3000/subjects/21f79c81-7ff1-4d61-b379-ff0d5415e2e9"
							},
							"response": []
						},
						{
							"name": "Get specific Bpi Subject by id",
							"protocolProfileBehavior": {
								"disableBodyPruning": true
							},
							"request": {
								"method": "GET",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://localhost:3000/subjects/30bee6cf-6a75-4777-901b-68694525b25b"
							},
							"response": []
						},
						{
							"name": "Get all Bpi Subjects",
							"protocolProfileBehavior": {
								"disableBodyPruning": true
							},
							"request": {
								"method": "GET",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://localhost:3000/subjects/"
							},
							"response": []
						}
					]
				},
				{
					"name": "Bpi Account",
					"item": [
						{
							"name": "Get all Bpi Accounts",
							"request": {
								"method": "GET",
								"header": [],
								"url": "http://localhost:3000/accounts/"
							},
							"response": []
						},
						{
							"name": "Create Bpi Account",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n    \"ownerBpiSubjectAccountsIds\": [\"c300973c-b1dc-407c-983f-853ceb869ef8\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://localhost:3000/accounts"
							},
							"response": []
						},
						{
							"name": "Update Bpi Account",
							"request": {
								"method": "PUT",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://localhost:3000/accounts/6d05ef1f-6ff3-47eb-afba-2af1086fbb6e"
							},
							"response": []
						},
						{
							"name": "Get specific Bpi Account",
							"request": {
								"method": "GET",
								"header": [],
								"url": "http://localhost:3000/accounts/3c99e7eb-2f2f-44a2-bc5e-648f7a5f6e3a"
							},
							"response": []
						},
						{
							"name": "Delete Bpi Account",
							"request": {
								"method": "DELETE",
								"header": [],
								"url": "http://localhost:3000/accounts/a38774cd-8f14-41bb-b9b5-4d9bda81a161"
							},
							"response": []
						}
					]
				},
				{
					"name": "Bpi Subject Account",
					"item": [
						{
							"name": "Get All Bpi Subject Accounts",
							"request": {
								"method": "GET",
								"header": [],
								"url": "http://localhost:3000/subjectAccounts"
							},
							"response": []
						},
						{
							"name": "Create Bpi Subject Account",
							"event": [
								{
									"listen": "test",
									"script": {
										"exec": [
											"let jsonData = pm.response.text();",
											"pm.environment.set(\"createdBpiSubjectAccountBuyerId\", jsonData);"
										],
										"type": "text/javascript",
										"packages": {}
									}
								}
							],
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": {
										"token": "{{accessToken}}"
									}
								},
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"creatorBpiSubjectId\": \"{{createdBpiSubjectBuyerId}}\",\r\n  \"ownerBpiSubjectId\": \"{{createdBpiSubjectBuyerId}}\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://46.101.255.174:3000/subjectAccounts/"
							},
							"response": []
						},
						{
							"name": "Get specific Bpi Subject Account",
							"request": {
								"method": "GET",
								"header": [],
								"url": "http://localhost:3000/subjectAccounts/e0848ecf-5483-485b-9c7b-e715f815e6d5"
							},
							"response": []
						},
						{
							"name": "Delete Bpi Subject Account",
							"request": {
								"method": "DELETE",
								"header": [],
								"url": "http://localhost:3000/subjectAccounts/e0848ecf-5483-485b-9c7b-e715f815e6d5"
							},
							"response": []
						},
						{
							"name": "Update Bpi Subject Account",
							"request": {
								"method": "PUT",
								"header": [],
								"url": "http://localhost:3000/subjectAccounts/e0848ecf-5483-485b-9c7b-e715f815e6d5"
							},
							"response": []
						}
					]
				}
			]
		},
		{
			"name": "Workgroup",
			"item": [
				{
					"name": "Workstep",
					"item": [
						{
							"name": "Update Workstep",
							"request": {
								"method": "PUT",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"id\": \"19854519-fe4b-45fc-843b-39b0446d556e\",\n    \"name\": \"hello2\",\n    \"version\": \"world2\",\n    \"status\": \"xyz2\",\n    \"workgroupId\": \"zyx2\",\n    \"securityPolicy\": \"dlrow2\",\n    \"privacyPolicy\": \"olleh2\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://localhost:3000/worksteps/19854519-fe4b-45fc-843b-39b0446d556e"
							},
							"response": []
						},
						{
							"name": "Set Circut Inputs Translation SchemaCopy",
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": {
										"token": "{{accessToken}}"
									}
								},
								"method": "PUT",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n  \"schema\": \"{\\n  \\\"mapping\\\": [\\n    {\\n      \\\"extractionField\\\": \\\"SupplierSEFSalesInvoiceId\\\",\\n      \\\"payloadJsonPath\\\": \\\"supplierId\\\",\\n      \\\"circuitInput\\\": \\\"supplierId\\\",\\n      \\\"description\\\": \\\"Supplied Id number\\\",\\n      \\\"dataType\\\": \\\"string\\\",\\n      \\\"checkType\\\": \\\"merkleProof\\\",\\n      \\\"merkleTreeInputsPath\\\": [\\\"supplierId\\\", \\\"supplierId\\\"]\\n    }\\n  ]\\n}\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://46.101.255.174:3000/worksteps/{{createdWorkstep3Id}}/circuitinputsschema"
							},
							"response": []
						},
						{
							"name": "Create Workstep",
							"event": [
								{
									"listen": "test",
									"script": {
										"exec": [
											"let jsonData = pm.response.text();",
											"pm.environment.set(\"createdWorkstep4Id\", jsonData);"
										],
										"type": "text/javascript",
										"packages": {}
									}
								}
							],
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": {
										"token": "{{accessToken}}"
									}
								},
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n  \"name\": \"serbiaWorkstep3\",\n  \"version\": \"1\",\n  \"status\": \"NEW\",\n  \"workgroupId\": \"{{createdWorkgroupId}}\",\n  \"securityPolicy\": \"Dummy security policy\",\n  \"privacyPolicy\": \"Dummy privacy policy\",\n  \"workstepConfig\": {\n    \"type\": \"PAYLOAD_FROM_USER\",\n    \"executionParams\": {\n      \"verifierContractAddress\": \"0xa513E6E4b8f2a923D98304ec87F64353C4D5C853\"\n    },\n    \"payloadFormatType\": \"XML\"\n  }\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://46.101.255.174:3000/worksteps"
							},
							"response": []
						},
						{
							"name": "Delete Workstep",
							"request": {
								"method": "DELETE",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://localhost:3000/worksteps/21f79c81-7ff1-4d61-b379-ff0d5415e2e9"
							},
							"response": []
						},
						{
							"name": "Get specific Workstep by id",
							"protocolProfileBehavior": {
								"disableBodyPruning": true
							},
							"request": {
								"method": "GET",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://localhost:3000/worksteps/386c5af6-4206-464d-bef2-b8a78e5a0c6a"
							},
							"response": []
						},
						{
							"name": "Get all Worksteps",
							"protocolProfileBehavior": {
								"disableBodyPruning": true
							},
							"request": {
								"method": "GET",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://localhost:3000/worksteps/"
							},
							"response": []
						}
					]
				},
				{
					"name": "Workflow",
					"item": [
						{
							"name": "Update Workflow",
							"request": {
								"method": "PUT",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"name\": \"hello1\",\n    \"workstepIds\": [\"386c5af6-4206-464d-bef2-b8a78e5a0c6a\", \"d3800b48-4c22-4ee1-aa42-4a4ed476cbdd\"],\n    \"workgroupId\": \"zyx1\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://localhost:3000/workflows/870c9f9d-1615-45a5-9262-d5ee1b85ca1c"
							},
							"response": []
						},
						{
							"name": "Create Workflow",
							"event": [
								{
									"listen": "test",
									"script": {
										"exec": [
											"let jsonData = pm.response.text();",
											"pm.environment.set(\"createdWorkflowId\", jsonData);"
										],
										"type": "text/javascript",
										"packages": {}
									}
								}
							],
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": {
										"token": "{{accessToken}}"
									}
								},
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n  \"name\": \"workflow1\",\n  \"workgroupId\": \"{{createdWorkgroupId}}\",\n  \"workstepIds\": [\n    \"{{createdWorkstep1Id}}\",\n    \"{{createdWorkstep2Id}}\",\n    \"{{createdWorkstep3Id}}\"\n  ],\n  \"workflowBpiAccountSubjectAccountOwnersIds\": [\n    \"{{createdBpiSubjectAccountSupplierId}}\",\n    \"{{createdBpiSubjectAccountBuyerId}}\"\n  ]\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://46.101.255.174:3000/workflows"
							},
							"response": []
						},
						{
							"name": "Delete Workflow",
							"request": {
								"method": "DELETE",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://localhost:3000/workflows/e877279d-8987-4e5b-8b6a-8785e8194e30"
							},
							"response": []
						},
						{
							"name": "Get specific Workflow by id",
							"protocolProfileBehavior": {
								"disableBodyPruning": true
							},
							"request": {
								"method": "GET",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://localhost:3000/workflows/870c9f9d-1615-45a5-9262-d5ee1b85ca1c"
							},
							"response": []
						},
						{
							"name": "Get all Workflows",
							"request": {
								"method": "GET",
								"header": [],
								"url": "http://localhost:3000/workflows/"
							},
							"response": []
						}
					]
				},
				{
					"name": "Workgroup",
					"item": [
						{
							"name": "Update Workgroup",
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": {
										"token": "{{accessToken}}"
									}
								},
								"method": "PUT",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n  \"name\": \"origination\",\n  \"administratorIds\": [\"{{createdBpiSubjectSupplierId}}\"],\n\n  \"participantIds\": [\n    \"{{createdBpiSubjectSupplierId}}\",\n    \"{{createdBpiSubjectBuyerId}}\"\n  ],\n  \"securityPolicy\": \"Dummy security policy\",\n  \"privacyPolicy\": \"Dummy privacy policy\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://46.101.255.174:3000/workgroups/{{createdWorkgroupId}}"
							},
							"response": []
						},
						{
							"name": "Create Workgroup",
							"event": [
								{
									"listen": "test",
									"script": {
										"exec": [
											"let jsonData = pm.response.text();",
											"pm.environment.set(\"createdWorkgroupId\", jsonData);"
										],
										"type": "text/javascript",
										"packages": {}
									}
								}
							],
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": {
										"token": "{{accessToken}}"
									}
								},
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n  \"name\": \"origination\",\n  \"securityPolicy\": \"Dummy security policy\",\n  \"privacyPolicy\": \"Dummy privacy policy\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://46.101.255.174:3000/workgroups"
							},
							"response": []
						},
						{
							"name": "Delete Workgroup",
							"request": {
								"method": "DELETE",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://localhost:3000/workgroups/222550cc-294f-47f5-ac13-fc6749ceef37"
							},
							"response": []
						},
						{
							"name": "Get specific Workgroup by id",
							"event": [
								{
									"listen": "test",
									"script": {
										"exec": [
											"let jsonData = pm.response.json();",
											"pm.environment.set(\"fetchedWorkgroupData\", JSON.stringify(jsonData, null, 2));"
										],
										"type": "text/javascript",
										"packages": {}
									}
								}
							],
							"protocolProfileBehavior": {
								"disableBodyPruning": true
							},
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": {
										"token": "{{accessToken}}"
									}
								},
								"method": "GET",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://46.101.255.174:3000/workgroups/{{createdWorkgroupId}}"
							},
							"response": []
						}
					]
				}
			]
		},
		{
			"name": "Transaction",
			"item": [
				{
					"name": "Update Transaction",
					"request": {
						"method": "PUT",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"payload\": \"hello3\",\n    \"signature\": \"world2\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "http://localhost:3000/transactions/123"
					},
					"response": []
				},
				{
					"name": "Create Transaction",
					"event": [
						{
							"listen": "prerequest",
							"script": {
								"exec": [
									"const supplierInvoiceXml = pm.environment.get(\"payload\");    pm.environment.set(\"transactionId\", crypto.randomUUID());",
									"",
									"const payload = {",
									"    method: 'GET',",
									"    apiKey: pm.environment.get(\"EFAKTURA_API_KEY\"),",
									"    headers: {},",
									"    queryParams: {",
									"        invoiceId: \"1\",",
									"    },",
									"    body: supplierInvoiceXml,",
									"};",
									"pm.environment.set(\"payload\", JSON.stringify(payload));"
								],
								"type": "text/javascript",
								"packages": {}
							}
						},
						{
							"listen": "test",
							"script": {
								"exec": [
									"let jsonData = pm.response.text();",
									"pm.environment.set(\"createdTransaction2Id\", jsonData);"
								],
								"type": "text/javascript",
								"packages": {}
							}
						}
					],
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": {
								"token": "{{accessToken}}"
							}
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n  \"id\": \"{{transactionId}}\",\n  \"nonce\": 3,\n  \"workflowId\": \"{{createdWorkflowId}}\",\n  \"workstepId\": \"{{createdWorkstep2Id}}\",\n  \"fromSubjectAccountId\": \"{{createdBpiSubjectAccountBuyerId}}\",\n  \"toSubjectAccountId\": \"{{createdBpiSubjectAccountSupplierId}}\",\n  \"payload\": {{payload}},\n  \"signature\": \"14fabcf74369d2b99a2e22c5420d91c7ba87c917c7e84cefc4583738f9cb6f0884540f35c6fc058fbdb07c4bd5133eaf6d6588a6a47a8fc9f3070e857736b603\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "http://46.101.255.174:3000/transactions"
					},
					"response": []
				},
				{
					"name": "Delete Transaction",
					"request": {
						"method": "DELETE",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "http://localhost:3000/transactions/123"
					},
					"response": []
				},
				{
					"name": "Get specific Transaction by id",
					"protocolProfileBehavior": {
						"disableBodyPruning": true
					},
					"request": {
						"method": "GET",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "http://localhost:3000/transactions/id"
					},
					"response": []
				},
				{
					"name": "Get All Transactions",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:3000/transactions"
					},
					"response": []
				}
			]
		},
		{
			"name": "Message",
			"item": [
				{
					"name": "Update Message",
					"request": {
						"method": "PUT",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"content\": \"hello world2\",\n    \"signature\": \"xyz2\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "http://localhost:3000/messages/123"
					},
					"response": []
				},
				{
					"name": "Create Message",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n  \"id\": \"0319f2a6-fd71-474d-8ae0-55f70c03a3f3\",\n  \"from\": \"71302cec-0a38-469a-a4e5-f58bdfc4ab32\",\n  \"to\": \"76cdd901-d87d-4c87-b572-155afe45c128\",\n  \"content\": \"{\\\"testProp\\\":\\\"testValue\\\"}\",\n  \"signature\": \"0x69c0237bf86c34df000d04b0c1cc1ed037cb3910e2bc8fbef5b01628317f625d70bf83aba5ee5963b2e9e68b3074f61503d3b7ffb2b6caff7e447e7253089b1c1c\",\n  \"type\": 0\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "http://localhost:3000/messages"
					},
					"response": []
				},
				{
					"name": "Delete Message",
					"request": {
						"method": "DELETE",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "http://localhost:3000/messages/123"
					},
					"response": []
				},
				{
					"name": "Get specific Message by id",
					"protocolProfileBehavior": {
						"disableBodyPruning": true
					},
					"request": {
						"method": "GET",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "http://localhost:3000/messages/0319f2a6-fd71-474d-8ae0-55f70c03a3f3"
					},
					"response": []
				}
			]
		},
		{
			"name": "Auth",
			"item": [
				{
					"name": "Get Login Nonce",
					"event": [
						{
							"listen": "prerequest",
							"script": {
								"exec": [
									""
								],
								"type": "text/javascript",
								"packages": {}
							}
						},
						{
							"listen": "test",
							"script": {
								"exec": [
									""
								],
								"type": "text/javascript",
								"packages": {}
							}
						}
					],
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n  \"publicKey\": \"0x08872e27BC5d78F1FC4590803369492868A1FCCb\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "http://46.101.255.174:3000/auth/nonce"
					},
					"response": [
						{
							"name": "Get Login Nonce",
							"originalRequest": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"publicKey\": \"0x08872e27BC5d78F1FC4590803369492868A1FCCb\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://localhost:3000/auth/nonce"
							},
							"status": "Created",
							"code": 201,
							"_postman_previewlanguage": "html",
							"header": [
								{
									"key": "X-Powered-By",
									"value": "Express"
								},
								{
									"key": "Access-Control-Allow-Origin",
									"value": "*"
								},
								{
									"key": "Content-Type",
									"value": "text/html; charset=utf-8"
								},
								{
									"key": "Content-Length",
									"value": "36"
								},
								{
									"key": "ETag",
									"value": "W/\"24-xM7lsA142ZOL6qRvsWk8styEKyE\""
								},
								{
									"key": "Date",
									"value": "Wed, 05 Mar 2025 16:10:19 GMT"
								},
								{
									"key": "Connection",
									"value": "keep-alive"
								},
								{
									"key": "Keep-Alive",
									"value": "timeout=5"
								}
							],
							"cookie": [],
							"body": "88417052-ce31-4c2a-a0fb-a17a8ab8984e"
						}
					]
				},
				{
					"name": "Login",
					"event": [
						{
							"listen": "prerequest",
							"script": {
								"exec": [
									"pm.environment.set(\"internalBpiSubjectEcdsaPublicKey\", \"0x08872e27BC5d78F1FC4590803369492868A1FCCb\");",
									"pm.environment.set(\"internalBpiSubjectEcdsaPrivateKey\", \"0x2c95d82bcd8851bd3a813c50afafb025228bf8d237e8fd37ba4adba3a7596d58\");",
									"pm.environment.set(\"supplierBpiSubjectEcdsaPublicKey\", \"0x047a197a795a747c154dd92b217a048d315ef9ca1bfa9c15bfefe4e02fb338a70af23e7683b565a8dece5104a85ed24a50d791d8c5cb09ee21aabc927c98516539\");",
									"pm.environment.set(\"supplierBpiSubjectEcdsaPrivateKey\", \"0x93b7ed4405c73a1dbd8936e67419ee4e711ed44225aeabe9a5acf49a9ec90e68\");",
									"pm.environment.set(\"supplierBpiSubjectEddsaPublicKey\", \"10009ecb8675285ab74a065b8d9a940fcbb490ee292d41e25da5e48a9a21dda1\");",
									"pm.environment.set(\"supplierBpiSubjectEddsaPrivateKey\", \"0x5b31c1c6182f0c12b78dccea45028e192a11f7e60731ffa37a5d900ab45672ed0b4395af7982d0833dd4a0f088c8394fe5d9f4cf479fd991472d2058e32fb4611c\");",
									"pm.environment.set(\"buyerBpiSubjectEcdsaPublicKey\", \"0x04203db7d27bab8d711acc52479efcfa9d7846e4e176d82389689f95cf06a51818b0b9ab1c2c8d72f1a32e236e6296c91c922a0dc3d0cb9afc269834fc5646b980\");",
									"pm.environment.set(\"buyerBpiSubjectEcdsaPrivateKey\", \"0x32c8d8f4e53cd1920d1ad22b9d51a7b28216337f2b664fb8d33bbcfc3c455c62\");",
									"pm.environment.set(\"buyerBpiSubjectEddsaPublicKey\", \"73c921f9314fc445bb20f71bdc71145dbf4fe2a48fd0d9929c818f88783422ab\");",
									"pm.environment.set(\"buyerBpiSubjectEddsaPrivateKey\", \"0x224c73578ddde3838578a07c409eb047c17c389b9c002e77f2ebaa9b9422ea8e2f428886e4c229316bbc5fd8c7de8aa4a9fac82a98dce26d8106fe8dbb89ebe31b\");"
								],
								"type": "text/javascript",
								"packages": {}
							}
						},
						{
							"listen": "test",
							"script": {
								"exec": [
									"const jsonData = pm.response.json();",
									"",
									"if (jsonData.access_token) {",
									"    pm.environment.set(\"accessToken\", jsonData.access_token);",
									"    console.log(\"Access token set:\", jsonData.access_token);",
									"} else {",
									"    console.warn(\"Access token not found in response\");",
									"}"
								],
								"type": "text/javascript",
								"packages": {}
							}
						}
					],
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n  \"message\": \"ca4c60da-0e5e-4367-9342-8c90bdac06b8\",\n  \"signature\": \"0x3d9956e9bbb32715bdc4e4b828206a7cb572484fbf4eb2ac864e76a83f3aaf9807097377f4ef80fe9f45118055439d29a5d40f8e8df536502128299c39ec0eb31c\",\n  \"publicKey\": \"{{internalBpiSubjectEcdsaPublicKey}}\"\n}\n",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "http://46.101.255.174:3000/auth/login"
					},
					"response": []
				}
			]
		},
		{
			"name": "State",
			"item": [
				{
					"name": "Get state leaf",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "http://localhost:3000/state?leafValue=b7f9a093718ccbf28cb838042efc1ae19a9e78dcf3b95d928a447230fee30960",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"state"
							],
							"query": [
								{
									"key": "leafValue",
									"value": "b7f9a093718ccbf28cb838042efc1ae19a9e78dcf3b95d928a447230fee30960"
								}
							]
						}
					},
					"response": []
				}
			]
		}
	],
	"auth": {
		"type": "bearer",
		"bearer": {
			"token": "{{access_token}}"
		}
	},
	"event": [
		{
			"listen": "prerequest",
			"script": {
				"type": "text/javascript",
				"exec": [
					""
				]
			}
		},
		{
			"listen": "test",
			"script": {
				"type": "text/javascript",
				"exec": [
					""
				]
			}
		}
	],
	"variable": [
		{
			"key": "access_token",
			"value": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJpYXQiOjE3NDEyNDQ5NTQsImV4cCI6MTc0MTI0ODU1NCwiYXVkIjoiYnJpLTMiLCJzdWIiOiJkaWQ6ZXRocjoweDExMTU1MTExOjB4MDg4NzJlMjdCQzVkNzhGMUZDNDU5MDgwMzM2OTQ5Mjg2OEExRkNDYiIsIm5iZiI6MTc0MTI0NDk1NCwiaXNzIjoiZGlkOmV0aHI6c2Vwb2xpYToweDA4ODcyZTI3QkM1ZDc4RjFGQzQ1OTA4MDMzNjk0OTI4NjhBMUZDQ2IifQ.bvr8lcrYooXqLJaRU_NXfUONwxiITi_XWVtVs17vFQfbAvKcXuGoToEwVch3IEPq_Y8LeRgPAT2ysQyoaViAWA"
		}
	]
}[Trustchain OC4.postman_collection.json](https://github.com/user-attachments/files/22203140/Trustchain.OC4.postman_collection.json) to run the entire technical process for "Origination E2E use case". The technical process for the Baseline Protocol implementation involves the following steps:

**Step 1: Generate Nonce + Login**

- The process starts with generating a nonce, which is a unique identifier used for authentication.
- The user logs in using their credentials, and the nonce is used to authenticate the user.

**Step 2: Create BPI Subject (Supplier & Buyer)**

- The user creates a BPISubject (user identity on BPI) for both the supplier and buyer.
- The BPI subject is created using the `createExternalBpiSubject` function, which takes in the subject's name and public key as input.
- The public key is used to authenticate the subject and ensure that only authorized parties can access the data.

**Step 3: Create BPI Subject Account (Supplier & Buyer)**

- Once the BPI subject is created, a BPI subject account is created for both the supplier and buyer.
- The BPI subject account is created using the `createBpiSubjectAccount` function, which takes in the subject's ID and public key as input.
- The BPI subject account is used to manage the subject's data and ensure that only authorized parties can access it. `BPISubjectAccount` participates in a workgroup, creates workflows and worksteps based on business logic, and authorises transactions by signing them with its private key.

**Step 4: Create "Origination" Workgroup**

- A workgroup is created for the origination process, which is used to manage the workflow and transactions.
- The workgroup is created using the `createWorkgroup` function, which takes in the workgroup's name and description as input.
- Relevant BPI subjects (supplier and buyer) are added as participants in the workgroup.

**Step 5: Create Worksteps**

- Worksteps are created for each step in the origination process, such as checking the invoice amounts, validating the national certificate of supplier, and verifying the supplier company details.
- The worksteps are created using the `createWorkstep` function, which takes in the workstep's name and description as input.

**Step 6: Create Workflow & Add Worksteps**

- A workflow is created to manage the origination process, which includes the worksteps created in the previous step.
- This workflow will be added to the workgroup created in Step 4.

**Step 7: Add Transaction Schemas to Worksteps**

- Transaction schemas are added to each workstep to define the structure of the transaction data.
- The transaction schemas are added using the `addTransactionSchemaToWorkstep` function, which takes in the workstep's ID and transaction schema as input.

**Step 8: Create Transactions**

- Transactions are created for each workstep, which includes the transaction data as per the above schema.
- The transactions are created using the `createTransaction` function, which takes in the workstep's ID, transaction data, and schema as input.

**Step 9: Check Transaction Execution**

- The VSM (Virtual State Machine) processes the transactions in the order they were created.
- The state and history trees are updated as each transaction is executed.
- State and history trees are Merkle trees that store the current state of the workgroup and the history of all transactions, respectively.
- The VSM ensures that the transactions are executed in the correct order and that the state and history trees are updated accordingly.

**Step 10: Verify Transaction Result on-chain (ZK Proof)**

- The transaction result is verified on-chain using a zero-knowledge proof (ZK proof).
- This verification can be done by any third-party auditor on any EVM-compatible blockchain, such as Polygon or Avalanche, without needing access to the BPI system or any sensitive data.
- The ZK proof is used to ensure that the transaction result is correct and that the data has not been tampered with.
- The ZK proof is verified using the `verifyTransactionResultOnChain` function, which takes in the transaction's ID and ZK proof as input

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

### Postman commands to test APIs (using Origination E2E usecase)
You can use [Postman commands + scripts](https://github.com/NGI-TRUSTCHAIN/Baseline/blob/main/bri-3/test/Origination%20E2E%20Test-3.md) and {
	"info": {
		"_postman_id": "079932d9-0491-4628-9a4f-9e999c8056c0",
		"name": "Trustchain OC4",
		"schema": "https://schema.getpostman.com/json/collection/v2.0.0/collection.json",
		"_exporter_id": "12867239"
	},
	"item": [
		{
			"name": "Identity",
			"item": [
				{
					"name": "Bpi Subject",
					"item": [
						{
							"name": "Update Bpi Subject",
							"request": {
								"method": "PUT",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"id\": \"30bee6cf-6a75-4777-901b-68694525b25b\",\n    \"name\": \"hello3\",\n    \"desc\": \"world2\",\n    \"publicKeys\": [{\"type\": \"ECDSA\", \"value\": \"1234325\"}]\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://localhost:3000/subjects/30bee6cf-6a75-4777-901b-68694525b25b"
							},
							"response": []
						},
						{
							"name": "Create BPI Subject",
							"event": [
								{
									"listen": "test",
									"script": {
										"exec": [
											"let jsonData = pm.response.text();",
											"pm.environment.set(\"createdBpiSubjectBuyerId\", jsonData);"
										],
										"type": "text/javascript",
										"packages": {}
									}
								},
								{
									"listen": "prerequest",
									"script": {
										"packages": {},
										"type": "text/javascript"
									}
								}
							],
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": {
										"token": "{{accessToken}}"
									}
								},
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n  \"name\": \"External Bpi Subject - Buyer\",\n  \"desc\": \"A test Bpi Subject\",\n  \"publicKeys\": [\n    {\n      \"type\": \"ecdsa\",\n      \"value\": \"{{buyerBpiSubjectEcdsaPublicKey}}\"\n    },\n    {\n      \"type\": \"eddsa\",\n      \"value\": \"{{buyerBpiSubjectEddsaPublicKey}}\"\n    }\n  ]\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://46.101.255.174:3000/subjects"
							},
							"response": []
						},
						{
							"name": "Delete Bpi Subject",
							"request": {
								"method": "DELETE",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://localhost:3000/subjects/21f79c81-7ff1-4d61-b379-ff0d5415e2e9"
							},
							"response": []
						},
						{
							"name": "Get specific Bpi Subject by id",
							"protocolProfileBehavior": {
								"disableBodyPruning": true
							},
							"request": {
								"method": "GET",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://localhost:3000/subjects/30bee6cf-6a75-4777-901b-68694525b25b"
							},
							"response": []
						},
						{
							"name": "Get all Bpi Subjects",
							"protocolProfileBehavior": {
								"disableBodyPruning": true
							},
							"request": {
								"method": "GET",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://localhost:3000/subjects/"
							},
							"response": []
						}
					]
				},
				{
					"name": "Bpi Account",
					"item": [
						{
							"name": "Get all Bpi Accounts",
							"request": {
								"method": "GET",
								"header": [],
								"url": "http://localhost:3000/accounts/"
							},
							"response": []
						},
						{
							"name": "Create Bpi Account",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n    \"ownerBpiSubjectAccountsIds\": [\"c300973c-b1dc-407c-983f-853ceb869ef8\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://localhost:3000/accounts"
							},
							"response": []
						},
						{
							"name": "Update Bpi Account",
							"request": {
								"method": "PUT",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://localhost:3000/accounts/6d05ef1f-6ff3-47eb-afba-2af1086fbb6e"
							},
							"response": []
						},
						{
							"name": "Get specific Bpi Account",
							"request": {
								"method": "GET",
								"header": [],
								"url": "http://localhost:3000/accounts/3c99e7eb-2f2f-44a2-bc5e-648f7a5f6e3a"
							},
							"response": []
						},
						{
							"name": "Delete Bpi Account",
							"request": {
								"method": "DELETE",
								"header": [],
								"url": "http://localhost:3000/accounts/a38774cd-8f14-41bb-b9b5-4d9bda81a161"
							},
							"response": []
						}
					]
				},
				{
					"name": "Bpi Subject Account",
					"item": [
						{
							"name": "Get All Bpi Subject Accounts",
							"request": {
								"method": "GET",
								"header": [],
								"url": "http://localhost:3000/subjectAccounts"
							},
							"response": []
						},
						{
							"name": "Create Bpi Subject Account",
							"event": [
								{
									"listen": "test",
									"script": {
										"exec": [
											"let jsonData = pm.response.text();",
											"pm.environment.set(\"createdBpiSubjectAccountBuyerId\", jsonData);"
										],
										"type": "text/javascript",
										"packages": {}
									}
								}
							],
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": {
										"token": "{{accessToken}}"
									}
								},
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"creatorBpiSubjectId\": \"{{createdBpiSubjectBuyerId}}\",\r\n  \"ownerBpiSubjectId\": \"{{createdBpiSubjectBuyerId}}\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://46.101.255.174:3000/subjectAccounts/"
							},
							"response": []
						},
						{
							"name": "Get specific Bpi Subject Account",
							"request": {
								"method": "GET",
								"header": [],
								"url": "http://localhost:3000/subjectAccounts/e0848ecf-5483-485b-9c7b-e715f815e6d5"
							},
							"response": []
						},
						{
							"name": "Delete Bpi Subject Account",
							"request": {
								"method": "DELETE",
								"header": [],
								"url": "http://localhost:3000/subjectAccounts/e0848ecf-5483-485b-9c7b-e715f815e6d5"
							},
							"response": []
						},
						{
							"name": "Update Bpi Subject Account",
							"request": {
								"method": "PUT",
								"header": [],
								"url": "http://localhost:3000/subjectAccounts/e0848ecf-5483-485b-9c7b-e715f815e6d5"
							},
							"response": []
						}
					]
				}
			]
		},
		{
			"name": "Workgroup",
			"item": [
				{
					"name": "Workstep",
					"item": [
						{
							"name": "Update Workstep",
							"request": {
								"method": "PUT",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"id\": \"19854519-fe4b-45fc-843b-39b0446d556e\",\n    \"name\": \"hello2\",\n    \"version\": \"world2\",\n    \"status\": \"xyz2\",\n    \"workgroupId\": \"zyx2\",\n    \"securityPolicy\": \"dlrow2\",\n    \"privacyPolicy\": \"olleh2\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://localhost:3000/worksteps/19854519-fe4b-45fc-843b-39b0446d556e"
							},
							"response": []
						},
						{
							"name": "Set Circut Inputs Translation SchemaCopy",
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": {
										"token": "{{accessToken}}"
									}
								},
								"method": "PUT",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n  \"schema\": \"{\\n  \\\"mapping\\\": [\\n    {\\n      \\\"extractionField\\\": \\\"SupplierSEFSalesInvoiceId\\\",\\n      \\\"payloadJsonPath\\\": \\\"supplierId\\\",\\n      \\\"circuitInput\\\": \\\"supplierId\\\",\\n      \\\"description\\\": \\\"Supplied Id number\\\",\\n      \\\"dataType\\\": \\\"string\\\",\\n      \\\"checkType\\\": \\\"merkleProof\\\",\\n      \\\"merkleTreeInputsPath\\\": [\\\"supplierId\\\", \\\"supplierId\\\"]\\n    }\\n  ]\\n}\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://46.101.255.174:3000/worksteps/{{createdWorkstep3Id}}/circuitinputsschema"
							},
							"response": []
						},
						{
							"name": "Create Workstep",
							"event": [
								{
									"listen": "test",
									"script": {
										"exec": [
											"let jsonData = pm.response.text();",
											"pm.environment.set(\"createdWorkstep4Id\", jsonData);"
										],
										"type": "text/javascript",
										"packages": {}
									}
								}
							],
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": {
										"token": "{{accessToken}}"
									}
								},
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n  \"name\": \"serbiaWorkstep3\",\n  \"version\": \"1\",\n  \"status\": \"NEW\",\n  \"workgroupId\": \"{{createdWorkgroupId}}\",\n  \"securityPolicy\": \"Dummy security policy\",\n  \"privacyPolicy\": \"Dummy privacy policy\",\n  \"workstepConfig\": {\n    \"type\": \"PAYLOAD_FROM_USER\",\n    \"executionParams\": {\n      \"verifierContractAddress\": \"0xa513E6E4b8f2a923D98304ec87F64353C4D5C853\"\n    },\n    \"payloadFormatType\": \"XML\"\n  }\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://46.101.255.174:3000/worksteps"
							},
							"response": []
						},
						{
							"name": "Delete Workstep",
							"request": {
								"method": "DELETE",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://localhost:3000/worksteps/21f79c81-7ff1-4d61-b379-ff0d5415e2e9"
							},
							"response": []
						},
						{
							"name": "Get specific Workstep by id",
							"protocolProfileBehavior": {
								"disableBodyPruning": true
							},
							"request": {
								"method": "GET",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://localhost:3000/worksteps/386c5af6-4206-464d-bef2-b8a78e5a0c6a"
							},
							"response": []
						},
						{
							"name": "Get all Worksteps",
							"protocolProfileBehavior": {
								"disableBodyPruning": true
							},
							"request": {
								"method": "GET",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://localhost:3000/worksteps/"
							},
							"response": []
						}
					]
				},
				{
					"name": "Workflow",
					"item": [
						{
							"name": "Update Workflow",
							"request": {
								"method": "PUT",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"name\": \"hello1\",\n    \"workstepIds\": [\"386c5af6-4206-464d-bef2-b8a78e5a0c6a\", \"d3800b48-4c22-4ee1-aa42-4a4ed476cbdd\"],\n    \"workgroupId\": \"zyx1\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://localhost:3000/workflows/870c9f9d-1615-45a5-9262-d5ee1b85ca1c"
							},
							"response": []
						},
						{
							"name": "Create Workflow",
							"event": [
								{
									"listen": "test",
									"script": {
										"exec": [
											"let jsonData = pm.response.text();",
											"pm.environment.set(\"createdWorkflowId\", jsonData);"
										],
										"type": "text/javascript",
										"packages": {}
									}
								}
							],
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": {
										"token": "{{accessToken}}"
									}
								},
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n  \"name\": \"workflow1\",\n  \"workgroupId\": \"{{createdWorkgroupId}}\",\n  \"workstepIds\": [\n    \"{{createdWorkstep1Id}}\",\n    \"{{createdWorkstep2Id}}\",\n    \"{{createdWorkstep3Id}}\"\n  ],\n  \"workflowBpiAccountSubjectAccountOwnersIds\": [\n    \"{{createdBpiSubjectAccountSupplierId}}\",\n    \"{{createdBpiSubjectAccountBuyerId}}\"\n  ]\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://46.101.255.174:3000/workflows"
							},
							"response": []
						},
						{
							"name": "Delete Workflow",
							"request": {
								"method": "DELETE",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://localhost:3000/workflows/e877279d-8987-4e5b-8b6a-8785e8194e30"
							},
							"response": []
						},
						{
							"name": "Get specific Workflow by id",
							"protocolProfileBehavior": {
								"disableBodyPruning": true
							},
							"request": {
								"method": "GET",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://localhost:3000/workflows/870c9f9d-1615-45a5-9262-d5ee1b85ca1c"
							},
							"response": []
						},
						{
							"name": "Get all Workflows",
							"request": {
								"method": "GET",
								"header": [],
								"url": "http://localhost:3000/workflows/"
							},
							"response": []
						}
					]
				},
				{
					"name": "Workgroup",
					"item": [
						{
							"name": "Update Workgroup",
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": {
										"token": "{{accessToken}}"
									}
								},
								"method": "PUT",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n  \"name\": \"origination\",\n  \"administratorIds\": [\"{{createdBpiSubjectSupplierId}}\"],\n\n  \"participantIds\": [\n    \"{{createdBpiSubjectSupplierId}}\",\n    \"{{createdBpiSubjectBuyerId}}\"\n  ],\n  \"securityPolicy\": \"Dummy security policy\",\n  \"privacyPolicy\": \"Dummy privacy policy\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://46.101.255.174:3000/workgroups/{{createdWorkgroupId}}"
							},
							"response": []
						},
						{
							"name": "Create Workgroup",
							"event": [
								{
									"listen": "test",
									"script": {
										"exec": [
											"let jsonData = pm.response.text();",
											"pm.environment.set(\"createdWorkgroupId\", jsonData);"
										],
										"type": "text/javascript",
										"packages": {}
									}
								}
							],
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": {
										"token": "{{accessToken}}"
									}
								},
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n  \"name\": \"origination\",\n  \"securityPolicy\": \"Dummy security policy\",\n  \"privacyPolicy\": \"Dummy privacy policy\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://46.101.255.174:3000/workgroups"
							},
							"response": []
						},
						{
							"name": "Delete Workgroup",
							"request": {
								"method": "DELETE",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://localhost:3000/workgroups/222550cc-294f-47f5-ac13-fc6749ceef37"
							},
							"response": []
						},
						{
							"name": "Get specific Workgroup by id",
							"event": [
								{
									"listen": "test",
									"script": {
										"exec": [
											"let jsonData = pm.response.json();",
											"pm.environment.set(\"fetchedWorkgroupData\", JSON.stringify(jsonData, null, 2));"
										],
										"type": "text/javascript",
										"packages": {}
									}
								}
							],
							"protocolProfileBehavior": {
								"disableBodyPruning": true
							},
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": {
										"token": "{{accessToken}}"
									}
								},
								"method": "GET",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://46.101.255.174:3000/workgroups/{{createdWorkgroupId}}"
							},
							"response": []
						}
					]
				}
			]
		},
		{
			"name": "Transaction",
			"item": [
				{
					"name": "Update Transaction",
					"request": {
						"method": "PUT",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"payload\": \"hello3\",\n    \"signature\": \"world2\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "http://localhost:3000/transactions/123"
					},
					"response": []
				},
				{
					"name": "Create Transaction",
					"event": [
						{
							"listen": "prerequest",
							"script": {
								"exec": [
									"const supplierInvoiceXml = pm.environment.get(\"payload\");    pm.environment.set(\"transactionId\", crypto.randomUUID());",
									"",
									"const payload = {",
									"    method: 'GET',",
									"    apiKey: pm.environment.get(\"EFAKTURA_API_KEY\"),",
									"    headers: {},",
									"    queryParams: {",
									"        invoiceId: \"1\",",
									"    },",
									"    body: supplierInvoiceXml,",
									"};",
									"pm.environment.set(\"payload\", JSON.stringify(payload));"
								],
								"type": "text/javascript",
								"packages": {}
							}
						},
						{
							"listen": "test",
							"script": {
								"exec": [
									"let jsonData = pm.response.text();",
									"pm.environment.set(\"createdTransaction2Id\", jsonData);"
								],
								"type": "text/javascript",
								"packages": {}
							}
						}
					],
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": {
								"token": "{{accessToken}}"
							}
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n  \"id\": \"{{transactionId}}\",\n  \"nonce\": 3,\n  \"workflowId\": \"{{createdWorkflowId}}\",\n  \"workstepId\": \"{{createdWorkstep2Id}}\",\n  \"fromSubjectAccountId\": \"{{createdBpiSubjectAccountBuyerId}}\",\n  \"toSubjectAccountId\": \"{{createdBpiSubjectAccountSupplierId}}\",\n  \"payload\": {{payload}},\n  \"signature\": \"14fabcf74369d2b99a2e22c5420d91c7ba87c917c7e84cefc4583738f9cb6f0884540f35c6fc058fbdb07c4bd5133eaf6d6588a6a47a8fc9f3070e857736b603\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "http://46.101.255.174:3000/transactions"
					},
					"response": []
				},
				{
					"name": "Delete Transaction",
					"request": {
						"method": "DELETE",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "http://localhost:3000/transactions/123"
					},
					"response": []
				},
				{
					"name": "Get specific Transaction by id",
					"protocolProfileBehavior": {
						"disableBodyPruning": true
					},
					"request": {
						"method": "GET",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "http://localhost:3000/transactions/id"
					},
					"response": []
				},
				{
					"name": "Get All Transactions",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:3000/transactions"
					},
					"response": []
				}
			]
		},
		{
			"name": "Message",
			"item": [
				{
					"name": "Update Message",
					"request": {
						"method": "PUT",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"content\": \"hello world2\",\n    \"signature\": \"xyz2\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "http://localhost:3000/messages/123"
					},
					"response": []
				},
				{
					"name": "Create Message",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n  \"id\": \"0319f2a6-fd71-474d-8ae0-55f70c03a3f3\",\n  \"from\": \"71302cec-0a38-469a-a4e5-f58bdfc4ab32\",\n  \"to\": \"76cdd901-d87d-4c87-b572-155afe45c128\",\n  \"content\": \"{\\\"testProp\\\":\\\"testValue\\\"}\",\n  \"signature\": \"0x69c0237bf86c34df000d04b0c1cc1ed037cb3910e2bc8fbef5b01628317f625d70bf83aba5ee5963b2e9e68b3074f61503d3b7ffb2b6caff7e447e7253089b1c1c\",\n  \"type\": 0\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "http://localhost:3000/messages"
					},
					"response": []
				},
				{
					"name": "Delete Message",
					"request": {
						"method": "DELETE",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "http://localhost:3000/messages/123"
					},
					"response": []
				},
				{
					"name": "Get specific Message by id",
					"protocolProfileBehavior": {
						"disableBodyPruning": true
					},
					"request": {
						"method": "GET",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "http://localhost:3000/messages/0319f2a6-fd71-474d-8ae0-55f70c03a3f3"
					},
					"response": []
				}
			]
		},
		{
			"name": "Auth",
			"item": [
				{
					"name": "Get Login Nonce",
					"event": [
						{
							"listen": "prerequest",
							"script": {
								"exec": [
									""
								],
								"type": "text/javascript",
								"packages": {}
							}
						},
						{
							"listen": "test",
							"script": {
								"exec": [
									""
								],
								"type": "text/javascript",
								"packages": {}
							}
						}
					],
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n  \"publicKey\": \"0x08872e27BC5d78F1FC4590803369492868A1FCCb\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "http://46.101.255.174:3000/auth/nonce"
					},
					"response": [
						{
							"name": "Get Login Nonce",
							"originalRequest": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"publicKey\": \"0x08872e27BC5d78F1FC4590803369492868A1FCCb\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": "http://localhost:3000/auth/nonce"
							},
							"status": "Created",
							"code": 201,
							"_postman_previewlanguage": "html",
							"header": [
								{
									"key": "X-Powered-By",
									"value": "Express"
								},
								{
									"key": "Access-Control-Allow-Origin",
									"value": "*"
								},
								{
									"key": "Content-Type",
									"value": "text/html; charset=utf-8"
								},
								{
									"key": "Content-Length",
									"value": "36"
								},
								{
									"key": "ETag",
									"value": "W/\"24-xM7lsA142ZOL6qRvsWk8styEKyE\""
								},
								{
									"key": "Date",
									"value": "Wed, 05 Mar 2025 16:10:19 GMT"
								},
								{
									"key": "Connection",
									"value": "keep-alive"
								},
								{
									"key": "Keep-Alive",
									"value": "timeout=5"
								}
							],
							"cookie": [],
							"body": "88417052-ce31-4c2a-a0fb-a17a8ab8984e"
						}
					]
				},
				{
					"name": "Login",
					"event": [
						{
							"listen": "prerequest",
							"script": {
								"exec": [
									"pm.environment.set(\"internalBpiSubjectEcdsaPublicKey\", \"0x08872e27BC5d78F1FC4590803369492868A1FCCb\");",
									"pm.environment.set(\"internalBpiSubjectEcdsaPrivateKey\", \"0x2c95d82bcd8851bd3a813c50afafb025228bf8d237e8fd37ba4adba3a7596d58\");",
									"pm.environment.set(\"supplierBpiSubjectEcdsaPublicKey\", \"0x047a197a795a747c154dd92b217a048d315ef9ca1bfa9c15bfefe4e02fb338a70af23e7683b565a8dece5104a85ed24a50d791d8c5cb09ee21aabc927c98516539\");",
									"pm.environment.set(\"supplierBpiSubjectEcdsaPrivateKey\", \"0x93b7ed4405c73a1dbd8936e67419ee4e711ed44225aeabe9a5acf49a9ec90e68\");",
									"pm.environment.set(\"supplierBpiSubjectEddsaPublicKey\", \"10009ecb8675285ab74a065b8d9a940fcbb490ee292d41e25da5e48a9a21dda1\");",
									"pm.environment.set(\"supplierBpiSubjectEddsaPrivateKey\", \"0x5b31c1c6182f0c12b78dccea45028e192a11f7e60731ffa37a5d900ab45672ed0b4395af7982d0833dd4a0f088c8394fe5d9f4cf479fd991472d2058e32fb4611c\");",
									"pm.environment.set(\"buyerBpiSubjectEcdsaPublicKey\", \"0x04203db7d27bab8d711acc52479efcfa9d7846e4e176d82389689f95cf06a51818b0b9ab1c2c8d72f1a32e236e6296c91c922a0dc3d0cb9afc269834fc5646b980\");",
									"pm.environment.set(\"buyerBpiSubjectEcdsaPrivateKey\", \"0x32c8d8f4e53cd1920d1ad22b9d51a7b28216337f2b664fb8d33bbcfc3c455c62\");",
									"pm.environment.set(\"buyerBpiSubjectEddsaPublicKey\", \"73c921f9314fc445bb20f71bdc71145dbf4fe2a48fd0d9929c818f88783422ab\");",
									"pm.environment.set(\"buyerBpiSubjectEddsaPrivateKey\", \"0x224c73578ddde3838578a07c409eb047c17c389b9c002e77f2ebaa9b9422ea8e2f428886e4c229316bbc5fd8c7de8aa4a9fac82a98dce26d8106fe8dbb89ebe31b\");"
								],
								"type": "text/javascript",
								"packages": {}
							}
						},
						{
							"listen": "test",
							"script": {
								"exec": [
									"const jsonData = pm.response.json();",
									"",
									"if (jsonData.access_token) {",
									"    pm.environment.set(\"accessToken\", jsonData.access_token);",
									"    console.log(\"Access token set:\", jsonData.access_token);",
									"} else {",
									"    console.warn(\"Access token not found in response\");",
									"}"
								],
								"type": "text/javascript",
								"packages": {}
							}
						}
					],
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n  \"message\": \"ca4c60da-0e5e-4367-9342-8c90bdac06b8\",\n  \"signature\": \"0x3d9956e9bbb32715bdc4e4b828206a7cb572484fbf4eb2ac864e76a83f3aaf9807097377f4ef80fe9f45118055439d29a5d40f8e8df536502128299c39ec0eb31c\",\n  \"publicKey\": \"{{internalBpiSubjectEcdsaPublicKey}}\"\n}\n",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "http://46.101.255.174:3000/auth/login"
					},
					"response": []
				}
			]
		},
		{
			"name": "State",
			"item": [
				{
					"name": "Get state leaf",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "http://localhost:3000/state?leafValue=b7f9a093718ccbf28cb838042efc1ae19a9e78dcf3b95d928a447230fee30960",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"state"
							],
							"query": [
								{
									"key": "leafValue",
									"value": "b7f9a093718ccbf28cb838042efc1ae19a9e78dcf3b95d928a447230fee30960"
								}
							]
						}
					},
					"response": []
				}
			]
		}
	],
	"auth": {
		"type": "bearer",
		"bearer": {
			"token": "{{access_token}}"
		}
	},
	"event": [
		{
			"listen": "prerequest",
			"script": {
				"type": "text/javascript",
				"exec": [
					""
				]
			}
		},
		{
			"listen": "test",
			"script": {
				"type": "text/javascript",
				"exec": [
					""
				]
			}
		}
	],
	"variable": [
		{
			"key": "access_token",
			"value": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJpYXQiOjE3NDEyNDQ5NTQsImV4cCI6MTc0MTI0ODU1NCwiYXVkIjoiYnJpLTMiLCJzdWIiOiJkaWQ6ZXRocjoweDExMTU1MTExOjB4MDg4NzJlMjdCQzVkNzhGMUZDNDU5MDgwMzM2OTQ5Mjg2OEExRkNDYiIsIm5iZiI6MTc0MTI0NDk1NCwiaXNzIjoiZGlkOmV0aHI6c2Vwb2xpYToweDA4ODcyZTI3QkM1ZDc4RjFGQzQ1OTA4MDMzNjk0OTI4NjhBMUZDQ2IifQ.bvr8lcrYooXqLJaRU_NXfUONwxiITi_XWVtVs17vFQfbAvKcXuGoToEwVch3IEPq_Y8LeRgPAT2ysQyoaViAWA"
		}
	]
}[Trustchain OC4.postman_collection.json](https://github.com/user-attachments/files/22203178/Trustchain.OC4.postman_collection.json)
to run the entire technical process for "Origination E2E use case".


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
