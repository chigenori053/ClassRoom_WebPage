import React from 'react';
import styles from './PricingTable.module.css';

interface PlanItem {
    frequency: string;
    monthlyPrice: string;
}

export interface PricingSubGroup {
    label: string;
    plans: PlanItem[];
}

export interface PricingPlan {
    duration: string;
    description: string;
    plans?: {
        frequency: string;
        monthlyPrice: string;
        timePerSession: string;
    }[];
    subGroups?: PricingSubGroup[];
}

export interface PricingTableProps {
    plans: PricingPlan[];
}

export function PricingTable({ plans }: PricingTableProps) {
    return (
        <div className={styles.pricingContainer}>
            {plans.map((plan, index) => (
                <div key={index} className={styles.pricingSection}>
                    <h3 className={styles.planTitle}>
                        {plan.duration}
                        {plan.description && (
                            <span className={styles.planDescription}>{plan.description}</span>
                        )}
                    </h3>

                    {plan.subGroups ? (
                        <div className={styles.subGroups}>
                            {plan.subGroups.map((group, gIdx) => (
                                <div key={gIdx} className={styles.subGroup}>
                                    <div className={styles.subGroupLabel}>{group.label}</div>
                                    <div className={styles.planCards}>
                                        {group.plans.map((item, idx) => (
                                            <div key={idx} className={styles.planCard}>
                                                <div className={styles.frequency}>{item.frequency}</div>
                                                <div className={styles.price}>
                                                    <span className={styles.priceAmount}>{item.monthlyPrice}</span>
                                                    <span className={styles.priceLabel}>円/月（税込）</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.planCards}>
                            {plan.plans?.map((item, idx) => (
                                <div key={idx} className={styles.planCard}>
                                    <div className={styles.frequency}>{item.frequency}</div>
                                    <div className={styles.price}>
                                        <span className={styles.priceAmount}>{item.monthlyPrice}</span>
                                        <span className={styles.priceLabel}>円/月（税込）</span>
                                    </div>
                                    <div className={styles.time}>{item.timePerSession}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
