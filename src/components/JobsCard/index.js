import {MdLocationOn} from 'react-icons/md'
import {GoStar} from 'react-icons/go'
import {BsBag} from 'react-icons/bs'
import {Link} from 'react-router-dom'

import './index.css'

const JobsCard = props => {
  const {jobsDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobsDetails

  return (
    <Link to={`jobs/${id}`} className="nav-link">
      <li className="jobs-list">
        <div className="container-2">
          <div className="container-3">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />

            <div className="container-4">
              <h1 className="white-text para-card-1">{title}</h1>
              <div className="container-5">
                <GoStar className="star" />
                <p className="white-text para-card-2">{rating}</p>
              </div>
            </div>
          </div>
          <div className="container-6">
            <div className="container-9">
              <div className="container-7">
                <MdLocationOn className="location" />
                <p className="white-text para-card-3">{location}</p>
              </div>
              <div className="container-8">
                <BsBag className="bag" />
                <p className="white-text para-card-4">{employmentType}</p>
              </div>
            </div>
            <p className="white-text para-card-5">{packagePerAnnum}</p>
          </div>
        </div>
        <hr />
        <h1 className="white-text para-card-6">Description</h1>
        <p className="white-text para-card-7">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobsCard
