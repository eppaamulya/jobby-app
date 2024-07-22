import {Component} from 'react'
import {MdLocationOn} from 'react-icons/md'
import {GoStar} from 'react-icons/go'
import {BsBag} from 'react-icons/bs'
import {FaExternalLinkAlt} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import JobSkills from '../JobSkills'

import './index.css'

const apiStatusConst = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    skillsList: [],
    similarJobList: [],
    apiStats: apiStatusConst.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStats: apiStatusConst.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options2 = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const jobItemResponse = await fetch(apiUrl, options2)
    if (jobItemResponse.ok === true) {
      const jobItemData = await jobItemResponse.json()
      console.log(jobItemData)
      const JobDetails = {
        companyLogoUrl: jobItemData.job_details.company_logo_url,
        companyWebsiteUrl: jobItemData.job_details.company_website_url,
        employmentType: jobItemData.job_details.employment_type,
        jobDescription: jobItemData.job_details.job_description,
        location: jobItemData.job_details.location,
        packagePerAnnum: jobItemData.job_details.package_per_annum,
        rating: jobItemData.job_details.rating,
        id: jobItemData.job_details.id,
        title: jobItemData.job_details.title,
      }

      const lifeAtCompany = {
        description: jobItemData.job_details.life_at_company.description,
        imageUrl: jobItemData.job_details.life_at_company.image_url,
      }

      const skills = jobItemData.job_details.skills.map(skill => ({
        imageUrl: skill.image_url,
        name: skill.name,
      }))

      const similarJobs = jobItemData.similar_jobs.map(sim => ({
        companyLogoUrl: sim.company_logo_url,
        employmentType: sim.employment_type,
        jobDescription: sim.job_description,
        location: sim.location,
        rating: sim.rating,
        id: sim.id,
        title: sim.title,
      }))

      this.setState({
        jobItemList: JobDetails,
        life: lifeAtCompany,
        skillsList: skills,
        similarJobList: similarJobs,
        apiStats: apiStatusConst.success,
      })
    } else {
      this.setState({apiStats: apiStatusConst.failure})
    }
  }

  onClickRetry = () => this.getJobItemDetails()

  jobsDetailsRenderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  jobsDetailsRenderFaliureView = () => (
    <div className="">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className=""
        alt="failure view"
      />
      <h1 className="white-text">Oops! Something Went Wrong</h1>
      <p className="white-text">
        We cannot seem to find the page you are looking for
      </p>
      <button className="white-text" onClick={this.onClickRetry} type="button">
        Retry
      </button>
    </div>
  )

  jobsDetailsRenderSuccessView = () => {
    const {jobItemList, life, skillsList, similarJobList} = this.state
    console.log(jobItemList)
    console.log(skillsList)
    console.log(life)
    console.log(similarJobList)
    const {
      employmentType,
      jobDescription,
      location,
      companyLogoUrl,
      companyWebsiteUrl,
      title,
      rating,
      packagePerAnnum,
    } = jobItemList
    return (
      <>
        <div className="jobs-list">
          <div className="container-2">
            <div className="container-3">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
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
          <div className="container-9">
            <h1 className="white-text para-card-6">Description</h1>
            <div className="container-10">
              <a href={companyWebsiteUrl} className="white-text-2">
                Visit
              </a>
              <FaExternalLinkAlt className="link-el" />
            </div>
          </div>

          <p className="white-text para-card-7">{jobDescription}</p>
          <h1 className="white-text skill">Skills</h1>
          <ul className="skill-container">
            {skillsList.map(skilled => (
              <JobSkills skillDetails={skilled} key={skilled.id} />
            ))}
          </ul>
          <div className="">
            <h1 className="white-text life-1">Life at Company</h1>
            <div className="container-10">
              <p className="white-text life-para">{life.description}</p>
              <img src={life.imageUrl} alt="life at company" />
            </div>
          </div>
        </div>
        <div className="">
          <h1 className="white-text sim-head">Similar Jobs</h1>
          <ul className="similar-unlisted">
            {similarJobList.map(similar => (
              <SimilarJobs similarDetails={similar} key={similar.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderJobItemDetails = () => {
    const {apiStats} = this.state

    switch (apiStats) {
      case apiStatusConst.success:
        return this.jobsDetailsRenderSuccessView()
      case apiStatusConst.inProgress:
        return this.jobsDetailsRenderLoadingView()
      case apiStatusConst.failure:
        return this.jobsDetailsRenderFaliureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-bg-container-1">{this.renderJobItemDetails()}</div>
      </>
    )
  }
}

export default JobItemDetails
