'use client';

import styles from './HeroSection.module.scss';

export default function WorkflowNetwork() {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <svg viewBox="0 0 1440 760" fill="none" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <filter id="nodeGlow" x="-200%" y="-200%" width="500%" height="500%">
                        <feGaussianBlur stdDeviation="3.2" result="b" />
                    </filter>
                </defs>

                {/* Connection lines */}
                <line x1="151.0" y1="322.0" x2="192.6" y2="195.7" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="192.6" y1="195.7" x2="251.8" y2="230.8" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="1436.0" y1="258.3" x2="1372.8" y2="216.6" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="3.5" y1="235.5" x2="15.0" y2="86.7" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="151.0" y1="322.0" x2="30.0" y2="396.6" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="281.5" y1="26.8" x2="182.1" y2="0.6" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="1166.7" y1="567.3" x2="1260.7" y2="513.4" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="1028.8" y1="99.4" x2="982.8" y2="48.2" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="703.6" y1="622.4" x2="785.8" y2="609.8" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="703.6" y1="622.4" x2="766.2" y2="730.2" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="766.2" y1="730.2" x2="785.8" y2="609.8" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="39.2" y1="662.0" x2="57.3" y2="576.1" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="1360.2" y1="582.5" x2="1416.7" y2="643.5" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="1285.1" y1="335.2" x2="1301.7" y2="436.8" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="1285.1" y1="335.2" x2="1385.8" y2="416.0" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="1260.7" y1="513.4" x2="1301.7" y2="436.8" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="1133.1" y1="672.5" x2="1148.7" y2="759.9" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="1166.7" y1="567.3" x2="1133.1" y2="672.5" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="1320.8" y1="23.6" x2="1397.0" y2="13.0" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="1320.8" y1="23.6" x2="1236.3" y2="94.6" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="34.5" y1="25.3" x2="15.0" y2="86.7" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="252.7" y1="617.1" x2="170.1" y2="752.0" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="1014.9" y1="758.2" x2="936.6" y2="737.1" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="496.6" y1="147.6" x2="542.4" y2="32.9" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="542.4" y1="32.9" x2="414.0" y2="32.2" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="1437.1" y1="170.9" x2="1372.8" y2="216.6" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="39.2" y1="662.0" x2="37.5" y2="758.2" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="1301.7" y1="436.8" x2="1385.8" y2="416.0" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="698.0" y1="102.2" x2="756.5" y2="12.3" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="1028.8" y1="99.4" x2="1125.4" y2="82.6" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="1274.1" y1="724.0" x2="1309.7" y2="674.7" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="1360.2" y1="582.5" x2="1435.8" y2="541.0" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="1435.8" y1="541.0" x2="1416.7" y2="643.5" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="37.5" y1="758.2" x2="170.1" y2="752.0" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />
                <line x1="252.7" y1="617.1" x2="382.3" y2="711.5" stroke="#A8200D" strokeWidth="1" strokeOpacity="0.07" />

                {/* Animated glowing nodes */}
                <g filter="url(#nodeGlow)">
                    <circle className={styles.gnode} cx="192.6" cy="195.7" r="3.0" fill="#A8200D" style={{ animationDelay: '0s' }} />
                    <circle className={styles.gnode} cx="382.3" cy="711.5" r="3.0" fill="#A8200D" style={{ animationDelay: '-2.2s' }} />
                    <circle className={styles.gnode} cx="1236.3" cy="94.6" r="3.0" fill="#A8200D" style={{ animationDelay: '-1.1s' }} />
                    <circle className={styles.gnode} cx="1309.7" cy="674.7" r="3.0" fill="#A8200D" style={{ animationDelay: '-3.3s' }} />
                </g>

                {/* Static nodes */}
                <circle cx="151.0" cy="322.0" r="1.6" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="251.8" cy="230.8" r="1.6" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="1436.0" cy="258.3" r="2.8" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="3.5" cy="235.5" r="2.8" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="30.0" cy="396.6" r="2.0" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="281.5" cy="26.8" r="1.6" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="1166.7" cy="567.3" r="2.4" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="1028.8" cy="99.4" r="2.0" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="703.6" cy="622.4" r="2.4" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="766.2" cy="730.2" r="2.8" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="39.2" cy="662.0" r="1.6" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="1360.2" cy="582.5" r="2.4" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="1285.1" cy="335.2" r="2.4" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="1260.7" cy="513.4" r="2.8" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="1133.1" cy="672.5" r="1.6" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="1148.7" cy="759.9" r="2.8" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="1320.8" cy="23.6" r="2.0" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="34.5" cy="25.3" r="2.0" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="252.7" cy="617.1" r="1.6" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="1014.9" cy="758.2" r="2.8" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="496.6" cy="147.6" r="1.6" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="542.4" cy="32.9" r="2.4" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="1437.1" cy="170.9" r="2.8" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="37.5" cy="758.2" r="2.0" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="1301.7" cy="436.8" r="1.6" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="698.0" cy="102.2" r="2.0" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="1125.4" cy="82.6" r="2.0" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="1385.8" cy="416.0" r="2.8" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="182.1" cy="0.6" r="2.4" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="15.0" cy="86.7" r="1.6" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="1274.1" cy="724.0" r="2.8" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="1435.8" cy="541.0" r="1.6" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="756.5" cy="12.3" r="2.8" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="936.6" cy="737.1" r="2.4" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="414.0" cy="32.2" r="1.6" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="982.8" cy="48.2" r="2.0" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="170.1" cy="752.0" r="2.8" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="1397.0" cy="13.0" r="1.6" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="1416.7" cy="643.5" r="2.0" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="785.8" cy="609.8" r="1.6" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="57.3" cy="576.1" r="2.0" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="1309.7" cy="674.7" r="2.0" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="1372.8" cy="216.6" r="2.4" fill="#A8200D" fillOpacity="0.13" />
                <circle cx="192.6" cy="195.7" r="2.8" fill="#A8200D" fillOpacity="0.13" />
            </svg>
        </div>
    );
}
