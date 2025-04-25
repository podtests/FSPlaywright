import { ProductDataLayer } from "../../dataControllerLayer/productDataLayer";

export default class ProductInputDao {
    private color: string;
    private size: string;
    private quantity: string;

    constructor(productDataLayer: ProductDataLayer) {
        this.color = productDataLayer.color;
        this.size = productDataLayer.size;
        this.quantity = productDataLayer.quantity;
    }


    public getSize() {
        return this.size;
    }

    public getColor() {
        return this.color;
    }

    public getQuantity() {
        return this.quantity;
    }
}