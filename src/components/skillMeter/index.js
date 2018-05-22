import React from 'react';
import styles from './styles.scss';

const Skill = (props) => {
  const {
    name,
    type,
    utilization,
    index,
  } = props;

  return (
    <div
      className={`${styles.skill} ${styles[`skill_${type}_${index}`]}`}
      style={{ width: `${utilization}%` }}>
      {name} {utilization}%
    </div>
  );
};

const SkillMeter = (props) => {
  const { skills, className } = props;
  const programmingSkills = skills.filter(skill => skill.type === 'programming');
  const visualSkills = skills.filter(skill => skill.type === 'visual');

  return (
    <div className={`${styles.root} ${className}`}>
      {programmingSkills.map((programmingSkill, index) => {
        return (
          <Skill
            key={index}
            index={index}
            {...programmingSkill} />
        );
      })}
      {visualSkills.map((visualSkill, index) => {
        return (
          <Skill
            key={index}
            index={index}
            {...visualSkill} />
        );
      })}
    </div>
  );
};

export default SkillMeter;
