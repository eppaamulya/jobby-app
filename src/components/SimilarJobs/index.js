import {MdLocationOn} from 'react-icons/md'
import {GoStar} from 'react-icons/go'
import {BsBag} from 'react-icons/bs'

import './index.css'

const SimilarJobs = props => {
  const {similarDetails} = props
  const {
    employmentType,
    jobDescription,
    location,
    companyLogoUrl,
    title,
    rating,
  } = similarDetails

  return (
    <li className="similar-list">
      <div className="">
        <div className="container-3">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
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
        <h1 className="white-text para-card-6">Description</h1>
        <p className="white-text para-card-7">{jobDescription}</p>
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
      </div>
    </li>
  )
}
export default SimilarJobs
