import TicketService from '../lib/TicketService.js';
import TicketPaymentService from '../../thirdparty/paymentgateway/TicketPaymentService.js';
import SeatReservationService from '../../thirdparty/seatbooking/SeatReservationService.js';
import RequestValidator from './RequestValidator.js';
import TicketCalculator from './TicketCalculator.js';
import SeatCalculator from './SeatCalculator.js';

export default class TicketServiceImpl extends TicketService {
  #paymentService;
  #seatReservationService;

  constructor(
    paymentService = new TicketPaymentService(),
    seatReservationService = new SeatReservationService()
  ) {
    super();
    this.#paymentService = paymentService;
    this.#seatReservationService = seatReservationService;
  }

  purchaseTickets(accountId, ...ticketTypeRequests) {
    RequestValidator.validate(accountId, ticketTypeRequests);

    const totalAmount = TicketCalculator.calculateTotal(ticketTypeRequests);
    const totalSeats = SeatCalculator.calculateSeats(ticketTypeRequests);

    this.#paymentService.makePayment(accountId, totalAmount);
    this.#seatReservationService.reserveSeat(accountId, totalSeats);
  }
}