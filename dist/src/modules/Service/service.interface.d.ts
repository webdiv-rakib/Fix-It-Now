export interface ICreateService {
    name: string;
    description: string;
    price: number;
    categoryId: string;
}
export interface IServiceFilters {
    type?: string;
    location?: string;
    rating?: number;
}
export interface ITechnicianFilters {
    skills?: string;
    location?: string;
    rating?: number;
}
//# sourceMappingURL=service.interface.d.ts.map