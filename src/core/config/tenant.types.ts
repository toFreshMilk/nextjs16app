// src/core/config/tenant.types.ts
import { ComponentType } from 'react';

// === Contract Domain Types ===
export type ContractStatus = 'Active' | 'Draft' | 'Review' | 'APPROVED' | 'REJECTED' | (string & {});

export interface ContractRow {
    id: number | string;
    title: string;
    status: ContractStatus;
    partner?: string;
    date?: string;
    amount?: string;
    category?: string;
    templateName?: string;
    requester?: string;
    reviewer?: string;
    documentCode?: string;
}

// === Service Interfaces ===
export interface ContractService {
    getContracts(tenant: string): Promise<ContractRow[]>;
    getContractsDetail(tenant: string): Promise<ContractRow[]>;
    getContractsDetail2(tenant: string): Promise<ContractRow[]>;
    approve(tenant: string, contractId: string): Promise<void>;
}

// === Component Registry Types ===
export type ComponentPropsMap = {
    TopNavbar: Record<string, never>;
    WorkspaceBanner: Record<string, never>;
    ContractSidebar: Record<string, never>;
    ContractMain: { contracts: ContractRow[]; ListComponent?: ComponentType<{ contracts?: ContractRow[] }> };
    ContractList: { contracts?: ContractRow[] };
    ContractDetailTop: {
        data: ContractRow;
        tenantId?: string;
        approveAction?: (prevState: any, formData: FormData) => Promise<any>;
    };
    ContractDetailLeft: { data: ContractRow[] };
    ContractDetailRight: { data: ContractRow[] };
};

export type ComponentKey = keyof ComponentPropsMap;
export type ServiceKey = 'ContractService';

// === Loader Helper Types ===
export type ModuleWithDefault<T> = { default: T };
export type ComponentModule<K extends ComponentKey> = ModuleWithDefault<ComponentType<any>>;
export type ComponentLoader<K extends ComponentKey> = () => Promise<ComponentModule<K>>;

export type ServiceTypeMap = {
    ContractService: ContractService;
};
export type ServiceModule<T> = ModuleWithDefault<T>;
export type ServiceLoader<K extends ServiceKey> = () => Promise<ServiceModule<ServiceTypeMap[K]>>;

// === Config Structure ===
export interface TenantConfig {
    id: string;
    name: string;
    features: { i18n: boolean; ai: boolean; sso: boolean };
    theme: { primaryColor: string; };
    components?: Partial<{ [K in ComponentKey]: ComponentLoader<K> }>;
    services?: Partial<{ [K in ServiceKey]: ServiceLoader<K> }>;
}
