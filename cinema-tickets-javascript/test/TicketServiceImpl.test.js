import { jest } from "@jest/globals";
import TicketServiceImpl from "../src/pairtest/implementation/TicketServiceImpl.js";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest.js";
import InvalidPurchaseException from "../src/pairtest/lib/InvalidPurchaseException.js";

describe("TicketServiceImpl", () => {
  let paymentServiceMock;
  let seatReservationServiceMock;
  let ticketService;

  beforeEach(() => {
    paymentServiceMock = {
      makePayment: jest.fn(),
    };

    seatReservationServiceMock = {
      reserveSeat: jest.fn(),
    };

    ticketService = new TicketServiceImpl(
      paymentServiceMock,
      seatReservationServiceMock,
    );
  });

  test("purchases one adult ticket successfully", () => {
    ticketService.purchaseTickets(1, new TicketTypeRequest("ADULT", 1));

    expect(paymentServiceMock.makePayment).toHaveBeenCalledWith(1, 25);
    expect(seatReservationServiceMock.reserveSeat).toHaveBeenCalledWith(1, 1);
  });

  test("purchases adult and child tickets successfully", () => {
    ticketService.purchaseTickets(
      2,
      new TicketTypeRequest("ADULT", 2),
      new TicketTypeRequest("CHILD", 3),
    );

    expect(paymentServiceMock.makePayment).toHaveBeenCalledWith(2, 95);
    expect(seatReservationServiceMock.reserveSeat).toHaveBeenCalledWith(2, 5);
  });

  test("purchases adult and infant tickets successfully", () => {
    ticketService.purchaseTickets(
      3,
      new TicketTypeRequest("ADULT", 2),
      new TicketTypeRequest("INFANT", 2),
    );

    expect(paymentServiceMock.makePayment).toHaveBeenCalledWith(3, 50);
    expect(seatReservationServiceMock.reserveSeat).toHaveBeenCalledWith(3, 2);
  });

  test("throws if accountId is invalid", () => {
    expect(() =>
      ticketService.purchaseTickets(0, new TicketTypeRequest("ADULT", 1)),
    ).toThrow(InvalidPurchaseException);

    expect(paymentServiceMock.makePayment).not.toHaveBeenCalled();
    expect(seatReservationServiceMock.reserveSeat).not.toHaveBeenCalled();
  });

  test("throws if no adult ticket is purchased", () => {
    expect(() =>
      ticketService.purchaseTickets(1, new TicketTypeRequest("CHILD", 1)),
    ).toThrow(InvalidPurchaseException);

    expect(paymentServiceMock.makePayment).not.toHaveBeenCalled();
    expect(seatReservationServiceMock.reserveSeat).not.toHaveBeenCalled();
  });

  test("throws if infants exceed adults", () => {
    expect(() =>
      ticketService.purchaseTickets(
        1,
        new TicketTypeRequest("ADULT", 1),
        new TicketTypeRequest("INFANT", 2),
      ),
    ).toThrow(InvalidPurchaseException);

    expect(paymentServiceMock.makePayment).not.toHaveBeenCalled();
    expect(seatReservationServiceMock.reserveSeat).not.toHaveBeenCalled();
  });

  test("throws if more than 25 tickets are purchased", () => {
    expect(() =>
      ticketService.purchaseTickets(1, new TicketTypeRequest("ADULT", 26)),
    ).toThrow(InvalidPurchaseException);

    expect(paymentServiceMock.makePayment).not.toHaveBeenCalled();
    expect(seatReservationServiceMock.reserveSeat).not.toHaveBeenCalled();
  });

  test("throws if ticket quantity is not positive", () => {
    expect(() =>
      ticketService.purchaseTickets(1, new TicketTypeRequest("ADULT", 0)),
    ).toThrow();
  });
});