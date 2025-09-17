import {faker} from "@faker-js/faker";

export class CheckoutFormFactory {
    static fillCheckoutForm() {
        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            postalCode: faker.location.zipCode('#####-###')
        };
    }
}
