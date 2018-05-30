import React, { Component } from 'react';
import Envelope from 'img/envelope';
import Phone from 'img/phone';
import LinkedIn from 'img/linkedIn';
import Github from 'img/github';

import styles from './styles.scss';

const aboutTypes = {
  link: 'link',
  email: 'email',
  phone: 'phone',
};

const aboutContacts = [
  {
    alt: 'phone',
    Component: Phone,
    text: '(908) 240-5093',
    href: '+9082405093',
    type: aboutTypes.phone,
  },
  {
    alt: 'email',
    Component: Envelope,
    text: 'ksrbkevinsuen@gmail.com',
    type: aboutTypes.email,
  },
  {
    alt: 'linkedIn',
    Component: LinkedIn,
    text: 'linkedin.com/in/ksrbkevinsuen',
    type: aboutTypes.link,
  },
  {
    alt: 'github',
    Component: Github,
    text: 'github.com/ksrb',
    type: aboutTypes.link,
  }
];

const Link = ({ type, text, href, children, ...args }) => {
  switch (type) {
    case aboutTypes.email:
      return <a href={`mailto:${text}`} {...args}>{children}</a>;
    case aboutTypes.phone:
      return <a href={`tel:${href}`} {...args}>{children}</a>;
    case aboutTypes.link:
      return <a href={`//${text}`} target='_blank' {...args}>{children}</a>;
    default:
      new Error('Type does not exist');
  }
};

class About extends Component {

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.about}>
          <div className={styles.about_text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non
            tortor in erat malesuada volutpat. Vestibulum aliquam quam ac eros
            placerat posuere. Praesent ex turpis, porta in erat ac, varius
            varius odio. Curabitur fermentum mauris nulla, at pellentesque ante
            ullamcorper vel. Nunc ultrices lorem et felis tristique congue. Nunc
            eget rutrum mi. Nam volutpat, mi non suscipit tincidunt, enim nibh
            dignissim nisi, sed mollis felis magna a leo. Mauris eu vestibulum
            tortor. Pellentesque malesuada lorem nec dignissim elementum.
            Integer hendrerit nec diam et luctus. In facilisis cursus
            condimentum.
          </div>
          <div className={styles.about_text}>
            In nunc enim, blandit nec felis vel, luctus rutrum enim. Phasellus
            aliquet, massa vitae molestie sollicitudin, nibh nibh interdum
            velit, ullamcorper consectetur urna dui ut sem.
          </div>
        </div>
        <div className={styles.about_contacts}>
          {aboutContacts.map((aboutContact, index) => {

            const {
              text,
              type,
              href,
              Component,
            } = aboutContact;

            return (
              <div
                key={index}
                className={styles.about_contact}>
                <div className={styles.about_contact_icon_container}>
                  {Component &&
                  <Link type={type} text={text} href={href}>
                    <Component className={styles.about_contact_icon} />
                  </Link>}
                </div>

                <Link type={type} text={text} href={href} className={styles.a}>
                  {text}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default About;
