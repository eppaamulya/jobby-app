import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobsCard from '../JobsCard'
import FiltersGroup from '../FiltersGroup'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    profileDetails: {
      name: '',
      profileImageUrl: '',
      shortBio: '',
    },
    jobsList: [],
    activeEmploymentType: [],
    activeSalaryRange: '',
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileForm()
    this.getJobs()
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getProfileForm = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const profileData = await response.json()

      const profileDetails = this.formatDetails(profileData.profile_details)

      this.setState({
        profileDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  formatDetails = prof => {
    const formatData = {
      name: prof.name,
      profileImageUrl: prof.profile_image_url,
      shortBio: prof.short_bio,
    }
    return formatData
  }

  getJobs = async () => {
    const {activeEmploymentType, activeSalaryRange, searchInput} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentType.join(
      ',',
    )}&minimum_package=${activeSalaryRange}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const jobResponse = await fetch(url, options)
    if (jobResponse.ok === true) {
      const jobData = await jobResponse.json()
      console.log(jobData)
      const updatedData = jobData.jobs.map(jobby => ({
        companyLogoUrl: jobby.company_logo_url,
        employmentType: jobby.employment_type,
        id: jobby.id,
        jobDescription: jobby.job_description,
        location: jobby.location,
        packagePerAnnum: jobby.package_per_annum,
        rating: jobby.rating,
        title: jobby.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  changeEmploymentType = activeEmploymentType => {
    this.setState({activeEmploymentType}, this.getJobs)
  }

  changeSalaryRange = activeSalaryRange => {
    this.setState({activeSalaryRange}, this.getJobs)
  }

  onClickRetry = () => this.profileRenderFailureView()

  profileRenderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  profileRenderFailureView = () => (
    <div className="">
      <button type="button" className="white-text" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  profileRenderSuccessView = () => {
    const {profileDetails} = this.state
    console.log(profileDetails)
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  jobsRenderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  jobsRenderFaliureView = () => (
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
      <button type="button" className="white-text" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  jobsRenderSuccessView = () => {
    const {jobsList} = this.state
    const shouldShowJobsList = jobsList.length > 0

    return shouldShowJobsList ? (
      <>
        <ul className="">
          {jobsList.map(jobs => (
            <JobsCard jobsDetails={jobs} key={jobs.id} />
          ))}
        </ul>
      </>
    ) : (
      <>
        <div className="no-jobs-view">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            className="no-job-img"
            alt="no jobs"
          />
          <h1 className="no-jobs-heading">No Jobs Found</h1>
          <p className="no-jobs-description">
            We could not find any jobs. Try other filters
          </p>
        </div>
      </>
    )
  }

  renderProfile = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.profileRenderSuccessView()
      case apiStatusConstants.inProgress:
        return this.profileRenderLoadingView()
      case apiStatusConstants.failure:
        return this.profileRenderFailureView()
      default:
        return null
    }
  }

  renderJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.jobsRenderSuccessView()
      case apiStatusConstants.inProgress:
        return this.jobsRenderLoadingView()
      case apiStatusConstants.failure:
        return this.jobsRenderFaliureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput, activeEmploymentType, activeSalaryRange} = this.state

    return (
      <>
        <Header />
        <div className="job-bg-container">
          <div className="left-container">
            {this.renderProfile()}

            <FiltersGroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              activeEmploymentType={activeEmploymentType}
              activeSalaryRange={activeSalaryRange}
              changeEmploymentType={this.changeEmploymentType}
              changeSalaryRange={this.changeSalaryRange}
            />
          </div>

          <div className="job-container">
            <div className="container-1">
              <input
                value={searchInput}
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onEnterSearchInput}
              />
              <BsSearch className="search-icon" />
            </div>
            {this.renderJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
