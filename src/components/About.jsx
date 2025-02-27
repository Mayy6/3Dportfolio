import {Tilt} from 'react-tilt';
import{motion} from 'framer-motion';
import{styles} from '../style';
import {services} from '../constants';
import {fadeIn, textVariant} from '../utils/motion';
import { SectionWrapper } from '../hoc';

const ServiceCard =({index, title, icon})=>{
  return (
    <Tilt className="cs:w-[250px] w-full">
      <motion.div
      variants = {fadeIn("right", "spring", 0.5*index, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-none-[20px] shadow-card'>
        <div
        options={{
          max:45,
          scale:1,
          speed: 450
        }}
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'>
          <img src={icon} alt={title}
          className='w-16 h-16 object-contain' />
          <h3 className='text-white text-[20px] font-bold text-center'>{title}</h3>
        </div>
      </motion.div>
    </Tilt>
  )
}

const About = () => {
  return (
    <>
    <motion.div>
      <p className={styles.sectionSubText}>Introduction</p>
      <h2 className={styles.sectionHeadText}>Overview</h2>
      </motion.div>
      <motion.p
      variants={fadeIn("","", 0.1, 1)}
      className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'>
        I'm a software developer with a strong foundation in Java, C, Python, JavaScript, and experience in modern frameworks such as React, Node.js, and Three.js. My passion lies in building scalable, user-friendly, and efficient solutions that address real-world challenges. 
        With a background in both technology and business, I excel at bridging the gap between software development and data-driven decision-making, 
        ensuring that the solutions I create are not just technically sound but also aligned with business needs. I thrive in collaborative environments, 
        working closely with clients and teams to turn ideas into reality.
        Let’s connect and create something amazing together!
      </motion.p>
      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service}></ServiceCard>
        ))}
      </div>
      </>
  )
}

export default SectionWrapper(About, "about");