import RequestValidator from "../src/pairtest/implementation/RequestValidator.js";
import TicketCalculator from "../src/pairtest/implementation/TicketCalculator.js";
import SeatCalculator from "../src/pairtest/implementation/SeatCalculator.js";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest.js";

const form = document.getElementById("ticketForm");
const resultBox = document.getElementById("resultBox");
const errorBox = document.getElementById("errorBox");
const totalAmountEl = document.getElementById("totalAmount");
const totalSeatsEl = document.getElementById("totalSeats");
const errorMessageEl = document.getElementById("errorMessage");


form.addEventListener("submit", (event) => {
  event.preventDefault();
  hideMessages();

  const accountId = Number(document.getElementById("accountId").value);
  const adult = Number(document.getElementById("adult").value);
  const child = Number(document.getElementById("child").value);
  const infant = Number(document.getElementById("infant").value);

  const ticketTypeRequests = [];

  if (adult > 0) {
    ticketTypeRequests.push(new TicketTypeRequest("ADULT", adult));
  }

  if (child > 0) {
    ticketTypeRequests.push(new TicketTypeRequest("CHILD", child));
  }

  if (infant > 0) {
    ticketTypeRequests.push(new TicketTypeRequest("INFANT", infant));
  }


  try {
    RequestValidator.validate(accountId, ticketTypeRequests);

    const totalAmount = TicketCalculator.calculate(ticketTypeRequests);
    const totalSeats = SeatCalculator.calculate(ticketTypeRequests);

    totalAmountEl.textContent = `£${totalAmount}`;
    totalSeatsEl.textContent = totalSeats;
    resultBox.classList.remove("hidden");

  } catch (error) {
    console.error("Validation/Calculation error:", error.message);

    errorMessageEl.textContent = error.message;
    errorBox.classList.remove("hidden");
  }
  
//Testing Immutability using console results

  const testRequest = new TicketTypeRequest('ADULT', 2);
    console.log('Before mutation:', testRequest.getNoOfTickets());

try{
    testRequest.getNoOfTickets = 99;
}catch (e){
    console.error('Mutation error:', e.message);
}
console.log('After mutation:', testRequest.getNoOfTickets());
console.log('Frozen:', Object.isFrozen(testRequest));

});

function hideMessages() {
  resultBox.classList.add("hidden");
  errorBox.classList.add("hidden");
}
