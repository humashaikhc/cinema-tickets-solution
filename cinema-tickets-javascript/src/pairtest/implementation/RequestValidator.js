import InvalidPurchaseException from '../lib/InvalidPurchaseException'
export default class RequestValidator 

{
    static MAX_TICKETS = 25;

    static validate(accountId, ticketTypeRequests) {
        if (!Number.isInteger(accountId) || accountId <= 0) 
            {
            throw new InvalidPurchaseException('Invalid account ID, enter a valid number greater than 0');
            }

        if (!Array.isArray(ticketTypeRequests) || ticketTypeRequests.length === 0) 
            {
            throw new InvalidPurchaseException('At least one ticket should be requested');
            }

        const counts = this.#countTickets(ticketTypeRequests);
        const totalTickets = counts.infant + counts.child + counts.adult;

        if (totalTickets > this.MAX_TICKETS)
            {
            throw new InvalidPurchaseException('Cannot purchase more than 25 tickets at a time');
            }

        if (counts.infant > counts.adult)
            {
            throw new InvalidPurchaseException('Each infant must be accompanied by an adult');
            }
}

        static #countTickets(ticketTypeRequests) 
        
        {
            const counts = { adult: 0, child: 0, infant: 0 };

            for (const request of ticketTypeRequests) {

                const type = request.getTicketType();
                const numberofTickets = request.getNoOfTickets();

                if (!Number.isInteger(numberofTickets) || numberofTickets <= 0) 
                {
                    throw new InvalidPurchaseException('Number of tickets must be a positive integer');
                }

                counts[type] += numberofTickets;

            }
            return counts;
        }
    }