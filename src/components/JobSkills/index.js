import './index.css'

const JobSkills = props => {
  const {skillDetails} = props
  const {name, imageUrl} = skillDetails

  return (
    <li className="skill-list">
      <img src={imageUrl} alt="name" className="skill-img" />
      <p className="white-text skill-name">{name}</p>
    </li>
  )
}
export default JobSkills
