export interface RootAddItem {
    data: Data
}

export interface Data {
    addAnyProductsToAnyCart: AddAnyProductsToAnyCart
}

export interface AddAnyProductsToAnyCart {
    total_quantity: number
}
  