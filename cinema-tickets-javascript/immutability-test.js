import TicketTypeRequest from './src/pairtest/lib/TicketTypeRequest.js';

const request = new TicketTypeRequest('ADULT', 2);

console.log('Before mutation attempt:');
console.log('Type:', request.getTicketType());
console.log('No of tickets:', request.getNoOfTickets());
console.log('Is frozen:', Object.isFrozen(request));

try {
  request.type = 'CHILD';
  console.log('Type mutation attempt made');
} catch (error) {
  console.error('Type Mutation blocked:', error.message);
}

try {
  request.noOfTickets = 99;
  console.log('No of tickets mutation attempt made');
} catch (error) {
  console.error('No of tickets Mutation blocked:', error.message);
}

console.log('\nAfter mutation attempt:');
console.log('Type:', request.getTicketType());
console.log('No of tickets:', request.getNoOfTickets());
console.log('Extra field exists:', request.extraField);
console.log('Is frozen:', Object.isFrozen(request));