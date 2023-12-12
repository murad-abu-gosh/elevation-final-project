export interface RootRemoveItemFromWishList {
    data: Data
}

export interface Data {
    removeProductsFromAnyWishlistById: RemoveProductsFromAnyWishlistById
}

export interface RemoveProductsFromAnyWishlistById {
    changed: number
    anyWishlist: AnyWishlist
}

export interface AnyWishlist {
    items_count: number
    items: any[]
}
  