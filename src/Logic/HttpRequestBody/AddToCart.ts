export interface AddToCartRoot {
    cart_items: CartItem[]
    skip_collect: number
  }
  
  export interface CartItem {
    data: Data
  }
  
  export interface Data {
    quantity: number
    any_sku: string
  }
  