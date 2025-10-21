import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName, library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import styles from './Icon.module.css';

library.add(fas, far, fab);

interface IconProps {
    name: string;
    prefix?: "fas" | "far" | "fab";
    size?: "xs" | "sm" | "lg" | "1x" | "2x" | "3x" | "4x" | "5x" | "6x" | "7x" | "8x" | "9x" | "10x";
}

const Icon: React.FC<IconProps> = ({ name, prefix = "fas", size = "2x" }) => {
    return <FontAwesomeIcon className={styles.icon} icon={[prefix, name as IconName]} size={size} />;
};

export default Icon;
