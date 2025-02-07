# case

This script generates a JSON report based on the sessions data.

## Setup

Make sure you have npm installed on your machine.

```bash
npm install
```

## Usage

```bash
node src/index.js session.json
```

## Example report

```json
{
  "generated_at": "2025-02-07T17:38:55.773Z",
  "flows": {
    "total_flows": 30,
    "page_with_most_visits_excl_home": {
      "path": "/checkout",
      "visits": 39
    },
    "meaningful_flows": [
      {
        "title": "Purchase path",
        "description": "The path a customer takes to purchase a product",
        "numberOfFlows": 23
      },
      {
        "title": "Change Language",
        "description": "The path a customer takes to change the language of the website",
        "numberOfFlows": 7
      }
    ]
  },
  "anomalies": {
    "total": 18,
    "payment_related_anomalies": {
      "total": 6,
      "anomalies": [
        {
          "path": "/checkout",
          "text": "Payment gateway timeout"
        },
        {
          "path": "/checkout",
          "text": "Payment declined"
        },
        {
          "path": "/checkout",
          "text": "Payment service unavailable"
        },
        {
          "path": "/checkout",
          "text": "Unrecognized payment method"
        },
        {
          "path": "/checkout",
          "text": "Payment declined"
        },
        {
          "path": "/checkout",
          "text": "Payment service error"
        }
      ]
    },
    "help_requests": {
      "total": 5,
      "anomalies": [
        {
          "path": "/help",
          "text": "Need Help"
        },
        {
          "path": "/checkout",
          "text": "Need Help"
        },
        {
          "path": "/help",
          "text": "Need Help?"
        },
        {
          "path": "/help",
          "text": "Need Assistance?"
        },
        {
          "path": "/random",
          "text": "Help"
        }
      ]
    }
  }
}
```



