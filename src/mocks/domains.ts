import type { DomainSummary } from "@/types";

export const domains: DomainSummary[] = [
  {
    id: "domain-1",
    name: "商品域",
    owner: "商品运营中心",
    toolCount: 18,
    health: "healthy",
    providerStatus: "Shopify / PIM 在线",
    description: "负责商品查询、草稿、发布和价格类能力治理。",
  },
  {
    id: "domain-2",
    name: "库存域",
    owner: "库存中台",
    toolCount: 12,
    health: "warning",
    providerStatus: "IMS 在线，WMS 延迟波动",
    description: "负责仓库库存、预警、补货建议等能力治理。",
  },
  {
    id: "domain-3",
    name: "项目域",
    owner: "PMO",
    toolCount: 9,
    health: "healthy",
    providerStatus: "Project Hub 在线",
    description: "负责项目状态、周报、里程碑和排期能力治理。",
  },
  {
    id: "domain-4",
    name: "素材域",
    owner: "素材运营",
    toolCount: 11,
    health: "degraded",
    providerStatus: "Asset Center 降级运行",
    description: "负责素材查询、标签、发布和报告能力治理。",
  },
];
