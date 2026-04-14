import RequestValidator from "./src/pairtest/implementation/RequestValidator.js";
import TicketCalculator from "./src/pairtest/implementation/TicketCalculator.js";
import SeatCalculator from "./src/pairtest/implementation/SeatCalculator.js";
import TicketTypeRequest from "./src/pairtest/lib/TicketTypeRequest.js";

const requests = [
  new TicketTypeRequest("ADULT", 2),
  new TicketTypeRequest("CHILD", 1),
  new TicketTypeRequest("INFANT", 1),
];

try {
  RequestValidator.validate(1, requests);

  const total = TicketCalculator.calculate(requests);
  const seats = SeatCalculator.calculate(requests);

  console.log("Validation passed");
  console.log("Total amount:", total);
  console.log("Total seats:", seats);
} catch (error) {
  console.error("Validation failed:", error.message);
}
