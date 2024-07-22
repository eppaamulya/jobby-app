import './index.css'

const FiltersGroup = ({
  employmentTypesList,
  activeEmploymentType,
  changeEmploymentType,
  salaryRangesList,
  activeSalaryRange,
  changeSalaryRange,
}) => {
  const renderEmploymentList = () => {
    const onClickEmploymentType = employmentTypeId => {
      const updatedTypes = activeEmploymentType.includes(employmentTypeId)
        ? activeEmploymentType.filter(type => type !== employmentTypeId)
        : [...activeEmploymentType, employmentTypeId]
      changeEmploymentType(updatedTypes)
    }

    return employmentTypesList.map(employment => (
      <li className="filter-list" key={employment.employmentTypeId}>
        <input
          type="checkbox"
          id={employment.employmentTypeId}
          className="checkbox-input"
          value={employment.employmentTypeId}
          checked={activeEmploymentType.includes(employment.employmentTypeId)}
          onChange={() => onClickEmploymentType(employment.employmentTypeId)}
        />
        <label htmlFor={employment.employmentTypeId} className="label-text">
          {employment.label}
        </label>
      </li>
    ))
  }

  const renderEmploymentFilters = () => (
    <div>
      <hr className="hr-line" />
      <h1 className="employment-heading">Type of Employment</h1>
      <ul className="emp-list">{renderEmploymentList()}</ul>
    </div>
  )

  const renderSalaryList = () => {
    const onClickSalaryType = salaryRangeId => {
      changeSalaryRange(salaryRangeId)
    }

    return salaryRangesList.map(salary => (
      <li className="filter-list" key={salary.salaryRangeId}>
        <input
          type="radio"
          id={salary.salaryRangeId}
          className="radio-input"
          name="salaryRange"
          value={salary.salaryRangeId}
          checked={activeSalaryRange === salary.salaryRangeId}
          onChange={() => onClickSalaryType(salary.salaryRangeId)}
        />
        <label htmlFor={salary.salaryRangeId} className="label-text">
          {salary.label}
        </label>
      </li>
    ))
  }

  const renderSalaryFilters = () => (
    <div>
      <hr className="hr-line" />
      <h1 className="employment-heading">Salary Range</h1>
      <ul className="emp-list">{renderSalaryList()}</ul>
    </div>
  )

  return (
    <div className="">
      {renderEmploymentFilters()}
      {renderSalaryFilters()}
    </div>
  )
}

export default FiltersGroup
