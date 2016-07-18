# alertwil

## Routes

- POST /groups/{group_id}/alerts
  - alerts#create { group_id }
  - call by user
- GET /alerts/{alert_id}
  - alerts#show[.twiml] { alert_id }
  - call by twilio server
- POST /alerts/{alertId}/results
  - alert/results#create { alertId }
  - call by twilio server

