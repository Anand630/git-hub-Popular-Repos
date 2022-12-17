import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    presentLanguage: languageFiltersData[0].id,
    isLoading: false,
    repositoryItemsList: [],
  }

  componentDidMount() {
    this.getRepositoryItemDetails()
  }

  getFormattedData = repo => ({
    avatarUrl: repo.avatar_url,
    forksCount: repo.forks_count,
    id: repo.id,
    issuesCount: repo.issues_count,
    name: repo.name,
    starsCount: repo.stars_count,
  })

  getRepositoryItemDetails = async () => {
    this.setState({isLoading: true})
    const {presentLanguage} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${presentLanguage}`
    try {
      const response = await fetch(url)
      const data = await response.json()

      if (response.ok) {
        const formattedDataList = data.popular_repos.map(eachRepo =>
          this.getFormattedData(eachRepo),
        )
        this.setState({
          repositoryItemsList: formattedDataList,
          isLoading: false,
        })
      }
    } catch (error) {
      console.log(error)

      this.setState({isLoading: false})
    }
  }

  updateLanguageForFiltering = id => {
    this.setState({presentLanguage: id}, this.getRepositoryItemDetails)
  }

  displayFetchedDetails = () => {
    const {repositoryItemsList} = this.state
    return (
      <ul className="all-repository-items-list-container">
        {repositoryItemsList.map(eachRepo => (
          <RepositoryItem repoDetails={eachRepo} key={eachRepo.id} />
        ))}
      </ul>
    )
  }

  displayLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  failureView = () => (
    <div className="failure-view-container">
      <img
        className="failure-view-image"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure-view"
      />
      <h1 className="something-went-wrong-heading">Something Went Wrong</h1>
    </div>
  )

  renderRequiredData = () => {
    const {presentLanguage} = this.state
    switch (presentLanguage) {
      case languageFiltersData[0].id:
        return this.displayFetchedDetails()
      case languageFiltersData[1].id:
        return this.displayFetchedDetails()
      case languageFiltersData[2].id:
        return this.displayFetchedDetails()
      case languageFiltersData[3].id:
        return this.displayFetchedDetails()
      case languageFiltersData[4].id:
        return this.displayFetchedDetails()

      default:
        return this.failureView()
    }
  }

  render() {
    const {presentLanguage, isLoading} = this.state
    return (
      <div className="git-hub-popular-repository-home-page-container">
        <h1 className="popular-main-heading">Popular</h1>

        <ul className="options-list-container">
          {languageFiltersData.map(eachOption => (
            <LanguageFilterItem
              languageItem={eachOption}
              key={eachOption.id}
              updateLanguageForFiltering={this.updateLanguageForFiltering}
              isButtonClicked={presentLanguage === eachOption.id}
            />
          ))}
        </ul>

        {isLoading ? this.displayLoader() : this.renderRequiredData()}
      </div>
    )
  }
}

export default GithubPopularRepos
