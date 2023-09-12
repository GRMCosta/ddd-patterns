import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "123", []);
        }).toThrowError("Id is required")
    });

    it("should throw error when customerId is empty", () => {
        expect(() => {
            let order = new Order("123", "", []);
        }).toThrowError("CustomerId is required")
    });

    it("should throw error when Item qtd is 0", () => {
        expect(() => {
            let order = new Order("123", "123", []);
        }).toThrowError("Items are required")
    });

    it("should calculate total", () => {
        const item1 = new OrderItem("i1","p1", "Item 1", 100, 2);
        const item2 = new OrderItem("i2", "p2", "Item 2", 200, 3);
        
        const order1 = new Order("o1", "c1", [item1]);
        const order2 = new Order("o2", "c2", [item1, item2]);

        expect(order1.total()).toBe(200);
        expect(order2.total()).toBe(800);
    });

    it("should throw error if the item qte is less or equal 0", () => {
        expect(() => {
            const item = new OrderItem("i1","p1", "Item 1", 100, 0);
            const order1 = new Order("o1", "c1", [item]);
        }).toThrowError("Quantity must be greater than 0")   
    });
});