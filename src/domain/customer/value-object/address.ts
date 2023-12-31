export default class Address {
    _street: string = "";
    _number: number = 0;
    _zip: string = "";
    _city: string = "";


    constructor(street: string, number: number, zip: string, city: string) {
        this._street = street;
        this._number = number;
        this._zip = zip;
        this._city = city;

        this.validate();
    }

    get street() {
        return this._street;
    }

    get number() {
        return this._number;
    }

    get zip() {
        return this._zip;
    }

    get city() {
        return this._city;
    }

    validate() {
        if (this._street.length === 0) {
            throw new Error("Street cannot be empty");
        }
        if (this._number === 0) {
            throw new Error("Number cannot be empty");
        }
        if (this._zip.length === 0) {
            throw new Error("Zip cannot be empty");
        }
        if (this._city.length === 0) {
            throw new Error("City cannot be empty");
        }
    }

    toString() {
        return `${this._street} ${this._number}, ${this._zip} ${this._city}`;
    } 

}