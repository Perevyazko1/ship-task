export interface Vehicle {
    title: string[]
    level: string
    type: {
        name: string
        title:string
    }
    nation: {
        name: string,
        icons: { large: string }
    }
    description: string[]
    icons: { medium: string }
}
