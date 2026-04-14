# Cinema Tickets Solution (Javascript)

## Overview

This repository contains my JavaScript solution to the cinema tickets coding exercise.

The task was to provide a working implementation of `TicketService` that:

- applies the stated business rules correctly
- calculates the correct total payment amount
- calculates the correct number of seats to reserve
- rejects invalid purchase requests
- respects the constraints given in the exercise

I also added a lightweight browser demo so the rules can be tested visually, but the core solution remains the JavaScript service implementation.

---

## What the exercise required

The exercise asked for a working `TicketService` implementation that:

- supports 3 ticket types: `ADULT`, `CHILD`, `INFANT`
- charges:
  - `ADULT` = £25
  - `CHILD` = £15
  - `INFANT` = £0
- allows multiple tickets to be purchased in one transaction
- allows a **maximum of 25 tickets**
- does **not** allocate a seat to infants
- does **not** allow child or infant tickets to be purchased without at least one adult
- rejects any invalid purchase request

The exercise also included important constraints:

- the `TicketService` interface **must not** be modified
- the code in the `thirdparty` packages **must not** be modified
- `TicketTypeRequest` **should be immutable**

---

## Setup and Environment

Before starting the development, I ensured the correct environment was in place.

- Node.js version aligned with the project requirements (>=20.9.0)
- Project dependencies and Jest was installed to configure Jest to run and validate the test

  ```bash
  npm install
  npm install --save-dev jest

## How I structured the solution

I broke the solution into small files so each one has a clear job.

### `TicketServiceImpl.js`

This is the main implementation of the exercise.

Its role is to coordinate the flow:

1. validate the purchase request by calling the RequestValidator.js
2. calculate the total amount to pay by calling TicketCalculator.js
3. calculate how many seats to reserve by calling SeatCalculator.js

This file does **not** contain all the detailed business logic itself. I kept it as the orchestration layer so it remains readable and easy to test.

In simple terms, this file answers:

> “What should happen when somebody tries to buy tickets?”

---

### `RequestValidator.js`

This file is responsible for enforcing the business rules and rejecting invalid requests.

It checks things like:

- account ID must be valid
- at least one ticket request must exist
- total tickets must not exceed 25
- at least one adult ticket must be present
- infants must not exceed the number of adults
- quantities must be positive integers

I separated this into its own file to keep it consistent for rejecting all the invalid errors. It also makes it easier to keep the main service implementation clean and focused.

In simple terms, this file answers:

> “Is this purchase request allowed?”

---

### `TicketCalculator.js`

This file calculates the total price for the ticket request.

It applies the ticket pricing rules:

- adult = £25
- child = £15
- infant = £0

It does not validate the request.

I kept this separate because price calculation should be simple, focused, and easy to test independently.

In simple terms, this file answers:

> “How much should this purchase cost?”

---

### `SeatCalculator.js`

This file calculates how many seats need to be reserved.

This is important because the number of seats is **not** the same as the number of tickets. Infants do not get seats, so only adult and child tickets count towards seat reservations.

This file exists separately because seat allocation is a different rule from ticket pricing.

In simple terms, this file answers:

> “How many seats should be booked?”

---

### `TicketTypeRequest.js`

This file was already part of the exercise structure and represents one ticket request.

The brief stated that `TicketTypeRequest` **should be immutable**, so I enforced that.

To support that:
- the object uses private fields
- the instance is frozen after construction using Object.freeze()

That means once a request is created, it cannot be changed.

This matters because ticket requests are input data. Once created, they should remain stable throughout validation and calculation.

---

### `TicketServiceImpl.test.js`

This file contains the Jest tests for the implementation.

The tests cover:
- valid purchase scenarios
- invalid scenarios
- business rule enforcement
- payment and seat reservation behaviour

I used tests to confirm that the service behaves correctly.

---

### `demo/index.html`, `demo/styles.css`, `demo/app.js`

These files provide a lightweight browser demo for the solution.

They are **not** the core assessed solution, but they make the behaviour easier to visualise.

The demo allows a user to:
- enter account ID
- enter adult, child, and infant quantities
- calculate total amount and seat count
- see validation errors in the browser

#### `demo/index.html`
Defines the structure of the browser demo.

#### `demo/styles.css`
Provides styling so the demo is clear and usable.

#### `demo/app.js`
Connects the UI to the existing JavaScript logic by:
- reading the form inputs
- creating `TicketTypeRequest` objects
- calling validation
- calling the calculators
- displaying either results or validation errors

The demo uses the same underlying business logic as the tested solution.

It also tests the immutability using console results.

---

## Constraint compliance

### 1. `TicketService` interface was not modified
I kept the provided interface intact and implemented the required behaviour in `TicketServiceImpl`.

### 2. `thirdparty` packages were not modified
I used the existing payment and seat reservation services as provided.

### 3. `TicketTypeRequest` is immutable
This was a stated constraint in the brief, so I enforced it directly in the `TicketTypeRequests`.

I verified this by testing mutation attempts in the `immutability-test` and confirmed:
- values do not change
- the object is frozen

---

## Why I structured it this way

I did not want one large file doing everything.

Splitting the work into:
- validation
- payment calculation
- seat calculation
- orchestration

This made the logic easier to understand and easier to test.

It also made it easier to map each part of the solution back to the requirements in the exercise.

---

## How to run the project

To run tests:

```bash
npm test
```

To run the browser demo:

Open the folder demo/index.html with a local server such as Live Server(Extension) in VS code. 
