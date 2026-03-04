import React from 'react';
import styles from './PricingTable.module.css';

export interface PricingPlan {
    duration: string;
    description: string;
    plans: {
        frequency: string;
        monthlyPrice: string;
        timePerSession: string;
    }[];
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
                        <span className={styles.planDescription}>{plan.description}</span>
                    </h3>
                    <div className={styles.planCards}>
                        {plan.plans.map((item, idx) => (
                            <div key={idx} className={styles.planCard}>
                                <div className={styles.frequency}>{item.frequency}</div>
                                <div className={styles.price}>
                                    <span className={styles.priceAmount}>{item.monthlyPrice}</span>
                                    <span className={styles.priceLabel}>円/月</span>
                                </div>
                                <div className={styles.time}>{item.timePerSession}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
