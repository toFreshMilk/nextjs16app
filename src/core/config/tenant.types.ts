// src/core/config/tenant.types.ts
import { ComponentType } from 'react';

// === 컴포넌트 맵 (Registry Keys) ===
// 구체적인 Props 타입은 각 컴포넌트가 소유하므로 여기서는 any로 처리
export type ComponentPropsMap = {
    TopNavbar: any;
    WorkspaceBanner: any;
    ContractSidebar: any;
    ContractMain: any;
    ContractList: any;
    ContractDetailTop: any;
    ContractDetailLeft: any;
    ContractDetailRight: any;
};

export type ComponentKey = keyof ComponentPropsMap;
export type ServiceKey = 'ContractService';

// === 로더 타입 (완전 제네릭) ===
export type ModuleWithDefault<T> = { default: T };
export type ComponentLoader<K extends ComponentKey> = () => Promise<ModuleWithDefault<ComponentType<any>>>;
export type ServiceLoader = () => Promise<ModuleWithDefault<any>>;

// === 설정 구조 ===
export interface TenantConfig {
    id: string;
    name: string;
    features: { i18n: boolean; ai: boolean; sso: boolean };
    theme: { primaryColor: string; };
    components?: Partial<{ [K in ComponentKey]: ComponentLoader<K> }>;
    services?: Partial<{ [K in ServiceKey]: ServiceLoader }>;
}
