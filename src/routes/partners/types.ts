export type Company = {
        name: string;
        show: boolean;
        tags: string[];
        shortDescription: string | Promise<string>;
        extendedDescription?: string | Promise<string>;
        logo: string;
        website: string;
    };