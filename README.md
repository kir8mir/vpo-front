
Project Setup

1. Before runnig the project(once after cloning) - npm install
2. For running the project - npm run start

API Endpoints

To create donation:
- Request: POST
- Endpoint: /donation
- Body:
```
{
  "name": "Name",
  "title": "Title",
  "description": "Desc",
  "amount": 1000,
  "status": "pending",
  "value": 0
}
```

To set status from pending to active:
- Request: POST
- Endpoint: /donation/activate/id

To get all dontaions:
- Request: GET
- Endpoint: /donation

To get single donation: 
- Request: GET
- Endpoint: /donation/id

To get all active/pending/closed donation:
- Request: GET
- Endpoint: /donation/(active/pending/closed)

To make donation:
- Request: PATCH
- Endpoint: /donation/id
- Body:
```
{
  "value": 100
}
```

To remove donation:
- Request: DELETE
- Endpoint: /donation/id
