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

console.log("app.js loaded");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("SUBMIT FIRED");
  hideMessages();

  const accountId = Number(document.getElementById("accountId").value);
  const adult = Number(document.getElementById("adult").value);
  const child = Number(document.getElementById("child").value);
  const infant = Number(document.getElementById("infant").value);

  console.log("Input values:", { accountId, adult, child, infant });

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

  console.log("Ticket Requests", ticketTypeRequests);

  try {
    RequestValidator.validate(accountId, ticketTypeRequests);

    const totalAmount = TicketCalculator.calculate(ticketTypeRequests);
    const totalSeats = SeatCalculator.calculate(ticketTypeRequests);

    console.log("Calculated results:", { totalAmount, totalSeats });

    totalAmountEl.textContent = `£${totalAmount}`;
    totalSeatsEl.textContent = totalSeats;
    resultBox.classList.remove("hidden");

    console.log("Result displayed successfully");
  } catch (error) {
    console.error("Validation/Calculation error:", error.message);

    errorMessageEl.textContent = error.message;
    errorBox.classList.remove("hidden");
  }
});

function hideMessages() {
  resultBox.classList.add("hidden");
  errorBox.classList.add("hidden");
}
