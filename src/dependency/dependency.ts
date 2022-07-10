export interface Dependency {
    name: string
    version: string
    dependencies?: Array<{name: string, version: string}>
}