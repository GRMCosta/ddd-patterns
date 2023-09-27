import Address from "./domain/customer/value-object/address";
import OrderItem from "./domain/checkout/entity/order_item";
import Customer from "./domain/customer/entity/customer";
import Order from "./domain/checkout/entity/order";

let customer = new Customer("123", "John");
const address = new Address("123", 2, "Springfield", "12345");
customer.setAddress(address);
customer.activate();

const item1 = new OrderItem("1", "p1", "Item 1", 10, 1);
const item2 = new OrderItem("2", "p1", "Item 2", 20, 3);

const order = new Order("1", customer.id, [item1, item2]);
