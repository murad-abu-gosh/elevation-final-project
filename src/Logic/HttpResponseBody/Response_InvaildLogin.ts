export interface InvalidLoginRoot {
    errors: Error[]
    data: Data
}

export interface Error {
    message: string
    extensions: Extensions
    locations: Location[]
    path: string[]
}

export interface Extensions {
    category: string
}

export interface Location {
    line: number
    column: number
}

export interface Data {
    userLogin: any
}
  