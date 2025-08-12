const https = require('node:https');

const options = {
  hostname: 'api.cloudflare.com',
  path: '/client/v4/accounts/2cc579c1ec9e426ed585e933ebf4753b/pages/projects',
  method: 'GET',
  headers: {
    Authorization: 'Bearer nLy-MHNoM5waS5EvUSdNW91_-OBZpugqzQjuJ0d5',
    'Content-Type': 'application/json',
  },
};

const req = https.request(options, (res) => {
  console.log('Status Code:', res.statusCode);
  res.on('data', (d) => {
    console.log('Response:', d.toString());
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.end();
