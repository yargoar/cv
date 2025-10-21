import React from 'react';
import styles from './Contact.module.css';
import Icon from '../Icon/Icon';

interface ContactProps {
    contact: {
        label: string;
        content: string;
        type: string;
    };
}

const Contact: React.FC<ContactProps> = ({ contact }) => {
    return (
        <li className={styles.li_contact}>

            {contact.type === 'email' ? (
                <a href={`mailto:${contact.content}`}>
                    <Icon name="envelope" prefix="fas" size="1x" />{contact.content}
                </a>
            ) : contact.type === 'phone' ? (
                <a href={`tel:${contact.content}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${contact.label}`}
                ><Icon name="phone" prefix="fas" size="1x" />{contact.content}</a>
            ) : contact.type === 'linkedin' ? (
                <a href={`${contact.content}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${contact.label}`}
                ><Icon name="linkedin" prefix="fab" size="1x" />{contact.content.replace(/^https?:\/\/linkedin.com/, '')}</a>
            ) : contact.type === 'link' ? (
                <a href={`${contact.content}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${contact.label}`}
                ><Icon name="link" prefix="fas" size="1x" />{contact.content.replace(/^https?:\/\//, '')}</a>
            ) : (
                <span>{contact.content}</span>
            )}
        </li>
    );
};

export default Contact;