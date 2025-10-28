export type Company = {
        id: number
        createdAt: string
        updatedAt: string
        name: string;
        show: boolean;
        location: string
        specialization: string;
        shortDescription: string | Promise<string>;
        description?: string | Promise<string>;
        package: 'platinum' | 'gold' | 'silver' | 'bronze' 
        logoFilename: string;
        url: string;
    };