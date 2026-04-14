export default class SeatCalculator {
  static calculate(ticketTypeRequests) {
    return ticketTypeRequests.reduce((totalSeats, request) => {
      const type = request.getTicketType();
      const quantity = request.getNoOfTickets();

      if (type === "INFANT") {
        return totalSeats;
      }

      return totalSeats + quantity;
    }, 0);
  }
}
