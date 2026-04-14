import InvalidPurchaseException from "../lib/InvalidPurchaseException.js";
export default class RequestValidator {
  static MAX_TICKETS = 25;

  static validate(accountId, ticketTypeRequests) {
    if (!Number.isInteger(accountId) || accountId <= 0) {
      throw new InvalidPurchaseException(
        "Invalid account ID, enter a valid number greater than 0",
      );
    }

    if (!Array.isArray(ticketTypeRequests) || ticketTypeRequests.length === 0) {
      throw new InvalidPurchaseException(
        "At least one ticket should be requested",
      );
    }

    const counts = this.#countTickets(ticketTypeRequests);
    const totalTickets = counts.INFANT + counts.CHILD + counts.ADULT;

    if (totalTickets > this.MAX_TICKETS) {
      throw new InvalidPurchaseException(
        "Cannot purchase more than 25 tickets at a time",
      );
    }

    if (counts.INFANT > counts.ADULT) {
      throw new InvalidPurchaseException(
        "Each infant must be accompanied by an adult",
      );
    }
    if (counts.ADULT === 0) {
      throw new InvalidPurchaseException(
        "At least one adult ticket must be purchased",
      );
    }
  }

  static #countTickets(ticketTypeRequests) {
    const counts = { ADULT: 0, CHILD: 0, INFANT: 0 };

    for (const request of ticketTypeRequests) {
      const type = request.getTicketType();
      const numberofTickets = request.getNoOfTickets();

      if (!Number.isInteger(numberofTickets) || numberofTickets <= 0) {
        throw new InvalidPurchaseException(
          "Number of tickets must be a positive integer",
        );
      }

      if (type === "ADULT") {
        counts.ADULT += numberofTickets;
      } else if (type === "CHILD") {
        counts.CHILD += numberofTickets;
      } else if (type === "INFANT") {
        counts.INFANT += numberofTickets;
      }
    }
    return counts;
  }
}
