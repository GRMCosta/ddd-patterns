import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import CustomerModel from "../database/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.Address.street,
            number: entity.Address.number,
            zipCode: entity.Address.zip,
            city: entity.Address.city,
            active: entity.active,
            rewardPoints: entity.rewardPoints,
        });
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            name: entity.name,
            street: entity.Address.street,
            number: entity.Address.number,
            zipCode: entity.Address.zip,
            city: entity.Address.city,
            active: entity.active,
            rewardPoints: entity.rewardPoints,
        }, {
            where: { id: entity.id }
        });
    }

    async find(id: string): Promise<Customer> {
        let customerModel;
        try {
            customerModel = await CustomerModel.findOne({ 
                where: { id: id }, 
                rejectOnEmpty: true 
            });
        } catch (error) {
            throw new Error("Customer not found");
        }

        const customer = new Customer(id, customerModel.name);
        const address = new Address(
            customerModel.street,
            customerModel.number,
            customerModel.zipCode,
            customerModel.city
            );
        customer.changeAddress(address);
        return customer;
    }

    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();

        const customers =  customerModels.map(customerModel => {
            let customer = new Customer(customerModel.id, customerModel.name);
            customer.addRewardPoints(customerModel.rewardPoints);
            const address = new Address(
                customerModel.street,
                customerModel.number,
                customerModel.zipCode,
                customerModel.city
                );
            customer.changeAddress(address);
            if (customerModel.active) {
                customer.activate();
            }
            return customer;
        });
        return customers;
    }
}