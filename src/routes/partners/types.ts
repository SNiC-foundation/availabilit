export type Company = {
        id: number
        createdAt: string
        updatedAt: string
        name: string;
        show: boolean;
        location: string
        specialization: string;
        description: string 
        package: 'platinum' | 'gold' | 'silver' | 'bronze' 
        logoFilename: string;
        url: string;
    };