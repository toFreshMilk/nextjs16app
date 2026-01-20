// src/core/config/tenant.types.ts
import { ComponentType } from 'react';

// === 데이터 모델 (최소한의 공통 약속) ===
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

// === 컴포넌트 맵 (Registry) ===
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

// === 로더 타입 (유연하게 any 허용) ===
export type ModuleWithDefault<T> = { default: T };
export type ComponentLoader<K extends ComponentKey> = () => Promise<ModuleWithDefault<ComponentType<any>>>;

// [변경] ServiceLoader는 더 이상 특정 인터페이스를 강제하지 않음 (Duck Typing)
// 어떤 객체든 default export로 반환하기만 하면 됨
export type ServiceLoader = () => Promise<ModuleWithDefault<any>>;

// === 설정 파일 구조 ===
export interface TenantConfig {
    id: string;
    name: string;
    features: { i18n: boolean; ai: boolean; sso: boolean };
    theme: { primaryColor: string; };
    components?: Partial<{ [K in ComponentKey]: ComponentLoader<K> }>;
    services?: Partial<{ [K in ServiceKey]: ServiceLoader }>;
}
