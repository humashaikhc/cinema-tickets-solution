export default class TicketCalculator {
  static calculate(ticketTypeRequests) {
    return ticketTypeRequests.reduce((total, request) => {
      const type = request.getTicketType();
      const quantity = request.getNoOfTickets();

      if (type === "ADULT") {
        return total + quantity * 25;
      }

      if (type === "CHILD") {
        return total + quantity * 15;
      }

      return total;
    }, 0);
  }
}
