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
    skills?: string;     // e.g., "Plumbing", "Electrical"
    location?: string;   // City, address, or service area
    rating?: number;     // Minimum rating (e.g. 4 for 4+ stars)
}