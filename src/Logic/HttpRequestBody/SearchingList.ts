export interface ListingSearchRoot {
    listingSearchQuery: ListingSearchQuery
  }
  
  export interface ListingSearchQuery {
    categoryId: string
    filter: Filter
    pageSize: number
    currentPage: number
    search: string
    sort: Sort
    includeAggregations: boolean
    includeCategory: boolean
  }
  
  export interface Filter {
    category_id: CategoryId
  }
  
  export interface CategoryId {
    eq: string
  }
  
  export interface Sort {
    default: boolean
  }
  