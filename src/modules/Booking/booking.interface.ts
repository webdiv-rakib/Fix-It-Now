export interface ICreateBooking {
    serviceId: string;
    scheduleDate: string;
    serviceAddress: string;
    notes?: string;
}

export interface IServiceFilters {
    type?: string;
    location?: string;
    rating?: number;
}